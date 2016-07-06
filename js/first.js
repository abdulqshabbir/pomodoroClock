$(document).ready(function() {

//-----------------------------Event Handlers -------------------------------------
	$("#startTimerButton").on("click", function startButtonHandler() {
		myTimer.startTimer();
	});
	$("#pauseTimerButton").on("click", function pauseButtonHandler() {
		myTimer.pauseTimer();
	});
	$("#stopTimerButton").on("click", function stopButtonHandler() {
		myTimer.stopTimer();
	});
	$("#increentTimer").on("click", function incrementTimerHandler() {
		myTimer.incrementTimeByOneMinute();
	});
	$("#decrementTimer").on("click", function decrementTimerHandler() {
		myTimer.decrementTimeByOneMinute();
	});

//----------------------------Timer Object with methods------------------
	var myTimer = {
		isRunning: false,
		intervalID: null,
		minutes: minutes,
		seconds: seconds,
		startTimer: startTimer,
		pauseTimer: pauseTimer,
		stopTimer: stopTimer,
		incrementTimeByOneMinute: incrementTimeByOneMinute,
		decrementTimeByOneMinute: decrementTimeByOneMinute,
		totalTimeInSeconds: totalTimeInSeconds,
	};

//-----------------------------My Timer Theme Object with Methods ----------
	var myTimerTheme = {
		getRunningTimerColor: getRunningTimerColor,
		getPausedTimerColor: getPausedTimerColor,
	};

function getRunningTimerColor() {
	if(myTimer.isRunning) {
		$("body").removeClass("teal lighten-5").addClass("red lighten-2");
		$(".card-panel").removeClass("teal lighten-3").addClass("red darken-4");
		$(".btn").addClass("red darken-4");
	} 
}

function getPausedTimerColor() {
	if(!myTimer.isRunning) {
		$("body").removeClass("red ligten-2").addClass("orange lighten-2");
		$(".card-panel").removeClass("red darken-4").addClass("orange darken-3");
		$(".btn").removeClass("red darken-4").addClass("orange darken-3");
	}
	$(".card-panel").removeClass("purple darken-2").addClass("green");
}

//Fetch current minutes
	function minutes() {
		var minutes = $("#minutes").html();
		return minutes;
	}

//Fetch current seconds
	function seconds() {
		var seconds = $("#seconds").html();
		return seconds;
	}

	function startTimer() {
		if(!myTimer.isRunning) {
			myTimer.isRunning = true;
			myTimer.intervalID = setInterval(startTimerCountdown, 1000);
			myTimerTheme.getRunningTimerColor();
		}
	}

//decrement timer by one
	function startTimerCountdown() {
		var seconds = myTimer.seconds();
		var minutes = myTimer.minutes();

		if(myTimer.isRunning && seconds >=1) {
		//if number of seconds is less than 9, add leading zero
			if(seconds <= 9) {
				seconds = seconds - 1;
				$("#seconds").html("0" + seconds);
		//else, decrement time as usual
			} else {
				seconds = seconds - 1;
				$("#seconds").html(seconds);
			}
		} else if(myTimer.isRunning && seconds <= 0 && minutes >= 0) {
			decrementMinutes();

		} else if(myTimer.isRunning && seconds <=0 && minutes <=0) {
			timerIsOver();
		}
	}

	function decrementMinutes() {
		var minutes = myTimer.minutes();
		var seconds = myTimer.seconds();
		minutes = minutes - 1;
		$("#seconds").html(59);
		$("#minutes").html(minutes);
	}

	function timerIsOver() {
		$("#seconds").html("your session is over!");
		$("#minutes").html("your session is over!");
	}

	function pauseTimer() {
		myTimer.isRunning = false;
		clearInterval(myTimer.intervalID);
		myTimer.intervalID = null;
		myTimerTheme.getPausedTimerColor();
	}

	function stopTimer() {
		myTimer.isRunning = false;
		clearInterval(myTimer.intervalID);
		myTimer.intervalID = null;
		$("#seconds").html('00');
		$("#minutes").html('25');
	}

	function incrementTimeByOneMinute() {
		var minutes = Number(myTimer.minutes());
		if (!myTimer.isRunning) {
			minutes = minutes + 1;
			$("#minutes").html(minutes);
		}
	}

	function decrementTimeByOneMinute() {
		var minutes = Number(myTimer.minutes());
		if (!myTimer.isRunning) {
			minutes = minutes - 1;
			$("#minutes").html(minutes);
		}
	}

	function totalTimeInSeconds() {
		return Number(myTimer.minutes()*60) + Number(myTimer.seconds());
	}


	var canvas = document.getElementById('myCanvas');
	canvas.style.border = '1px solid black';
	canvas.style.top = '50px';
	canvas.style.left = '50px';
	var context = canvas.getContext('2d');
	var raf;

	var pomodoroTimer = {
		positionX: canvas.width/2,
		positionY: canvas.height/2,
		radius: 50,
		startAngle: -0.5*Math.PI,
		endAngle: -0.5*Math.PI,
		draw: draw,
		animate: animate,
	};

	function draw() {
		context.beginPath();
		context.arc(this.positionX, this.positionY, this.radius, this.startAngle, this.endAngle, false);
		context.lineWidth = 10;
		context.stroke();
	}

	function animate() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		pomodoroTimer.draw();
		pomodoroTimer.endAngle = pomodoroTimer.endAngle + (0.1*Math.PI);
		raf = requestAnimationFrame(animate);
	}
	pomodoroTimer.draw();

	if (myTimer.isRunning) {
		pomodoroTimer.animate();
	}

});
