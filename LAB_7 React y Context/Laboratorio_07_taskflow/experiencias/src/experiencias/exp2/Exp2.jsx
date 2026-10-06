import Encabezado from "../../components/Encabezado";
import Explicacion from "../../components/Explicacion";
import TareasApp from "./TareasApp";

function Exp2() {
  return (
    <section>
      <h2>Experiencia 2: Lista, props y useState</h2>
      <Explicacion titulo="Virtual DOM (paso 4 de la guía)">
        Al pulsar el botón, <code>setTareas</code> programa un nuevo render. React
        construye un nuevo árbol de Virtual DOM, lo compara con el anterior
        (reconciliación) y, gracias a las <code>key</code> estables, detecta que
        solo cambió el <code>&lt;li&gt;</code> de esa tarea. Únicamente ese nodo se
        actualiza en el DOM real. Compruébalo en las DevTools: solo parpadea el{" "}
        <code>&lt;li&gt;</code> afectado.
      </Explicacion>
      <Encabezado usuario="Alumno EPIS" />
      <TareasApp />
    </section>
  );
}

export default Exp2;
