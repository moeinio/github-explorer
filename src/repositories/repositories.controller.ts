import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { RepositoriesService } from './repositories.service';
import { RepositoryEntity } from './repository.entity';

@Controller('repositories')
export class RepositoriesController {
  constructor(private readonly repositoriesService: RepositoriesService) {}

  @Get()
  getPopularRepositories(
    @Query('startingDate') startingDate?: string,
    @Query('language') language?: string,
  ) {
    return this.repositoriesService.getPopularRepositories(
      startingDate,
      language,
    );
  }

  @Post('star')
  starRepository(@Body() repository: RepositoryEntity) {
    return this.repositoriesService.starRepository(repository);
  }

  @Get('starred')
  getStarredRepositories(@Query('language') language?: string) {
    return this.repositoriesService.getStarredRepositories(language);
  }

  @Delete('starred/:id')
  unstarRepository(@Param('id') id: number) {
    return this.repositoriesService.unstarRepository(id);
  }
}
