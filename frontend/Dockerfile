# Use the official NGINX image from the Docker Hub
FROM nginx:alpine

# Copy custom configuration file from the current directory
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the content of the frontend/src directory to the default NGINX public directory
COPY src /usr/share/nginx/html
