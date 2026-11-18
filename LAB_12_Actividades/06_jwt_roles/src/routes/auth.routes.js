const { Router } = require('express');
const ctrl = require('../controllers/auth.controller');
const { verificarToken } = require('../middlewares/auth');

const router = Router();
router.post('/registro', ctrl.registrar);
router.post('/login', ctrl.login);
router.get('/perfil', verificarToken, ctrl.perfil);

module.exports = router;
