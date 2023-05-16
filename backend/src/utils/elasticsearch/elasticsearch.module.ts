import { Global, Module, OnModuleInit } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { SearchService } from './elasticsearch.service';

@Global()
@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        node: configService.getOrThrow('ELASTICSEARCH_NODE'),
        cloud: {
          id: 'Politician:ZXVyb3BlLXdlc3QzLmdjcC5jbG91ZC5lcy5pbzo0NDMkNzU4NWU1NGU2ZDJhNDY0NmE2YmQzNjlmOWYyOWVhZDIkMTcwYWYyMDc3MzIzNGJiNDhmYWFiMzk3MzFiZWFiOWU=',
        },
        auth: {
          username: configService.getOrThrow('ELASTICSEARCH_USER'),
          password: configService.getOrThrow('ELASTICSEARCH_PASSWORD'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [SearchService],
  exports: [SearchService],
})
export class SearchModule implements OnModuleInit {
  constructor(private readonly searchService: SearchService) {}
  async onModuleInit() {
    await this.searchService.index();
  }
}
