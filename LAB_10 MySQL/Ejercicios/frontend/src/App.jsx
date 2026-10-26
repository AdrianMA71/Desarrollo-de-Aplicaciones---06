import { useEffect, useState } from 'react';
import Pasajes from './paginas/Pasajes.jsx';
import Matriz from './paginas/Matriz.jsx';
import Registro from './paginas/Registro.jsx';
import Confirmacion from './paginas/Confirmacion.jsx';
import Archivos from './paginas/Archivos.jsx';

function rutaActual() {
  return window.location.hash.slice(1) || '/pasajes';
}

export default function App() {
  const [ruta, setRuta] = useState(rutaActual);
  useEffect(() => {
    function actualizarRuta() {
      setRuta(rutaActual());
    }
    window.addEventListener('hashchange', actualizarRuta);
    return () => window.removeEventListener('hashchange', actualizarRuta);
  }, []);
  const enlaces = [
    ['/pasajes', 'Venta de pasajes'],
    ['/matriz', 'Matriz cuadrada'],
    ['/registro', 'Registro de usuarios'],
    ['/archivos', 'Archivos por especialidad']
  ];
  let pagina = <Pasajes />;
  if (ruta === '/matriz') pagina = <Matriz />;
  else if (ruta === '/registro') pagina = <Registro />;
  else if (ruta.startsWith('/confirmacion/'))
    pagina = <Confirmacion id={ruta.split('/')[2]} />;
  else if (ruta === '/archivos') pagina = <Archivos />;
  else if (ruta !== '/pasajes') pagina = <p>La página no existe.</p>;
  return (
    <>
      <header className="cabecera">
        <div className="contenedor">
          <p className="nombre-sitio">Laboratorio 10 · MySQL</p>
          <nav aria-label="Ejercicios">
            {enlaces.map(([url, nombre]) => (
              <a
                key={url}
                href={`#${url}`}
                className={
                  ruta === url ||
                  (url === '/registro' && ruta.startsWith('/confirmacion/'))
                    ? 'activo'
                    : ''
                }
              >
                {nombre}
              </a>
            ))}
          </nav>
        </div>
      </header>
      <main className="contenedor principal">{pagina}</main>
      <footer>Adrian Maldonado Aguilar · Desarrollo de aplicaciones</footer>
    </>
  );
}
