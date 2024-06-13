-- Create database
CREATE DATABASE IF NOT EXISTS night_sky CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Use the newly created database
USE night_sky;

-- Create constellations table
CREATE TABLE IF NOT EXISTS constellations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    is_on BOOLEAN DEFAULT 0
);

-- Create stars table
CREATE TABLE IF NOT EXISTS stars (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(255),
    is_on BOOLEAN DEFAULT 0
);

-- Create night_sky table
CREATE TABLE IF NOT EXISTS night_sky (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cloud_level INT NOT NULL,
    moon_phase ENUM('New Moon', 'First Quarter', 'Full Moon', 'Last Quarter') NOT NULL,
    precipitation ENUM('rain', 'snow') DEFAULT NULL,
    fog_level INT NOT NULL
);

-- Create constellation_star junction table
CREATE TABLE IF NOT EXISTS constellation_star (
    star_id INT NOT NULL,
    constellation_id INT NOT NULL,
    PRIMARY KEY (star_id, constellation_id),
    FOREIGN KEY (star_id) REFERENCES stars(id) ON DELETE CASCADE,
    FOREIGN KEY (constellation_id) REFERENCES constellations(id) ON DELETE CASCADE
    );

-- Insert sample data for testing
INSERT INTO constellations (name, description, image_url, is_on) VALUES
('Orion', 'A prominent constellation located on the celestial equator and visible throughout the world.', 'https://cdn.mos.cms.futurecdn.net/jBaW3ZCr6XK4zM5wRaCUxc-1200-80.jpg', 1),
('Ursa Major', 'A constellation in the northern sky, whose associated mythology likely dates back into prehistory.', 'https://swiftmedia.s3.amazonaws.com/mountain.swiftcom.com/images/sites/7/2022/08/29075609/df578897-84ca-5a7a-8cda-8c22aa545502-scaled.jpg', 1);

INSERT INTO stars (name, description, image_url, is_on) VALUES
('Betelgeuse', 'A red supergiant star roughly 640 light-years from Earth.', 'https://assets.iflscience.com/assets/articleNo/73428/aImg/74952/betelgeuse-o.webp', 1),
('Sirius', 'The brightest star in the night sky, located in the constellation Canis Major.', 'https://dq0hsqwjhea1.cloudfront.net/Sirius-B-Fabio-v2.jpg', 1);

INSERT INTO constellation_star (star_id, constellation_id) VALUES
(1, 1), -- Betelgeuse in Orion
(2, 1); -- Sirius in Orion