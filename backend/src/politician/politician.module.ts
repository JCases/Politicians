import { Module } from '@nestjs/common';
import { PoliticianService } from './politician.service';
import { PoliticianController } from './politician.controller';

@Module({
  controllers: [PoliticianController],
  providers: [PoliticianService],
  exports: [PoliticianService],
})
export class PoliticianModule {}
