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
    console.log(stringUrl);
    let stringCompleta = 'https://hackathon-chinelinho.herokuapp.com/auth/login_atendente'+stringUrl;
    console.log(stringCompleta);
    const dados = await fetch(stringCompleta);
    const resul = await dados.json();
    msgBack.innerHTML = resul.msg;
    if(dados.status !=200){
        msgBack.classList.add('error');
        msgBack.classList.remove('boa');
        temporizador = setTimeout(limparMensagem, 4000);
    }else{
        msgBack.classList.add('boa');
        msgBack.classList.remove('error');
        temporizador = setTimeout(limparMensagem, 4000);
        let dadosString = stringUrl.split('/');
        cnpj = dadosString[0];

        localStorage.setItem('token',resul.token);
        localStorage.setItem('cnpj',cnpj);
        localStorage.setItem('nome_empresa',resul.nome);
        window.location.href = `../atendente/dashboard/${localStorage.getItem('token')}`;
    }
}

function limparMensagem(){
    msgBack.classList.remove('error');
    msgBack.classList.remove('boa');
}