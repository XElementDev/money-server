FROM ubuntu:18.04

MAINTAINER Christian Sporer "https://github.com/IanStorm"

ENV NODE_ENV development

WORKDIR /opt/xelement/money-server
COPY / ./

#	↓	Install NVM
RUN NVM_VERSION=v0.34.0 \
	&& curl https://raw.githubusercontent.com/creationix/nvm/$NVM_VERSION/install.sh | bash
	&& nvm --version
#	↓	Install Node.js
RUN nvm install

RUN npm install
RUN gulp build
