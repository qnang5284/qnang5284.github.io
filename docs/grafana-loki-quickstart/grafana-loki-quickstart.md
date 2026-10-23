---
id: grafana-loki-quickstart
title: Centralizing Logs with Grafana Loki & Promtail
sidebar_label: Grafana Loki
---

This quickstart runs Loki, Promtail, and Grafana in Docker Compose, then queries the logs Promtail ships from the local machine.

## 1. Core Concepts

Loki is a log aggregation engine. It indexes labels, such as `job` or `container`, and stores the log line compressed beside that index. Elasticsearch indexes the words inside every line. That inverted index is what makes an Elasticsearch logging stack heavier in memory and disk. Loki spends those resources on labels, then scans the matching streams at query time.

Promtail is the shipping agent. It tails files, reads container logs from the Docker engine, attaches labels, and pushes batches to Loki. Grafana does not collect logs. It only queries what Promtail has already sent.

## 2. Docker Compose Infrastructure

Create a working directory and add the two files below. The Loki image already contains a single-process config. Promtail needs its own file, because the config shipped in the Promtail image only reads `/var/log` and does not discover containers.

```bash
mkdir loki-quickstart
cd loki-quickstart
```

`docker-compose.yaml`:

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
      - "127.0.0.1:3100:3000"
    volumes:
      - grafana-data:/var/lib/grafana
    depends_on:
      - loki

volumes:
  loki-data:
  promtail-positions:
  grafana-data:
```

`promtail-config.yaml`:

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

:::info[Beware the Port Collisions]

The Docusaurus development server and Grafana both bind to port 3000 by default. Run them together and the second process fails to listen. Map Grafana to host port 3100 in the Compose file, then open it at [http://localhost:3100](http://localhost:3100). Leave this docs site on port 3000.

:::

Loki still listens on port 3100 inside its container. That host port is Grafana in this file, so the Compose file publishes Loki on host port 3101. Promtail and Grafana stay on the Compose network and push or query `http://loki:3100`. From your machine, Loki is [http://localhost:3101](http://localhost:3101). Both published ports are bound to `127.0.0.1`. This local config does not authenticate clients, and the Docker socket mount lets Promtail read every container on the host. Keep the stack on a machine you control.

Start it from the directory that holds both files:

```bash
docker compose up -d
docker compose ps
curl -sS http://localhost:3101/ready
```

`ready` means Loki is accepting writes. The first start downloads the three images.

Stop the stack and keep the stored logs and the Grafana database:

```bash
docker compose down
```

Add `-v` only when you intend to delete those volumes.

## 3. Registering the Loki Data Source

1. Open [http://localhost:3100](http://localhost:3100).
2. Sign in with `admin` / `admin`. On the first login, Grafana asks you to replace that password. Set one.
3. In the left menu, open **Connections**, then **Data sources**.
4. Select **Add new data source**, then **Loki**.
5. Set **URL** to `http://loki:3100`.
6. Select **Save & test**.

Use the Compose service name and Loki's container port. `http://localhost:3101` fails from this screen: inside the Grafana container, `localhost` is Grafana, not your host. A successful test reports that Grafana connected to Loki. If Promtail has not pushed a stream yet, Grafana can connect and still report that it found no labels. Wait a few seconds and run the test again.

## 4. Querying Logs via LogQL

Host files under `/var/log` whose names end in `log` arrive labeled `job="varlogs"`. Write a line so the first query has a match:

```bash
echo "error: loki quickstart sample" | sudo tee -a /var/log/syslog
```

If this host records system logs in `/var/log/messages` rather than `syslog`, the glob `/var/log/*log` will not read that file. Write the sample to a path that ends in `log`, such as `/var/log/syslog`.

1. In the left menu, select **Explore**.
2. Choose the **Loki** data source.
3. Select **Code** in the query editor.
4. Run:

```logql
{job="varlogs"}
```

5. Set the time range to the last 15 minutes. The sample line shows up after Promtail's next batch, usually within a few seconds. Select **Run query** again if the stream is still empty.

:::tip[Pro-Tip: Basic LogQL Filter]

Keep the label selector and drop every line that does not contain the substring. This returns only the error lines from that stream:

```logql
{job="varlogs"} |= "error"
```

`|=` is a case-sensitive filter. Loki does not index the word `error`. It selects the `varlogs` streams, then scans them.

:::

Container logs use the `containers` job. The `container` label is the container name, without the leading slash:

```bash
docker run --name log-demo alpine echo "error: sample application failure"
```

```logql
{job="containers", container="log-demo"} |= "error"
```

Remove the sample container when you are finished with it:

```bash
docker rm log-demo
```
