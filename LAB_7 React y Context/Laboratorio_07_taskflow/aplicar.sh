#!/bin/bash
# Uso: ./aplicar.sh N   (N = numero de experiencia 1..8)
n=$1; [ -z "$n" ] && { echo "Uso: ./aplicar.sh N"; exit 1; }
[ -d experiencias/exp$n ] || { echo "No existe la experiencia $n"; exit 1; }
cp -r experiencias/exp$n/src/. taskflow/src/
for f in verificar_exp1.mjs prueba_reducer.mjs; do [ -f experiencias/exp$n/$f ] && cp experiencias/exp$n/$f taskflow/; done
[ "$n" = 1 ] && rm -rf taskflow/src/App.css taskflow/src/assets
[ "$n" = 5 ] && rm -f taskflow/src/TareasApp.jsx
[ "$n" = 6 ] && rm -f taskflow/src/pages/Tareas.jsx
echo "Experiencia $n aplicada en taskflow/src"
[ "$n" = 5 ] && echo "Falta instalar:  cd taskflow && npm install react-router-dom"
[ "$n" = 7 ] && echo "Falta instalar:  cd taskflow && npm install redux react-redux"
exit 0
