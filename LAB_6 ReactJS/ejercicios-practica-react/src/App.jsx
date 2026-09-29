import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Card from './components/Card'
import Formulario from './components/Formulario'
import Usuarios from './components/Usuarios'
import Ejercicio1 from './ejercicios/Ejercicio1'
import Ejercicio2 from './ejercicios/Ejercicio2'
import Ejercicio3 from './ejercicios/Ejercicio3'
import Ejercicio4 from './ejercicios/Ejercicio4'
import './App.css'
import './ejercicios/ejercicios.css'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'

const VISTAS = [
  { id: 'inicio', etiqueta: 'Experiencias guiadas' },
  { id: 'ej1', etiqueta: 'Ejercicio 1' },
  { id: 'ej2', etiqueta: 'Ejercicio 2' },
  { id: 'ej3', etiqueta: 'Ejercicio 3' },
  { id: 'ej4', etiqueta: 'Ejercicio 4' },
]

function App() {
  const curso = 'Desarrollo de Aplicaciones'
  const practica = 6
  const autor = 'Mg. Ángel Montesinos / Mg. Ana Lucía Velazco'

  const [vista, setVista] = useState('inicio')

  const [tecnologias, setTecnologias] = useState([
    { id: 1, nombre: 'React', descripcion: 'Biblioteca para interfaces de usuario', categoria: 'Frontend' },
    { id: 2, nombre: 'Vite', descripcion: 'Herramienta de desarrollo web moderna', categoria: 'Build tool' },
    { id: 3, nombre: 'Node.js', descripcion: 'Entorno de ejecución de JavaScript', categoria: 'Backend' },
    { id: 4, nombre: 'Express', descripcion: 'Framework minimalista para Node.js', categoria: 'Backend' },
    { id: 5, nombre: 'MongoDB', descripcion: 'Base de datos NoSQL orientada a documentos', categoria: 'Base de datos' },
  ])

  function eliminarTecnologia(id) {
    setTecnologias(tecnologias.filter((tecnologia) => tecnologia.id !== id))
  }

  function agregarTecnologia(nueva) {
    setTecnologias([...tecnologias, nueva])
  }

  return (
    <>
      <Header />

      <nav className="tabs">
        {VISTAS.map((v) => (
          <button
            key={v.id}
            className={vista === v.id ? 'tab activa' : 'tab'}
            onClick={() => setVista(v.id)}
          >
            {v.etiqueta}
          </button>
        ))}
      </nav>

      {vista === 'ej1' && <Ejercicio1 />}
      {vista === 'ej2' && <Ejercicio2 />}
      {vista === 'ej3' && <Ejercicio3 />}
      {vista === 'ej4' && <Ejercicio4 />}

      {vista === 'inicio' && (
        <>
          <section
            id="center"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '24px',
              padding: '50px 20px 30px',
              textAlign: 'center',
            }}
          >
            <div
              className="hero"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '40px',
                position: 'static',
                height: 'auto',
                width: 'auto',
              }}
            >
              <img
                src={reactLogo}
                alt="React logo"
                style={{
                  height: '120px',
                  width: 'auto',
                  position: 'static',
                  transform: 'none',
                  top: 'auto',
                }}
              />
              <img
                src={viteLogo}
                alt="Vite logo"
                style={{
                  height: '120px',
                  width: 'auto',
                  position: 'static',
                  transform: 'none',
                  top: 'auto',
                }}
              />
            </div>

            <div>
              <h1 style={{ margin: 0, fontSize: '42px' }}>Catálogo de Tecnologías</h1>
              <p style={{ margin: '8px 0 0' }}>
                <strong>{curso}</strong> — Práctica N.° {practica}
              </p>
              <p style={{ margin: '4px 0 0' }}>Docente: {autor}</p>
            </div>
          </section>

          <div className="ticks"></div>

          <section id="formulario">
            <div
              style={{
                maxWidth: '600px',
                margin: '40px auto',
                padding: '32px',
                background: 'rgba(170, 59, 255, 0.08)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                boxShadow: '0 10px 20px rgba(0,0,0,0.06)',
              }}
            >
              <Formulario onAgregar={agregarTecnologia} />
            </div>
          </section>

          <div className="ticks"></div>

          <section id="lista">
            <div
              style={{
                maxWidth: '1000px',
                margin: '40px auto',
                padding: '32px',
                background: 'rgba(170, 59, 255, 0.05)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                boxShadow: '0 10px 20px rgba(0,0,0,0.06)',
              }}
            >
              <h2 style={{ textAlign: 'center', marginTop: 0 }}>
                Tecnologías registradas ({tecnologias.length})
              </h2>
              <main
                className="grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                  gap: '20px',
                }}
              >
                {tecnologias.map((tecnologia) => (
                  <Card
                    key={tecnologia.id}
                    id={tecnologia.id}
                    nombre={tecnologia.nombre}
                    descripcion={tecnologia.descripcion}
                    categoria={tecnologia.categoria}
                    onEliminar={eliminarTecnologia}
                  />
                ))}
              </main>
            </div>
          </section>

          <div className="ticks"></div>

          <section id="usuarios">
            <div
              style={{
                maxWidth: '1000px',
                margin: '40px auto',
                padding: '32px',
                background: 'rgba(170, 59, 255, 0.05)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                boxShadow: '0 10px 20px rgba(0,0,0,0.06)',
              }}
            >
              <Usuarios />
            </div>
          </section>

          <div className="ticks"></div>
          <section id="spacer"></section>
        </>
      )}

      <Footer />
    </>
  )
}

export default App