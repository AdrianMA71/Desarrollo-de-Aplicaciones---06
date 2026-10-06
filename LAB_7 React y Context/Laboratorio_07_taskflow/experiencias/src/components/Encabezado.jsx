// Experiencia 1: componente con JSX y una prop (usuario)
function Encabezado({ usuario }) {
  const fecha = new Date().toLocaleDateString("es-PE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="encabezado">
      <h1>TaskFlow</h1>
      <p>
        Hola, {usuario}. Hoy es {fecha}.
      </p>
    </header>
  );
}

export default Encabezado;
