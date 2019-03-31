FROM ubuntu:18.04

MAINTAINER Christian Sporer "https://github.com/IanStorm"

ENV NODE_ENV development

ENV CUSTOM_NVM_VERSION=v0.34.0

WORKDIR /opt/xelement/money-server
COPY / ./

#	↓	Install NVM
RUN apt-get update && apt-get install -y curl \
	&& curl https://raw.githubusercontent.com/creationix/nvm/$CUSTOM_NVM_VERSION/install.sh | bash \
#	↓	Install Node.js
RUN export NVM_DIR="$HOME/.nvm" \
	&& [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" \
	&& nvm install

RUN npm install
RUN gulp build
