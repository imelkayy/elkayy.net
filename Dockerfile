# Builder
FROM node:22-slim AS build

WORKDIR /app

# Install dependencies
COPY package.json ./
RUN npm install

COPY . .

# Build production files
RUN npx prisma generate
RUN npm run build

# Production
FROM node:22-alpine AS production

WORKDIR /app

# Copy only needed production files
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/src/generated ./src/generated
COPY --from=build /app/.next ./.next

# Run production server on container start
CMD ["npm", "run", "start"]