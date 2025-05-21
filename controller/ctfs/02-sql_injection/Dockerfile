FROM node:23-alpine

WORKDIR /app

COPY package.json package.json
COPY server.js server.js
COPY views views

RUN npm install

CMD ["node", "server.js"]
