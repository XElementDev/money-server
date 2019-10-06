# ↓ Time zone stage
FROM alpine:3.10 as timezone-stage

RUN apk add tzdata
RUN cp /usr/share/zoneinfo/Europe/Berlin /etc/localtime
RUN echo "Europe/Berlin" > /etc/timezone
RUN apk del tzdata


# ↓ Main stage
FROM alpine:3.10

LABEL maintainer="https://github.com/IanStorm"

ENV NODE_ENV development
#	↓	Set time zone
COPY --from=timezone-stage /etc/localtime /etc/localtime
COPY --from=timezone-stage /etc/timezone /etc/timezone

WORKDIR /opt/xelement/money-server
COPY / ./

#	↓	Install Node.js
RUN apk add jq=1.6-r0 && \
	XE_NODE_VERSION="$(cat ./package.json | jq -r '.engines.node')-r0" && \
	apk add nodejs=$XE_NODE_VERSION npm=$XE_NODE_VERSION

#	↓	Compile money-server
RUN npm install --unsafe-perm
RUN npm run build
