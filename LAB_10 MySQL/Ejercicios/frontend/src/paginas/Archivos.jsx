import { useEffect, useState } from 'react';
import Campo from '../componentes/Campo.jsx';
import Mensaje from '../componentes/Mensaje.jsx';
import { solicitar } from '../api.js';

export default function Archivos() {
  const [especialidad, setEspecialidad] = useState('DesarrolloWeb');
  const [archivo, setArchivo] = useState(null);
  const [archivos, setArchivos] = useState([]);
  const [seleccionado, setSeleccionado] = useState(null);
  const [contenido, setContenido] = useState('');
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [ocupado, setOcupado] = useState(false);
  const [cargando, setCargando] = useState(false);
  useEffect(() => {
    let activo = true;
    setSeleccionado(null);
    setContenido('');
    setError('');
    setMensaje('');
    setArchivos([]);
    setCargando(true);
    solicitar(`/archivos?especialidad=${especialidad}`)
      .then((datos) => {
        if (activo) setArchivos(datos);
      })
      .catch((error) => {
        if (activo) setError(error.message);
      })
      .finally(() => {
        if (activo) setCargando(false);
      });
    return () => {
      activo = false;
    };
  }, [especialidad]);
  async function subir(evento) {
    evento.preventDefault();
    setError('');
    setMensaje('');
    if (!archivo) {
      setError('Selecciona un archivo');
      return;
    }
    const formulario = new FormData();
    formulario.append('especialidad', especialidad);
    formulario.append('archivo', archivo);
    setOcupado(true);
    try {
      await solicitar('/archivos', { method: 'POST', body: formulario });
      setArchivos(await solicitar(`/archivos?especialidad=${especialidad}`));
      setMensaje(`Archivo guardado en la carpeta ${especialidad}`);
      evento.target.reset();
      setArchivo(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setOcupado(false);
    }
  }
  async function ver(registro) {
    setError('');
    setSeleccionado(null);
    setContenido('');
    setOcupado(true);
    try {
      if (['.txt', '.csv', '.md', '.json'].includes(registro.extension)) {
        const datos = await solicitar(`/archivos/${registro.id}/texto`);
        setContenido(datos.contenido);
      }
      setSeleccionado(registro);
    } catch (error) {
      setError(error.message);
    } finally {
      setOcupado(false);
    }
  }
  return (
    <>
      <h1>Archivos por especialidad</h1>
      <p>Sube un archivo a su carpeta y consulta su contenido.</p>
      <section className="panel">
        <Campo etiqueta="Especialidad" id="especialidad">
          <select
            id="especialidad"
            value={especialidad}
            disabled={ocupado}
            onChange={(evento) => setEspecialidad(evento.target.value)}
          >
            <option>Estadistica</option>
            <option>DesarrolloWeb</option>
            <option>Testing</option>
          </select>
        </Campo>
        <form onSubmit={subir}>
          <Campo etiqueta="Seleccionar archivo" id="archivo">
            <input
              id="archivo"
              type="file"
              accept=".txt,.csv,.md,.json,.png,.jpg,.jpeg,.pdf"
              onChange={(evento) => setArchivo(evento.target.files[0])}
              required
            />
          </Campo>
          <p className="ayuda">
            TXT, CSV, MD, JSON, PNG, JPG y PDF · Tamaño máximo: 5 MB
          </p>
          <button disabled={ocupado || cargando}>
            {ocupado ? 'Procesando...' : 'Subir archivo'}
          </button>
        </form>
        <Mensaje texto={mensaje} />
        <Mensaje texto={error} error />
      </section>
      <section className="panel">
        <h2>Archivos de {especialidad}</h2>
        {cargando ? (
          <p>Cargando archivos...</p>
        ) : archivos.length === 0 ? (
          <p>No hay archivos en esta especialidad.</p>
        ) : (
          <div className="tabla-contenedor">
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Tamaño</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {archivos.map((registro) => (
                  <tr key={registro.id}>
                    <td>{registro.nombre_original}</td>
                    <td>{(registro.tamano / 1024).toFixed(1)} KB</td>
                    <td>
                      <button
                        className="secundario"
                        onClick={() => ver(registro)}
                        disabled={ocupado}
                      >
                        Ver
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      {seleccionado && (
        <section className="panel">
          <h2>Vista previa de {seleccionado.nombre_original}</h2>
          {['.png', '.jpg', '.jpeg'].includes(seleccionado.extension) ? (
            <img
              className="vista-imagen"
              src={`/api/archivos/${seleccionado.id}/contenido`}
              alt={seleccionado.nombre_original}
            />
          ) : seleccionado.extension === '.pdf' ? (
            <iframe
              title={seleccionado.nombre_original}
              src={`/api/archivos/${seleccionado.id}/contenido`}
            />
          ) : (
            <pre>{contenido}</pre>
          )}
          <a
            href={`/api/archivos/${seleccionado.id}/contenido`}
            target="_blank"
            rel="noreferrer"
          >
            Abrir contenido en otra pestaña
          </a>
        </section>
      )}
    </>
  );
}
