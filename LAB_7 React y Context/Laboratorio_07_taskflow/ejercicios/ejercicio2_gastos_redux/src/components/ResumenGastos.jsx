// src/components/ResumenGastos.jsx
// El total se DERIVA del estado en cada render: no se guarda como estado aparte.
import { useSelector } from "react-redux";

function ResumenGastos() {
  const total = useSelector((estado) =>
    estado.gastos.reduce((suma, g) => suma + g.monto, 0)
  );
  const cantidad = useSelector((estado) => estado.gastos.length);

  return (
    <p className="total">
      Total acumulado: S/ {total.toFixed(2)} ({cantidad} gastos)
    </p>
  );
}

export default ResumenGastos;
