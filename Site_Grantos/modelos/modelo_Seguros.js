const mongoose = require('mongoose');

const segurosSchema = mongoose.Schema({
    Tipo: String,
    Valor: String,
    Data: String,
    CPF_Destinatario: String,
    Estado: String
},{collection: 'Seguros'});

module.exports = mongoose.model('Seguros',segurosSchema);