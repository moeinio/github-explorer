import { Module } from '@nestjs/common';
import { RepositoriesService } from './repositories.service';
import { RepositoriesController } from './repositories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepositoryEntity } from './repository.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RepositoryEntity])],
  providers: [RepositoriesService],
  controllers: [RepositoriesController],
})
export class RepositoriesModule {}
