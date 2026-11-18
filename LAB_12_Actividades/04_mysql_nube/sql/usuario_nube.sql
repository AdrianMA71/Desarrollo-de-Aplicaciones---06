-- sql/usuario_nube.sql - Usuario de la aplicación para MySQL EN LA NUBE
-- Ejecutar con el usuario administrador del proveedor (conexión de Workbench con Use SSL: Require).
-- Cambie la clave por una propia y colóquela luego en DB_PASSWORD del archivo .env
CREATE USER IF NOT EXISTS 'biblioteca_app'@'%' IDENTIFIED BY 'ClaveGeneradaPorElProveedor';
GRANT SELECT, INSERT, UPDATE, DELETE, EXECUTE ON biblioteca.* TO 'biblioteca_app'@'%';
