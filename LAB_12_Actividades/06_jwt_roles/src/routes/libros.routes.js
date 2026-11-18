const { Router } = require('express');
const ctrl = require('../controllers/libros.controller');
const { verificarToken, permitirRoles } = require('../middlewares/auth');

const router = Router();
router.get('/', ctrl.listar);
router.get('/:id', ctrl.obtener);

router.post('/', verificarToken, permitirRoles('admin'), ctrl.crear);
router.put('/:id', verificarToken, permitirRoles('admin'), ctrl.actualizar);
router.delete('/:id', verificarToken, permitirRoles('admin'), ctrl.eliminar);

module.exports = router;
