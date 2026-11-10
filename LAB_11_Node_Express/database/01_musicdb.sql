CREATE DATABASE IF NOT EXISTS musicdb CHARACTER SET utf8mb4;
USE musicdb;
CREATE TABLE IF NOT EXISTS albums (
  id INT PRIMARY KEY,
  titulo VARCHAR(120) NOT NULL,
  artista VARCHAR(120) NOT NULL,
  anio SMALLINT NOT NULL
);
INSERT INTO albums (id, titulo, artista, anio) VALUES
(1, 'A Day at the Races', 'Queen', 1976),
(2, 'Abbey Road', 'The Beatles', 1969),
(3, 'Un dia normal', 'Juanes', 2002)
ON DUPLICATE KEY UPDATE titulo=VALUES(titulo), artista=VALUES(artista), anio=VALUES(anio);
