class Luz {
	constructor(id, objetoHtml, nomeDaClasseLuzAcesa) {
		this.id = id;
		this.objetoHtml = objetoHtml;
		this.nomeDaClasseLuzAcesa = nomeDaClasseLuzAcesa;
	}

	async piscar() {
		await this.acende();
		await this.apaga();
		return 0;
	}
	
	acende(luz) {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve(this.objetoHtml.classList.add(this.nomeDaClasseLuzAcesa));
			}, 0.7);
		});
	}
	
	apaga(luz) {
		return new Promise(resolve => {
			setTimeout(() => {
				resolve(this.objetoHtml.classList.remove(this.nomeDaClasseLuzAcesa));
			}, 1000);
		});
	}
}