// Experiencia 5: navegación con React Router (Inicio y Tareas)
// El <BrowserRouter> global está en main.jsx; aquí se declaran las rutas de la Exp. 5.
import { Routes, Route, Link } from "react-router-dom";
import Encabezado from "../../components/Encabezado";
import Explicacion from "../../components/Explicacion";
import TareasApp from "../exp4/TareasApp";

function Inicio() {
  return <Encabezado usuario="Alumno EPIS" />;
}

function Tareas() {
  return (
    <section>
      <h3>Mis tareas</h3>
      <TareasApp />
    </section>
  );
}

function Exp5() {
  return (
    <section>
      <h2>Experiencia 5: Navegación con React Router</h2>
      <Explicacion titulo="Qué demuestra">
        Dos vistas (<code>/exp5</code> y <code>/exp5/tareas</code>) con{" "}
        <code>Routes</code>, <code>Route</code> y <code>Link</code>: la URL cambia sin
        recargar la página. Prueba una URL inexistente, por ejemplo{" "}
        <code>/exp5/xyz</code>.
      </Explicacion>
      <nav className="nav">
        <Link to="/exp5">Inicio</Link>
        <Link to="/exp5/tareas">Tareas</Link>
      </nav>
      <Routes>
        <Route index element={<Inicio />} />
        <Route path="tareas" element={<Tareas />} />
        <Route path="*" element={<p className="error">Página no encontrada</p>} />
      </Routes>
    </section>
  );
}

export default Exp5;
