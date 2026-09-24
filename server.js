require('dotenv').config();
const express = require('express');
const path = require('path');
const connectDatabase = require('./config/database');
const avaliacaoRoutes = require('./routes/avaliacaoRoutes');
const usabilidadeRoutes = require('./routes/usabilidadeRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', avaliacaoRoutes);
app.use('/', usabilidadeRoutes);
app.use((req, res) => res.status(404).render('404', { title: 'Página não encontrada' }));

connectDatabase().then(() => app.listen(port, () => console.log(`Aplicação disponível em http://localhost:${port}`)))
  .catch((error) => { console.error('Não foi possível iniciar a aplicação:', error.message); process.exit(1); });
