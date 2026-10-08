function calcularPontuacao(respostas) {
  const total = respostas.reduce((soma, resposta) =>
    soma + (resposta.numero % 2 === 1 ? resposta.valor - 1 : 5 - resposta.valor), 0);
  return total * 2.5;
}

function interpretarPontuacao(pontuacao) {
  if (pontuacao > 85) return { titulo: 'Usabilidade excelente', descricao: 'A maioria dos usuários achará o sistema muito fácil de usar.' };
  if (pontuacao > 70) return { titulo: 'Usabilidade boa', descricao: 'O resultado sugere que o sistema é fácil de usar.' };
  if (pontuacao >= 50) return { titulo: 'Usabilidade aceitável', descricao: 'O sistema apresenta usabilidade aceitável, mas com espaço para melhorias.' };
  return { titulo: 'Usabilidade baixa', descricao: 'O resultado indica baixa usabilidade.' };
}

module.exports = { calcularPontuacao, interpretarPontuacao };
