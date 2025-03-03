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

# Expose the port 3000
EXPOSE 3000

# Command to run the application
CMD node buildCTF.js && node app/index.js