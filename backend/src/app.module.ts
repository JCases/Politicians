import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';

import { PoliticianModule } from './politician/politician.module';
import { SearchModule } from './utils/elasticsearch/elasticsearch.module';

@Module({
  imports: [
    PoliticianModule,
    SearchModule,
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dest: configService.get<string>('MULTER_DEST'),
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
