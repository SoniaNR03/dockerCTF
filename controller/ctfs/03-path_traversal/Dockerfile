FROM node:23-alpine


WORKDIR /app


COPY package.json package.json
COPY server.js server.js
COPY views/ views/

RUN npm install

RUN echo "admin:x:1001:1001:admin:/home/admin:/bin/bash" >> /etc/passwd

CMD echo "admin:FLAG='${FLAG}':20188:0:99999:7:::" >> /etc/shadow && node server.js
