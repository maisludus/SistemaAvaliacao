const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  key: { type: String, required: true },
  secao: { type: String, required: true },
  pergunta: { type: String, required: true },
  status: { type: String, required: true, enum: ['OK', 'Alerta', 'Ruim', 'Não'] },
  observacao: { type: String, trim: true, maxlength: 3000 }
}, { _id: false });

const avaliacaoUsabilidadeSchema = new mongoose.Schema({
  urlOuNomeJogo: { type: String, required: true, trim: true, maxlength: 500 },
  respostas: { type: [itemSchema], validate: [(items) => items.length === 8, 'Informe todos os oito itens de usabilidade.'] },
  bugsTecnicos: { type: String, trim: true, maxlength: 5000 }
}, { timestamps: true });

module.exports = mongoose.model('AvaliacaoUsabilidade', avaliacaoUsabilidadeSchema);
