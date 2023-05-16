import { Injectable, NotFoundException } from '@nestjs/common';

import { ParseResult, parse } from 'papaparse';
import { Readable } from 'stream';

import { SearchService } from 'src/utils/elasticsearch/elasticsearch.service';
import { Politician, PoliticianCSV } from './politician.dto';

@Injectable()
export class PoliticianService {
  constructor(private readonly elasticsearchService: SearchService) {}

  private readonly index = 'search-politician';

  async bulk(buffer: Buffer) {
    // Parse
    const stream = Readable.from(buffer);
    parse(stream, {
      header: true,
      delimiter: ';',
      transformHeader: (h) => h.trim().replace(/"/g, ''),
      complete: async (results: ParseResult<PoliticianCSV>) => {
        const politician = results.data.map((p) => ({
          name: p.NOMBRE,
          group: p.PARTIDO,
          groupFilter: p.PARTIDO_PARA_FILTRO,
          gender: p.GENERO,
          positionFilter: p.CARGO_PARA_FILTRO,
          position: p.CARGO,
          institution: p.INSTITUCION,
          ccaa: p.INSTITUCION,
          baseSalary: Number.parseFloat(p.SUELDOBASE_SUELDO),
          complementarySalary: Number.parseFloat(p.COMPLEMENTOS_SUELDO),
          extraSalary: Number.parseFloat(p.PAGASEXTRA_SUELDO),
          subsistenceSalary: Number.parseFloat(
            p.OTRASDIETASEINDEMNIZACIONES_SUELDO,
          ),
          threeYearSalary: Number.parseFloat(p.TRIENIOS_SUELDO),
          monthlySalary: Number.parseFloat(p.RETRIBUCIONMENSUAL),
          annualSalary: Number.parseFloat(p.RETRIBUCIONANUAL),
          notes: p.OBSERVACIONES,
        }));

        await this.elasticsearchService.bulk<Politician>(
          this.index,
          politician,
        );
      },
    });
  }

  async findAll(
    page: number,
    pageSize: number,
    search?: string,
    group?: string,
    gender?: string,
  ) {
    const data =
      !search && !group && !gender
        ? await this.elasticsearchService.readManyPagination<Politician>(
            this.index,
            page,
            pageSize,
          )
        : await this.elasticsearchService.readManyPaginationFilter<Politician>(
            this.index,
            page,
            pageSize,
            {
              query: {
                ...((group || gender) && {
                  match: {
                    ...(group && { group }),
                    ...(gender && { gender }),
                  },
                }),
                ...(search && {
                  fuzzy: { name: { value: search, fuzziness: 'AUTO' } },
                }),
              },
            },
          );

    const politicians = data.hits.hits.map((hit) => ({
      id: hit._id,
      ...hit._source,
    }));

    return politicians;
  }

  async findById(id: string) {
    const data = await this.elasticsearchService.read<Politician>(
      this.index,
      id,
    );

    if (!data.found) throw new NotFoundException('Politician not found');

    return { id: data._id, ...data._source };
  }

  async updateById(id: string, politician: Partial<Politician>) {
    const data = await this.elasticsearchService.update<Politician>(
      this.index,
      id,
      politician,
    );

    if (data.result !== 'updated')
      throw new Error('Failed to delete politician');
  }

  async deleteById(id: string) {
    const data = await this.elasticsearchService.delete(this.index, id);

    if (data.result !== 'deleted')
      throw new Error('Failed to delete politician');
  }

  async getStatistics() {
    const medianSalary = await this.elasticsearchService.readMany<
      Politician,
      { avg_salary: number }
    >(this.index, {
      aggs: { avg_salary: { avg: { field: 'baseSalary' } } },
    });

    const topSalary = await this.elasticsearchService.readMany<Politician, any>(
      this.index,
      {
        size: 10,
        sort: [{ baseSalary: { order: 'desc' } }],
      },
    );

    return {
      medianSalary: medianSalary.aggregations?.avg_salary,
      topSalary: topSalary.hits.hits.map((hit) => hit._source),
    };
  }
}
