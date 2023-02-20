# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/dab10/nodejs2022Q4-service.git
```

## Install modules

```
npm i
```

## Change branch

```
git checkout database_and_ORM
```

## Using .env

Rename file `.env.example` to `.env`.

## Running application

```
npm run docker
```

## Running vulnerabilities scanning

```
npm run scan:node
npm run scan:db
```

## Testing

```
npm run docker
```

then in new terminal window run command

```
npm run test
```
