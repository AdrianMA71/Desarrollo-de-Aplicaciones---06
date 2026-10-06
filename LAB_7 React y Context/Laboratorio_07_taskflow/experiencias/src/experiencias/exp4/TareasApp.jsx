// Experiencia 4: carga inicial con fetch + estados de carga y error
import { useEffect, useState } from "react";
import TareaLista from "../../components/TareaLista";
import FormularioTarea from "../../components/FormularioTarea";

export const URL_TAREAS = "https://jsonplaceholder.typicode.com/todos?_limit=5";

function TareasApp() {
  const [tareas, setTareas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  // [] => la petición se dispara una sola vez, al montar el componente
  useEffect(() => {
    fetch(URL_TAREAS)
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error("No se pudieron obtener las tareas");
        return respuesta.json();
      })
      .then((datos) => {
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

  const alternarTarea = (id) =>
    setTareas((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completada: !t.completada } : t))
    );

  const agregarTarea = (titulo) =>
    setTareas((prev) => [...prev, { id: Date.now(), titulo, completada: false }]);

  // Los Hooks ya se llamaron arriba: los return condicionales son seguros
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
