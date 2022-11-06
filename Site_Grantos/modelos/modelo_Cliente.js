const mongoose = require('mongoose');

const clienteSchema = mongoose.Schema({
    CNPJ: String,
    Nome_Empresa: String,
    Senha: String,
    Genero: Number,
    Idade: Number,
    Debito: Number,
    Casado: Number,
    Possui_Conta_Banco: Number,
    Tipo_Industria: Number,
    Etnia: Number,
    Anos_Empregado: Number,
    Inadimplente: Number,
    Empregado: Number,
    Pontuacao_Credito: Number,
    Habilitado: Number,
    Cidadania: Number,
    Codigo_Postal: Number,
    Renda: Number
},{collection: 'Clientes'});

module.exports = mongoose.model('Clientes',clienteSchema);