---
title: Camunda 8 Onboarding
sidebar_label: Camunda 8 Onboarding
---

# Camunda 8 Onboarding

Camunda 8 Run is the local path that does not use Docker. One archive gives you the Orchestration Cluster, Connectors, Operate, and Tasklist, started and stopped with scripts in the extracted folder.

Have [Desktop Modeler](https://docs.camunda.io/docs/components/modeler/desktop-modeler/install-the-modeler/) installed. On Ubuntu, use 22.04 or newer. Download the [Camunda 8 Run 8.10](https://downloads.camunda.cloud/release/camunda/c8run/8.10/) archive for your system and extract it. That creates a `c8run` directory.

From `c8run` on macOS or Linux:

```bash
./c8run start
```

`./start.sh` does the same job. On Windows, run `.\c8run.exe start`.

Operate should open in the browser. If it does not, use [http://localhost:8080/operate](http://localhost:8080/operate) and sign in with `demo` / `demo`. Tasklist is on the same host at `/tasklist`.

A failed start is usually a leftover process or a busy port. Stop the stack, then start it again. The useful logs are `c8run/log/camunda.log` and `c8run/log/connectors.log`. The ports to watch are `8080` (core apps and APIs), `8086` (Connectors), and `26500` (gRPC).

Shut it down from the same directory with `./shutdown.sh`, or `.\c8run.exe stop` on Windows.

The step-by-step with separate macOS, Linux, and Windows tabs is the [Camunda 8 Run quickstart](../docker-quickstart/camunda-8-run-quickstart.md). Do not run this next to the Docker Compose distribution: both listen on `8080`.
