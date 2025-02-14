# Node.js image
FROM node:23-alpine

# Copy app
WORKDIR /app
COPY . .

# Initialize the app
CMD ["php", "-S", "0.0.0.0:8080", "-t", "./website"]
EXPOSE 8080