[![Run with Docker Compose](https://img.shields.io/badge/run%20with-docker%20compose-blue?logo=docker&style=flat-square)](https://docs.docker.com/compose/install/)

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
