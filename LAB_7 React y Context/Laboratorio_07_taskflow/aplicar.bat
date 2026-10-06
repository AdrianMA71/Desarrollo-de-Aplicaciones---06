@echo off
REM Uso:  aplicar.bat N     (N = numero de experiencia 1..8)
if "%1"=="" (echo Uso: aplicar.bat N & exit /b 1)
if not exist experiencias\exp%1 (echo No existe la experiencia %1 & exit /b 1)
xcopy /E /Y /I experiencias\exp%1\src taskflow\src >nul
if exist experiencias\exp%1\verificar_exp1.mjs copy /Y experiencias\exp%1\verificar_exp1.mjs taskflow\ >nul
if exist experiencias\exp%1\prueba_reducer.mjs copy /Y experiencias\exp%1\prueba_reducer.mjs taskflow\ >nul
if "%1"=="1" (if exist taskflow\src\App.css del taskflow\src\App.css & if exist taskflow\src\assets rmdir /S /Q taskflow\src\assets)
if "%1"=="5" if exist taskflow\src\TareasApp.jsx del taskflow\src\TareasApp.jsx
if "%1"=="6" if exist taskflow\src\pages\Tareas.jsx del taskflow\src\pages\Tareas.jsx
echo Experiencia %1 aplicada en taskflow\src
if "%1"=="5" echo Falta instalar:  cd taskflow ^&^& npm install react-router-dom
if "%1"=="7" echo Falta instalar:  cd taskflow ^&^& npm install redux react-redux
