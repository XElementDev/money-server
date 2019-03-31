FROM ubuntu:18.04

MAINTAINER Christian Sporer "https://github.com/IanStorm"

ENV NODE_ENV development

ENV CUSTOM_NVM_VERSION=v0.34.0

WORKDIR /opt/xelement/money-server
COPY / ./

#	↓	Install NVM
RUN apt-get update && apt-get install -y curl \
	&& curl https://raw.githubusercontent.com/creationix/nvm/$CUSTOM_NVM_VERSION/install.sh | bash \
	&& bash --login
#	↓	Install Node.js
RUN nvm install

RUN npm install
RUN gulp build
