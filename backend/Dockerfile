# backend/Dockerfile
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose port 5000 for the backend
EXPOSE 5000

# Start the backend service
CMD ["npm", "start"]
