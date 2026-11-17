require('dotenv').config({ quiet: true });

const app = require('./app');
const puerto = Number(process.env.PORT || 3000);
const servidor = app.listen(puerto, () => console.log('API en http://localhost:' + puerto));
servidor.on('error', error => { console.error(error.message); process.exitCode = 1; });
