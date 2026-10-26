USE laboratorio10_verde;

SELECT id, nombre, edad, categoria, precio_base, total
FROM ventas
ORDER BY id DESC;

SELECT id, dimension, valores, es_perfecta, suma_objetivo
FROM matrices
ORDER BY id DESC;

SELECT id, nombre, correo, fecha_nacimiento, sexo, temas, aficiones
FROM usuarios
ORDER BY id DESC;

SELECT id, especialidad, nombre_original, nombre_guardado, tamano
FROM archivos
ORDER BY id DESC;
