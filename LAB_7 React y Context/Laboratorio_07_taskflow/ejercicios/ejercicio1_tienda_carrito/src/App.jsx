import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Tienda from "./pages/Tienda";
import CatalogoLista from "./pages/CatalogoLista";
import CarritoPagina from "./pages/CarritoPagina";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/catalogo" replace />} />
        {/* Ruta padre (layout + estado) con dos rutas hijas */}
        <Route path="/catalogo" element={<Tienda />}>
          <Route index element={<CatalogoLista />} />
          <Route path="carrito" element={<CarritoPagina />} />
        </Route>
        <Route path="*" element={<p>Página no encontrada</p>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
