// src/pages/TareasLista.jsx  (ruta index de /tareas)
import { useDispatch, useSelector } from "react-redux";
import FormularioTarea from "../components/FormularioTarea";
import TareaLista from "../components/TareaLista";
import { agregarTarea, alternarTarea } from "../store/actions.js";

function TareasLista() {
  const tareas = useSelector((estado) => estado.tareas); // lee del store
  const dispatch = useDispatch(); // envía acciones al store

  return (
    <>
      <FormularioTarea onAgregar={(titulo) => dispatch(agregarTarea(titulo))} />
      <TareaLista
        tareas={tareas}
        onAlternar={(id) => dispatch(alternarTarea(id))}
      />
    </>
  );
}

export default TareasLista;
