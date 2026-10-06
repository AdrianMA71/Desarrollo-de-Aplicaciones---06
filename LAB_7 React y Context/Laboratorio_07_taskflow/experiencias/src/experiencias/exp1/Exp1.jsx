// Experiencia 1: entorno de trabajo y primer componente (JSX + prop)
import Encabezado from "../../components/Encabezado";
import Explicacion from "../../components/Explicacion";

function Exp1() {
  return (
    <section>
      <h2>Experiencia 1: Entorno y primer componente</h2>
      <Explicacion titulo="Qué demuestra">
        Un componente funcional que recibe la prop <code>usuario</code> y usa JSX
        con expresiones entre llaves. Un solo elemento raíz, <code>className</code>{" "}
        en lugar de <code>class</code>.
      </Explicacion>
      <Encabezado usuario="Alumno EPIS" />
    </section>
  );
}

export default Exp1;
