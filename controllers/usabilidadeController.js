const AvaliacaoSUS = require('../models/AvaliacaoSUS');

const itensSUS = [
  'Eu acho que gostaria de utilizar este sistema com frequência.',
  'Eu achei o sistema desnecessariamente complexo.',
  'Eu achei o sistema fácil de usar.',
  'Eu acho que precisaria de ajuda de uma pessoa com conhecimentos técnicos para usar o sistema.',
  'Eu achei que as várias funções deste sistema estavam muito bem integradas.',
  'Eu achei que havia muita inconsistência neste sistema.',
  'Eu imagino que as pessoas aprenderão como usar este sistema rapidamente.',
  'Eu achei o sistema muito complicado de usar.',
  'Eu me senti muito confiante ao usar o sistema.',
  'Eu precisei aprender várias coisas novas antes de conseguir usar o sistema.'
];

function calcularPontuacao(respostas) {
  const total = respostas.reduce((soma, resposta, indice) => soma + (indice % 2 === 0 ? resposta.valor - 1 : 5 - resposta.valor), 0);
  return total * 2.5;
}

exports.nova = (req, res) => res.render('usabilidade/form', { title: 'Escala SUS', itensSUS, valores: {}, erro: null });
exports.criar = async (req, res, next) => {
  try {
    const respostas = itensSUS.map((texto, indice) => ({ numero: indice + 1, texto, valor: Number(req.body[`sus_${indice + 1}`]) }));
    const avaliacao = await AvaliacaoSUS.create({ sistema: req.body.sistema, respostas, pontuacaoSUS: calcularPontuacao(respostas), observacoes: req.body.observacoes });
    res.redirect(`/usabilidade/${avaliacao.id}`);
  } catch (error) {
    if (error.name === 'ValidationError') return res.status(422).render('usabilidade/form', { title: 'Escala SUS', itensSUS, valores: req.body, erro: 'Informe o sistema avaliado e responda todos os 10 itens.' });
    next(error);
  }
};
exports.listar = async (req, res, next) => { try { res.render('usabilidade/lista', { title: 'Escala SUS', avaliacoes: await AvaliacaoSUS.find().sort({ createdAt: -1 }).lean() }); } catch (error) { next(error); } };
exports.ver = async (req, res, next) => { try { const avaliacao = await AvaliacaoSUS.findById(req.params.id).lean(); if (!avaliacao) return res.status(404).render('404', { title: 'Avaliação não encontrada' }); res.render('usabilidade/detalhe', { title: 'Escala SUS', avaliacao }); } catch (error) { next(error); } };
