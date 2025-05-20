FROM php:8.4-alpine

WORKDIR /app

COPY website ./website


CMD ["sh", "-c", "echo \"FLAG='${FLAG}'\" > /flag && php -S 0.0.0.0:8080 -t ./website"]
EXPOSE 8080 