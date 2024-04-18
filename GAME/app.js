let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// let titulo = document.querySelector('h1');                CRIANDO UMA VAR PARA GUARDADR A SELEÇÃO DO H1
// titulo.innerHTML = 'Jogo do número secreto';

// let paragrafo = document.querySelector('p');                 // CRIANDO UMA VAR QUE ARMAZENA O (ELEMENTO) (O CAMPO) OU (TAG) DO PARAGRAFO
// paragrafo.innerHTML ='Escolha um número entre 1 e 10';

function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2}); // FALARIA OS TEXTOS DOS TÍTULOS PORÉM A API NÃO ESTÁ FUNCIONANDO
}

function mensagemInicial(){
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

mensagemInicial();


function verificarChute() {
    let chute = document.querySelector('input').value;

    if(chute == numeroSecreto){
    exibirTextoNaTela('h1', 'Acertou!');
    let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
    let mensagemTentativas = `Vc descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
    exibirTextoNaTela('p', mensagemTentativas);
    document.getElementById('reiniciar').removeAttribute('disabled'); // AQUI EU PEGO O SEGUNDO BOTÃO DO HTML NA LINHA 28 E BUSCO PELO ID POIS TEMOS 2 BOTÕES
    }else{
        if(chute > numeroSecreto){
            exibirTextoNaTela('p', `O número secreto é menor que ${chute}`);
        }else{
            exibirTextoNaTela('p', `O número secreto é maior que ${chute}`);
        }
        tentativas++;
        limparCampo(); // AQUI EU CHAMO A FUNÇÃO QUE ESTÁ DECLARADA LÁ EM BAIXO
    }

}

function gerarNumeroAleatorio(){
   let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
   let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

   if(quantidadeDeElementosNaLista == numeroLimite){
    listaDeNumerosSorteados = [];
   } 

   if(listaDeNumerosSorteados.includes(numeroEscolhido)){
    return gerarNumeroAleatorio();
   }else{
    listaDeNumerosSorteados.push(numeroEscolhido);
    console.log(listaDeNumerosSorteados);
    return numeroEscolhido;
   }
}

function limparCampo(){
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo(){         // TUDO QUE ESTÁ DENTRO DA FUNÇÃO ELE EXECUTA NO CLIQUE DO BOTÃO
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1; 
    mensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}