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
		var arraycards = cartes.slice(0, cartes_d * 2)
		arraycards.sort((a, b) => 0.5 - Math.random());
		var cart=0;
		for (let i = 0; i < c; i++){
			for (let j = 0; j < f; j++){
				this.add.image(i*125 + this.cameras.main.centerX - espaiX, j*150 + this.cameras.main.centerY - espaiY/2, arraycards[cart]);
				cart += 1;	
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
								this.firstClick.enableBody(false, 0, 0, true, true);
								setTimeout(()=> {
									card.enableBody(false, 0, 0, true, true);
									this.mostrantError=false;
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
							}
							this.firstClick = null;
						}
						else{
							this.firstClick = card;
						}
					}
				}, card);
			});
			
		}, temps)
	}
	
	update (){	}
}

