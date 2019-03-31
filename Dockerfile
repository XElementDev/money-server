FROM gliderlabs/alpine:3.9

MAINTAINER Christian Sporer "https://github.com/IanStorm"

ENV NODE_ENV development

WORKDIR /opt/xelement/money-server
COPY / ./

# FIXME: Remove the following line once "debugging" is done
RUN ls -a

RUN NODE_VERSION=`cat ./.nvmrc` \
	&& apk add nodejs-dev=$NODE_VERSION-r0
RUN npm install
RUN gulp build
