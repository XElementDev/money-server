#!/bin/sh
docker tag money-server xelement/money-server
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker push xelement/money-server
