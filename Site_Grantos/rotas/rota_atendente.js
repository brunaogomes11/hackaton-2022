//Importações
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('node:path');

//Modelos do Banco de Dados
const SegurosPendentes = require('../modelos/modelo_SegurosPendentes');
const Seguros = require('../modelos/modelo_Seguros');
const Clientes = require('../modelos/modelo_Cliente');

//Endpoint Dashboard HTML
router.get('/dashboard/:token', checarTokenAtendente, (req, res) =>{
    res.sendFile('dashboard_atendente.html', { root: path.join(__dirname, '../html') });
});

//Endpoint Buscar Seguros Pendentes
router.get('/seguros_pendentes/:token', checarTokenAtendente, async (req, res) =>{
    const segurosExistentes = await SegurosPendentes.find({});
    res.status(200).json({segurosExistentes});
});

//Endpoint Buscar Clientes
router.get('/clientes/:token/:cnpj', checarTokenAtendente, async (req, res) =>{
    const cnpj = req.params.cnpj;
    const clienteEscolhido = await Clientes.find({CNPJ: cnpj},{_id: 0, Senha: 0});
    res.status(200).json({clienteEscolhido});
});

//Endpoint Mudar Seguros Pendentes pra Seguros
router.get('/seguros_pendentes/:token/:data/:decisao', checarTokenAtendente, async (req, res) =>{
    const {data, decisao} = req.params;
    const segurosExistentes = await SegurosPendentes.findOne({Data: data});
    if(segurosExistentes){
        const seguro_escolhido = new Seguros({
            Tipo: segurosExistentes.Tipo,
            Valor: segurosExistentes.Valor,
            Data: segurosExistentes.Data,
            CPF_Destinatario: segurosExistentes.CPF_Destinatario,
            Estado: decisao
        });

        try {
            await seguro_escolhido.save();
            const deletado = await SegurosPendentes.deleteOne({Data: data});
            res.status(201).json({'msg':'Seguro editado'})
        } catch (error) {
            return res.status(500).json({'msg': 'Erro no Servidor'});
        }
    }
    res.status(200).json({segurosExistentes});
});

//Endpoint 404
// router.use((req, res) => {
//     res.sendFile('404.html', { root: path.join(__dirname, '../html') });
// });

//Função checar Token-Cliente
function checarTokenAtendente(req, res, next){
    const authHeader = req.params.token;
    //const authHeader = req.headers['authorization'];
    //const token = authHeader && authHeader.split(" ")[1];
    const token = authHeader;
    if(!token){
        return res.status(401).json({'msg': 'Acesso Negado'});
    }
    try {
        const secret = process.env.SECRET_ATENDENTE;
        jwt.verify(token, secret);
        next();

    } catch (error) {
        res.status(400).json({'msg': 'Token Inválido'});
    }
}

module.exports = router;