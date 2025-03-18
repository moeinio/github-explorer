import {
  Injectable,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RepositoryEntity } from './repository.entity';
import { Repository } from 'typeorm';
import { GitHubApiResponse, GithubRepository } from './types';

@Injectable()
export class RepositoriesService {
  constructor(
    @InjectRepository(RepositoryEntity)
    private readonly repositoriesRepo: Repository<RepositoryEntity>,
  ) {}

  private isGitHubApiResponse(data: unknown): data is GitHubApiResponse {
    // Typeguard ensures that the data returned from the GitHub API is in the expected format.
    return (
      typeof data === 'object' &&
      data !== null &&
      'items' in data &&
      Array.isArray((data as GitHubApiResponse).items)
    );
  }
  async fetchTrendingRepositoriesFromGithub(
    requestUrl: string,
  ): Promise<GithubRepository[]> {
    try {
      const response = await fetch(requestUrl);

      if (!response.ok) {
        throw new HttpException(
          `GitHub API error: ${response.status}`,
          response.status,
        );
      }

      const data: unknown = await response.json();
      if (!this.isGitHubApiResponse(data)) {
        throw new HttpException(
          'Failed to fetch repositories',
          HttpStatus.BAD_REQUEST,
        );
      }
      return data.items;
    } catch (error) {
      throw new HttpException(
        `Failed to fetch repositories: ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getPopularRepositories(
    startingDate?: string,
    language?: string,
  ): Promise<RepositoryEntity[]> {
    const date = new Date();
    // get last week's date as a the default value
    date.setDate(date.getDate() - 7);

    const lastWeek = date.toISOString().split('T')[0];

    const dateFilter = startingDate
      ? `created:>${startingDate}`
      : `created:>${lastWeek}`;

    let queryParams = `${dateFilter}&sort=stars&order=desc`;

    if (language) {
      queryParams = `${dateFilter}+language:${encodeURIComponent(language)}&sort=stars&order=desc`;
    }

    // @todo implement a cleaner way to handle filters
    const requestURL = `https://api.github.com/search/repositories?q=${queryParams}`;

    const githubRepos =
      await this.fetchTrendingRepositoriesFromGithub(requestURL);

    return githubRepos.map((repo) => {
      const repositoryEntity = new RepositoryEntity();
      repositoryEntity.id = repo.id;
      repositoryEntity.name = repo.name;
      repositoryEntity.url = repo.html_url;
      repositoryEntity.description = repo.description;
      repositoryEntity.stars = repo.stargazers_count;
      repositoryEntity.language = repo.language;
      return repositoryEntity;
    });
  }

  async starRepository(
    repository: RepositoryEntity,
  ): Promise<RepositoryEntity> {
    return this.repositoriesRepo.save(repository);
  }

  async getStarredRepositories(language?: string): Promise<RepositoryEntity[]> {
    // @todo use find() instead of queryBuilder
    if (language) {
      const filteredRepositories = await this.repositoriesRepo
        .createQueryBuilder('repository')
        .where('repository.language = :language', {
          language: `${encodeURIComponent(language)}`,
        })
        .getMany();

      return filteredRepositories;
    }
    return this.repositoriesRepo.find();
  }

  async unstarRepository(id: number): Promise<string> {
    const result = await this.repositoriesRepo.delete(id);

    // the delete function returns the number of affected rows, if no rows are affected, nothing has been deleted or the result simply does not exist
    if (result.affected === 0) {
      throw new NotFoundException(`Repository not found or incorrect ID ${id}`);
    }
    return `unstarred repository with ID ${id}`;
  }
}
