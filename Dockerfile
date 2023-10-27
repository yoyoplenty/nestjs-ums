# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Create and set the working directory inside the container
WORKDIR /app

# Copy package.json, package-lock.json, and pnpm-lock.yaml to the container
COPY package.json pnpm-lock.yaml tsconfig.json ./

# Install pnpm globally
RUN npm install -g pnpm

# Install application dependencies using pnpm
RUN pnpm install 

# Install Express as a dependency
RUN pnpm install express

# Copy the rest of your application code to the container
COPY dist/ ./

# Expose the port that your NestJS application will run on (usually 3000)
EXPOSE 3005

# Define the command to start your NestJS application
CMD ["node", "main.js"]
