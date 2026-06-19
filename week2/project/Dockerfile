# Use lightweight node image
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install only production dependencies
RUN npm install --production

# Copy rest of the code
COPY . .

# Expose the port
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]