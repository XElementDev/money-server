FROM gliderlabs/alpine:3.9

MAINTAINER Christian Sporer "https://github.com/IanStorm"

ENV NODE_ENV development

RUN NODE_VERSION=`cat ../../.nvmrc` \
	&& apk add nodejs=$NODE_VERSION
RUN npm install
RUN gulp build
