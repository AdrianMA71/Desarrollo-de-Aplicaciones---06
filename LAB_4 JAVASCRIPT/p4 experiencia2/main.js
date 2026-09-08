// parte 1: funcion tradicional (recibe precio y cantidad, retorna el subtotal multiplicando ambos)
function calcularSubtotal(precio, cantidad) {
    return precio * cantidad; // multiplica precio por cantidad y devuelve el resultado
}

console.log("parte 1: funcion tradicional (recibe precio y cantidad, retorna el subtotal multiplicando ambos)");
console.log("subtotal 120x3: " + calcularSubtotal(120, 3)); // llama a la funcion con 120 y 3, resultado 360
console.log("subtotal 80x5: " + calcularSubtotal(80, 5));   // llama a la funcion con 80 y 5, resultado 400

// parte 2: expresion de funcion (se asigna a una variable como si fuera un valor)
const calcularSubtotalExp = function(precio, cantidad) {
    return precio * cantidad; // la funcion se guarda en la variable calcularSubtotalExp
};

// parte 2: funcion flecha (sintaxis mas corta, ideal para funciones simples)
const calcularSubtotalFlecha = (precio, cantidad) => precio * cantidad; // omitimos return y llaves porque es una sola linea

console.log("parte 2: expresion de funcion (se guarda en variable) vs funcion flecha (sintaxis compacta)");
console.log("tradicional: " + calcularSubtotal(120, 3));    // llama a la funcion tradicional, resultado 360
console.log("expresion: " + calcularSubtotalExp(120, 3));   // llama a la funcion expresion, resultado 360
console.log("flecha: " + calcularSubtotalFlecha(120, 3));   // llama a la funcion flecha, resultado 360

// parte 3: parametros con valor por defecto (si no envias valor, usa el que tiene por defecto)
function calcularTotal(precio, cantidad = 1, descuento = 0) {
    const subtotal = precio * cantidad; // calcula el subtotal
    return subtotal - subtotal * descuento / 100; // resta el descuento al subtotal
}

console.log("parte 3: parametros predeterminados (si no se envian, usan valor por defecto: cantidad=1, descuento=0)");
console.log("solo precio (usa cantidad=1, descuento=0): " + calcularTotal(100)); // usa cantidad=1 y descuento=0, resultado 100
console.log("precio y cantidad (usa descuento=0): " + calcularTotal(100, 3));     // usa descuento=0, resultado 300
console.log("precio, cantidad y descuento (usa todos): " + calcularTotal(100, 3, 10)); // usa todos, resultado 270

// parte 4: parametros rest (...importes) agrupa todos los argumentos extra en un array
function sumarImportes(...importes) {
    console.log("importes es un array con: " + importes); // muestra que importes es un array
    return importes.reduce((total, importe) => total + importe, 0); // suma todos los elementos del array
}

console.log("parte 4: parametros rest (agrupa argumentos en un array, permite recibir cualquier cantidad)");
console.log("suma de 2 numeros: " + sumarImportes(100, 50)); // pasa 2 argumentos, se agrupan en array [100, 50], suma 150
console.log("suma de 4 numeros: " + sumarImportes(100, 50, 80, 25)); // pasa 4 argumentos, se agrupan en array [100, 50, 80, 25], suma 255

// parte 5: funciones de orden superior (una funcion puede recibir otra funcion como parametro)
const aplicarDescuento = precio => precio * 0.90; // funcion flecha que aplica 10% descuento
const aplicarIGV = precio => precio * 1.18;      // funcion flecha que aplica 18% IGV

function procesarPrecio(precio, operacion) {
    return operacion(precio); // ejecuta la funcion que recibe como parametro
}

console.log("parte 5: funciones como argumentos (una funcion recibe otra funcion y la ejecuta)");
console.log("aplicar descuento 10%: " + procesarPrecio(100, aplicarDescuento)); // pasa la funcion aplicarDescuento, resultado 90
console.log("aplicar IGV 18%: " + procesarPrecio(100, aplicarIGV));             // pasa la funcion aplicarIGV, resultado 118

// parte 6: calcular venta con descuento opcional (si no envias descuento, no aplica)
function calcularVenta(precio, cantidad, descuento = 0) {
    const subtotal = precio * cantidad; // calcula el subtotal
    return subtotal - subtotal * descuento / 100; // resta el descuento al subtotal
}

console.log("parte 6: calcular venta (precio x cantidad menos descuento opcional en porcentaje)");
console.log("venta 1 - 2 productos de 50 sin descuento: " + calcularVenta(50, 2)); // 50*2=100 sin descuento, resultado 100
console.log("venta 2 - 3 productos de 100 con 5% descuento: " + calcularVenta(100, 3, 5)); // 100*3=300 - 5% = 285
console.log("venta 3 - 1 producto de 200 con 15% descuento: " + calcularVenta(200, 1, 15)); // 200*1=200 - 15% = 170