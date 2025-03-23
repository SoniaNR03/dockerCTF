FROM node:23-alpine

# Stablish the working directory
WORKDIR /app

COPY package.json package.json
COPY server.js server.js
COPY views views

RUN npm install

# TODO: send the port as an argument

CMD ["node", "server.js"]
