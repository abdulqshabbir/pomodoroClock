$(document).ready(function() {

//-----------------------------Event Handlers -------------------------------------
	$("#startTimerButton").on("click", function startButtonHandler() {
		myTimer.startTimer();
		myTimerTheme.getRunningTimerColor();
	});
	$("#pauseTimerButton").on("click", function pauseButtonHandler() {
		myTimer.pauseTimer();
		myTimerTheme.getPausedTimerColor();
	});
	$("#stopTimerButton").on("click", function stopButtonHandler() {
		myTimer.stopTimer();
		myTimerTheme.getStoppedTimerColor(); 
	});
	$("#increentTimer").on("click", function incrementTimerHandler() {
		myTimer.incrementTimeByOneMinute();
	});
	$("#decrementTimer").on("click", function decrementTimerHandler() {
		myTimer.decrementTimeByOneMinute();
	});

//----------------------------Timer Object With Methods------------------------
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

//------------------------'Theme' Object with Methods ----------------------
	var myTimerTheme = {
		getRunningTimerColor: getRunningTimerColor,
		getPausedTimerColor: getPausedTimerColor,
		getStoppedTimerColor: getStoppedTimerColor,
	};

//Timer Color While Running
function getRunningTimerColor() {
	if(myTimer.isRunning) {
		$("body").removeClass("teal lighten-5").addClass("red lighten-2");
		$(".card-panel").removeClass("teal lighten-3").addClass("red darken-4");
		$(".btn").addClass("red darken-4");
	}
}

//Timer Color While Paused
function getPausedTimerColor() {
	if(!myTimer.isRunning) {
		$("body").removeClass("red ligten-2").addClass("orange lighten-2");
		$(".card-panel").removeClass("red darken-4").addClass("orange darken-3");
		$(".btn").removeClass("red darken-4").addClass("orange darken-3");
	}
}

//Timer Color While Stopped
function getStoppedTimerColor() {
	if(!myTimer.isRunning) {
		$("body").removeClass("orange lighten-2").addClass("teal lighten-5");
		$(".card-panel").removeClass("orange darken-3").addClass("teal lighten-3");
		$(".btn").removeClass("orange darken-3");
	}
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
});
