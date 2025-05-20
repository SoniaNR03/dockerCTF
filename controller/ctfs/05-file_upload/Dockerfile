FROM php:8.2-alpine

WORKDIR /app

COPY website ./website


CMD ["sh", "-c", "echo \"FLAG='${FLAG}'\" > /flag && php -S 0.0.0.0:8080 -t ./website"]
EXPOSE 8080 