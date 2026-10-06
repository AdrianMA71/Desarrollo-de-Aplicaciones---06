// Menú principal: cada experiencia tiene su propia ruta.
import { Routes, Route, Link, Outlet } from "react-router-dom";
import Exp1 from "./experiencias/exp1/Exp1";
import Exp2 from "./experiencias/exp2/Exp2";
import Exp3 from "./experiencias/exp3/Exp3";
import Exp4 from "./experiencias/exp4/Exp4";
import Exp5 from "./experiencias/exp5/Exp5";
import Exp6 from "./experiencias/exp6/Exp6";

const ITEMS = [
  { ruta: "/exp1", titulo: "Experiencia 1", texto: "Entorno y primer componente (JSX + props)" },
  { ruta: "/exp2", titulo: "Experiencia 2", texto: "Lista de tareas, props y useState" },
  { ruta: "/exp3", titulo: "Experiencia 3", texto: "Formulario controlado y eventos" },
  { ruta: "/exp4", titulo: "Experiencia 4", texto: "Carga inicial con fetch (carga y error)" },
  { ruta: "/exp5", titulo: "Experiencia 5", texto: "Navegación con React Router" },
  { ruta: "/exp6", titulo: "Experiencia 6", texto: "Rutas anidadas, Outlet y useParams" },
];

function Menu() {
  return (
    <section>
      <h1>TaskFlow – Laboratorio N° 07</h1>
      <p className="descripcion">Desarrollo de Aplicaciones · React Router</p>
      <div className="menu-grid">
        {ITEMS.map((i) => (
          <Link key={i.ruta} to={i.ruta} className="menu-card">
            <strong>{i.titulo}</strong>
            <span>{i.texto}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Layout() {
  return (
    <div className="app">
      <header className="barra">
        <Link to="/">← Menú de experiencias</Link>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Menu />} />
        <Route path="exp1" element={<Exp1 />} />
        <Route path="exp2" element={<Exp2 />} />
        <Route path="exp3" element={<Exp3 />} />
        <Route path="exp4" element={<Exp4 />} />
        <Route path="exp5/*" element={<Exp5 />} />
        <Route path="exp6/*" element={<Exp6 />} />
        <Route path="*" element={<p className="error">Página no encontrada</p>} />
      </Route>
    </Routes>
  );
}

export default App;
