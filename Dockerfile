# Base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project into the container
COPY . .

# Install development tools (e.g., nodemon for hot-reloading)
RUN npm install -g @nestjs/cli nodemon

# Expose the application port
EXPOSE 3000

# Set environment to development
ENV NODE_ENV=development

# Run the app with hot-reloading
CMD ["npm", "run", "start:dev"]
