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
		mode1() {
		// Lógica para la opción normal
		  	name = prompt("User name");
		  	sessionStorage.setItem("playerName", name);
			loadpage("./html/phasergame.html");
		},
		mode2() {
		 	 // Lógica para la opción 2
			loadpage("./html/phasergame.html");
		  	name = prompt("User name");
		  	sessionStorage.setItem("username", name);
		}
	  }
});