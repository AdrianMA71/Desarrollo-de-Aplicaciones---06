import { useState } from 'react';
import Campo from '../componentes/Campo.jsx';
import Mensaje from '../componentes/Mensaje.jsx';
import { enviar } from '../api.js';

const temas = ['Ficción', 'Terror', 'Acción', 'Comedia', 'Suspense'];
const aficiones = [
  'Deporte al aire libre',
  'Música pop',
  'Fotografía',
  'Lectura',
  'Videojuegos'
];

export default function Registro() {
  const [datos, setDatos] = useState({
    nombre: '',
    direccion: '',
    correo: '',
    clave: '',
    confirmacion: '',
    fechaNacimiento: '',
    sexo: '',
    temas: [],
    aficiones: []
  });
  const [error, setError] = useState('');
  const [ocupado, setOcupado] = useState(false);
  function cambiar(evento) {
    setDatos({ ...datos, [evento.target.name]: evento.target.value });
  }
  function cambiarTema(tema) {
    const seleccion = datos.temas.includes(tema)
      ? datos.temas.filter((valor) => valor !== tema)
      : [...datos.temas, tema];
    setDatos({ ...datos, temas: seleccion });
  }
  async function registrar(evento) {
    evento.preventDefault();
    setError('');
    if (datos.clave !== datos.confirmacion) {
      setError('Las contraseñas no coinciden');
      return;
    }
    if (datos.temas.length === 0 || datos.aficiones.length === 0) {
      setError('Selecciona al menos un tema y una afición');
      return;
    }
    setOcupado(true);
    try {
      const usuario = await enviar('/usuarios', datos);
      window.location.hash = `/confirmacion/${usuario.id}`;
    } catch (error) {
      setError(error.message);
    } finally {
      setOcupado(false);
    }
  }
  return (
    <>
      <h1>Formulario de inscripción de usuarios</h1>
      <p>Completa tus datos para registrar la inscripción.</p>
      <section className="panel">
        <form onSubmit={registrar}>
          <Campo etiqueta="Nombre completo" id="registro-nombre">
            <input
              id="registro-nombre"
              name="nombre"
              value={datos.nombre}
              onChange={cambiar}
              maxLength={120}
              required
            />
          </Campo>
          <Campo etiqueta="Dirección" id="direccion">
            <textarea
              id="direccion"
              name="direccion"
              value={datos.direccion}
              onChange={cambiar}
              maxLength={250}
              required
            />
          </Campo>
          <div className="dos-columnas">
            <Campo etiqueta="Correo electrónico" id="correo">
              <input
                id="correo"
                type="email"
                name="correo"
                value={datos.correo}
                onChange={cambiar}
                maxLength={160}
                required
              />
            </Campo>
            <Campo etiqueta="Fecha de nacimiento" id="registro-fecha">
              <input
                id="registro-fecha"
                type="date"
                name="fechaNacimiento"
                value={datos.fechaNacimiento}
                onChange={cambiar}
                required
              />
            </Campo>
            <Campo etiqueta="Contraseña" id="clave">
              <input
                id="clave"
                type="password"
                name="clave"
                value={datos.clave}
                onChange={cambiar}
                minLength={8}
                maxLength={128}
                autoComplete="new-password"
                required
              />
            </Campo>
            <Campo etiqueta="Confirmar contraseña" id="confirmacion">
              <input
                id="confirmacion"
                type="password"
                name="confirmacion"
                value={datos.confirmacion}
                onChange={cambiar}
                minLength={8}
                maxLength={128}
                autoComplete="new-password"
                required
              />
            </Campo>
          </div>
          <fieldset>
            <legend>Sexo</legend>
            <div className="opciones">
              {['Hombre', 'Mujer'].map((sexo) => (
                <label key={sexo}>
                  <input
                    type="radio"
                    name="sexo"
                    value={sexo}
                    checked={datos.sexo === sexo}
                    onChange={cambiar}
                    required
                  />
                  {sexo}
                </label>
              ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>Temas de interés</legend>
            <div className="opciones">
              {temas.map((tema) => (
                <label key={tema}>
                  <input
                    type="checkbox"
                    checked={datos.temas.includes(tema)}
                    onChange={() => cambiarTema(tema)}
                  />
                  {tema}
                </label>
              ))}
            </div>
          </fieldset>
          <Campo
            etiqueta="Aficiones (puedes seleccionar varias)"
            id="aficiones"
          >
            <select
              id="aficiones"
              multiple
              size="5"
              value={datos.aficiones}
              onChange={(evento) =>
                setDatos({
                  ...datos,
                  aficiones: Array.from(
                    evento.target.selectedOptions,
                    (opcion) => opcion.value
                  )
                })
              }
              required
            >
              {aficiones.map((aficion) => (
                <option key={aficion}>{aficion}</option>
              ))}
            </select>
          </Campo>
          <p className="ayuda">
            En Windows, mantén Ctrl para seleccionar varias aficiones.
          </p>
          <Mensaje texto={error} error />
          <button disabled={ocupado}>
            {ocupado ? 'Registrando...' : 'Registrar usuario'}
          </button>
        </form>
      </section>
    </>
  );
}
