function UsuarioCard({ nombre, correo, ciudad, empresa }) {
  return (
    <article className="usuario-card">
      <h3>{nombre}</h3>
      <p> {correo}</p>
      <p> {ciudad}</p>
      <p> {empresa}</p>
    </article>
  )
}

export default UsuarioCard
