const router = require('express').Router();
const controller = require('../controllers/usabilidadeController');

router.get('/usabilidade', controller.listar);
router.get('/usabilidade/nova', controller.nova);
router.post('/usabilidade', controller.criar);
router.get('/usabilidade/:id', controller.ver);
module.exports = router;
