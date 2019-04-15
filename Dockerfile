FROM gliderlabs/alpine:3.9

MAINTAINER Christian Sporer "https://github.com/IanStorm"

ENV NODE_ENV development

WORKDIR /opt/xelement/money-server
COPY / ./

#	↓	Install Node.js
RUN apk add jq=1.6-r0 && \
	XE_NODE_VERSION="$(cat ./package.json | jq -r '.engines.node')-r0" && \
	apk add nodejs=$XE_NODE_VERSION npm=$XE_NODE_VERSION

#	↓	Compile money-server
RUN npm install
RUN cd ./node_modules/.bin/ && \
	gulp build
