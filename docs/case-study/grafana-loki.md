---
title: Loki Flow Architecture
sidebar_label: Loki Flow Architecture
---

# Loki Flow Architecture

This setup is a local log pipeline. Promtail tails host logs under `/var/log` and container logs from the Docker socket, attaches labels such as `job`, `container`, and `stream`, and pushes batches to Loki. Loki indexes those labels and keeps the log lines compressed. Grafana queries the streams with LogQL.

Promtail is end of life. Grafana Labs ended commercial support on 2 March 2026 and moved new work to Grafana Alloy. Keep this topology for a local evaluation. Do not copy it into a new production environment.

The Compose stack binds three services on the workstation:

- Loki on `127.0.0.1:3101`, which is container port `3100`
- Promtail, with no published port, pushing to `http://loki:3100/loki/api/v1/push`
- Grafana on `127.0.0.1:3200`, so it does not take port `3000` from this documentation site

Inside the Compose network, Grafana must use `http://loki:3100` as the data source. `localhost` inside the Grafana container is Grafana itself, not the host.

A first query against the host logs is `{job="varlogs"}`. Container logs discovered from the engine socket use `{job="containers", container="log-demo"}`.

The install files and the LogQL filters are in the [Grafana Loki quickstart](../grafana-loki-quickstart/grafana-loki-quickstart.md). That guide also includes a responsive flow diagram that shows how the pipeline works: host and container logs enter Promtail, Promtail pushes labeled batches into Loki, and Grafana reads them back with LogQL. On a desktop the diagram runs left to right. On a phone it stacks from top to bottom.
