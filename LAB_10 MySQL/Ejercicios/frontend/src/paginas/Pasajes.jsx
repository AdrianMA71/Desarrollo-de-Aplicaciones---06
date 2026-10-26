import { useEffect, useState } from 'react';
import Campo from '../componentes/Campo.jsx';
import Mensaje from '../componentes/Mensaje.jsx';
import { enviar, solicitar } from '../api.js';

function moneda(valor) {
  return Number(valor).toLocaleString('es-PE', {
    style: 'currency',
    currency: 'PEN'
  });
}

export default function Pasajes() {
  const [datos, setDatos] = useState({
    nombre: '',
    fechaNacimiento: '',
    fechaVuelo: '',
    destino: 'Lima',
    precioBase: '200.00'
  });
  const [resultado, setResultado] = useState(null);
  const [ventas, setVentas] = useState([]);
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [ocupado, setOcupado] = useState(false);
  useEffect(() => {
    solicitar('/pasajes')
      .then(setVentas)
      .catch((error) => setError(error.message));
  }, []);
  function cambiar(evento) {
    setDatos({ ...datos, [evento.target.name]: evento.target.value });
    setResultado(null);
    setMensaje('');
    setError('');
  }
  async function calcular(evento) {
    evento.preventDefault();
    setOcupado(true);
    setError('');
    setMensaje('');
    try {
      setResultado(await enviar('/pasajes/calcular', datos));
    } catch (error) {
      setError(error.message);
    } finally {
      setOcupado(false);
    }
  }
  async function guardar() {
    setOcupado(true);
    setError('');
    try {
      const venta = await enviar('/pasajes', datos);
      setVentas(
        [
          {
            id: venta.id,
            nombre: venta.nombre,
            destino: venta.destino,
            edad: venta.edad,
            categoria: venta.categoria,
            total: venta.total
          },
          ...ventas
        ].slice(0, 20)
      );
      setResultado(null);
      setMensaje(
        `Venta N.º ${venta.id} registrada. Total: ${moneda(venta.total)}`
      );
    } catch (error) {
      setError(error.message);
    } finally {
      setOcupado(false);
    }
  }
  return (
    <>
      <h1>Venta de pasajes aéreos</h1>
      <p>
        Calcula la tarifa según la edad del pasajero en la fecha del vuelo.
      </p>
      <section className="panel">
        <h2>Datos del pasajero</h2>
        <form onSubmit={calcular}>
          <Campo etiqueta="Nombre completo" id="nombre">
            <input
              id="nombre"
              name="nombre"
              value={datos.nombre}
              onChange={cambiar}
              maxLength={120}
              required
            />
          </Campo>
          <div className="dos-columnas">
            <Campo etiqueta="Fecha de nacimiento" id="fechaNacimiento">
              <input
                id="fechaNacimiento"
                name="fechaNacimiento"
                type="date"
                value={datos.fechaNacimiento}
                onChange={cambiar}
                required
              />
            </Campo>
            <Campo etiqueta="Fecha del vuelo" id="fechaVuelo">
              <input
                id="fechaVuelo"
                name="fechaVuelo"
                type="date"
                value={datos.fechaVuelo}
                onChange={cambiar}
                required
              />
            </Campo>
            <Campo etiqueta="Destino" id="destino">
              <select
                id="destino"
                name="destino"
                value={datos.destino}
                onChange={cambiar}
              >
                <option>Lima</option>
                <option>Cusco</option>
                <option>Juliaca</option>
                <option>Trujillo</option>
              </select>
            </Campo>
            <Campo etiqueta="Precio base (S/)" id="precioBase">
              <input
                id="precioBase"
                name="precioBase"
                type="number"
                min="0.01"
                max="99999999.99"
                step="0.01"
                value={datos.precioBase}
                onChange={cambiar}
                required
              />
            </Campo>
          </div>
          <p className="ayuda">
            Menores de 2 años: gratis · De 2 a 17 años: 75 % · Desde 18 años:
            100 %
          </p>
          <button disabled={ocupado}>
            {ocupado ? 'Procesando...' : 'Calcular tarifa'}
          </button>
        </form>
        {resultado && (
          <div className="resultado" aria-live="polite">
            <h2>Resultado de la tarifa</h2>
            <p>
              {resultado.nombre} · {resultado.edad} años ·{' '}
              {resultado.categoria}
            </p>
            <p>Porcentaje a pagar: {resultado.porcentaje} %</p>
            <p className="total">Total: {moneda(resultado.total)}</p>
            <button onClick={guardar} disabled={ocupado}>
              Registrar venta
            </button>
          </div>
        )}
        <Mensaje texto={mensaje} />
        <Mensaje texto={error} error />
      </section>
      <section className="panel">
        <h2>Últimas ventas registradas</h2>
        {ventas.length === 0 ? (
          <p>No hay ventas registradas.</p>
        ) : (
          <div className="tabla-contenedor">
            <table>
              <thead>
                <tr>
                  <th>N.º</th>
                  <th>Pasajero</th>
                  <th>Destino</th>
                  <th>Edad</th>
                  <th>Tarifa</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {ventas.map((venta) => (
                  <tr key={venta.id}>
                    <td>{venta.id}</td>
                    <td>{venta.nombre}</td>
                    <td>{venta.destino}</td>
                    <td>{venta.edad}</td>
                    <td>{venta.categoria}</td>
                    <td>{moneda(venta.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
