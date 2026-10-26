export default function Mensaje({ texto, error = false }) {
  if (!texto) {
    return null;
  }
  return (
    <p
      className={error ? 'mensaje error' : 'mensaje'}
      role={error ? 'alert' : 'status'}
    >
      {texto}
    </p>
  );
}
