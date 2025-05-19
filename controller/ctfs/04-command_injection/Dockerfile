FROM node:23-alpine


WORKDIR /app
COPY package.json package.json
COPY /views ./views
COPY /data ./data

RUN npm install

EXPOSE 8080


CMD ["sh", "-c", "echo \"FLAG='${FLAG}'\" > /flag && node views/app.js"]

