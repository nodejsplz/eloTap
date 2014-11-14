//Static Data
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//Initialize canvas dimensions
canvas.height = window.innerHeight-200;
canvas.width = canvas.height*2/3;
//


window.onload=function(){

var counter = 0; //timer
var inResponse = false; //player should click
var clicked = false; //player clicks

var status = "Tap to begin..";
var inStart = false;

var sum = 0.;
var average = 0;
var playCount = 0; 

var start;
var end;
var timeTake;


var colorMascot = "rgb(250, 218, 114)";
var mascot;

ctx.font= 30 +"px garamond";
//Main game function (reloading through threads)
canvas.style.background = 'rgba(140, 114, 191,.5)';
mascot = new boxObject();

	function update(){
		
		
		counter++;
		
		console.log(counter)

		// // 10 ms
		
		//Set probability
		if (counter%50 == 0 && !inResponse && counter > 100){ // every .5 seconds
				if (Math.random() < Math.random()){
					colorMascot = 'rgb(50, 200, 100)';
					status = "Click now!"
					inResponse = true;
					ctx.clearRect(0,0,canvas.width, canvas.height);
					mascot.draw();
					start = Date.now();
					return;
				}
		}
		if (!inResponse && clicked){
			clicked = false;
			return;
		}else{
			setTimeout(update, 10);	
		}
		
		

		
	}

	function boxObject(){
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
   	this.radius = 70 ;
	this.eyeRadius = 10 ;
	this.eyeXOffset = 30 ;
	this.eyeYOffset = 10 ;
	this.eyeX = this.x - this.eyeXOffset;
	this.eyeY = this.y - this.eyeYOffset;
	this.eyeX2 = this.x + this.eyeXOffset;

    this.draw = function(){
	      ctx.beginPath();
		  ctx.rect(this.x-60, this.y-50, 120 , 100 );
		  ctx.fillStyle = colorMascot;
		  ctx.fill();
		  ctx.lineWidth = 5;
		  ctx.strokeStyle = 'black';
		  ctx.stroke();
		  ctx.closePath();
		  // draw the eyes
		  ctx.beginPath();
		  if (inResponse){
			  ctx.arc(this.eyeX, this.eyeY, this.eyeRadius, 0, 1 * Math.PI, true);
		 	 ctx.arc(this.eyeX2, this.eyeY, this.eyeRadius, 0, 1 * Math.PI, true);
		  }
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

	function checkClick(){
		if (inResponse){
			playCount++
			end = Date.now();

    		colorMascot = 'rgb(114, 182, 191)'
			timeTake = end - start;
			sum += timeTake;
			average = sum/playCount;
			document.getElementById('hello').innerHTML = "Your reaction time was: " + timeTake + "<br>Average: " + (parseFloat(average).toFixed(2)) + "<br> Playcount: " + playCount;
			inResponse = false;
			clicked = false;
			inStart = false;
			counter = 0;
			status = "Tap to go again";
			ctx.clearRect(0,0,canvas.width, canvas.height);
			ctx.fillText(status, 20, canvas.height/5);
			mascot.draw();
			
		} 
		else if (!inResponse){
			inStart = false;

			counter = 0;
			status = "Too fast! Tap to restart";
			colorMascot = 'rgb(210, 114, 128)';
			ctx.clearRect(0,0,canvas.width, canvas.height);
			ctx.fillText(status, 20, canvas.height/5);
			mascot.draw();
		}
	}



	ctx.fillText(status, 20, canvas.height/2);

	canvas.addEventListener("mousedown", function (e) {
    	if (!inStart){
    		inStart = true;
			inResponse = false;
    		status = "Wait for it..";
    		update();
    		ctx.clearRect(0,0,canvas.width, canvas.height);
    		ctx.fillText(status, 20, canvas.height/5);
    		colorMascot = "rgb(250, 218, 114)";
    		mascot.draw();
    		return;
    	}
    	if (!clicked){
    		clicked = true;
    		checkClick();
    	}

	});

}




