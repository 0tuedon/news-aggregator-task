# Description: Dockerfile for Node.js 20-alpine
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy the all files to the working directory
COPY . ./
# Install dependencies
RUN npm install

# Start the CMD
CMD ["npm", "start"]
