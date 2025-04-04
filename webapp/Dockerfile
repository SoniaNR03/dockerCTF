FROM node:23-alpine AS build

WORKDIR /app
COPY package.json .
RUN npm install

COPY . .
RUN npm run build


FROM node:23-alpine

WORKDIR /app

COPY --from=build /app/dist ./public
COPY server.js package.json ./
COPY /icons ./public/icons

RUN npm install --omit=dev 

EXPOSE 80

CMD ["node", "server.js"]
