import { Module } from '@nestjs/common';

import { RepositoriesModule } from './repositories/repositories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepositoryEntity } from './repositories/repository.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      synchronize: true,
      entities: [RepositoryEntity],
    }),
    RepositoriesModule,
  ],
})
export class AppModule {}
