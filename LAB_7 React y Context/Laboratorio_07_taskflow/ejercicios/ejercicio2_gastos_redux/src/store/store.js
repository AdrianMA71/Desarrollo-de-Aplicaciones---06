// src/store/store.js
import { legacy_createStore as createStore } from "redux";
import gastosReducer from "./gastosReducer.js";

const store = createStore(gastosReducer);

export default store;
