# Stage 1: Build
FROM node:20 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve with nginx
FROM nginx:stable-alpine

# Copy built static files
COPY --from=builder /app/dist /usr/share/nginx/html

# Replace default nginx config with simple SPA-friendly one
COPY <<EOF /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;

    location / {
        index index.html;
        try_files \$uri /index.html;
    }
}
EOF