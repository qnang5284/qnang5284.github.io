---
id: docker-quickstart
title: Docker Quickstart Guide
sidebar_label: Docker Setup
---

# Docker Quickstart for Developers

This guide provides a frictionless reference for spinning up local development environments using Docker containers.

## 1. Core Core Commands

To pull an image and run a container in detached mode (background):

```bash
docker run -d -p 8080:80 --name local-env nginx
```

## 2. Basic Troubleshooting

If the container fails to start due to a port clash, verify your local ports:

```bash
# Check active ports on Linux
netstat -tuln
```
