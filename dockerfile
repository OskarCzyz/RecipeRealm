FROM node:lts-alpine

# Install simple http server for serving static content
RUN npm install -g http-server

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy project files and folders to the current working directory
COPY . .

# Build app for production with minification
RUN npm run build

EXPOSE 8080

CMD ["http-server", "dist"]