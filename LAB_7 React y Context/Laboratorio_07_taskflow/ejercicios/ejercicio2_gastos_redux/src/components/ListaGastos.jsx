// src/components/ListaGastos.jsx
import { useDispatch, useSelector } from "react-redux";
import { eliminarGasto } from "../store/actions.js";

function ListaGastos() {
  const gastos = useSelector((estado) => estado.gastos);
  const dispatch = useDispatch();

  if (gastos.length === 0) return <p>Aún no hay gastos registrados.</p>;

  return (
    <table>
      <thead>
        <tr><th>Descripción</th><th>Categoría</th><th>Monto</th><th></th></tr>
      </thead>
      <tbody>
        {gastos.map((g) => (
          <tr key={g.id}>
            <td>{g.descripcion}</td>
            <td>{g.categoria}</td>
            <td>S/ {g.monto.toFixed(2)}</td>
            <td>
              <button className="peligro" onClick={() => dispatch(eliminarGasto(g.id))}>
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ListaGastos;
