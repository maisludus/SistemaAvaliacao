const Avaliacao = require('../models/Avaliacao');
const sanitizeHtml = require('sanitize-html');

const questoes = [
  ['feedbackSonoro', 'Como você avalia o nível de utilidade que os jogadores, crianças dos anos iniciais, sentirão do feedback sonoro gerado pelo jogo?'],
  ['entenderDesafios', 'Como você avalia o nível de dificuldade que os jogadores, crianças dos anos iniciais, sentirão para entenderem os desafios nas diversas fases do jogo?'],
  ['realizarDesafios', 'Como você avalia o nível de dificuldade que os jogadores, crianças dos anos iniciais, sentirão para realizarem os desafios gerados pelo jogo?'],
  ['controlarDispositivo', 'Como você avalia o nível de dificuldade que os jogadores, crianças dos anos iniciais, sentirão para utilizar/controlar o dispositivo?'],
  ['motivacaoVisual', 'Como você avalia o nível de motivação que os jogadores, crianças dos anos iniciais, sentirão pelos elementos visuais do jogo?'],
  ['divertimento', 'Como você avalia o nível de divertimento que os jogadores, crianças dos anos iniciais, sentirão no jogo?'],
  ['percepcaoVisual', 'Como você avalia o nível de dificuldade que os jogadores, crianças dos anos iniciais, sentirão para verem os objetos e perceberem suas ações e movimentos no jogo?'],
  ['qualidadeCenario', 'Como você avalia o nível de qualidade do cenário (cores, número de objetos, beleza) que os jogadores, crianças dos anos iniciais, sentirão?'],
  ['utilidadeAprendizagem', 'Como você avalia o nível de utilidade do jogo para o auxílio no aprendizado das competências abordadas?'],
  ['motivacaoAtividade', 'Como você avalia o nível de motivação que o jogo trará para os jogadores, crianças dos anos iniciais, fazerem a atividade proposta?'],
  ['utilidadeDados', 'Como você avalia o nível de utilidade dos dados (pontos, tempos, relatórios) providos pelo jogo para a atividade profissional?'],
  ['utilidadeControles', 'Como você avalia o nível de utilidade dos controles providos pelo jogo para a atividade profissional?'],
  ['adocaoCotidiano', 'Como você avalia o nível de dificuldade de adotar o jogo no cotidiano da atividade profissional?']
].map(([key, text]) => ({ key, text }));

exports.nova = (req, res) => res.render('avaliacoes/form', { title: 'Avaliar jogo', questoes, valores: {}, erro: null });
exports.criar = async (req, res, next) => {
  try {
    const respostasEscala = questoes.map(({ key, text }) => ({ key, text, value: Number(req.body[key]) }));
    const jogo = req.body.jogo === 'Outro' ? req.body.jogoPersonalizado : req.body.jogo;
    const bugs = sanitizeHtml(req.body.bugs || '', { allowedTags: ['p', 'br', 'b', 'strong', 'i', 'em', 'ul', 'ol', 'li', 'img'], allowedAttributes: { img: ['src', 'alt'] }, allowedSchemes: ['data'] });
    const avaliacao = await Avaliacao.create({ ...req.body, jogo, bugs, respostasEscala });
    res.redirect(`/avaliacoes/${avaliacao.id}`);
  } catch (error) {
    if (error.name === 'ValidationError') return res.status(422).render('avaliacoes/form', { title: 'Avaliar jogo', questoes, valores: req.body, erro: 'Informe um e-mail válido e revise os campos obrigatórios, incluindo as notas de 1 a 7.' });
    next(error);
  }
};
exports.listar = async (req, res, next) => { try { const email = req.query.email?.trim().toLowerCase() || ''; const filtro = email ? { email } : {}; const [avaliacoes, emails] = await Promise.all([Avaliacao.find(filtro).sort({ createdAt: -1 }).lean(), Avaliacao.distinct('email')]); res.render('avaliacoes/lista', { title: 'Avaliações de jogos realizadas', avaliacoes, emails: emails.filter(Boolean).sort(), email }); } catch (e) { next(e); } };
exports.ver = async (req, res, next) => { try { const avaliacao = await Avaliacao.findById(req.params.id).lean(); if (!avaliacao) return res.status(404).render('404', { title: 'Avaliação não encontrada' }); res.render('avaliacoes/detalhe', { title: 'Avaliação', avaliacao }); } catch (e) { next(e); } };
