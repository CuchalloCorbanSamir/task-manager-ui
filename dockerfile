# Build Angular

FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Runtime

FROM nginx:alpine

COPY --from=build \
     /app/dist/task-manager-ui/browser \
     /usr/share/nginx/html

EXPOSE 80