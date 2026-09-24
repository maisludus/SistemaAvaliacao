const AvaliacaoUsabilidade = require('../models/AvaliacaoUsabilidade');

const questoes = [
  { secao: '1. Acesso e Descoberta dos Jogos', key: 'cardClicavel', pergunta: 'O card/imagem do jogo é totalmente clicável ou exige clicar em um texto pequeno?', opcoes: [['OK', 'Card 100% clicável'], ['Alerta', 'Exige clique preciso'], ['Ruim', 'Ruim/Confuso']], placeholder: 'Observações sobre a área de clique...' },
  { secao: '1. Acesso e Descoberta dos Jogos', key: 'feedbackHover', pergunta: 'Há feedback visual ou sonoro claro ao passar o mouse (hover) sobre o jogo?', opcoes: [['OK', 'Sim (brilha, aumenta ou tem som)'], ['Não', 'Não muda nada']], placeholder: 'Observações sobre o efeito hover...' },
  { secao: '2. Início do Jogo (O Fluxo)', key: 'botaoPlay', pergunta: 'O botão "Jogar / Play" é grande, centralizado e fácil de achar após o carregamento?', opcoes: [['OK', 'Sim, muito óbvio'], ['Alerta', 'Dividido com anúncios/outros botões'], ['Ruim', 'Difícil de encontrar']], placeholder: 'Observações sobre o botão Play...' },
  { secao: '2. Início do Jogo (O Fluxo)', key: 'carregamento', pergunta: 'O tempo de carregamento é aceitável (menos de 3 segundos) ou exibe tela preta sem aviso?', opcoes: [['OK', 'Carrega rápido / Tela lúdica'], ['Ruim', 'Tela preta estática / Demorado']], placeholder: 'Observações sobre o carregamento...' },
  { secao: '3. Controles e Jogabilidade', key: 'leituraIntuitiva', pergunta: 'O site exige leituras para acessar os jogos ou é intuitivo, explicado por áudio e/ou íconografia clara?', opcoes: [['OK', 'Intuitivo / Áudio ou iconografia clara'], ['Alerta', 'Texto curto'], ['Ruim', 'Muito texto (bloqueia quem não lê)']], placeholder: 'Observações sobre a dependência de leitura...' },
  { secao: '3. Controles e Jogabilidade', key: 'mecanicaDesktop', pergunta: 'Como funciona a mecânica no desktop? (Exigência de precisão do mouse)', opcoes: [['OK', 'Cliques fáceis e alvos grandes'], ['Alerta', 'Arrastar rígido / Cliques muito pequenos']], placeholder: 'Observações sobre mouse e teclado...' },
  { secao: '3. Controles e Jogabilidade', key: 'responsividadeCelular', pergunta: 'Como funciona a mecânica no celular? (Responsividade)', opcoes: [['OK', 'Redimensionamento adequado'], ['Alerta', 'Cliques pequenos / Dificuldade de navegação'], ['Ruim', 'Navegação impossível ou muito comprometida']], placeholder: 'Observações sobre o uso no celular...' },
  { secao: '4. Saída e Fuga', key: 'saidaJogo', pergunta: 'É fácil e óbvio sair dos jogos sem usar as setas do navegador ou a tecla ESC?', opcoes: [['OK', 'Sim'], ['Ruim', 'Não']], placeholder: 'Observações sobre a saída do jogo...' }
];

exports.nova = (req, res) => res.render('usabilidade/form', { title: 'Avaliar usabilidade do site', questoes, valores: {}, erro: null });
exports.criar = async (req, res, next) => {
  try {
    const respostas = questoes.map(({ key, secao, pergunta }) => ({ key, secao, pergunta, status: req.body[`item_${key}_status`], observacao: req.body[`item_${key}_observacao`] }));
    const avaliacao = await AvaliacaoUsabilidade.create({ urlOuNomeJogo: req.body.urlOuNomeJogo, respostas, bugsTecnicos: req.body.bugsTecnicos });
    res.redirect(`/usabilidade/${avaliacao.id}`);
  } catch (error) {
    if (error.name === 'ValidationError') return res.status(422).render('usabilidade/form', { title: 'Avaliar usabilidade do site', questoes, valores: req.body, erro: 'Revise os campos obrigatórios e responda todos os itens de usabilidade.' });
    next(error);
  }
};
exports.listar = async (req, res, next) => { try { res.render('usabilidade/lista', { title: 'Avaliações de usabilidade', avaliacoes: await AvaliacaoUsabilidade.find().sort({ createdAt: -1 }).lean() }); } catch (error) { next(error); } };
exports.ver = async (req, res, next) => { try { const avaliacao = await AvaliacaoUsabilidade.findById(req.params.id).lean(); if (!avaliacao) return res.status(404).render('404', { title: 'Avaliação não encontrada' }); res.render('usabilidade/detalhe', { title: 'Avaliação de usabilidade', avaliacao }); } catch (error) { next(error); } };
