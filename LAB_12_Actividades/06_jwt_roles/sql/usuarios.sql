USE biblioteca;

CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  password_hash VARCHAR(100) NOT NULL,
  rol ENUM('admin', 'lector') NOT NULL DEFAULT 'lector',
  creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DELIMITER //
DROP PROCEDURE IF EXISTS sp_usuario_registrar //
CREATE PROCEDURE sp_usuario_registrar(
  IN p_nombre VARCHAR(100), IN p_email VARCHAR(120),
  IN p_hash VARCHAR(100), IN p_rol VARCHAR(10))
BEGIN
  INSERT INTO usuarios (nombre, email, password_hash, rol)
  VALUES (p_nombre, p_email, p_hash, p_rol);
  SELECT LAST_INSERT_ID() AS id;
END //
DROP PROCEDURE IF EXISTS sp_usuario_buscar_email //
CREATE PROCEDURE sp_usuario_buscar_email(IN p_email VARCHAR(120))
BEGIN
  SELECT id, nombre, email, password_hash, rol
  FROM usuarios WHERE email = p_email;
END //

DROP PROCEDURE IF EXISTS sp_usuario_obtener //
CREATE PROCEDURE sp_usuario_obtener(IN p_id INT)
BEGIN
  SELECT id, nombre, email, rol, creado
  FROM usuarios WHERE id = p_id;
END //
DELIMITER ;
