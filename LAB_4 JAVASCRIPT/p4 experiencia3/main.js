// parte 1: representando un producto (los objetos agrupan informacion relacionada en pares clave:valor)
const producto = {
    id: 1,
    nombre: "Teclado",
    precio: 120,
    stock: 8
};

console.log("parte 1: representando un producto (los objetos se crean con llaves {} y tienen propiedades clave:valor)");
console.log("nombre: " + producto.nombre);
console.log("precio: " + producto.precio);

// parte 1: agregar nueva propiedad
producto.categoria = "Perifericos";
console.log("categoria agregada: " + producto.categoria);

// parte 1: modificar propiedad existente
producto.stock = 10;
console.log("stock modificado: " + producto.stock);

// parte 1: mostrar objeto completo
console.log("objeto completo:");
console.log(producto);

// parte 1: agregar metodo al objeto (los metodos son funciones dentro del objeto)
producto.calcularValorStock = function() {
    return this.precio * this.stock; // this hace referencia al objeto producto
};

console.log("valor del stock (precio x stock): " + producto.calcularValorStock());

// parte 2: creando un inventario (array de objetos)
const productos = [
    {
        id: 1,
        nombre: "Teclado",
        precio: 120,
        stock: 8
    },
    {
        id: 2,
        nombre: "Mouse",
        precio: 70,
        stock: 15
    },
    {
        id: 3,
        nombre: "Monitor",
        precio: 850,
        stock: 4
    },
    {
        id: 4,
        nombre: "Webcam",
        precio: 160,
        stock: 0
    }
];

console.log("parte 2: creando un inventario (array de objetos)");
console.log("cantidad de elementos: " + productos.length);
console.log("tipo de dato de cada elemento: object");
console.log("precio del Monitor: " + productos[2].precio);

// parte 3: forEach() - recorre cada elemento del array
console.log("parte 3: forEach() - recorrer array y mostrar productos");
productos.forEach(producto => {
    console.log(producto.nombre, producto.precio, producto.stock);
});

// parte 3: formato personalizado
console.log("parte 3: forEach() - formato personalizado");
productos.forEach(producto => {
    console.log(producto.nombre + " | S/ " + producto.precio + " | Stock: " + producto.stock);
});

// parte 4: map() - crea un nuevo array transformando cada elemento
console.log("parte 4: map() - obtener solo nombres");
const nombres = productos.map(producto => producto.nombre);
console.log("nombres: " + nombres);

// parte 4: incrementar precios en 10%
console.log("parte 4: map() - precios incrementados 10%");
const preciosIncrementados = productos.map(producto => producto.precio * 1.10);
console.log("precios con 10% mas: " + preciosIncrementados);

// parte 5: filter() - filtra elementos que cumplen condicion
console.log("parte 5: filter() - stock menor a 10");
const bajoStock = productos.filter(producto => producto.stock < 10);
console.log("productos con stock < 10:");
bajoStock.forEach(producto => {
    console.log(producto.nombre + " (stock: " + producto.stock + ")");
});

// parte 5: filter() - stock mayor a 0
console.log("parte 5: filter() - stock mayor a 0");
const conStock = productos.filter(producto => producto.stock > 0);
console.log("productos disponibles (stock > 0):");
conStock.forEach(producto => {
    console.log(producto.nombre + " (stock: " + producto.stock + ")");
});

// parte 6: find() - busca el primer elemento que cumple condicion
console.log("parte 6: find() - buscar producto por id");
const encontrado = productos.find(producto => producto.id === 3);
console.log("producto encontrado (id=3):");
console.log(encontrado);

// parte 6: buscar id inexistente
console.log("parte 6: find() - buscar id inexistente (15)");
const noEncontrado = productos.find(producto => producto.id === 15);
console.log("resultado: " + noEncontrado);

// parte 7: reduce() - reduce el array a un solo valor
console.log("parte 7: reduce() - calcular valor total del inventario");
const totalInventario = productos.reduce((total, producto) => {
    return total + producto.precio * producto.stock;
}, 0);

console.log("valor total del inventario: " + totalInventario);
console.log("calculo manual:");
console.log("Teclado: 120 * 8 = 960");
console.log("Mouse: 70 * 15 = 1050");
console.log("Monitor: 850 * 4 = 3400");
console.log("Webcam: 160 * 0 = 0");
console.log("Total: 960 + 1050 + 3400 + 0 = 5410");

// parte 8: practica - agregar productos
console.log("parte 8: practica - agregar productos nuevos");

productos.push(
    {
        id: 5,
        nombre: "Impresora",
        precio: 450,
        stock: 3
    },
    {
        id: 6,
        nombre: "Audifonos",
        precio: 90,
        stock: 12
    }
);

console.log("productos agregados: Impresora y Audifonos");

// parte 8: productos con precio mayor a 150
console.log("parte 8: productos con precio mayor a 150");
const precioMayor150 = productos.filter(producto => producto.precio > 150);
precioMayor150.forEach(producto => {
    console.log(producto.nombre + " - S/ " + producto.precio);
});

// parte 8: nombres de todos los productos
console.log("parte 8: nombres de todos los productos");
const todosNombres = productos.map(producto => producto.nombre);
console.log(todosNombres);

// parte 8: buscar producto por id
console.log("parte 8: buscar producto con id=5");
const productoElegido = productos.find(producto => producto.id === 5);
console.log(productoElegido);

// parte 8: valor total actualizado
console.log("parte 8: valor total actualizado del inventario");
const totalActualizado = productos.reduce((total, producto) => {
    return total + producto.precio * producto.stock;
}, 0);
console.log("nuevo total: " + totalActualizado);