# Average API

A simple REST API built with Node.js and Express that accepts numbers through a `POST /average` endpoint and returns the running average of all valid numbers received by the server since it started.

## Assignment Requirements Covered

- REST API with a single application endpoint: `POST /average`
- Accepts a number in a JSON request body
- Calculates the average of all valid numbers received so far
- Provides a client example for sending requests
- Includes automated test cases
- Documents the code using JSDoc comments
- Uses Husky to enable Git hooks
- Enforces Conventional Commit messages using Commitlint
- Specifies dependencies and scripts in `package.json`

## Prerequisites

Install the following software:

- [Node.js](https://nodejs.org/)
- npm, which is included with Node.js
- [Git](https://git-scm.com/)

## Installation

Clone the public repository and install the dependencies:

```bash
git clone https://github.com/04dhanushn/average-api.git
cd average-api
npm install
```

The dependencies and available commands are defined in `package.json`. The lockfile records the resolved dependency versions.

## Start the Server

Run:

```bash
npm start
```

By default, the server starts at:

`http://localhost:3000`

Keep the server running while sending requests from another terminal or API client.

## API Documentation

### `POST /average`

**Endpoint URL:** `http://localhost:3000/average`

**Content-Type:** `application/json`

**Request body:**

```json
{
  "number": 10
}
```

The `number` property must be a finite JSON number.

**Example response:**

```json
{
  "average": 10,
  "count": 1
}
```

The `average` field contains the arithmetic mean of all valid numbers accepted by the current server instance. The `count` field indicates how many valid numbers have been accepted.

### Example: Multiple Requests

Send the following numbers in three separate requests to the same running server:

| Request | Input | Expected average | Count |
|---|---:|---:|---:|
| 1 | 10 | 10 | 1 |
| 2 | 20 | 15 | 2 |
| 3 | 30 | 20 | 3 |

After the third request, the response is:

```json
{
  "average": 20,
  "count": 3
}
```

The API maintains the history in memory. It does not require the client to send the previous numbers again.

## Calling the API from PowerShell

With the server running, open a second PowerShell terminal and execute:

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/average" -Method Post -ContentType "application/json" -Body '{"number":10}'
```

To submit another number, change the request body. For example:

```powershell
Invoke-RestMethod -Uri "http://localhost:3000/average" -Method Post -ContentType "application/json" -Body '{"number":20}'
```

You can also use Postman or another HTTP client to send a POST request with a JSON body.

## Input Validation

The API rejects missing, non-numeric, and non-finite number values with HTTP `400 Bad Request`.

Invalid requests are not added to the running history and therefore do not affect the average.

## Running Automated Tests

The project uses Jest and Supertest to test the API.

Run:

```bash
npm test
```

The test suite covers:

- The first submitted number
- Running average calculation across multiple requests
- Negative numbers and zero
- Missing input
- String input
- Ensuring invalid input does not affect the average

## Running Lint Checks

ESLint is configured to check the application and test code.

Run:

```bash
npm run lint
```

## Git Hooks and Conventional Commits

Husky enables Git hooks for this repository.

- **Pre-commit hook:** runs the automated tests and ESLint checks.
- **Commit-message hook:** uses Commitlint to enforce the Conventional Commits format.

Examples of valid commit messages:

```text
feat: implement average endpoint
test: add API tests
docs: improve README instructions
```

Commits that do not follow the configured format are rejected by Commitlint.

## Project Structure

```text
average-api/
├── src/
│   ├── app.js
│   └── server.js
├── tests/
│   └── average.test.js
├── .husky/
│   ├── pre-commit
│   └── commit-msg
├── .gitignore
├── commitlint.config.js
├── eslint.config.js
├── package.json
├── package-lock.json
└── README.md
```

## Limitations

The running history is stored in memory. Restarting the server resets the history, and separate server instances maintain separate averages.

## Repository

Public GitHub repository: https://github.com/04dhanushn/average-api