CREATE DATABASE IF NOT EXISTS academiadb CHARACTER SET utf8mb4;
USE academiadb;
CREATE TABLE IF NOT EXISTS cursos (
  id INT PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  creditos INT NOT NULL
);
INSERT INTO cursos (id, nombre, creditos) VALUES
(1, 'Desarrollo de Aplicaciones', 4),
(2, 'Bases de Datos', 4),
(3, 'Redes', 3)
ON DUPLICATE KEY UPDATE nombre=VALUES(nombre), creditos=VALUES(creditos);
