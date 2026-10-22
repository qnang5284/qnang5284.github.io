---
title: Docker Compose Quickstart
sidebar_label: Docker Compose
---

# Docker Compose

You need Docker 20.10.16 or later and Compose 2.24.0 or later. Check with
```bash
docker compose version
```
:::info[Beware the missing dashes]

and use that command rather than `docker-compose`. You might need to upgrade Docker Desktop or the Docker Engine Compose plugin. 

:::

Download the Camunda 8 [Docker Compose](https://github.com/camunda/camunda-distributions/releases/download/docker-compose-8.10/docker-compose-8.10.zip) archive from the [Camunda Distributions releases](https://github.com/camunda/camunda-distributions/releases) and extract the whole folder. Keep `.env`, `configuration/`, and the hidden config directories. A lone Compose file is not enough.

From the extracted directory run:

```bash
docker compose up -d
```

The first boot can take a few minutes. `docker compose ps` shows whether the services are healthy. `docker compose logs -f orchestration connectors` follows the lightweight startup.

## Three Compose files

| File | Use it when |
| --- | --- |
| `docker-compose.yaml` | You want the default: Orchestration Cluster, Connectors, and file-based H2. |
| `docker-compose-full.yaml` | You also want Optimize, Camunda Hub, Management Identity, Keycloak, PostgreSQL, and Elasticsearch. |
| `docker-compose-hub.yaml` | You only want Camunda Hub, with no Orchestration Cluster. |

The full stack starts with:

```bash
docker compose -f docker-compose-full.yaml up -d
```

PostgreSQL in that file holds Hub and Identity data, not the Orchestration Cluster. Elasticsearch is there for Optimize.

To stop the stack and delete its data:

```bash
docker compose down -v
```

:::caution[One does not simply use the -v flag]

`-v` removes volumes, process data, users, and anything else the containers stored. Don't use it if you plan to keep your work!

:::

For the full file or the Hub-only file, pass the same `-f` you used to start.

## Open the apps

Web UIs on these local setups sign in with `demo` / `demo`.

| App | Address | Description |
| --- | --- | --- |
| Operate | [http://localhost:8080/operate](http://localhost:8080/operate) | Monitor and troubleshoot process instances. |
| Tasklist | [http://localhost:8080/tasklist](http://localhost:8080/tasklist) | Complete user tasks in running process instances. |
| Admin | [http://localhost:8080/admin](http://localhost:8080/admin) | Manage users and permissions in the lightweight configuration. |
| REST API | `http://localhost:8080/v2` | REST API for process automation. |
| gRPC | `localhost:26500` | gRPC API for high-performance process automation. |

The full Compose file adds Optimize at [http://localhost:8083](http://localhost:8083), Management Identity at [http://localhost:8084](http://localhost:8084), and Camunda Hub at [http://localhost:8070](http://localhost:8070). Keycloak on that setup uses `admin` / `admin`.

Model in Desktop Modeler and deploy to the local cluster. With the full Compose file, you can model in Camunda Hub instead.

## Source

Summarized from the developer quickstarts for [Camunda 8 Run](https://docs.camunda.io/docs/self-managed/quickstart/developer-quickstart/c8run/) and [Docker Compose](https://docs.camunda.io/docs/self-managed/quickstart/developer-quickstart/docker-compose/).
