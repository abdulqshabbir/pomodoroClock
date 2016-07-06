"use strict";

$(document).ready(function () {
	$("#startTimerButton").on("click", function startButtonHandler() {
		myTimer.startTimer();
	});

	$("#pauseTimerButton").on("click", function pauseButtonHandler() {
		myTimer.pauseTimer();
	});

	$("#stopTimerButton").on("click", function stopButtonHandler() {
		myTimer.stopTimer();
	});

	$("#incrementTimer").on("click", function incrementTimerHandler() {
		myTimer.incrementTimeByOneMinute();
	});

	$("#decrementTimer").on("click", function decrementTimerHandler() {
		myTimer.decrementTimeByOneMinute();
	});

	var myTimer = {
		isRunning: false,
		intervalID: null,
		minutes: minutes,
		seconds: seconds,
		decrementTime: decrementTimer,
		startTimer: startTimer,
		pauseTimer: pauseTimer,
		stopTimer: stopTimer,
		incrementTimeByOneMinute: incrementTimeByOneMinute,
		decrementTimeByOneMinute: decrementTimeByOneMinute,
		totalTimeInSeconds: totalTimeInSeconds
	};

	function minutes() {
		var minutes = $("#minutes").html();
		return minutes;
	}

	function seconds() {
		var seconds = $("#seconds").html();
		return seconds;
	}

	function startTimer() {
		myTimer.isRunning = true;
		myTimer.intervalID = setInterval(decrementTimer, 1000);
	}

	function decrementTimer() {
		var seconds = myTimer.seconds();
		var minutes = myTimer.minutes();

		if (myTimer.isRunning && seconds >= 1) {
			seconds = seconds - 1;
			$("#seconds").html(seconds);
		} else if (myTimer.isRunning && seconds <= 0 && minutes >= 0) {
			decrementMinutes();
		} else if (myTimer.isRunning && seconds <= 0 && minutes <= 0) {
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
		var seconds = myTimer.seconds();
		var minutes = myTimer.minutes();
		myTimer.isRunning = false;
		clearInterval(myTimer.intervalID);
		myTimer.intervalID = null;
	}

	function stopTimer() {
		myTimer.isRunning = false;
		clearInterval(myTimer.intervalID);
		myTimer.intervalID = null;
		$("#seconds").html(0);
		$("#minutes").html(25);
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
		return Number(myTimer.minutes() * 60) + Number(myTimer.seconds());
	}

	var canvas = document.getElementById('myCanvas');
	canvas.style.border = '1px solid black';
	canvas.style.top = '50px';
	canvas.style.left = '50px';
	var context = canvas.getContext('2d');
	var raf;

	var pomodoroTimer = {
		positionX: canvas.width / 2,
		positionY: canvas.height / 2,
		radius: 50,
		startAngle: -0.5 * Math.PI,
		endAngle: -0.5 * Math.PI,
		draw: draw,
		animate: animate
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
		pomodoroTimer.endAngle = pomodoroTimer.endAngle + 0.1 * Math.PI;
		raf = requestAnimationFrame(animate);
	}
	pomodoroTimer.draw();

	if (myTimer.isRunning) {
		pomodoroTimer.animate();
	}
	function hello() {
		return 'hello';
	}

	describe("test suite", function () {
		it('expect to pass', function () {
			expect(true).toBe(true);
		});
	});

	function secondHello() {
		return 'second hello !';
	}
});
