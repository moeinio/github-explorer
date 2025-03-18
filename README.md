# Rest API to retrieve the most popular repositories on GitHub

## Description

A small REST interface to discover repositories on GitHub.

A list of the most popular repositories of the last week should be displayed and the user should be able to mark them. The marked repositories should be saved via another endpoint and be retrievable by the user.

### Requirements

User is able to:

- Fetch a list of repositories from github ✅
  - Repository has the following fields: ✅
    - Name
    - URL
    - Description
    - Number of stars
    - Language
- Star one or more repositories ✅
  - Starred repositories are persisted locally ✅
- Fetch a list of starred repositories ✅

### Optional requirements

- Filter repositories by language ✅
- Filter starred repositories by starting date ✅
- Pagination
- Swagger documentation
- Unmark a starred repository ✅
- Filter starred repositories by language ✅

### Out of scope

UI implementation

### Addional information

#### Gihub search API

[https://api.github.com/search/repositories?q=created:>2017-01-10&sort=stars&order=desc](https://api.github.com/search/repositories?q=created:>2017-01-10&sort=stars&order=desc)

<https://docs.github.com/en/search-github/getting-started-with-searching-on-github/understanding-the-search-syntax>

<https://docs.github.com/en/rest/search/search?apiVersion=2022-11-28#search-repositories>

#### TypeORM

NestJS has TypeORM integration and it can be used to store starred repositories in sqlite database.
<https://docs.nestjs.com/techniques/database#typeorm-integration>

<https://typeorm.io/repository-api>

<https://docs.nestjs.com/recipes/sql-typeorm#sql-typeorm>

<https://typeorm.io/select-query-builder#how-to-create-and-use-a-querybuilder>

### Tech stack

- TypeScript
- NestJS
- TypeORM
- SQLite
- Jest

### Addional dependencies

- `@nestjs/typeorm`
- `typeorm`
- `sqlite3`

### Endpoints

- `GET /repositories` ✅
- `GET /repositories/?language=javascript` ✅
- `GET /repositories?startingDate=2017-01-10` ✅
- `GET /repositories?startingDate=2017-01-10&language=javascript` ✅
- `POST /repositories/star` ✅
- `GET  /repositories/starred` ✅
- `GET /repositories/starred?language=javascript` ✅
- `DELETE /repositories/starred/:id` ✅

### NestJs

#### Modules

- RepositoryModule

#### Controllers

- RepositoryController

#### Providers / Services

- RepositoryService

#### Entities

- RepositoryEntity ✅
  - id (primary key) - (Github repository id can be used)
  - name
  - url
  - description
  - stars
  - language

### Remaining tasks

- Data validation (DTOs)
- Error and Exception handling
- Tests (Unit and E2E)
- Refactoring and code cleanup
- Pagination
- Documentation
- Swagger

Nest README: [Nest.md](./Nest.md)
