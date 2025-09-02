# Versenyauto
## Requirement
- [Docker](https://docs.docker.com/get-docker/) (20.10+ ajánlott)
- [Docker Compose](https://docs.docker.com/compose/) (1.29+ ajánlott)
## Docker Environment variables
# app
- `CONTAINER_NAME`:fastify-app
- `APP_PORT`:3000:3000
- `APP_HOST`:0.0.0.0
# db
- `CONTAINER_NAME`:postgres-db
- `DB_USER`: postgres
- `DB_PASS`: mlinarics
- `DB_NAME`: ddlfeladat
- `DB_Port`: 5432:5432
- `DB_HOST`: db
## RUN:
    -docker-compose build
    -docker-compose up
## Projekt structure:
-src:forrás kód
    -db: database settings, migrations
    -helper: password hash
    -module: api, data access layer,business logic layer ,shema,routos
    -error: global error handler
