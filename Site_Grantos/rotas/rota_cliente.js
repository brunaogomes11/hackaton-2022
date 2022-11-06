//Importações
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('node:path');

//Modelos do Banco de Dados
const Seguros = require('../modelos/modelo_Seguros');
const SegurosPendentes = require('../modelos/modelo_SegurosPendentes');

//Endpoint Dashboard HTML
router.get('/dashboard/:token', checarTokenCliente, (req, res) =>{
    res.sendFile('dashboard_cliente.html', { root: path.join(__dirname, '../html') });
});

//Endpoint Buscar Seguros 
router.get('/seguros/:token/:cpf', checarTokenCliente, async (req, res) =>{
    const cpf = req.params.cpf;
    console.log(cpf);
    const segurosExistentes = await Seguros.find({CPF_Destinatario: cpf});
    res.status(200).json({segurosExistentes});
});

//Endpoint Criar Seguro 
router.get('/seguros/:token/:tipo/:valor/:data/:cpf_dest/:nome_empresa', checarTokenCliente, async (req, res) =>{
    const {tipo, valor, data, cpf_dest, nome_empresa} = req.params;
    console.log(cpf_dest);
    if(!tipo){
        return res.status(422).json({'msg': 'O tipo do seguro é obrigátorio'});
    }
    if(!valor){
        return res.status(422).json({'msg': 'O valor do seguro é obrigátorio'});
    }
    if(!data){
        return res.status(422).json({'msg': 'A data do seguro é obrigátoria'});
    }
    if(!cpf_dest){
        return res.status(422).json({'msg': 'O CNPJ do destinatário é obrigátorio'});
    }
    if(!nome_empresa){
        return res.status(422).json({'msg': 'O nome da empresa do destinatário é obrigátorio'});
    }

    const seguro_pendente = new SegurosPendentes({
        Tipo: tipo,
        Valor: valor,
        Data: data,
        CNPJ_Destinatario: cpf_dest,
        Nome_Empresa_Destinatario: nome_empresa,
    });

    try {
        await seguro_pendente.save();
        res.status(201).json({'msg':'Seguro adicionado'})
    } catch (error) {
        return res.status(500).json({'msg': 'Erro no Servidor'});
    }
});

//Endpoint 404
// router.use((req, res) => {
//     res.sendFile('404.html', { root: path.join(__dirname, '../html') });
// });

//Função checar Token-Cliente
function checarTokenCliente(req, res, next){
    const authHeader = req.params.token;
    //const authHeader = req.headers['authorization'];
    //const token = authHeader && authHeader.split(" ")[1];
    const token = authHeader;
    if(!token){
        return res.status(401).json({'msg': 'Acesso Negado'});
    }
    try {
        const secret = process.env.SECRET_CLIENTE;
        jwt.verify(token, secret);
        next();

    } catch (error) {
        res.status(400).json({'msg': 'Token Inválido'});
    }
}

module.exports = router;