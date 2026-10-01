const mongoose = require('mongoose');
const dns = require('node:dns');
dns.setServers(["8.8.8.8", "1.1.1.1"]);
module.exports = () => mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB conectado.'));
