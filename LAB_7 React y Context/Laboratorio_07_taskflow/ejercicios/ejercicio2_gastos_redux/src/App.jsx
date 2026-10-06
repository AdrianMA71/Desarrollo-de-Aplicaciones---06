// src/App.jsx
import FormularioGasto from "./components/FormularioGasto";
import ListaGastos from "./components/ListaGastos";
import ResumenGastos from "./components/ResumenGastos";

function App() {
  return (
    <div className="app">
      <h1>Panel de gastos personales</h1>
      <FormularioGasto />
      <ResumenGastos />
      <ListaGastos />
    </div>
  );
}

export default App;
