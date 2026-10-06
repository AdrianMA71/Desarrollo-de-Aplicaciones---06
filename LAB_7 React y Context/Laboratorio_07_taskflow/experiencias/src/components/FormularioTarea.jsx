// Experiencia 3: formulario controlado (value + onChange) y onSubmit
import { useState } from "react";

function FormularioTarea({ onAgregar }) {
  const [titulo, setTitulo] = useState("");

  const manejarEnvio = (evento) => {
    evento.preventDefault(); // evita que el navegador recargue la página
    const limpio = titulo.trim();
    if (limpio === "") return; // validación: campo no vacío
    onAgregar(limpio);
    setTitulo("");
  };

  return (
    <form onSubmit={manejarEnvio} className="formulario-tarea">
      <input
        type="text"
        value={titulo}
        onChange={(evento) => setTitulo(evento.target.value)}
        placeholder="Escribe una nueva tarea"
      />
      <button type="submit">Agregar</button>
    </form>
  );
}

export default FormularioTarea;
