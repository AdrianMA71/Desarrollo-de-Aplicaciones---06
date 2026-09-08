function crearGeneradorCodigo(prefijo) {
    let contador = 0;

    return function() {
        contador = contador + 1;
        return prefijo + "-" + contador;
    };
}

const generarAlumno = crearGeneradorCodigo("ALU");
const generarDocente = crearGeneradorCodigo("DOC");

console.log(generarAlumno()); 
console.log(generarAlumno()); 
console.log(generarDocente()); 
console.log(generarAlumno()); 
console.log(generarDocente()); 

