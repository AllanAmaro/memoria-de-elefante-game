var pontuacao = 0;
var qtdeDeEscolhas = 0;
var tamanhoDaSequencia = 4;
var sequenciaSorteada = [], historicoSeqSorteada = [], sequenciaJogador = [], historicoSeqJogador = [];
var luzVerde, luzAzul, luzVermelho, luzAmarelo, luzRosa, luzLaranja;

var jogadorPerdeu = false;
var jogoConsole;

function carrega() {
	console.log('Carregando...');
	jogoConsole = new JogoConsole();
	carregaLuzes();
	console.log('Carregamento concluído');
}

function jogar() {
	carregaJogo();
	jogoConsole.escondeJanelaNovoJogo();
	setTimeout(() => {
		inicia();
	}, 600);	
}

async function inicia() {	
	jogoConsole.desabilitaConsoleJogador();
	sorteiaSequencia();
	await mostraSequenciaSorteada();
	jogoConsole.habilitaConsoleJogador();
}

function novoJogo() {
	jogoConsole.exibeJanelaNovoJogo();
}

function carregaJogo() {
	pontuacao = 0;
	jogoConsole.atualizaPlacar(pontuacao);
	qtdeDeEscolhas = 0;
	tamanhoDaSequencia = 4;
	sequenciaSorteada = []; 
	historicoSeqSorteada = [];
	sequenciaJogador = [];
	historicoSeqJogador = [];
	jogadorPerdeu = false;
}

function sorteiaSequencia() {
	tamanhoDaSequencia += pontuacao;
	
	if (sequenciaSorteada.length === 0) {
		//Primeira rodada do jogo
		geraPrimeiraSequencia();
	} else {
		//Rodadas sequintes
		sequenciaSorteada.push(gerarNumeroEntreUmESeis());
	}	

	registraHistoricoSequenciaSorteada();
}

function geraPrimeiraSequencia() {
	for (var i = 0; i < tamanhoDaSequencia; i++) {
		sequenciaSorteada.push(gerarNumeroEntreUmESeis());
	}
}

function gerarNumeroEntreUmESeis() {
	return (Math.floor(Math.random() * 5) + 1);
}

function carregaLuzes() {
	luzVerde = new Luz(1, document.getElementById('luz-verde'), 'luz-verde-acesa');
	luzAzul = new Luz(2, document.getElementById('luz-azul'), 'luz-azul-acesa');
	luzVermelho = new Luz(3, document.getElementById('luz-vermelho'), 'luz-vermelho-acesa');
	luzAmarelo = new Luz(4, document.getElementById('luz-amarelo'), 'luz-amarelo-acesa');
	luzRosa = new Luz(5, document.getElementById('luz-rosa'), 'luz-rosa-acesa');
	luzLaranja = new Luz(6, document.getElementById('luz-laranja'), 'luz-laranja-acesa');
}

async function mostraSequenciaSorteada() {

	for (var i = 0; i < sequenciaSorteada.length; i++) {
		if (sequenciaSorteada[i] === luzVerde.id) {			
			await luzVerde.piscar();
		}
		else if (sequenciaSorteada[i] === luzAzul.id) {
			await luzAzul.piscar();
		}
		else if (sequenciaSorteada[i] === luzVermelho.id) {
			await luzVermelho.piscar();
		}
		else if (sequenciaSorteada[i] === luzAmarelo.id) {
			await luzAmarelo.piscar();
		}
		else if (sequenciaSorteada[i] === luzRosa.id) {
			await luzRosa.piscar();
		}
		else if (sequenciaSorteada[i] === luzLaranja.id) {
			await luzLaranja.piscar();
		}

	}

	return 0;

}

function registraHistoricoSequenciaSorteada() {
	historicoSeqSorteada.push(sequenciaSorteada);
}

async function luzEscolhida(idLuzEscolhida) {
	sequenciaJogador.push(idLuzEscolhida);
	qtdeDeEscolhas++;

	jogoConsole.desabilitaConsoleJogador();
	await verificaEscolha();
	if (!jogadorPerdeu) {
		verificaPontuacao();
	}
	else {
		novoJogo();
	}
}

function jogadorPontua() {
	pontuacao++;
	qtdeDeEscolhas = 0;
	sequenciaJogador.length = 0;
	jogoConsole.atualizaPlacar(pontuacao);
}

function jogadorPerde() {
	jogadorPerdeu = true;
}

function verificaEscolha() {
	let index = 0;
	return new Promise(resolve => {
		resolve(

			sequenciaJogador.forEach(idLuzEscolhida => {
				if (idLuzEscolhida !== sequenciaSorteada[index]) {
					jogadorPerde();
				}					
				index++;
			})

		);
	});

}

function verificaPontuacao() {
	if (qtdeDeEscolhas === sequenciaSorteada.length && !jogadorPerdeu) {
		jogadorPontua();
		inicia();
	} else {
		jogoConsole.habilitaConsoleJogador();
	}
}
