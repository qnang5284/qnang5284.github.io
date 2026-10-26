---
title: Camunda 8 Run Quickstart
sidebar_label: Camunda 8 Run
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Camunda 8 Run

Have [Desktop Modeler](https://docs.camunda.io/docs/components/modeler/desktop-modeler/install-the-modeler/) installed. If you're using Ubuntu, use 22.04 or newer.

Download the latest [Camunda 8 Run](https://downloads.camunda.cloud/release/camunda/c8run/8.10/) release for your system and open the `.tgz`. That creates a `c8run` directory. From there:

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
