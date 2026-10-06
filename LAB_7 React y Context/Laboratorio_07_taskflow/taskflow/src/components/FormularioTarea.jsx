// src/components/FormularioTarea.jsx
import { useState } from "react";

function FormularioTarea({ onAgregar }) {
  // Componente controlado: React es la única fuente de verdad del campo.
  const [titulo, setTitulo] = useState("");

  const manejarEnvio = (evento) => {
    evento.preventDefault(); // evita que el navegador recargue la página
    const limpio = titulo.trim();
    if (limpio === "") return; // validación: el campo no puede estar vacío
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
