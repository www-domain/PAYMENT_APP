# Build Stage
FROM node:lts-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --omit-dev


# Serve Stage
FROM nginx:alpine
# Remove default nginx static assets
RUN rm -rf /usr/share/nginx/html/*
# Remove default nginx configuration
RUN rm /etc/nginx/conf.d/default.conf
# Copy custom nginx configuration first
COPY nginx/conf.d/default.conf /etc/nginx/conf.d/
# Copy built assets
COPY --from=build /app/dist/payment-app/browser /usr/share/nginx/html/

RUN cd /usr/share/nginx/html && cp index.csr.html index.html

RUN chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /usr/share/nginx/html


# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s \
    CMD wget -q --spider http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]