import Encabezado from "../../components/Encabezado";
import Explicacion from "../../components/Explicacion";
import TareasApp from "./TareasApp";

function Exp3() {
  return (
    <section>
      <h2>Experiencia 3: Formulario controlado y eventos</h2>
      <Explicacion titulo="Qué demuestra">
        El input está gobernado por React (<code>value</code> + <code>onChange</code>).
        En <code>onSubmit</code> se usa <code>evento.preventDefault()</code> para
        evitar la recarga y se valida que el título no esté vacío. Prueba enviar
        el campo vacío o solo con espacios: no se agrega nada.
      </Explicacion>
      <Encabezado usuario="Alumno EPIS" />
      <TareasApp />
    </section>
  );
}

export default Exp3;
