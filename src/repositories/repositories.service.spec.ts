import { Test, TestingModule } from '@nestjs/testing';
import { RepositoriesService } from './repositories.service';

describe('RepositoriesService', () => {
  let service: RepositoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RepositoriesService],
    }).compile();

    service = module.get<RepositoriesService>(RepositoriesService);
  });

  it('should fetch trending repositories', async () => {
    const repositories = await service.getPopularRepositories(
      '2025-03-10',
      'javascript',
    );
    expect(repositories).toBeDefined();
    expect(Array.isArray(repositories)).toBeTruthy();
  });
});
