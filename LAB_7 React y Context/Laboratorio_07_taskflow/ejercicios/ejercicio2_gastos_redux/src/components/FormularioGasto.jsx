// src/components/FormularioGasto.jsx
// Formulario controlado: cada campo se enlaza con value + onChange.
import { useState } from "react";
import { useDispatch } from "react-redux";
import { agregarGasto } from "../store/actions.js";

const CATEGORIAS = ["Alimentación", "Transporte", "Educación", "Ocio", "Otros"];

function FormularioGasto() {
  const dispatch = useDispatch();
  const [descripcion, setDescripcion] = useState("");
  const [monto, setMonto] = useState("");
  const [categoria, setCategoria] = useState(CATEGORIAS[0]);

  const manejarEnvio = (evento) => {
    evento.preventDefault();
    const montoNumero = Number(monto);
    if (descripcion.trim() === "" || !(montoNumero > 0)) return; // validación
    dispatch(agregarGasto({ descripcion: descripcion.trim(), monto: montoNumero, categoria }));
    setDescripcion("");
    setMonto("");
  };

  return (
    <form className="formulario" onSubmit={manejarEnvio}>
      <input
        type="text"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        placeholder="Descripción"
      />
      <input
        type="number"
        min="0"
        step="0.01"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
        placeholder="Monto (S/)"
      />
      <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
        {CATEGORIAS.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <button type="submit">Agregar gasto</button>
    </form>
  );
}

export default FormularioGasto;
