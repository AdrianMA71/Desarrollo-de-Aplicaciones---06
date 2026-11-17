CREATE DATABASE IF NOT EXISTS matricula_lab12 CHARACTER SET utf8mb4;
USE matricula_lab12;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  password_hash VARCHAR(100) NOT NULL,
  rol ENUM('admin','docente','estudiante') NOT NULL DEFAULT 'estudiante'
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS cursos (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(120) NOT NULL,
  docente_id INT UNSIGNED NOT NULL,
  FOREIGN KEY (docente_id) REFERENCES usuarios(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS matriculas (
  curso_id INT UNSIGNED NOT NULL,
  estudiante_id INT UNSIGNED NOT NULL,
  PRIMARY KEY (curso_id, estudiante_id),
  FOREIGN KEY (curso_id) REFERENCES cursos(id),
  FOREIGN KEY (estudiante_id) REFERENCES usuarios(id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS notas (
  curso_id INT UNSIGNED NOT NULL,
  estudiante_id INT UNSIGNED NOT NULL,
  nota DECIMAL(4,2) NOT NULL CHECK (nota BETWEEN 0 AND 20),
  PRIMARY KEY (curso_id, estudiante_id),
  FOREIGN KEY (curso_id, estudiante_id)
    REFERENCES matriculas(curso_id, estudiante_id)
) ENGINE=InnoDB;
