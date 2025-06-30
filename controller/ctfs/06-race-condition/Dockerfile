FROM php:8.4-alpine

WORKDIR /app
COPY /website /app

CMD ["sh", "-c", "echo \"FLAG='${FLAG}'\" > flag.txt && php -S 0.0.0.0:8080"]
