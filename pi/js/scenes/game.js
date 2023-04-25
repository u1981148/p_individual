class GameScene extends Phaser.Scene {
    constructor (){
        super('GameScene');
		this.cards = null;
		this.firstClick = null;
		this.score = 100;
		this.correct = 0;
		this.mostrantError=false;
    }

    preload (){	
		this.load.image('back', '../resources/back.png');
		this.load.image('cb', '../resources/cb.png');
		this.load.image('co', '../resources/co.png');
		this.load.image('sb', '../resources/sb.png');
		this.load.image('so', '../resources/so.png');
		this.load.image('tb', '../resources/tb.png');
		this.load.image('to', '../resources/to.png');
		this.load.image('boton', '../resources/boton.png');
	}
	
    create (){	
		let cartes = ['co', 'co', 'cb', 'cb', 'sb', 'sb', 'so', 'so', 'tb', 'tb', 'to', 'to'];
		this.cameras.main.setBackgroundColor(0xBFFCFF);
		var json = localStorage.getItem("config") || '{"cards":2,"dificulty":"hard"}';
		var options_data = JSON.parse(json);
		var cartes_d = options_data.cards;
		var dificultat = options_data.dificulty;
		var espaiX = cartes_d/2 * 96;
		var espaiY = cartes_d/2 * 128;
		if (cartes_d > 5){ var f = 3; var c = 4;}
		else{var f = 2; var c = cartes_d;}
		var restaPunts = null;
		var temps = null;
		if (dificultat == "easy"){
			restaPunts = 5;
			temps = 2000;
		}
		else if (dificultat == "normal"){
			restaPunts = 10;
			temps = 1000;
		}
		else {
			restaPunts = 20;
			temps = 500;
		}
		var json_c = sessionStorage.getItem("cartes");
		var cartes_g = JSON.parse(json_c);
		if(cartes_g==null || cartes_g.arraycards_s==null || cartes_g.nCartes!=cartes_d){
			var arraycards = cartes.slice(0, cartes_d * 2)
			arraycards.sort((a, b) => 0.5 - Math.random());
			let cart=0;
			for (let i = 0; i < c; i++){
				for (let j = 0; j < f; j++){
					this.add.image(i*125 + this.cameras.main.centerX - espaiX, j*150 + this.cameras.main.centerY - espaiY/2, arraycards[cart]);
					cart += 1;	
				}
			}
		}
		else{
			var arraycards = cartes.slice(0, cartes_d * 2)
			arraycards = cartes_g.arraycards_s;
			let cart=0;
			console.log(arraycards);
			for (let i = 0; i < c; i++){
				for (let j = 0; j < f; j++){
					this.add.image(i*125 + this.cameras.main.centerX - espaiX, j*150 + this.cameras.main.centerY - espaiY/2, arraycards[cart]);
					cart += 1;	
				}
			}
		}
		this.cards = this.physics.add.staticGroup();
		setTimeout(() => {
			for (let i = 0; i < c; i++){
				for (let j = 0; j < f; j++){
					this.cards.create(i*125 + this.cameras.main.centerX - espaiX, j*150 + this.cameras.main.centerY - espaiY/2, 'back');
				}
			}
			let i = 0;
			this.cards.children.iterate((card)=>{
				card.card_id = arraycards[i];
				i++;
				card.setInteractive();
				card.on('pointerup', () => {
					if(!this.mostrantError){
						card.disableBody(true,true);
						if (this.firstClick){
							if (this.firstClick.card_id !== card.card_id){
								this.score -= restaPunts;
								this.mostrantError=true;
								setTimeout(()=> {
									this.firstClick.enableBody(false, 0, 0, true, true);
									card.enableBody(false, 0, 0, true, true);
									this.mostrantError=false;
									this.firstClick = null;
								},temps)
								if (this.score <= 0){
									alert("Game Over");
									loadpage("../");
								}
							}
							else{
								this.correct++;
								if (this.correct >= cartes_d){
									alert("You Win with " + this.score + " points.");
									loadpage("../");
								}
								this.firstClick = null;
							}
						}
						else{
							this.firstClick = card;
						}
					}
				}, card);
			});
			
		}, temps)
		sessionStorage.clear()
        const button = this.add.sprite((f*125)-63 + this.cameras.main.centerX - espaiX, c*125 + this.cameras.main.centerY - espaiY, 'boton');
		button.scaleX = .2;
		button.scaleY = .2;
        button.setInteractive();
        const buttonText = this.add.text(0, 0, 'SAVE', { fontSize: '64px', fill: '#000', fontWeight: 'bold'});
        Phaser.Display.Align.In.Center(buttonText, button);
        button.on('pointerdown', () => {
			var guardar_part = {
				arraycards_s:arraycards,
				nCartes:cartes_d,
			}
			var user = sessionStorage.getItem("username","unknown");
			console.log(user);
            //sessionStorage.setItem("cartes", JSON.stringify(guardar_part));
			let partida = {
				username: this.user,
				arraycards_s:arraycards,
				nCartes:cartes_d,
				score: this.score
			}
			let arrayPartides = [];
			if(localStorage.partides){
				arrayPartides = JSON.parse(localStorage.partides);
				if(!Array.isArray(arrayPartides)) arrayPartides = [];
			}
			arrayPartides.push(partida);
			localStorage.partides = JSON.stringify(arrayPartides);
			//loadpage("../");
        });
	}
	
	update (){	}
}

