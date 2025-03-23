FROM node:23-alpine AS build

WORKDIR /app
COPY package.json .
RUN npm install

COPY . .
RUN npm run build

# FROM nginx:alpine
# COPY --from=build /app/dist /usr/share/nginx/html
# COPY nginx/default.conf /etc/nginx/conf.d/default.conf
# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]


# Etapa de producción
FROM node:23-alpine

WORKDIR /app

COPY --from=build /app/dist ./public
COPY server.js package.json ./

RUN npm install --omit=dev  # Solo dependencias de producción

EXPOSE 80

CMD ["node", "server.js"]
