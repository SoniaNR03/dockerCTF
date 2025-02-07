# Node.js image
FROM node:23-alpine

# Stablish the working directory
WORKDIR /src

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the files
COPY . .

# Build Vite
RUN npm run build

# Install server
# TODO: CHECK SERVE
RUN npm install -g serve

# Expose port 80
EXPOSE 80

# Execute server
CMD ["serve", "-s", "dist", "-l", "80"]