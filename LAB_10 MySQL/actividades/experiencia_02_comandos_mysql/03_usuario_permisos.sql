CREATE USER 'jim'@'localhost' IDENTIFIED BY 'cisco';
GRANT ALL ON publications.* TO 'jim'@'localhost';
FLUSH PRIVILEGES;
