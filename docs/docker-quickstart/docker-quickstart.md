---
id: camunda8-docker-quickstart
title: Camunda 8 Local Setup for Developers
sidebar_label: Camunda 8 Setup
---

# Run Camunda 8 locally

There are two ways to put a Camunda 8 cluster on your laptop. Both are for developers who want to model a process, deploy it, and see it run. Pick the one that better suits your needs or try both to get a more in-depth experience and make an educated decision on which one you like best.

:::note[Not a production setup]

Camunda 8 Run is for local prototyping. The Docker Compose files are for development and evaluation. Production belongs on Kubernetes with Helm. The Docker images can run in production; these Compose files should not.

:::

## Which one to use

**Camunda 8 Run** is the short path. One archive, one command, and you have an Orchestration Cluster, Connectors, and H2 as the default store. A Java runtime is already inside the archive.

**Docker Compose** is the same lightweight stack in containers, with a second file for when you also want Optimize, Camunda Hub, and Management Identity.

:::warning[These guys are greedy!]

Do not start both at once. They want the same ports, starting with `8080`.

:::

## Camunda 8 Run

Have [Desktop Modeler](https://docs.camunda.io/docs/components/modeler/desktop-modeler/install-the-modeler/) installed. If you're using Ubuntu, use 22.04 or newer.

Download the latest [Camunda 8 Run](https://downloads.camunda.cloud/release/camunda/c8run/8.10/) release for your system and open the `.tgz`. That creates a `c8run` directory. From there:

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs defaultValue="macos-linux" values={[
  {label: 'MacOS + Linux', value: 'macos-linux'},
  {label: 'Windows', value: 'windows'}
]}>
  <TabItem value="macos-linux">

If you're on CLI, use:

```bash
./c8run start
```

Or execute the helper script with:
```bash
./start.sh
```

  </TabItem>
  <TabItem value="windows">

On Windows, run:

```bash
.\c8run.exe start
```

  </TabItem>
</Tabs>

Operate should open in the browser. If it does not, use [http://localhost:8080/operate](http://localhost:8080/operate) and sign in with `demo` / `demo`. Tasklist is on the same host at `/tasklist`.

:::tip

A failed start is usually a leftover process or a busy port. Stop it, then start it again. The useful logs are `c8run/log/camunda.log` and `c8run/log/connectors.log`. The ports to watch are `8080` (core apps and APIs), `8086` (Connectors), and `26500` (gRPC).

:::

Shut it down from the same directory:

<Tabs defaultValue="macos-linux" values={[
  {label: 'MacOS + Linux', value: 'macos-linux'},
  {label: 'Windows', value: 'windows'}
]}>
  <TabItem value="macos-linux">


```bash
./shutdown.sh
```

  </TabItem>
  <TabItem value="windows">

On Windows, run:

```bash
.\c8run.exe stop
```

  </TabItem>
</Tabs>



## Docker Compose

You need Docker 20.10.16 or later and Compose 2.24.0 or later. Check with `docker compose version`, and use that command rather than `docker-compose`.

Download the Camunda 8 Docker Compose archive from the Camunda Distributions releases and extract the whole folder. Keep `.env`, `configuration/`, and the hidden config directories. A lone Compose file is not enough.

From the extracted directory:

```bash
docker compose up -d
```

The first boot can take a few minutes. `docker compose ps` shows whether the services are healthy. `docker compose logs -f orchestration connectors` follows the lightweight startup.

### Three Compose files

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

:::caution[The -v flag]

`-v` removes volumes: process data, users, and anything else the containers stored. Drop the flag if the next start should remember your work.

:::

For the full file or the Hub-only file, pass the same `-f` you used to start.

## Open the apps

Web UIs on these local setups sign in with `demo` / `demo`.

| App | Address |
| --- | --- |
| Operate | [http://localhost:8080/operate](http://localhost:8080/operate) |
| Tasklist | [http://localhost:8080/tasklist](http://localhost:8080/tasklist) |
| Admin | [http://localhost:8080/admin](http://localhost:8080/admin) |
| REST API | `http://localhost:8080/v2` |
| gRPC | `localhost:26500` |

The full Compose file adds Optimize at [http://localhost:8083](http://localhost:8083), Management Identity at [http://localhost:8084](http://localhost:8084), and Camunda Hub at [http://localhost:8070](http://localhost:8070). Keycloak on that setup uses `admin` / `admin`.

Model in Desktop Modeler and deploy to the local cluster. With the full Compose file, you can model in Camunda Hub instead.

## Source

Summarized from the developer quickstarts for [Camunda 8 Run](https://docs.camunda.io/docs/self-managed/quickstart/developer-quickstart/c8run/) and [Docker Compose](https://docs.camunda.io/docs/self-managed/quickstart/developer-quickstart/docker-compose/).
