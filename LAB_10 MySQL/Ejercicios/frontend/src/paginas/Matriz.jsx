import { useState } from 'react';
import Campo from '../componentes/Campo.jsx';
import Mensaje from '../componentes/Mensaje.jsx';
import { enviar } from '../api.js';

export default function Matriz() {
  const [dimension, setDimension] = useState('3');
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState('');
  const [ocupado, setOcupado] = useState(false);
  const [origen, setOrigen] = useState('');
  async function procesar(ejemplo) {
    setOcupado(true);
    setError('');
    try {
      const datos = ejemplo
        ? await enviar('/matrices/verificar', {
            matriz: [
              [8, 1, 6],
              [3, 5, 7],
              [4, 9, 2]
            ]
          })
        : await enviar('/matrices/generar', { dimension: Number(dimension) });
      setResultado(datos);
      setOrigen(
        ejemplo ? 'Ejemplo conocido de 3 × 3' : 'Generación aleatoria'
      );
      if (ejemplo) setDimension('3');
    } catch (error) {
      setResultado(null);
      setError(error.message);
    } finally {
      setOcupado(false);
    }
  }
  return (
    <>
      <h1>Matriz cuadrada</h1>
      <p>Genera una matriz aleatoria y comprueba si es perfecta.</p>
      <section className="panel">
        <p>
          En este ejercicio se considera perfecta una matriz con los números
          del 1 al n² sin repetir y con la misma suma en filas, columnas y
          ambas diagonales.
        </p>
        <form
          onSubmit={(evento) => {
            evento.preventDefault();
            procesar(false);
          }}
        >
          <Campo etiqueta="Tamaño de la matriz (2 a 8)" id="dimension">
            <input
              id="dimension"
              type="number"
              min="2"
              max="8"
              step="1"
              value={dimension}
              onChange={(evento) => setDimension(evento.target.value)}
              required
            />
          </Campo>
          <div className="acciones">
            <button disabled={ocupado}>Generar matriz aleatoria</button>
            <button
              type="button"
              className="secundario"
              onClick={() => procesar(true)}
              disabled={ocupado}
            >
              Cargar ejemplo perfecto
            </button>
          </div>
        </form>
        <Mensaje texto={error} error />
        {resultado && (
          <div className="salida-matriz">
            <p>
              {origen} · Registro N.º {resultado.id}
            </p>
            <div className="tabla-contenedor">
              <table className="matriz">
                <tbody>
                  {resultado.matriz.map((fila, i) => (
                    <tr key={i}>
                      {fila.map((valor, j) => (
                        <td key={j}>{valor}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div
              className={
                resultado.esPerfecta ? 'resultado' : 'resultado neutral'
              }
            >
              <h2>
                {resultado.esPerfecta
                  ? 'La matriz es perfecta'
                  : 'La matriz no es perfecta'}
              </h2>
              <p>Suma objetivo: {resultado.sumaObjetivo}</p>
              <p>Filas: {resultado.sumasFilas.join(', ')}</p>
              <p>Columnas: {resultado.sumasColumnas.join(', ')}</p>
              <p>
                Diagonales: {resultado.diagonalPrincipal} y{' '}
                {resultado.diagonalSecundaria}
              </p>
              <p>La matriz y el resultado se guardaron en MySQL.</p>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
