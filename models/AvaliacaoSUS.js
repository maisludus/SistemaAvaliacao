const mongoose = require('mongoose');

const respostaSchema = new mongoose.Schema({
  numero: { type: Number, required: true, min: 1, max: 10 },
  texto: { type: String, required: true },
  valor: { type: Number, required: true, min: 1, max: 5 }
}, { _id: false });

const avaliacaoSUSSchema = new mongoose.Schema({
  email: { type: String, required: true, trim: true, lowercase: true, match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  sistema: { type: String, required: true, trim: true, maxlength: 500 },
  respostas: { type: [respostaSchema], validate: [(items) => items.length === 10, 'Informe os 10 itens da Escala SUS.'] },
  pontuacaoSUS: { type: Number, required: true, min: 0, max: 100 },
  observacoes: { type: String, trim: true, maxlength: 5000 }
}, { timestamps: true });

module.exports = mongoose.model('AvaliacaoSUS', avaliacaoSUSSchema);
