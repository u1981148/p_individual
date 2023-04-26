var load_obj = function(){
	var vue_instance = new Vue({
		el: "#saves_id",
		data: {
			saves: []
		},
		created: function(){
			let arrayPartides = [];
			if(localStorage.partides){
				arrayPartides = JSON.parse(localStorage.partides);
				if(!Array.isArray(arrayPartides)) arrayPartides = [];
			}
			this.saves = arrayPartides;
			console.log(this.saves);
		},
		methods: { 
			load: function(i){
				sessionStorage.idPartida = i;
				if(this.saves[i].infinite){
					loadpage("../html/phasergame_infinite.html");
				}
				else{
					loadpage("../html/phasergame.html");
				}
			}
		}
	});
	return {}; 
}();

