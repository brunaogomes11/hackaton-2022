//Importações
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const rota_publica = require('./rotas/rota_publica');
const rota_cliente = require('./rotas/rota_cliente');
const rota_atendente = require('./rotas/rota_atendente');

const connection_Database = require('./mongo_db');
connection_Database();

const app = express();

//Node JSON
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }
    next();
});

//Importando os assets (css, js, ...)
app.use(express.static(__dirname + '/assets'));


//ROTAS PUBLICAS HTML
app.get('/',(req, res) =>{
    res.sendFile(__dirname + '/html/index.html');
});

app.get('/registrar',(req, res) =>{
    res.sendFile(__dirname + '/html/registrar.html');
});

app.get('/login',(req, res) =>{
    res.sendFile(__dirname + '/html/login.html');
});

app.get('/login_empresarial',(req, res) =>{
    res.sendFile(__dirname + '/html/login_empresarial.html');
});

//ROTAS PUBLICAS
app.use('/auth', rota_publica);

//ROTAS CLIENTES
app.use('/cliente', rota_cliente);

//ROTAS ATENDENTE
app.use('/atendente', rota_atendente);

//Pegando Dados PRIVATE
/*app.get("/clientes/:id", checarToken, async (req, res) =>{
    const id = req.params.id

    const cliente = await Clientes.findById(id, '-Senha');

    if(!cliente){
        return res.status(404).json({'msg':'Usuário não encontrado'});
    }
    
    res.status(200).json({ cliente });
});

function checarToken(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

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

}*/

/*app.get('/about',(req, res, next) =>{
    res.sendFile(__dirname + '/html/about.html');
});

app.use('/api',rota_geral);

app.use((req, res, next) =>{
    res.status(404).sendFile(__dirname + '/html/error.html');
})*/

module.exports = app;