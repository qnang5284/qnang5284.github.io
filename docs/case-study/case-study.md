---
title: Local Ops Case Study
sidebar_label: Case Study
slug: /case-study
---

# Local Ops Case Study

This case study follows two local setups written up for evaluation, not for a production cluster. One stands up Camunda 8 without containers. The other ships workstation logs into Grafana Loki and reads them in Grafana.

Each child page is the short path for that setup. The longer quickstarts stay available when you need every flag, port, and query.

- [Camunda 8 Onboarding](./camunda-8-run-setup.md) is the archive-and-script path: Orchestration Cluster and Connectors on the host, with Operate and Tasklist on port `8080`.
- [Loki Flow Architecture](./grafana-loki.md) is the log path: Promtail labels host and container logs, Loki stores them, and Grafana queries the streams with LogQL.

Use one setup at a time. Camunda 8 Run and a Compose stack both bind `8080`, and the Loki quickstart moves Grafana off `3000` so it does not collide with this documentation site.
