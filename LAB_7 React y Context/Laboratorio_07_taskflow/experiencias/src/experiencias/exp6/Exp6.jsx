// Experiencia 6: anidamiento de rutas, layout con <Outlet /> y detalle con useParams
import { useEffect, useState } from "react";
import { Routes, Route, Link, Outlet, useOutletContext, useParams } from "react-router-dom";
import Encabezado from "../../components/Encabezado";
import Explicacion from "../../components/Explicacion";
import TareaLista from "../../components/TareaLista";
import FormularioTarea from "../../components/FormularioTarea";
import { URL_TAREAS } from "../exp4/TareasApp";

// Layout: contiene el estado compartido y un <Outlet /> para la ruta hija activa
function TareasLayout() {
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(URL_TAREAS)
      .then((r) => {
        if (!r.ok) throw new Error("No se pudieron obtener las tareas");
        return r.json();
      })
      .then((datos) =>
        setTareas(datos.map((d) => ({ id: d.id, titulo: d.title, completada: d.completed })))
      )
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, []);

  const alternarTarea = (id) =>
    setTareas((prev) => prev.map((t) => (t.id === id ? { ...t, completada: !t.completada } : t)));
  const agregarTarea = (titulo) =>
    setTareas((prev) => [...prev, { id: Date.now(), titulo, completada: false }]);

  return (
    <section>
      <h3>Mis tareas</h3>
      {cargando && <p>Cargando tareas...</p>}
      {error && <p className="error">Ocurrió un error: {error}</p>}
      {!cargando && !error && (
        <Outlet context={{ tareas, alternarTarea, agregarTarea }} />
      )}
    </section>
  );
}

// Ruta hija "index": equivale a /exp6/tareas
function TareasLista() {
  const { tareas, alternarTarea, agregarTarea } = useOutletContext();
  return (
    <>
      <FormularioTarea onAgregar={agregarTarea} />
      <TareaLista tareas={tareas} onAlternar={alternarTarea} detalleBase="/exp6/tareas" />
    </>
  );
}

// Ruta hija ":id": parámetro dinámico leído con useParams()
function TareaDetalle() {
  const { id } = useParams();
  const { tareas } = useOutletContext();
  const tarea = tareas.find((t) => String(t.id) === id); // useParams devuelve texto

  return (
    <div className="detalle">
      <p>Detalle de la tarea con id: <strong>{id}</strong></p>
      {tarea ? (
        <>
          <p>Título: {tarea.titulo}</p>
          <p>Estado: {tarea.completada ? "Completada" : "Pendiente"}</p>
        </>
      ) : (
        <p className="error">No existe una tarea con ese id.</p>
      )}
      <Link to="/exp6/tareas">← Volver a la lista</Link>
    </div>
  );
}

function Exp6() {
  return (
    <section>
      <h2>Experiencia 6: Rutas anidadas y detalle</h2>
      <Explicacion titulo="Qué demuestra">
        <code>/exp6/tareas</code> es un layout con <code>&lt;Outlet /&gt;</code>; su hija{" "}
        <code>index</code> muestra la lista y <code>:id</code> el detalle. Al entrar a
        un detalle el título "Mis tareas" se mantiene. Mejora sobre la guía: el
        estado vive en el layout y se comparte con <code>useOutletContext</code>, por
        eso el detalle muestra la tarea real.
      </Explicacion>
      <nav className="nav">
        <Link to="/exp6">Inicio</Link>
        <Link to="/exp6/tareas">Tareas</Link>
      </nav>
      <Routes>
        <Route index element={<Encabezado usuario="Alumno EPIS" />} />
        <Route path="tareas" element={<TareasLayout />}>
          <Route index element={<TareasLista />} />
          <Route path=":id" element={<TareaDetalle />} />
        </Route>
        <Route path="*" element={<p className="error">Página no encontrada</p>} />
      </Routes>
    </section>
  );
}

export default Exp6;
