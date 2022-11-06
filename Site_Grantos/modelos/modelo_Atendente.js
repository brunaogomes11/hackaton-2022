const mongoose = require('mongoose');

const atendenteSchema = mongoose.Schema({
    Nome: String,
    CNPJ: String,
    Senha: String,
    Cargo: String
},{collection: 'Atendentes'});

module.exports = mongoose.model('Atendentes',atendenteSchema);