# ------------ Base Stage ------------
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install

# ------------ Dev Stage ------------
FROM base AS development
ENV NODE_ENV=development
COPY . .
CMD ["npm", "run", "start:dev"]

# ------------ Build Stage ------------
FROM base AS build
COPY . .
RUN npm run build

# ------------ Production Stage ------------
FROM node:20-alpine AS production
WORKDIR /app

# Install only production deps
COPY package*.json ./
RUN npm install --omit=dev

# Copy built app
COPY --from=build /app/dist ./dist
COPY tsconfig.build.json ./
COPY .env ./

ENV NODE_ENV=production
CMD ["node", "dist/main"]
