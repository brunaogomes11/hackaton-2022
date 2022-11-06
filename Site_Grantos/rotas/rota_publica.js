//Importações
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('node:path');

//Modelos do Banco de Dados
const Clientes = require('../modelos/modelo_Cliente');
const Atendentes = require('../modelos/modelo_Atendente');

//Endpoint Registro
router.get('/registro/:cnpj/:nomeEmpresa/:senha/:confirmaSenha', async (req, res) =>{
    const {cnpj, nomeEmpresa, senha, confirmaSenha} = req.params;
    if(!cnpj){
        return res.status(422).json({'msg': 'CNPJ é obrigátorio'});
    }
    if(!nomeEmpresa){
        return res.status(422).json({'msg': 'O nome da empresa é obrigátorio'});
    }
    if(!senha){
        return res.status(422).json({'msg': 'A senha é obrigátoria'});
    }
    if(!confirmaSenha){
        return res.status(422).json({'msg': 'A senha é obrigátoria'});
    }

    if(!(senha == confirmaSenha)){
        return res.status(422).json({'msg': 'As senhas estão diferentes'});
    }

    const usuarioExistente = await Clientes.findOne({CNPJ: cnpj});
    if(usuarioExistente){
        return res.status(422).json({'msg': 'Cliente já cadastrado'});
    }

    const salt = await bcrypt.genSalt(12);
    const hashSenha = await bcrypt.hash(senha, salt);

    const cliente = new Clientes({
        CNPJ: cnpj,
        Nome_Empresa: nomeEmpresa,
        Senha: hashSenha
    });

    try {
        await cliente.save();
        res.status(201).json({'msg':'Cliente cadastrado'})
    } catch (error) {
        return res.status(500).json({'msg': 'Erro no Servidor'});
    }
});

//Endpoint Login Cliente
router.get('/login_cliente/:cnpj/:senha', async (req, res) =>{
    const {cnpj, senha} = req.params;

    if(!senha){
        return res.status(422).json({'msg': 'A senha é obrigátoria'});
    }
    if(!cnpj){
        return res.status(422).json({'msg': 'O CNPJ é obrigátorio'});
    }

    const usuarioExistente = await Clientes.findOne({CNPJ: cnpj});
    if(!usuarioExistente){
        return res.status(404).json({'msg': 'Usuário ou Senha inválida'});
    }

    hashSenha = await bcrypt.compare(senha, usuarioExistente.Senha);

    if(!hashSenha){
        return res.status(404).json({'msg': 'Usuário ou Senha inválida'});
    }

    try {
        const secret = process.env.SECRET_CLIENTE
        const token = jwt.sign(
            {
                id: usuarioExistente.id,
            },
            secret,
        );

        res.status(200).json({'msg': 'Usuário logado com sucesso', 'token': token,'nome': usuarioExistente.Nome_Empresa});

    } catch (error) {
        return res.status(500).json({'msg': 'Erro no Servidor'});
    }
});

//Endpoint Login Atendente
router.get('/login_atendente/:cnpj/:senha', async (req, res) =>{
    const {cnpj, senha} = req.params;

    if(!senha){
        return res.status(422).json({'msg': 'A senha é obrigátoria'});
    }
    if(!cnpj){
        return res.status(422).json({'msg': 'O cnpj é obrigátorio'});
    }

    const atendenteExistente = await Atendentes.findOne({CNPJ: cnpj});

    if(!atendenteExistente){
        return res.status(404).json({'msg': 'Usuário ou Senha inválida'});
    }

    hashSenha = await bcrypt.compare(senha, atendenteExistente.Senha);

    if(!hashSenha){
        return res.status(404).json({'msg': 'Usuário ou Senha inválida'});
    }

    try {
        const secret = process.env.SECRET_ATENDENTE
        const token = jwt.sign(
            {
                id: atendenteExistente.id,
            },
            secret,
        );

        res.status(200).json({'msg': 'Atendente logado com sucesso', token});

    } catch (error) {
        return res.status(500).json({'msg': 'Erro no Servidor'});
    }
});

//Endpoint 404
// router.use((req, res) => {
//     res.sendFile('404.html', { root: path.join(__dirname, '../html') });
// });

module.exports = router;