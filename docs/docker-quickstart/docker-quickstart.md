---
id: camunda8-docker-quickstart
title: Camunda 8 Docker Compose Quickstart Guide
sidebar_label: Camunda 8 Setup
---

# Developer Quickstart Guide: Running Camunda 8 Locally with Docker Compose

This guide provides a concise, step-by-step process to deploy a lightweight Camunda 8 cluster locally using Docker Compose, based on official Camunda recommendations. Follow these instructions to get started quickly, verify service health, and cleanly shut down your environment.


:::warning[Production Deployment Disclaimer]

The Docker Compose configurations detailed below are strictly intended for local development, testing, and evaluation purposes. For resilient, production-grade topologies, Camunda recommends deploying via Kubernetes utilizing the official Helm charts.

:::




---

## 1. Download the Official Docker Compose File

Obtain the latest `docker-compose.yml` tailored for a lightweight Camunda 8 setup.

```bash
curl -O https://download.camunda.com/platform/8.10/docker-compose.yaml
```

---

## 2. Start the Camunda 8 Cluster (Lightweight Mode)

Launch all Camunda 8 core components in detached mode:

```bash
docker compose -f docker-compose.yaml up -d
```

*Note: This starts process automation, web apps, and dependencies using minimal resources, suitable for local development.*

---

## 3. Verify Camunda Endpoints

Once the containers are running, confirm that services are healthy and endpoints are reachable.

- **Camunda Web Modeler:** [http://localhost:8080](http://localhost:8080)
- **Operate:** [http://localhost:8081](http://localhost:8081)
- **Tasklist:** [http://localhost:8082](http://localhost:8082)
- **Zeebe Gateway (gRPC):** `localhost:26500`

Check container status:

```bash
docker compose -f docker-compose.yaml ps
```

:::note[Startup Latency]

Initial image downloads and cluster synchronization may take several minutes depending on network bandwidth.

:::

---

## 4. Cleanly Shut Down the Cluster

Stop all Camunda 8 containers and remove resources associated with the stack:

```bash
docker compose -f docker-compose.yaml down
```

This command ensures that all volumes and network artifacts are appropriately cleaned up.

---

**Reference:** [Official Camunda 8 Documentation](https://docs.camunda.io/docs/self-managed/platform-deployment/docker/#quick-start)