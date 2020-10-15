FROM node:12.15.0-alpine

ENV HOME=/home/testo
ENV NODE_ENV=development

RUN addgroup -S testo && adduser -S testo appuser -G testo
USER $APP_USER
WORKDIR $HOME

RUN apk update && apk add git

COPY docker docker
COPY public public
COPY package.json /tmp/package.json
COPY package-lock.json /tmp/package-lock.json
COPY package.json package.json
COPY .eslintrc .eslintrc
COPY .eslintignore .eslintignore
COPY .prettierrc .pretierrc
COPY .prettierignore .prettierignore
COPY babel.config.json babel.config.json
COPY test test
COPY volumes volumes
COPY /volumes/certs/jeffersonedu.key /opt/testo/certs/jeffersonedu.key
COPY /volumes/certs/jeffersonedu.crt /opt/testo/certs/jeffersonedu.crt
COPY knexfile.js knexfile.js
COPY knex knex

RUN cd /tmp && npm install \
  && npm install -global nodemon \
  && mkdir -p $HOME \
  && cd $HOME \
  && ln -s /tmp/node_modules

COPY config config

COPY src src

RUN chown -R testo:testo $HOME/*

