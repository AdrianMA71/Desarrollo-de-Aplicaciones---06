// Ejercicio 1 - Comandos MongoDB (ordenar, contar y operadores de comparacion)
// Ejecutar con: mongosh "mongodb://localhost:27017/ucsm" scripts/ejercicio1.js
db = db.getSiblingDB('ucsm');
db.productos.drop();

db.productos.insertMany([
  { nombre: 'Teclado', categoria: 'Perifericos', precio: 45, stock: 20 },
  { nombre: 'Mouse', categoria: 'Perifericos', precio: 25, stock: 50 },
  { nombre: 'Monitor', categoria: 'Pantallas', precio: 450, stock: 8 },
  { nombre: 'Laptop', categoria: 'Computo', precio: 2800, stock: 5 },
  { nombre: 'Audifonos', categoria: 'Perifericos', precio: 90, stock: 15 },
  { nombre: 'Impresora', categoria: 'Oficina', precio: 600, stock: 3 }
]);

print('--- 1. sort() ascendente por precio ---');
db.productos.find({}, { _id: 0, nombre: 1, precio: 1 }).sort({ precio: 1 }).forEach(printjson);

print('--- 1. sort() descendente por precio ---');
db.productos.find({}, { _id: 0, nombre: 1, precio: 1 }).sort({ precio: -1 }).forEach(printjson);

print('--- 2. Cantidad de documentos: countDocuments() ---');
print(db.productos.countDocuments());

print('--- 3. $eq (categoria igual a Perifericos) ---');
db.productos.find({ categoria: { $eq: 'Perifericos' } }, { _id: 0, nombre: 1, categoria: 1 }).forEach(printjson);

print('--- 3. $ne (categoria distinta de Perifericos) ---');
db.productos.find({ categoria: { $ne: 'Perifericos' } }, { _id: 0, nombre: 1, categoria: 1 }).forEach(printjson);

print('--- 3. $gt (precio mayor que 100) ---');
db.productos.find({ precio: { $gt: 100 } }, { _id: 0, nombre: 1, precio: 1 }).forEach(printjson);

print('--- 3. $gte (precio mayor o igual que 90) ---');
db.productos.find({ precio: { $gte: 90 } }, { _id: 0, nombre: 1, precio: 1 }).forEach(printjson);

print('--- 3. $lt (stock menor que 10) ---');
db.productos.find({ stock: { $lt: 10 } }, { _id: 0, nombre: 1, stock: 1 }).forEach(printjson);

print('--- 3. $lte (stock menor o igual que 15) ---');
db.productos.find({ stock: { $lte: 15 } }, { _id: 0, nombre: 1, stock: 1 }).forEach(printjson);
