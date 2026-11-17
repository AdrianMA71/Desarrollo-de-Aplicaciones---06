CREATE DATABASE IF NOT EXISTS tareas_lab12 CHARACTER SET utf8mb4;
USE tareas_lab12;

CREATE TABLE IF NOT EXISTS tareas (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(150) NOT NULL,
  descripcion VARCHAR(300) NOT NULL,
  estado ENUM('pendiente','en_progreso','terminada') NOT NULL DEFAULT 'pendiente',
  fecha_limite DATE NOT NULL
);

DROP PROCEDURE IF EXISTS sp_tareas_listar;
DROP PROCEDURE IF EXISTS sp_tareas_estado;

DELIMITER //
CREATE PROCEDURE sp_tareas_listar(IN p_limite INT, IN p_offset INT)
BEGIN
  SELECT id, titulo, descripcion, estado, fecha_limite
  FROM tareas ORDER BY id LIMIT p_limite OFFSET p_offset;
  SELECT COUNT(*) AS total FROM tareas;
END//

CREATE PROCEDURE sp_tareas_estado(IN p_id INT, IN p_estado VARCHAR(20))
BEGIN
  UPDATE tareas SET estado = p_estado WHERE id = p_id;
  SELECT id, titulo, descripcion, estado, fecha_limite
  FROM tareas WHERE id = p_id;
END//
DELIMITER ;
