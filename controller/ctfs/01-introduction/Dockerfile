FROM php:8.2-alpine

# Copy app
WORKDIR /app
COPY . .

# Define entrypoint
CMD ["php", "-S", "0.0.0.0:8080", "-t", "./website"]
EXPOSE 8080
