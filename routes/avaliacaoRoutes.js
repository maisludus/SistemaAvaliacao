const router = require('express').Router();
const controller = require('../controllers/avaliacaoController');

router.get('/', (req, res) => res.redirect('/avaliacoes'));
router.get('/avaliacoes', controller.listar);
router.get('/avaliacoes/nova', controller.nova);
router.post('/avaliacoes', controller.criar);
router.get('/avaliacoes/:id', controller.ver);
module.exports = router;
