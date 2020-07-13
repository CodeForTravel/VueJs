new Vue({
	el: '#app',
	data :{
		playerHealth:100,
		monsterHealth:100,
		gameIsRunning:false,
		turns:[]
	},
	methods:{
		startGame:function(){
			this.gameIsRunning = true;
			this.playerHealth = 100;
			this.monsterHealth = 100;
			this.turns = []
		},
		attack:function(){
			var damage = this.calDamage(3,10);
			this.monsterHealth -= damage;
			this.turns.unshift({
				isPlayer:true,
				text:'Player hits Monster for '+ damage
			});
			if (this.checkWin()){
				return;
			}
			this.monsterAttack();
			
		},
		sattack:function(){
			var damage = this.calDamage(10,20);
			this.monsterHealth -= damage;
			this.turns.unshift({
				isPlayer:true,
				text:'Player hits Monster hard for '+ damage
			});

			if (this.checkWin()){
				return;
			}
			this.monsterAttack();
		},
		monsterAttack:function(){
			var damage = this.calDamage(5,12);
			this.playerHealth -= damage;
			this.turns.unshift({
				isPlayer:false,
				text:'Monster hits Player for '+ damage
			});
			this.checkWin();
		},
		heal:function(){
			if(this.playerHealth <= 90 ){
				this.playerHealth += 10;
			}
			else{
				this.playerHealth = 100;
			}

			this.turns.unshift({
				isPlayer:true,
				text:'Player Heal up for 10'
			});


			this.monsterAttack();
		},
		gup:function(){
			this.gameIsRunning = false;
		},
		calDamage:function(min,max){
			return Math.max(Math.floor(Math.random()*max) + 1, min)
		},
		checkWin:function(){
			if(this.monsterHealth <= 0){
				if(confirm('You Won! New Game?')){
					this.startGame();
				}
				else{
					this.gameIsRunning = false;
				}
				return true;
			}
			else if(this.playerHealth <= 0){
				if(confirm('You Lose! New Game?')){
					this.startGame();
				}
				else{
					this.gameIsRunning = false;
				}
				return true;
			}
			return false;
		}
	}
});