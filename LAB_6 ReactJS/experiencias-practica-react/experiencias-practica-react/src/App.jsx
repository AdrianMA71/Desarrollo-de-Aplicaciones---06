import { useState } from 'react'
import Header from './components/Header'
import Formulario from './components/Formulario'
import Card from './components/Card'
import Usuarios from './components/Usuarios'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [tecnologias, setTecnologias] = useState([
    { id: 1, nombre: 'React', descripcion: 'Biblioteca para interfaces de usuario', categoria: 'Frontend' },
    { id: 2, nombre: 'Vite', descripcion: 'Herramienta de desarrollo web', categoria: 'Herramienta' },
    { id: 3, nombre: 'Node.js', descripcion: 'Entorno de ejecución de JavaScript', categoria: 'Backend' },
    { id: 4, nombre: 'MySQL', descripcion: 'Sistema gestor de bases de datos', categoria: 'Base de datos' },
  ])

  function eliminarTecnologia(id) {
    setTecnologias(tecnologias.filter((tecnologia) => tecnologia.id !== id))
  }

  function agregarTecnologia(nueva) {
    setTecnologias([...tecnologias, nueva])
  }

  return (
    <div className="app">
      <Header />

      <Formulario onAgregar={agregarTecnologia} />

      <main className="grid">
        {tecnologias.map((tecnologia) => (
          <Card
            key={tecnologia.id}
            nombre={tecnologia.nombre}
            descripcion={tecnologia.descripcion}
            categoria={tecnologia.categoria}
            onEliminar={() => eliminarTecnologia(tecnologia.id)}
          />
        ))}
      </main>

      <Usuarios />

      <Footer />
    </div>
  )
}

export default App