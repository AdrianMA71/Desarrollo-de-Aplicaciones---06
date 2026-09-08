function calcularEnvio(peso, tipo = "normal") {
    peso = Number(peso);

    if (Number.isNaN(peso) || peso <= 0) {
        throw new Error("El peso no esta permitido :P");
    }

    let costoBase;

    if (peso <= 2) {
        costoBase = 8.00;
    } else if (peso <= 5) {
        costoBase = 12.00;
    } else {
        costoBase = 18.00;
    }

    let costoFinal = costoBase;
    if (tipo === "express") {
        costoFinal = costoBase * 1.40;
    }

    costoFinal = Math.round(costoFinal * 100) / 100;

    return {
        peso, tipo, costoBase, costoFinal
    };
}

try {
    console.log(calcularEnvio(1.5));
} catch (error) {
    console.error("error ", error.message);
}

try {
    console.log(calcularEnvio(4, "express"));
} catch (error) {
    console.error("error ", error.message);
}

try {
    console.log(calcularEnvio(-3));
} catch (error) {
    console.error("error ", error.message);
}
