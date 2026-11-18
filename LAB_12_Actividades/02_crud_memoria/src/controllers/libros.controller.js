let libros = [
  { id: 1, titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', anio: 1967 },
  { id: 2, titulo: 'La ciudad y los perros', autor: 'Mario Vargas Llosa', anio: 1963 },
];
let siguienteId = 3;
 
// Devuelve los datos limpios o null si faltan campos obligatorios
function validar(datos) {
  const titulo = String(datos.titulo ?? '').trim();
  const autor = String(datos.autor ?? '').trim();
  if (!titulo || !autor) return null;
  return { titulo, autor, anio: datos.anio ?? null };
}
 
const listar = (req, res) => {
  res.json(libros);
};
 
const obtener = (req, res) => {
  const libro = libros.find((l) => l.id === Number(req.params.id));
  if (!libro) return res.status(404).json({ error: 'Libro no encontrado' });
  res.json(libro);
};
 
const crear = (req, res) => {
  const datos = validar(req.body ?? {});
  if (!datos) {
    return res.status(400).json({ error: 'titulo y autor son obligatorios' });
  }
  const nuevo = { id: siguienteId++, ...datos };
  libros.push(nuevo);
  res.status(201).json(nuevo);
};
const actualizar = (req, res) => {
  const indice = libros.findIndex((l) => l.id === Number(req.params.id));
  if (indice === -1) return res.status(404).json({ error: 'Libro no encontrado' });
  const datos = validar(req.body ?? {});
  if (!datos) {
    return res.status(400).json({ error: 'titulo y autor son obligatorios' });
  }
  libros[indice] = { id: libros[indice].id, ...datos };
  res.json(libros[indice]);
};
 
const eliminar = (req, res) => {
  const id = Number(req.params.id);
  if (!libros.some((l) => l.id === id)) {
    return res.status(404).json({ error: 'Libro no encontrado' });
  }
  libros = libros.filter((l) => l.id !== id);
  res.status(204).end();
};
 
module.exports = { listar, obtener, crear, actualizar, eliminar };
