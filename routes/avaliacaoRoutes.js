const router = require('express').Router();
const controller = require('../controllers/avaliacaoController');

router.get('/', (req, res) => res.render('home', { title: 'Início' }));
router.get('/avaliacoes-realizadas', (req, res) => res.render('avaliacoes-realizadas', { title: 'Avaliações realizadas' }));
router.get('/avaliacoes', controller.listar);
router.get('/avaliacoes/nova', controller.nova);
router.post('/avaliacoes', controller.criar);
router.get('/avaliacoes/:id', controller.ver);
module.exports = router;
