const estudiantes = [
    { nombre: "Andrea", nota: 17 },
    { nombre: "Carlos", nota: 11 },
    { nombre: "Lucía", nota: 19 },
    { nombre: "Mateo", nota: 8 },
    { nombre: "Valeria", nota: 14 }
];

// 1
const nombres = estudiantes.map((estudiante) => {
    return estudiante.nombre;
});
console.log("1. nombres:", nombres);

// 2
const notaAlta = estudiantes.filter((estudiante) => {
    return estudiante.nota >= 13;
});
console.log("2. nota mayor a 13:", notaAlta);

// 3
const lucia = estudiantes.find((estudiante) => {
    return estudiante.nombre === "Lucía";
});
console.log("3. estudiante lucia:", lucia);

// 4
const sumaNotas = estudiantes.reduce((acumulador, estudiante) => {
    return acumulador + estudiante.nota;
}, 0);
const promedio = sumaNotas / estudiantes.length;
console.log("4. promedio general:", promedio);

// 5
const desaprobados = estudiantes.filter((estudiante) => {
    return estudiante.nota < 13;
});
console.log("5. Desaprobados:", desaprobados.length);

// 6 ya se mostro en las consolas

// 7
const estudiantesConEstado = estudiantes.map((estudiante) => {
    let estado;
    if (estudiante.nota >= 13) {
        estado = "Aprobado";
    } else {
        estado = "Desaprobado";
    }
    return {
        nombre: estudiante.nombre,
        nota: estudiante.nota,
        estado: estado
    };
});

console.log("7. estudiantes con estado:", estudiantesConEstado);

