//Static Data
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

//Initialize canvas dimensions
canvas.height = window.innerHeight-200;
if (canvas.height > 391)
	canvas.height = 391;
canvas.width = canvas.height*2/3;
//

var scaleHeight = canvas.height/391;
var scaleWidth = canvas.width/260;



window.onload=function(){

var counter = 0; //timer
var inResponse = false; //player should click
var clicked = false; //player clicks

var status = "Tap to begin..";
var inStart = false;

var sum = 0.;
var average = 0;
var playCount = document.getElementById('plays-tf').value;
var myElo=document.getElementById('elo-tf').value;
var enemyScore=document.getElementById('beat-tf').value;
var enemyName=document.getElementById('enemy-tf').value;
var lastScore=document.getElementById('last-tf').value;
var inRank = false;

var start;
var end;
var timeTake;

if (document.getElementById('rank-tf').value == 1)
    inRank = true;

if (document.getElementById('pigs').value != ''){
    document.getElementById('pointIG').innerHTML = "PIG: " + document.getElementById('pigs').value;
    document.getElementById('uName').innerHTML = document.getElementById('name').value;
}


var colorMascot = "rgb(250, 218, 114)";
var mascot;

if (inRank)
	document.getElementById('hello').innerHTML = "Last Reaction: " + lastScore + " ms<br>Rating: " + myElo +"<br>Beat <span style='color:blue'>"+ enemyName + "</span>'s reaction of <span style='color:green'>" + enemyScore + "</span> ms";
else
	document.getElementById('hello').innerHTML = "Last Reaction: " + lastScore + " ms"
ctx.font= 30*scaleWidth +"px garamond";
//Main game function (reloading through threads)
canvas.style.background = 'rgba(140, 114, 191,.5)';
mascot = new boxObject();

	function update(){
		
		ctx.clearRect(0,0,canvas.width, canvas.height);
		counter++;
		mascot.draw();
		ctx.fillText(status, 20*scaleWidth, canvas.height/5);
		//Set probability
		if (counter%50 == 0 && !inResponse && counter > 100 && !clicked){ // every .5 seconds
				if (Math.random() < Math.random()){
					colorMascot = 'rgb(50, 200, 100)';
					status = "Click now!"
					inResponse = true;
					start = Date.now();
				}
		}


		setTimeout(update, 10); // 10 ms
	}

	function boxObject(){
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
   	this.radius = 70 * scaleWidth;
	this.eyeRadius = 10 * scaleWidth;
	this.eyeXOffset = 30 * scaleWidth;
	this.eyeYOffset = 10 * scaleHeight;
	this.eyeX = this.x - this.eyeXOffset;
	this.eyeY = this.y - this.eyeYOffset;
	this.eyeX2 = this.x + this.eyeXOffset;

    this.draw = function(){
	      ctx.beginPath();
		  ctx.rect(this.x-60*scaleWidth, this.y-50*scaleHeight, 120 * scaleWidth, 100 * scaleHeight);
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
		  	ctx.arc(this.x, this.y+10 * scaleHeight, 15 * scaleHeight, 0, Math.PI, false);
		  else{
		  	ctx.arc(this.x, this.y+10 * scaleHeight, this.eyeRadius, 0, 2 * Math.PI, false);
		  	ctx.strokeStyle = 'black';
		  }
		  ctx.stroke();
		  ctx.closePath();
    }
}

function stashIt(){
    if (playCount != '-1'){
        document.getElementById('sTime-tf').value = timeTake
        if (inRank)
            document.getElementById('rank-tf').value = '1';
        document.getElementById("PushScore").submit();
    }
    else
        window.location.href = '/games/eloTap';
    
}
	function checkClick(){
		if (inResponse){
			end = Date.now();
			status = "Wait for it..";
			inResponse = false;
			timeTake = end - start;
			stashIt();
			//colorMascot = 'rgb(250, 218, 114)';
			//document.getElementById('hello').innerHTML = "Your reaction time was: " + timeTake + "<br>Average: " + (parseFloat(average).toFixed(2)) + "<br> Playcount: " + playCount;
		}
		else{
			status = "Clicked too fast!";
			colorMascot = 'rgb(210, 114, 128)';
			setTimeout(function () {window.location.reload();}, 250);
			counter = 0;
			inResponse = false;
			clicked = false;
		}
	}



	ctx.fillText(status, 20*scaleWidth, canvas.height/2);

	canvas.addEventListener("mousedown", function (e) {
    	if (!inStart){
    		inStart = true;
    		status = "Wait for it..";
    		update();
    		return;
    	}
    	if (!clicked){
    		clicked = true;
    		checkClick();
    	}

	});

}




