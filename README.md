# Average API

A REST API built with Node.js and Express that calculates the running average of submitted numbers.

## Features

- POST `/average` endpoint
- Running average calculation
- Input validation
- Automated tests using Jest and Supertest
- ESLint code checks
- Husky Git hooks
- Conventional Commit enforcement with Commitlint

## Requirements

- Node.js
- npm
- Git

## Installation

```bash
git clone <YOUR_PUBLIC_GITHUB_REPOSITORY_URL>
cd average-api
npm install
```

Replace the placeholder URL with your public GitHub repository URL after creating the repository.

## Start the Server

```bash
npm start
```

The API runs at `http://localhost:3000` by default.

## API Usage

### POST `/average`

Request body:

```json
{
  "number": 10
}
```

Example response:

```json
{
  "average": 10,
  "count": 1
}
```

The average includes all valid numbers received since the current server process started.

### PowerShell Example

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/average" -Method Post -ContentType "application/json" -Body '{"number":10}'
```

Invalid request bodies return HTTP 400.

## Run Tests

```bash
npm test
```

## Run Lint Checks

```bash
npm run lint
```

## Git Hooks

Husky runs tests and lint checks before commits. Commitlint enforces Conventional Commit messages.

Examples:

- `feat: implement average endpoint`
- `test: add API tests`
- `docs: update README`

## Limitations

Numbers are stored in memory and are not saved after a server restart. Separate server instances maintain separate histories.