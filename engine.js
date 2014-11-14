/*

@General Description
	This is a Javascript and HTML5 canvas game that
	tests the a player's reaction. When the square
	turns green, the user should click as fast as 
	they can. Their reaction time is calculated
	and averaged.

@Developer Description
	**This code is meant to help beginners.
	**I advise you to check out elocade.com

	The program was documented and organized so that 
	learning and manipulating it is easy for anyone. 
	This game is not exactly the same as the one seen on Elocade, 
	a lot of material was cut down so it is easier to understand for beginners. 
	Furthermore, code was not optimized for maximum efficiency 
	as it would cloud my original intention, to teach. I don't mean 
	to undervalue effiency, and it is definitely crucial as you advance 
	in your development career. But for the sake of learning, I kept it simple!
	I hope this serves useful for you new developers! I look forward to seeing you 
	produce your own games. If you have any questions,suggestions, or critique 
	shoot me an email!

@origin 
	http://elocade.com/games/elotap/

@author
	Numaer Zaker

@date
	11/13/14

@email 
	znzaker@gmail.com
*/



//Initialize Canvas
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
canvas.height = window.innerHeight-200;
canvas.width = canvas.height*2/3;


window.onload=function(){


var inResponse = false; //player should click
var clicked = false; //player clicks
var status = "Tap to begin..";
var inStart = false;

//Statistic variable
var sum = 0.;
var average = 0;
var playCount = 0; 

//Timer variables
var start; 
var end;
var timeTake;
var counter = 0;

var colorMascot = "rgb(250, 218, 114)";
var mascot;

ctx.font= 30 +"px garamond";
//Main game function (reloading through threads)

canvas.style.background = 'rgba(140, 114, 191,.5)';
mascot = new boxObject();

	/* 
	This function is being called repeatedly to update
	the counter and it is what allows for the square
	to update at a random probability.

	variables
		counter 
			keeps track of how much time has elapsed
			since the beginning of the game. A value of 100
			would mean that one second has elapsed. 

		inResponse
			true/false value of whether or not square is
			green and the player should click.
	
		clicked
			checks to see if the user has clicked.
			It is set to false when the click has been 
			evaluated

	*/
	function driver(){
		counter++;

		/*
		
		Block determines whether or not to
		change the square to happy.

		boolean
			counter%50==0 
				True every .5 seconds.
			counter
				True if at least 1 second as elapsed.
		*/
		if (counter%50 == 0 && counter > 100){
			if (Math.random() < Math.random()){
				inResponse = true;

				//Update to green square
				colorMascot = 'rgb(50, 200, 100)';
				status = "Click now!"
				ctx.clearRect(0,0,canvas.width, canvas.height);
				mascot.draw();

				//Set begin time, used to calculate reaction
				start = Date.now();

				//Break out of driver
				return; 
			}
		}

		/*
		Break out if user clicks too early.
		*/

		if (!inResponse && clicked){
			clicked = false;
			return;
		}

		//Loop
		else{
			setTimeout(driver, 10);	
		}
	}



	/*
	Box object that is drawn onto the canvas.
	*/
	function boxObject(){
	    this.x = canvas.width / 2;
	    this.y = canvas.height / 2;

	    //Draw character
	   	this.radius = 70 ;
		this.eyeRadius = 10 ;
		this.eyeXOffset = 30 ;
		this.eyeYOffset = 10 ;
		this.eyeX = this.x - this.eyeXOffset;
		this.eyeY = this.y - this.eyeYOffset;
		this.eyeX2 = this.x + this.eyeXOffset;

		/*
		Function to draw the box onto the canvas.
		*/
	    this.draw = function(){
		      ctx.beginPath();
			  ctx.rect(this.x-60, this.y-50, 120 , 100);
			  ctx.fillStyle = colorMascot;
			  ctx.fill();
			  ctx.lineWidth = 5;
			  ctx.strokeStyle = 'black';
			  ctx.stroke();
			  ctx.closePath();
			  // draw the eyes
			  ctx.beginPath();

			  //Happy square
			  if (inResponse){
				 ctx.arc(this.eyeX, this.eyeY, this.eyeRadius, 0, 1 * Math.PI, true);
			 	 ctx.arc(this.eyeX2, this.eyeY, this.eyeRadius, 0, 1 * Math.PI, true);
			  }

			  //Wait square
			  else{
			  	ctx.arc(this.eyeX, this.eyeY, this.eyeRadius, 0, 2 * Math.PI, true);
			 	ctx.arc(this.eyeX2, this.eyeY, this.eyeRadius, 0, 2 * Math.PI, true);
			  }
			  ctx.fillStyle = 'black';
			  ctx.fill();
			  // draw the mouth
			  ctx.closePath();
			  ctx.beginPath();
			  if (inResponse)
			  	ctx.arc(this.x, this.y+10 , 15 , 0, Math.PI, false);
			  else{
			  	ctx.arc(this.x, this.y+10 , this.eyeRadius, 0, 2 * Math.PI, false);
			  	ctx.strokeStyle = 'black';
			  }
			  ctx.stroke();
			  ctx.closePath();
    }
}

	/**
	Function to analyze a click. If a click occurs
	when the square turns green, the statistics are
	updated. Otherwise if the player clicks too early,
	the game resets. This is to prevent cheating by spam
	clicking.


	User reaction is calculated by taking the difference between
	the time when the green turns green, and when the user clicks
	after it turns green.

	**/
	function checkClick(){

		/*

		Handle the click if the user clicks when
		the square turns green. The statistics
		are updated, the game is reset, and the
		square is updated.

		*/
		if (inResponse){

			//Update stats
			playCount++
			end = Date.now();
			timeTake = end - start; 
			sum += timeTake;
			average = sum/playCount;
			
			//Reset game
			inResponse = false;
			clicked = false;
			inStart = false;
			counter = 0;

			//Update art
			document.getElementById('notify').innerHTML = "Your reaction time was: " + timeTake + "<br>Average: " + (parseFloat(average).toFixed(2)) + "<br> Playcount: " + playCount;
			colorMascot = 'rgb(114, 182, 191)'
			status = "Tap to go again";
			ctx.clearRect(0,0,canvas.width, canvas.height);
			ctx.fillText(status, 20, canvas.height/5);
			mascot.draw();
			
		} 

		/*
		
		Handle the click if the user clicks too early.
		The variables are reset and waits until the user
		clicks again to begin the game.		

		*/
		else if (!inResponse){
			inStart = false;
			counter = 0;
			status = "Too fast! Tap again.";
			colorMascot = 'rgb(210, 114, 128)';
			ctx.clearRect(0,0,canvas.width, canvas.height);
			ctx.fillText(status, 20, canvas.height/5);
			mascot.draw();
		}
	}



	

	/*

	If a game is not in progress,
	clicking begins the game. Otherwise, when the canvas
	is clicked and the game is in progress, we validate
	the click.

	*/

	function registerClick(){
		/*
		This is triggered when the game isn't in progress.
		The board is cleared and variables are changed
		to begin the game. The driver call begins the counter.
		After that, the art updates to the "Waiting" square.
		*/
    	if (!inStart){
    		inStart = true;
			inResponse = false;
    		status = "Wait for it..";
    		driver();
    		ctx.clearRect(0,0,canvas.width, canvas.height);
    		ctx.fillText(status, 20, canvas.height/5);
    		colorMascot = "rgb(250, 218, 114)";
    		mascot.draw();
    		return; //To break function
    	}

    	//Validate the click
    	if (!clicked){
    		clicked = true;
    		checkClick();
    	}
	}


	/*
	Add an event listener to the canvas to detect if
	the user clicks.
	*/
	canvas.addEventListener("mousedown", function (e) {
		registerClick();
	});

	canvas.addEventListener("touchstart", function (e) {
		registerClick();
	});
		

}




