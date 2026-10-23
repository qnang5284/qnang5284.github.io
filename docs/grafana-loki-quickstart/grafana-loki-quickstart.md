---
id: grafana-loki-quickstart
title: Centralizing Logs with Grafana Loki & Promtail
sidebar_label: Grafana Loki
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This quickstart guides you through deploying Grafana Loki, Promtail, and Grafana utilizing Docker Compose, establishing an automated pipeline to ship and query localized infrastructure logs.

:::danger[CRITICAL PRODUCT DEPRECATION NOTICE]

As of March 2, 2026, Grafana Labs has officially designated the Promtail agent as End of Life (EOL). Commercial support has fully terminated, and no future maintenance updates will be provided. All active feature development has transitioned entirely to **Grafana Alloy**. 

If you are maintaining production instances or spinning up new environments, Grafana strongly recommends migrating from Promtail to Alloy. This quickstart retains Promtail purely for legacy local evaluation workflows; do not mirror this topology in modern infrastructures.

:::


---

## 1. Core Concepts

* **Grafana Loki:** A horizontally scalable, highly available, tenant-aware log aggregation engine. Unlike Elasticsearch, Loki only indexes metadata labels (such as `job` or `container`) and leaves the raw log lines compressed, drastically minimizing memory footprint and operational overhead.
* **Promtail:** The native shipping agent. It discovers log targets, attaches matching metadata labels, and pushes micro-batches directly to the Loki cluster.
* **Grafana:** The unified visualization layer. It executes LogQL queries against Loki data streams to build real-time analytical dashboards.

:::info[Check your OS]

This guide assumes you are using Linux.

:::

---

## 2. Orchestration Infrastructure Setup

Create an isolated working directory on your workstation to house the infrastructure manifests:

```bash
mkdir loki-quickstart && cd loki-quickstart
```

Deploying this stack requires two companion configurations. Use the interactive tabs below to examine and provision the ecosystem files in your workspace directory:

<Tabs>
<TabItem value="compose" label="docker-compose.yaml">

```yaml
services:
  loki:
    image: grafana/loki:3.6.11
    command: -config.file=/etc/loki/local-config.yaml
    ports:
      - "127.0.0.1:3101:3100"
    volumes:
      - loki-data:/tmp/loki

  promtail:
    image: grafana/promtail:3.6.11
    command: -config.file=/etc/promtail/config.yml
    volumes:
      - ./promtail-config.yaml:/etc/promtail/config.yml:ro
      - /var/log:/var/log:ro
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - promtail-positions:/tmp
    depends_on:
      - loki

  grafana:
    image: grafana/grafana:12.4.13
    ports:
      - "127.0.0.1:3200:3000"
    volumes:
      - grafana-data:/var/lib/grafana
    depends_on:
      - loki

volumes:
  loki-data:
  promtail-positions:
  grafana-data:
```

</TabItem>
<TabItem value="promtail" label="promtail-config.yaml">

```yaml
server:
  http_listen_port: 9080
  grpc_listen_port: 0

positions:
  filename: /tmp/positions.yaml

clients:
  - url: http://loki:3100/loki/api/v1/push

scrape_configs:
  - job_name: system
    static_configs:
      - targets:
          - localhost
        labels:
          job: varlogs
          __path__: /var/log/*log

  - job_name: containers
    docker_sd_configs:
      - host: unix:///var/run/docker.sock
        refresh_interval: 5s
    relabel_configs:
      - source_labels: ["__meta_docker_container_name"]
        regex: "/(.*)"
        target_label: container
      - source_labels: ["__meta_docker_container_log_stream"]
        target_label: stream
```

</TabItem>
</Tabs>

:::tip[Beware the Port Collisions]

The Docusaurus local development server and the default Grafana core instance both bind to ingress port `3000` by default. Running them concurrently will cause a network socket allocation failure. To resolve this, this topology maps Grafana's external port to host port `3200`. Access the visualization dashboard interface at [http://localhost:3200](http://localhost:3200) while keeping your local documentation workspace cleanly isolated on port `3000`.

:::

:::warning[Inbound Network Security]
Loki publishes on host port `3101` (`http://localhost:3101`). Both ingress interfaces are bounded to loopback `127.0.0.1`. Promtail mounts the host's Docker socket read-only to monitor engine events. Ensure this stack runs strictly within controlled local dev zones.
:::

Execute the initialization sequence to spin up the container network in detached mode:

```bash
docker compose up -d
```

Verify that the log aggregation engine has stabilized and is actively accepting write streams:

```bash
curl -sS http://localhost:3101/ready
```

---

## 3. Registering the Loki Data Source

1. Navigate to the Grafana control panel at [http://localhost:3200](http://localhost:3200).
2. Authenticate using the default credentials: `admin` / `admin`. Update the primary credentials when prompted.
3. In the left-hand navigation sidebar, click **Connections**, then select **Data sources**.
4. Click **Add new data source**, and select **Loki** from the analytics catalog.
5. Configure the HTTP Connection URL parameter exactly to: `http://loki:3100`.
6. Click **Save & test** to validate the connection lifecycle.

:::caution[DNS Ingress Context]

Do not utilize `http://localhost:3101` from the Grafana settings interface. Inside the isolated container space, `localhost` resolves internally to Grafana itself, rather than the host machine. Setting it to the service alias `http://loki:3100` utilizes Docker's internal DNS routing seamlessly.

:::

---

## 4. Querying Logs via LogQL

To execute an initial validation smoke test against host system logs, manually inject a sample error entry into your local log architecture:

```bash
echo "error: loki quickstart sample" | sudo tee -a /var/log/syslog
```

1. In the primary navigation pane, select **Explore**.
2. Select the newly provisioned **Loki** data source from the dropdown selector.
3. Toggle the query input component to **Code** mode.
4. Execute the following baseline metadata label search:

```logql
{job="varlogs"}
```

5. Adjust the target time window parameter to **Last 15 minutes** and click **Run query**.

:::tip[Pro-Tip: Basic LogQL Filter]

To filter out noise from heavy log streams without indexing raw text contents, append a case-sensitive substring filter expression utilizing the `|=` operator:

```logql
{job="varlogs"} |= "error"
```

Loki streams the initial chunk filtered by the `varlogs` index label, then executes high-velocity text scanning over the matching results in real time.
:::

To audit container-specific logs discovered via Promtail's engine socket wrapper, spin up a test container and run a LogQL streams query targeting the container metadata label:

```bash
docker run --name log-demo alpine echo "error: sample application failure"
```

```logql
{job="containers", container="log-demo"} |= "error"
```

Clean up the transient evaluation footprint when finalized:

```bash
docker rm log-demo
```

---

**Official References & Documentation Standards:**
* [Install Loki](https://grafana.com/docs/loki/latest/setup/install/)
* [Promtail Agent](https://grafana.com/docs/loki/latest/send-data/promtail/)
