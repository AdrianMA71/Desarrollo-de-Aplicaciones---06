import Encabezado from "../../components/Encabezado";
import Explicacion from "../../components/Explicacion";
import TareasApp from "./TareasApp";

function Exp4() {
  return (
    <section>
      <h2>Experiencia 4: Carga inicial con fetch</h2>
      <Explicacion titulo="Qué demuestra">
        Tres estados (<code>tareas</code>, <code>cargando</code>, <code>error</code>),
        <code> useEffect</code> con <code>[]</code> y transformación de la respuesta
        de la API a <code>{"{ id, titulo, completada }"}</code>. Para ver el error,
        desconecta internet o cambia la URL en <code>TareasApp.jsx</code>.
      </Explicacion>
      <Encabezado usuario="Alumno EPIS" />
      <TareasApp />
    </section>
  );
}

export default Exp4;
