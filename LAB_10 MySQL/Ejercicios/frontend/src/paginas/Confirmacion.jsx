import { useEffect, useState } from 'react';
import { solicitar } from '../api.js';
import Mensaje from '../componentes/Mensaje.jsx';

export default function Confirmacion({ id }) {
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState('');
  useEffect(() => {
    setUsuario(null);
    setError('');
    let activo = true;
    solicitar(`/usuarios/${id}`)
      .then((datos) => {
        if (activo) setUsuario(datos);
      })
      .catch((error) => {
        if (activo) setError(error.message);
      });
    return () => {
      activo = false;
    };
  }, [id]);
  return (
    <>
      <h1>Confirmación del registro de usuario</h1>
      <Mensaje texto={error} error />
      {!usuario && !error && <p>Cargando confirmación...</p>}
      {usuario && (
        <section className="panel">
          <Mensaje
            texto={`Registro N.º ${usuario.id} realizado correctamente`}
          />
          <dl className="confirmacion">
            <dt>Nombre completo</dt>
            <dd>{usuario.nombre}</dd>
            <dt>Dirección</dt>
            <dd>{usuario.direccion}</dd>
            <dt>Correo electrónico</dt>
            <dd>{usuario.correo}</dd>
            <dt>Contraseña</dt>
            <dd>Protegida y almacenada como hash</dd>
            <dt>Fecha de nacimiento</dt>
            <dd>{usuario.fechaNacimiento.split('-').reverse().join('/')}</dd>
            <dt>Sexo</dt>
            <dd>{usuario.sexo}</dd>
            <dt>Temas de interés</dt>
            <dd>{usuario.temas.join(', ')}</dd>
            <dt>Aficiones seleccionadas</dt>
            <dd>{usuario.aficiones.join(', ')}</dd>
          </dl>
          <a className="boton" href="#/registro">
            Registrar otro usuario
          </a>
        </section>
      )}
    </>
  );
}
