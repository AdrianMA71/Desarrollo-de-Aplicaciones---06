-- sql/usuario_local.sql - Usuario de la aplicación para MySQL LOCAL (ejecutar como root en Workbench)
CREATE USER IF NOT EXISTS 'biblioteca_user'@'localhost' IDENTIFIED BY 'CambiaEstaClave_123';
CREATE USER IF NOT EXISTS 'biblioteca_user'@'127.0.0.1' IDENTIFIED BY 'CambiaEstaClave_123';
GRANT SELECT, INSERT, UPDATE, DELETE, EXECUTE ON biblioteca.* TO 'biblioteca_user'@'localhost';
GRANT SELECT, INSERT, UPDATE, DELETE, EXECUTE ON biblioteca.* TO 'biblioteca_user'@'127.0.0.1';
