class JogoConsole {
    consoleJogador;
    placar;
    janelaNovoJogo;

    constructor() {
        this.carregaConsole();
    }

    carregaConsole() {
	    this.consoleJogador = document.getElementById(CONSOLE_JOGADOR);
        this.placar = document.getElementById(PLACAR);
        this.janelaNovoJogo = document.getElementById(JANELA_NOVO_JOGO);
    }

    desabilitaConsoleJogador() {
        this.consoleJogador.style.pointerEvents = 'none';
    }
    
    habilitaConsoleJogador() {
        this.consoleJogador.style.pointerEvents = 'all';
    }

    atualizaPlacar(pontuacao) {
        this.placar.innerHTML = pontuacao;
    }

    escondeJanelaNovoJogo() {
        this.janelaNovoJogo.style.display = 'none';
    }

    exibeJanelaNovoJogo() {
        this.janelaNovoJogo.style.display = '';
    }
}