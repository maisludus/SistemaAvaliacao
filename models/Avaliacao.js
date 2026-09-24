const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  key: { type: String, required: true },
  text: { type: String, required: true },
  value: { type: Number, required: true, min: 1, max: 7 }
}, { _id: false });

const avaliacaoSchema = new mongoose.Schema({
  jogo: { type: String, required: true, trim: true, maxlength: 120 },
  respostasEscala: { type: [questionSchema], validate: [(items) => items.length === 13, 'Informe todas as 13 questões de escala.'] },
  beneficios: { type: String, required: true, trim: true, maxlength: 5000 },
  dificuldades: { type: String, required: true, trim: true, maxlength: 5000 },
  sugestoes: { type: String, required: true, trim: true, maxlength: 5000 },
  bugs: { type: String, default: '', maxlength: 10 * 1024 * 1024 }
}, { timestamps: true });

module.exports = mongoose.model('Avaliacao', avaliacaoSchema);
