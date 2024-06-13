# Use the official PHP image from the Docker Hub
FROM php:7.4-apache

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Set working directory
WORKDIR /var/www/html

# Copy current directory contents into the container at /var/www/html
COPY src /var/www/html

# Install required PHP extensions
RUN docker-php-ext-install pdo pdo_mysql
