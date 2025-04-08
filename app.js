// Cria uma lista (array) para guardar os números que já foram sorteados.
// Isso serve para evitar que o mesmo número seja escolhido duas vezes no jogo.
let listaDeNumerosSorteados = [];

// Define qual é o maior número que pode ser sorteado.
// No caso, o número secreto pode ser qualquer um de 1 até 10.
let numeroLimite = 10;

// Gera o primeiro número secreto assim que o jogo começa.
// Esse número é o que o jogador precisa adivinhar.
let numeroSecreto = gerarNumeroAleatorio();

// Começa contando que o jogador está na primeira tentativa.
// Toda vez que ele errar, esse número aumenta.
let tentativas = 1;

// Essa função serve para mostrar um texto na tela do site.
// Ela recebe dois valores: a "tag" (como h1 ou p) e o texto que deve aparecer.
function exibirTextoNaTela(tag, texto) {
    // Aqui ele procura na página uma parte que tenha a tag informada (como <h1> ou <p>)
    let campo = document.querySelector(tag);
    
    // Depois, troca o conteúdo dessa tag pelo texto que foi passado.
    campo.innerHTML = texto;

    // Essa linha usa uma biblioteca chamada responsiveVoice para "falar" o texto com uma voz.
    // É útil para acessibilidade ou para tornar o jogo mais interativo.
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

// Essa função mostra as mensagens iniciais do jogo:
// o título do jogo e a instrução para o jogador.
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

// Assim que o jogo começa (quando o código é carregado),
// essas duas linhas mostram as mensagens iniciais.
exibirTextoNaTela('h1', 'Jogo do número secreto');
exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');

// Essa é a função que é chamada quando o jogador clica no botão "Chutar".
// Ela verifica se o número que ele digitou está certo ou errado.
function verificarChute() {
    // Pega o valor que o jogador digitou no campo de texto (input).
    let chute = document.querySelector('input').value;

    // Aqui ele compara o número digitado (chute) com o número secreto.
    if (chute == numeroSecreto) {
        // Se acertou, mostra uma mensagem dizendo isso.
        exibirTextoNaTela('h1', 'Acertou !');

        // Decide se a palavra "tentativa" vai ficar no singular ou plural,
        // dependendo do número de tentativas feitas.
        let palavraTentativa = tentativas > 1 ? `tentativas` : `tentativa`;

        // Monta a frase que diz com quantas tentativas o jogador acertou.
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa} !`;

        // Mostra essa frase na tela.
        exibirTextoNaTela('p', mensagemTentativas);

        // Ativa o botão "Reiniciar", que antes estava desativado.
        document.getElementById('reiniciar').removeAttribute('disabled');

    } else {
        // Se o jogador errou, dá uma dica se o número secreto é maior ou menor.
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
        }

        // Aumenta a contagem de tentativas.
        tentativas++;

        // Limpa o campo de texto para o jogador tentar outro número.
        limparCampo();
    }
}

// Essa função gera um número aleatório entre 1 e o valor definido no numeroLimite.
// Além disso, ela garante que o número sorteado ainda não foi usado antes.
function gerarNumeroAleatorio() {
    // Cria um número aleatório entre 1 e o número limite.
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);

    // Guarda quantos números já foram sorteados até agora.
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    // Se já foram sorteados todos os números possíveis, limpa a lista para recomeçar.
    if (quantidadeDeElementosNaLista === numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    // Verifica se o número recém-gerado já está na lista (ou seja, já foi sorteado antes).
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        // Se já foi sorteado, chama a função de novo até encontrar um número novo.
        return gerarNumeroAleatorio();
    } else {
        // Se o número ainda não foi usado, adiciona ele na lista.
        listaDeNumerosSorteados.push(numeroEscolhido);
        
        // E então retorna esse número para ser usado no jogo.
        return numeroEscolhido;
    }
}

// Essa função limpa o campo de entrada onde o jogador digita o número.
function limparCampo() {
    chute = document.querySelector('input'); // Seleciona o campo de texto
    chute.value = ''; // Limpa o conteúdo dentro do campo
}

// Essa função reinicia o jogo, para o jogador jogar de novo.
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio(); // Sorteia um novo número secreto
    limparCampo(); // Limpa o campo de entrada
    tentativas = 1; // Reseta o número de tentativas
    exibirMensagemInicial(); // Mostra as mensagens iniciais novamente
    document.getElementById('reiniciar').setAttribute('disabled', true); // Desativa o botão "Reiniciar" até o jogador acertar de novo
}
