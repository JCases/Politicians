import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { PoliticianService } from './politician.service';
import { Politician } from './politician.dto';

@Controller('politician')
export class PoliticianController {
  constructor(private readonly politicianService: PoliticianService) {}

  @Post('bulk')
  @UseInterceptors(FileInterceptor('file'))
  async importBulkData(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('Politician File error');
    await this.politicianService.bulk(file.buffer);
    return { ok: true, message: 'Data created successfully' };
  }

  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
    @Query('search') search?: string,
    @Query('group') group?: string,
    @Query('gender') gender?: string,
  ) {
    if (!page || !pageSize)
      throw new BadRequestException('Politician Data Query error');
    const politicians = await this.politicianService.findAll(
      pageSize * page,
      pageSize,
      search,
      group,
      gender,
    );
    return { ok: true, data: politicians, message: 'Data readed successfully' };
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    if (!id) throw new BadRequestException('Politician ID Param not found');
    const politician = await this.politicianService.findById(id);
    return { ok: true, data: politician, message: 'Data readed successfully' };
  }

  @Patch(':id')
  async updateById(@Param('id') id: string, @Body() data: Partial<Politician>) {
    if (!id) throw new BadRequestException('Politician ID Param error');
    if (!data) throw new BadRequestException('Politician Data Body error');
    await this.politicianService.updateById(id, data);
    return { ok: true, message: 'Data updated successfully' };
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string) {
    if (!id) throw new BadRequestException('Politician ID Param error');
    await this.politicianService.deleteById(id);
    return { ok: true, message: 'Data deleted successfully' };
  }

  @Get('statistics/avg')
  async getStatistics() {
    const statistics = await this.politicianService.getStatistics();
    return { ok: true, data: statistics, message: 'Data readed successfully' };
  }
}
