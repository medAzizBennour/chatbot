FROM node:14-alpine
WORKDIR /app

COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --network-timeout 100000

# Copy the rest of the app's source code
COPY . .

# Build the app
RUN yarn start

