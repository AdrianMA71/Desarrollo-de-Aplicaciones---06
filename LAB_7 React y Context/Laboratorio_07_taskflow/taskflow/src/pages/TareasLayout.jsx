// src/pages/TareasLayout.jsx
// Las tareas ya NO se guardan con useState: viven en el store de Redux.
// Solo el estado de la petición (cargando / error) es local a este componente.
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cargarTareas } from "../store/actions.js";

function TareasLayout() {
  const dispatch = useDispatch();
  const yaCargadas = useSelector((estado) => estado.tareas.length > 0);
  const [cargando, setCargando] = useState(!yaCargadas);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (yaCargadas) return; // no volver a pedir si el store ya tiene tareas
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((respuesta) => {
        if (!respuesta.ok) throw new Error("No se pudieron obtener las tareas");
        return respuesta.json();
      })
      .then((datos) =>
        dispatch(
          cargarTareas(
            datos.map((d) => ({ id: d.id, titulo: d.title, completada: d.completed }))
          )
        )
      )
      .catch((err) => setError(err.message))
      .finally(() => setCargando(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <h2>Mis tareas</h2>
      {cargando && <p>Cargando tareas...</p>}
      {error && <p className="error">Ocurrió un error: {error}</p>}
      {!cargando && !error && <Outlet />}
    </section>
  );
}

export default TareasLayout;
