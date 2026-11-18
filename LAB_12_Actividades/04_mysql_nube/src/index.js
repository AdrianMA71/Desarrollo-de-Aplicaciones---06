require('dotenv').config();
const app = require('./app');
 
const PUERTO = process.env.PORT || 3000;
 
app.listen(PUERTO, () => {
  console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
});
