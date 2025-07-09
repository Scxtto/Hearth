# Build stage (Debian-based Node)
FROM node:20.19.0 AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Serve stage (Nginx)
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80