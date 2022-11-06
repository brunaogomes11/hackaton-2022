const btn_registrar = document.querySelector('.submitBtn');
const msgBack = document.querySelector('#mensagemBack');

var temporizador = setTimeout(1);

const inputs = document.querySelectorAll("input[type='text']");

btn_registrar.addEventListener('click', (e)=>{
    e.preventDefault();
    clearTimeout(temporizador);
    stringGet = '';
    inputs.forEach(element => {
        stringGet += '/' + element.value;
    });
    let filtro = Array.from(inputs).filter(input => input.value == "");
    if(filtro.length == 0){
        adicionarCliente(stringGet);
    }else{
        msgBack.innerHTML = 'Faltando Informações'
        msgBack.classList.add('error');
        msgBack.classList.remove('boa');
        temporizador = setTimeout(limparMensagem, 4000);
    }
});

async function adicionarCliente(stringUrl){
    let stringCompleta = 'https://hackathon-chinelinho.herokuapp.com/auth/registro'+stringUrl;
    const dados = await fetch(stringCompleta);
    const resul = await dados.json();
    msgBack.innerHTML = resul.msg;
    if(dados.status !=201){
        msgBack.classList.add('error');
        msgBack.classList.remove('boa');
        temporizador = setTimeout(limparMensagem, 4000);
    }else{
        msgBack.classList.add('boa');
        msgBack.classList.remove('error');
        temporizador = setTimeout(limparMensagem, 4000);
        logarUsuario(stringUrl);
    }
}

function limparMensagem(){
    msgBack.classList.remove('error');
    msgBack.classList.remove('boa');
}

async function logarUsuario(stringUrl){
    let dadosString = stringUrl.split('/');
    console.log(dadosString);
    nome = dadosString[2];
    cnpj = dadosString[1];
    senha = dadosString[3];

    let stringCompleta = 'https://hackathon-chinelinho.herokuapp.com/auth/login_cliente'+('/'+cnpj+'/'+senha);
    const dados = await fetch(stringCompleta);
    const resul = await dados.json();
    localStorage.setItem('token',resul.token);
    localStorage.setItem('cnpj',cnpj);
    localStorage.setItem('nome_empresa',nome);
    window.location.href = `../cliente/dashboard/${localStorage.getItem('token')}`;
}

function limparMensagem(){
    msgBack.classList.remove('error');
    msgBack.classList.remove('boa');
}