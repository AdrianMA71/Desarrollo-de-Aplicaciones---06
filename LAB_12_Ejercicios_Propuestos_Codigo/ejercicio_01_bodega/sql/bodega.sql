CREATE DATABASE IF NOT EXISTS bodega CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE bodega;
CREATE TABLE IF NOT EXISTS categorias (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL UNIQUE
) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS productos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(150) NOT NULL,
  precio DECIMAL(10,2) NOT NULL,
  stock INT NOT NULL,
  categoria_id INT NOT NULL,
  CONSTRAINT fk_productos_categoria FOREIGN KEY(categoria_id) REFERENCES categorias(id)
    ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT ck_precio CHECK (precio >= 0),
  CONSTRAINT ck_stock CHECK (stock >= 0)
) ENGINE=InnoDB;
INSERT INTO categorias(nombre) SELECT 'Abarrotes' WHERE NOT EXISTS(SELECT 1 FROM categorias WHERE nombre='Abarrotes');
INSERT INTO categorias(nombre) SELECT 'Bebidas' WHERE NOT EXISTS(SELECT 1 FROM categorias WHERE nombre='Bebidas');
INSERT INTO productos(nombre,precio,stock,categoria_id)
SELECT 'Arroz',4.50,20,id FROM categorias WHERE nombre='Abarrotes'
AND NOT EXISTS(SELECT 1 FROM productos WHERE nombre='Arroz');
INSERT INTO productos(nombre,precio,stock,categoria_id)
SELECT 'Agua mineral',2.00,15,id FROM categorias WHERE nombre='Bebidas'
AND NOT EXISTS(SELECT 1 FROM productos WHERE nombre='Agua mineral');
DELIMITER //
DROP PROCEDURE IF EXISTS sp_categorias_listar//
CREATE PROCEDURE sp_categorias_listar()
BEGIN
SELECT id,nombre FROM categorias ORDER BY id;
END//
DROP PROCEDURE IF EXISTS sp_categorias_obtener//
CREATE PROCEDURE sp_categorias_obtener(IN p_id INT)
BEGIN
SELECT id,nombre FROM categorias WHERE id=p_id;
END//
DROP PROCEDURE IF EXISTS sp_categorias_crear//
CREATE PROCEDURE sp_categorias_crear(IN p_nombre VARCHAR(100))
BEGIN
INSERT INTO categorias(nombre) VALUES(p_nombre);
SELECT LAST_INSERT_ID() AS id;
END//
DROP PROCEDURE IF EXISTS sp_categorias_actualizar//
CREATE PROCEDURE sp_categorias_actualizar(IN p_id INT, IN p_nombre VARCHAR(100))
BEGIN
DECLARE v_existe INT;
SELECT COUNT(*) INTO v_existe FROM categorias WHERE id=p_id;
UPDATE categorias SET nombre=p_nombre WHERE id=p_id;
SELECT v_existe AS filas;
END//
DROP PROCEDURE IF EXISTS sp_categorias_eliminar//
CREATE PROCEDURE sp_categorias_eliminar(IN p_id INT)
BEGIN
DELETE FROM categorias WHERE id=p_id;
SELECT ROW_COUNT() AS filas;
END//
DROP PROCEDURE IF EXISTS sp_productos_listar//
CREATE PROCEDURE sp_productos_listar()
BEGIN
SELECT id,nombre,precio,stock,categoria_id FROM productos ORDER BY id;
END//
DROP PROCEDURE IF EXISTS sp_productos_por_categoria//
CREATE PROCEDURE sp_productos_por_categoria(IN p_categoria INT)
BEGIN
SELECT id,nombre,precio,stock,categoria_id FROM productos WHERE categoria_id=p_categoria ORDER BY id;
END//
DROP PROCEDURE IF EXISTS sp_productos_obtener//
CREATE PROCEDURE sp_productos_obtener(IN p_id INT)
BEGIN
SELECT id,nombre,precio,stock,categoria_id FROM productos WHERE id=p_id;
END//
DROP PROCEDURE IF EXISTS sp_productos_crear//
CREATE PROCEDURE sp_productos_crear(IN p_nombre VARCHAR(150), IN p_precio DECIMAL(10,2), IN p_stock INT, IN p_categoria INT)
BEGIN

IF p_precio < 0 OR p_stock < 0 THEN
  SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT='Precio y stock deben ser no negativos';
END IF;
INSERT INTO productos(nombre,precio,stock,categoria_id) VALUES(p_nombre,p_precio,p_stock,p_categoria);
SELECT LAST_INSERT_ID() AS id;

END//
DROP PROCEDURE IF EXISTS sp_productos_actualizar//
CREATE PROCEDURE sp_productos_actualizar(IN p_id INT, IN p_nombre VARCHAR(150), IN p_precio DECIMAL(10,2), IN p_stock INT, IN p_categoria INT)
BEGIN

DECLARE v_existe INT;
IF p_precio < 0 OR p_stock < 0 THEN
  SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT='Precio y stock deben ser no negativos';
END IF;
SELECT COUNT(*) INTO v_existe FROM productos WHERE id=p_id;
UPDATE productos SET nombre=p_nombre,precio=p_precio,stock=p_stock,categoria_id=p_categoria WHERE id=p_id;
SELECT v_existe AS filas;

END//
DROP PROCEDURE IF EXISTS sp_productos_eliminar//
CREATE PROCEDURE sp_productos_eliminar(IN p_id INT)
BEGIN
DELETE FROM productos WHERE id=p_id;
SELECT ROW_COUNT() AS filas;
END//
DELIMITER ;
