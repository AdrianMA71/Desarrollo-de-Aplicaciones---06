// src/TareasApp.jsx
import { useEffect, useState } from "react";
import FormularioTarea from "./components/FormularioTarea";
import TareaLista from "./components/TareaLista";

function TareasApp() {
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // [] => la petición se dispara una sola vez, al montar el componente
  // (equivalente a componentDidMount).
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error("No se pudieron obtener las tareas");
        return respuesta.json();
      })
      .then((datos) => {
        // Se transforma al formato { id, titulo, completada } de la app.
        const transformadas = datos.map((d) => ({
          id: d.id,
          titulo: d.title,
          completada: d.completed,
        }));
        setTareas(transformadas);
      })
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
  }, []);

  const alternarTarea = (id) => {
    setTareas(
      tareas.map((t) =>
        t.id === id ? { ...t, completada: !t.completada } : t
      )
    );
  };

  const agregarTarea = (titulo) => {
    const nuevaTarea = { id: Date.now(), titulo, completada: false };
    setTareas([...tareas, nuevaTarea]);
  };

  if (cargando) return <p>Cargando tareas...</p>;
  if (error) return <p className="error">Ocurrió un error: {error}</p>;

  return (
    <>
      <FormularioTarea onAgregar={agregarTarea} />
      <TareaLista tareas={tareas} onAlternar={alternarTarea} />
    </>
  );
}

export default TareasApp;
