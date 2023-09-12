# Use Alpine Linux as the base image
FROM node:18-alpine

RUN apk add --no-cache tzdata
ENV TZ=Europe/Berlin

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

WORKDIR /data

# Specify the command to run when the container starts
CMD ["node", "../app/index.js"]
