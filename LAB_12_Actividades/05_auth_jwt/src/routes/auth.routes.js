const { Router } = require('express');
const ctrl = require('../controllers/auth.controller');

const router = Router();
router.post('/registro', ctrl.registrar);
router.post('/login', ctrl.login);

module.exports = router;
