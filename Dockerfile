# Use the base Node.js image
FROM node:18.7

# Install PM2 globally
RUN npm install -g pm2

# Set the working directory
WORKDIR /src

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Transpile TypeScript code
RUN yarn transpile

# Set the environment variable
ENV NODE_ENV=production
ENV PORT=3001

# Expose the port
EXPOSE 3001

# Start the application using PM2
CMD ["pm2-runtime", "app.js"]
