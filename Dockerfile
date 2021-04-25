FROM node:12.16.2-slim

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
# RcUN apk update && apk upgrade && apk add git

ONBUILD COPY package*.json ./
ONBUILD COPY . ./
ONBUILD RUN npm install

# Build app
# ONBUILD RUN npm run build
# RUN npm ci --only=production --slient
# ENV HOST 0.0.0.0
EXPOSE 8080

# start command
CMD [ "npm", "run", "dev" ]
