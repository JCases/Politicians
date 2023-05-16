import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SearchService {
  constructor(
    private readonly configService: ConfigService,
    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  async index() {
    const index = this.configService.getOrThrow('ELASTICSEARCH_INDEX');
    const checkIndex = await this.elasticsearchService.indices.exists({
      index,
    });
    // Only create if Politician type not exists
    if (!checkIndex)
      await this.elasticsearchService.indices.create({
        index,
        mappings: {
          properties: {
            name: {
              type: 'keyword',
              index: true,
            },
            group: {
              type: 'text',
              index: true,
            },
            groupFilter: {
              type: 'text',
              index: true,
            },
            gender: {
              type: 'text',
              index: true,
            },
            positionFilter: {
              type: 'text',
              index: true,
            },
            position: {
              type: 'text',
              index: true,
            },
            institution: {
              type: 'text',
              index: true,
            },
            ccaa: {
              type: 'text',
              index: true,
            },
            baseSalary: {
              type: 'float',
              index: true,
            },
            complementarySalary: {
              type: 'float',
              index: true,
            },
            extraSalary: {
              type: 'float',
              index: true,
            },
            subsistenceSalary: {
              type: 'float',
              index: true,
            },
            threeYearSalary: {
              type: 'float',
              index: true,
            },
            monthlySalary: {
              type: 'float',
              index: true,
            },
            annualSalary: {
              type: 'float',
              index: true,
            },
            notes: {
              type: 'text',
              index: true,
            },
          },
        },
      });
  }

  async exists(index: string, id: string) {
    return this.elasticsearchService.exists({
      index,
      id,
    });
  }

  async bulk<T>(index: string, data: T[]) {
    const operations = data.flatMap((doc) => [
      { index: { _index: index } },
      doc,
    ]);

    return this.elasticsearchService.bulk<T>({
      index,
      refresh: true,
      operations,
    });
  }

  async create<T>(index: string, document: T) {
    return this.elasticsearchService.index<T>({
      index,
      refresh: true,
      document,
    });
  }

  async read<T>(index: string, id: string) {
    const exists = await this.exists(index, id);
    if (!exists) throw new NotFoundException('Not found');

    return this.elasticsearchService.get<T>({
      index,
      id,
    });
  }

  async readMany<T, Z>(index: string, query: any) {
    return this.elasticsearchService.search<T, Z>({
      index,
      ...query,
    });
  }

  async readManyPagination<T>(index: string, from: number, size: number) {
    return this.elasticsearchService.search<T>({
      index,
      from,
      size,
    });
  }

  async readManyPaginationFilter<T>(
    index: string,
    from: number,
    size: number,
    query: any,
  ) {
    return this.elasticsearchService.search<T>({
      index,
      from,
      size,
      ...query,
    });
  }

  async update<T>(index: string, id: string, doc: Partial<T>) {
    const exists = await this.exists(index, id);
    if (!exists) throw new NotFoundException('Not found');

    return this.elasticsearchService.update({
      index,
      id,
      doc,
    });
  }

  async delete(index: string, id: string) {
    const exists = await this.exists(index, id);
    if (!exists) throw new NotFoundException('Not found');

    return this.elasticsearchService.delete({
      index,
      id,
    });
  }
}
