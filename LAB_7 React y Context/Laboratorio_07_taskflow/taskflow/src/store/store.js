// src/store/store.js
// Única fuente de verdad de la aplicación.
import { legacy_createStore as createStore } from "redux";
import tareasReducer from "./tareasReducer.js";

const store = createStore(tareasReducer);

export default store;
