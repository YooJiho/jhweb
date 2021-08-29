FROM node:12.16.2-slim

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#RUN apk update && apk upgrade && apk add git

ONBUILD COPY package*.json ./
ONBUILD COPY . ./
ONBUILD RUN npm install

ENV HOST 0.0.0.0
EXPOSE 8080

CMD [ "npm", "run", "dev" ]