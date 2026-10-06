// Recuadro informativo que se muestra en cada experiencia
function Explicacion({ titulo, children }) {
  return (
    <aside className="explicacion">
      <strong>{titulo}</strong>
      <div>{children}</div>
    </aside>
  );
}

export default Explicacion;
