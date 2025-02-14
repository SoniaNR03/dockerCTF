# Node.js image
FROM node:23-alpine

# Stablish the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the files
COPY . .

# Expose port 80
EXPOSE 80

# Execute server
CMD ["node", "app/index.js"]