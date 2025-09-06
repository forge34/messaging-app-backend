[![Run with Docker Compose](https://img.shields.io/badge/run%20with-docker%20compose-blue?logo=docker&style=flat-square)](https://docs.docker.com/compose/install/)
[![Node.js](https://img.shields.io/badge/node-%3E%3D22-green?logo=node.js&style=flat-square)](https://nodejs.org/)
[![Postgres](https://img.shields.io/badge/postgres-16-blue?logo=postgresql&style=flat-square)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/ORM-Prisma-2D3748?logo=prisma&style=flat-square)](https://www.prisma.io/)
[![License](https://img.shields.io/github/license/forge34/messaging-app-backend?style=flat-square)](./LICENSE)
[![Last Commit](https://img.shields.io/github/last-commit/forge34/messaging-app-backend?style=flat-square)](https://github.com/forge34/messaging-app-backend/commits/main)

# messaging-app-backend

the API server for the messaging app at [messaging-app-frontend](https://github.com/forge34/messaging-app-frontend)

## Prerequisites

- [Docker](https://www.docker.com/get-started) installed  
- [Docker Compose](https://docs.docker.com/compose/install/) installed  

Create a `.env` file in the project root with the following:

```env
POSTGRES_USER=your_db_user
POSTGRES_PASSWORD=your_db_password
POSTGRES_DB=your_db_name

PORT=4000
DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@db:5432/${POSTGRES_DB}
SECRET="JWTSECRET"
```

## Getting started

### Run the server

to setup and run the project in dev mode, run this command
```
docker compose up
```
Docker will pull the Postgres and Node.js images (if our machine does not have it before).

then check it's running by navigating to [http://localhost:3000](http://localhost:3000) , you should see the index page

### Stop the server
run this command
```
docker compose down
```

## TODO
- instructions to run test
- instructions for production deployment  
