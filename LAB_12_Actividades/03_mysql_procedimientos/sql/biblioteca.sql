-- sql/biblioteca.sql  (Experiencia 3 - MySQL local)
-- Ejecutar en MySQL Workbench con el usuario root: abrir este archivo y pulsar el rayo (Execute).
SET NAMES utf8mb4;
 
CREATE DATABASE IF NOT EXISTS biblioteca
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE biblioteca;
 
CREATE TABLE IF NOT EXISTS libros (
  id      INT AUTO_INCREMENT PRIMARY KEY,
  titulo  VARCHAR(200) NOT NULL,
  autor   VARCHAR(120) NOT NULL,
  anio    SMALLINT NULL,
  creado  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
 
-- Carga inicial (ids fijos con INSERT IGNORE: se puede ejecutar varias veces sin duplicar)
INSERT IGNORE INTO libros (id, titulo, autor, anio) VALUES
  (1, 'Cien años de soledad', 'Gabriel García Márquez', 1967),
  (2, 'La ciudad y los perros', 'Mario Vargas Llosa', 1963);
 
DELIMITER //
DROP PROCEDURE IF EXISTS sp_libros_listar //
CREATE PROCEDURE sp_libros_listar()
BEGIN
  SELECT id, titulo, autor, anio FROM libros ORDER BY id;
END //
 
DROP PROCEDURE IF EXISTS sp_libros_obtener //
CREATE PROCEDURE sp_libros_obtener(IN p_id INT)
BEGIN
  SELECT id, titulo, autor, anio FROM libros WHERE id = p_id;
END //
 
DROP PROCEDURE IF EXISTS sp_libros_crear //
CREATE PROCEDURE sp_libros_crear(IN p_titulo VARCHAR(200),
                                 IN p_autor  VARCHAR(120),
                                 IN p_anio   SMALLINT)
BEGIN
  INSERT INTO libros (titulo, autor, anio) VALUES (p_titulo, p_autor, p_anio);
  SELECT LAST_INSERT_ID() AS id;
END //
 
DROP PROCEDURE IF EXISTS sp_libros_actualizar //
CREATE PROCEDURE sp_libros_actualizar(IN p_id INT,
                                      IN p_titulo VARCHAR(200),
                                      IN p_autor  VARCHAR(120),
                                      IN p_anio   SMALLINT)
BEGIN
  DECLARE v_existe INT DEFAULT 0;
  SELECT COUNT(*) INTO v_existe FROM libros WHERE id = p_id;
  IF v_existe > 0 THEN
    UPDATE libros SET titulo = p_titulo, autor = p_autor, anio = p_anio
    WHERE id = p_id;
  END IF;
  SELECT v_existe AS filas;
END //
DROP PROCEDURE IF EXISTS sp_libros_eliminar //
CREATE PROCEDURE sp_libros_eliminar(IN p_id INT)
BEGIN
  DELETE FROM libros WHERE id = p_id;
  SELECT ROW_COUNT() AS filas;
END //
 
DELIMITER ;
 
-- Usuario de la aplicación (solo puede ejecutar procedimientos y leer/escribir datos)
CREATE USER IF NOT EXISTS 'biblioteca_user'@'localhost' IDENTIFIED BY 'CambiaEstaClave_123';
CREATE USER IF NOT EXISTS 'biblioteca_user'@'127.0.0.1' IDENTIFIED BY 'CambiaEstaClave_123';
GRANT SELECT, INSERT, UPDATE, DELETE, EXECUTE ON biblioteca.* TO 'biblioteca_user'@'localhost';
GRANT SELECT, INSERT, UPDATE, DELETE, EXECUTE ON biblioteca.* TO 'biblioteca_user'@'127.0.0.1';
