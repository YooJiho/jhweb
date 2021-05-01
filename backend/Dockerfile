FROM node:12.16.2-slim

WORKDIR /usr/src/app

ONBUILD COPY package*.json ./
ONBUILD COPY . ./
ONBUILD RUN npm install

EXPOSE 8081

CMD [ "npm", "run", "dev" ]