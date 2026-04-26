#!/bin/sh
docker buildx build \
  --platform linux/amd64 \
  -f inf/build.Dockerfile \
  -t registry.k8s.home.lehadnk.com/dm:latest \
  --push ..