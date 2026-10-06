function BuscadorProducto({ valor, onCambio }) {
  return (
    <form className="formulario" onSubmit={(e) => e.preventDefault()}>
      <input
        type="search"
        value={valor}
        onChange={(e) => onCambio(e.target.value)}
        placeholder="Buscar producto por nombre"
      />
    </form>
  );
}

export default BuscadorProducto;
