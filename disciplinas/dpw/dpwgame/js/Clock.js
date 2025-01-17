function Clock() {
	this.z = 1000000000000000000; //deve ser o �ltimo a interagir
	this.weeks = 16;
	this.days = 0;
	this.hours = 0;
	//this.lastWeek = 16;
	this.string = "";
	this.textObject = new TextFixed();
	this.textObject.setup("TEMPO:", 10, 395, "bold 9pt sans-serif");
	this.textObject.alpha = 0.25;
	Game.addObject(this.textObject);

	this.update = function(dt) {
		if  ((this.weeks==0) && (this.days==0) && (this.hours==0))  { //o tempo acabou!
			if (Game.playing) Game.gameOver();
		}  
		else {
			var previousFrame = this.currentFrame;
			Clock.prototype.update.call(this, dt);
			if (this.currentFrame>previousFrame) {
				this.hours--;
				if (this.hours<0) {
					this.hours = 24;
					this.days--;
				}
				if (this.days<0)	{
					this.days = 6;
					this.weeks--;
				}
			}
			var hoursString = this.hours.toString();
			if (this.hours < 10) hoursString = "0" + hoursString;
			this.textObject.message = "TEMPO: " + this.weeks + " semanas " + this.days + " dias " + hoursString + " horas";
		}
    }

	this.draw = function(context, xScroll, yScroll)   {
        this.textObject.draw(context, xScroll, yScroll);
	}

	this.isTimeout = function() {
		return (this.weeks>=this.lastWeek); //� preciso interromper apenas na pr�xima intera��o para que seja apresentado na tela o valor da �ltima semana
	}

}
Clock.prototype = new AnimatedObject;