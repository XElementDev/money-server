FROM alpine:3.13

LABEL maintainer="https://github.com/IanStorm"

ENV NODE_ENV development

WORKDIR /opt/xelement/money-server
COPY / ./

#	↓	Install Node.js
RUN apk add jq=~1.6 && \
	XE_NODE_VERSION="$(cat ./package.json | jq -r '.engines.node')" && \
	apk add nodejs=~$XE_NODE_VERSION npm=~$XE_NODE_VERSION

#	↓	Compile money-server
RUN npm install --unsafe-perm
RUN npm run build
