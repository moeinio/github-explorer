import { Test, TestingModule } from "@nestjs/testing";
import { RepositoriesController } from "./repositories.controller";
import { RepositoriesService } from "./repositories.service";
import { RepositoryEntity } from "./repository.entity";

describe("RepositoriesController", () => {
  let controller: RepositoriesController;
  const mockedResult = [
    {
      id: 1,
      name: "Repository 1",
      url: "",
      description: "Description 1",
      stars: 100,
      language: "TypeScript",
    },
  ];

  const mockRepositoriesService = {
    getPopularRepositories: jest.fn(
      (startingDate?: string, language?: string): RepositoryEntity[] => {
        if (language) {
          return mockedResult.map((repo) => ({
            ...repo,
            language,
          }));
        }
        return mockedResult;
      },
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RepositoriesController],
      providers: [RepositoriesService],
    })
      .overrideProvider(RepositoriesService)
      .useValue(mockRepositoriesService)
      .compile();

    controller = module.get<RepositoriesController>(RepositoriesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
  it("should return an array of repositories fetched from Github", async () => {
    const repositories = await controller.getPopularRepositories();
    expect(repositories).toEqual(mockedResult);
  });

  it("should return an array of repositories filtered by query parameters", async () => {
    const startingDate = "2023-01-01";
    const language = "TypeScript";
    const repositories = await controller.getPopularRepositories(
      startingDate,
      language,
    );
    expect(mockRepositoriesService.getPopularRepositories).toHaveBeenCalledWith(
      startingDate,
      language,
    );
    expect(repositories).toEqual(mockedResult);
  });
});
