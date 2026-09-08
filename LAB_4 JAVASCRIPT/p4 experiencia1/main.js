// parte 2
console.log("3. javascript externo - se ejecuta desde archivo separado");
alert("4. javascript externo - se ejecuta desde main.js al cargar");

// parte 3: variables y constantes
const nombreProducto = "Teclado mecanico";
let precio = 180;
let stock = 5;
const disponible = true;

console.log(nombreProducto);
console.log(precio);
console.log(stock);
console.log(disponible);

// parte 3: verificando tipos
console.log(typeof nombreProducto);
console.log(typeof precio);
console.log(typeof stock);
console.log(typeof disponible);

// parte 3: cambio de tipo
precio = "180";
console.log(typeof precio);

// parte 4: scope de bloque con const y let
if (stock > 0) {
    const mensaje = "Producto disponible";
    let unidades = stock;
    console.log(mensaje);
    console.log(unidades);
}
// console.log(mensaje); // error: ReferenceError - mensaje no existe fuera del bloque por const

// parte 4: scope de funcion con var
if (stock > 0) {
    var mensajeVar = "Producto disponible con var";
    let unidades = stock;
    console.log(mensajeVar);
    console.log(unidades);
}
console.log(mensajeVar); // var si se puede acceder fuera porque tiene scope de funcion

// parte 5: hoisting con var
console.log(cantidad); // undefined - hoisting eleva declaracion pero no asignacion
var cantidad = 10;

// parte 5: hoisting con let
// console.log(descuento); // error: ReferenceError - let no permite usar antes de declarar
let descuento = 20;

// parte 6: calculo de importe
const nombreCliente = "Andrea";
const cantidadProductos = 3;
const precioUnitario = 120;
const importe = cantidadProductos * precioUnitario;

console.log("Cliente: " + nombreCliente);
console.log("Cantidad: " + cantidadProductos);
console.log("Precio unitario: " + precioUnitario);
console.log("Importe: " + importe);

// funcion para el boton de javascript en linea
function mostrarMensaje() {
    alert("5. javascript en linea - se ejecuta al hacer clic en el boton");
    console.log("6. javascript en linea - se ejecuta desde el atributo onclick del boton");
}