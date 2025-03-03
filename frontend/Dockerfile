# Node.js image
FROM node:23-alpine

# Stablish the working directory
WORKDIR /app

# Set the environment variable
ARG USER_ID
ENV USER_ID=${USER_ID}

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the files
COPY . .

# Build Vite
RUN npm run build

# Install server
RUN npm install -g serve

EXPOSE 5173

# Execute server
CMD ["serve", "-s", "dist", "-l", "5173"]

