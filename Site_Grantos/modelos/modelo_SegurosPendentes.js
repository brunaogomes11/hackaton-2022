const mongoose = require('mongoose');

const segurosPendentesSchema = mongoose.Schema({
    Tipo: String,
    Valor: String,
    Data: String,
    CNPJ_Destinatario: String,
    Nome_Empresa_Destinatario: String
},{collection: 'SegurosPendentes'});

module.exports = mongoose.model('SegurosPendentes',segurosPendentesSchema);