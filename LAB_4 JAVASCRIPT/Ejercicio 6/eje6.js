  function pipeline(...transformaciones) {  

        return function (valorInicial) {  

            return transformaciones.reduce((valorActual, transformacion) => {  

                return transformacion(valorActual);  

            }, valorInicial);  

        };  

    }  

 

    const duplicar = n => n * 2;  

    const sumarDiez = n => n + 10;  

    const cuadrado = n => n ** 2;  

 

    // Pipeline 1: duplicar -> sumar 10 -> elevar al cuadrado  

    const operacion = pipeline(duplicar, sumarDiez, cuadrado);  

    console.log("Pipeline 1 con 5:", operacion(5)); // 400  

 

    // Pipeline 2: sumar 10 -> duplicar  

    const operacion2 = pipeline(sumarDiez, duplicar);  

    console.log("Pipeline 2 con 5:", operacion2(5)); // 30  

 

    // Pipeline 3: cuadrado -> sumar 10  

    const operacion3 = pipeline(cuadrado, sumarDiez);  

    console.log("Pipeline 3 con 5:", operacion3(5)); // 35 