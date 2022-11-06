/*----------------Variaveis----------------*/

var params = {
    container: document.getElementById('anima'),
    renderer: 'svg',
    loop: false,
    autoplay: true,
    path: './json/logo.json'
};

/*----------------Funções----------------*/

function iniciar(){
    lottie.loadAnimation(params);
}

/*----------------Events----------------*/

window.addEventListener('load', iniciar);