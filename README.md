# News Aggregator Frontend
Front-end code repository [here](https://github.com/0tuedon/news-aggregator-task).

## Local development setup

This guide will help you set up this project for local development.

## Prerequisites

Ensure you have the following installed on your machine:

- [Docker](https://docs.docker.com/engine/install/)
- Make sure PORT 3000 is free

## Initial setup

1. Clone the code from this repository.
2. Move into the directory or run the following command.
```bash
 cd news-aggregator-task 
 ```
3. Copy the `.env.example` file to `.env`.

## Docker Container Setup

> to build the docker image and run this project for the first time

```bash
docker compose up --build
```

> if you had ran the above command before then

```bash
docker compose up -d # -d to run it in detach mode(which means it won't show those logs)
```

You can now access the project at `http://localhost:3000`.

> Run the following command to stop the container

```bash
docker compose down
```