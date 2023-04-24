var menu = new Vue({
	el: "#menu_id",
	data: {
		divided: false,
	},
	created: function () {
		this.divided= false
	},
	methods: {
		divideGame() {
		  // Obtiene el elemento del botón del juego Phaser
		  this.divided = !this.divided
		  console.log(this.divided)
		},
		load() {
		  // Lógica para el botón Load Game
		  loadpage("./html/load.html");
		},
		options() {
		  // Lógica para el botón Options
		  loadpage("./html/options.html");
		},
		exit() {
		// Lógica para el botón Exit
		  	if (name != ""){
				alert("Leaving " + name + "'s game");
			}
			name = "";
			loadpage("../index.html");
		},
		option1() {
		  // Lógica para la opción normal
		  loadpage("./html/phasergame.html");
		},
		option2() {
		  // Lógica para la opción 2
		}
	  }
});