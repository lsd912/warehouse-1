lock = null;
scrollLock = false;
pannerState = -1;
pannerCount = 1;
songcoor = 0;
tdcxtStrokeStyle = '#ff7';
keyUpCode = [];
keyDownCode = [];
pastsongSrcCount = [];
boole = true;
// musicSrcCount = 0; 
imageUrlCount = 0;
musicSrcHolder = './musics/';
imageUrlHolder = './images/';
wrap.width = sun.offsetWidth + 50;
wrap.height = wrap.width;
wrapTimeDomain.width = body.offsetWidth;
core = wrap.width / 2;
arcRadius = sun.offsetWidth / 2;
cxt = wrap.getContext('2d'); 
tdcxt = wrapTimeDomain.getContext('2d');
AudioContext = window.AudioContext || window.webkitAudioContext;
context = new AudioContext();
source = context.createMediaElementSource(audio);
analyser = context.createAnalyser();
panner = new StereoPannerNode(context, {pan:0});
source.connect(analyser);
source.connect(panner);
panner.connect(context.destination);
analyser.connect(context.destination);
output = new Uint8Array(360);
length = analyser.frequencyBinCount * 2 * 44100 / context.sampleRate | 0;
output_1 = new Uint8Array(length);

function playMusic() {
	var diff = moon.offsetLeft - sun.offsetLeft;
	if (boole == true && diff > -sun.offsetWidth && diff < sun.offsetWidth) {
		musicSrcCount = Math.floor(Math.random() * musicSrcArr.length);
		pastsongSrcCount.push(musicSrcCount);
		audio.src = musicSrcHolder + musicSrcArr[musicSrcCount];
		songName.innerText = musicName[musicSrcCount];
		audio.autoplay = 'autoplay';
		boole = false;
	}
	if (diff > -sun.offsetWidth && diff < sun.offsetWidth) {
		audio.play();
		if (diff >= 0){
			audio.volume = (sun.offsetLeft + sun.offsetWidth - moon.offsetLeft)/sun.offsetWidth;
		} else {
			audio.volume = (moon.offsetLeft + moon.offsetWidth - sun.offsetLeft)/moon.offsetWidth;
		}
		volume = (1 - audio.volume);
		moon.style.boxShadow = '#000 ' + '0px ' + '0px ' + (50 + Math.round((1 - volume) * moon.offsetWidth / 2)) + 'px ' + (25 + Math.round((1 - volume) * moon.offsetWidth / 4)) + 'px ' + 'inset';
		// moon.style.backgroundColor = "hsl(194, 56%, " + (1 - audio.volume) * 60 + "%";		
		backgroundstyle.style.boxShadow = '0px ' + '0px ' + Math.round((1 - volume) * backgroundstyle.offsetWidth / 1.5) + 'px ' + '0px ' + '#000 ' + 'inset';
		// backgroundstyle.style.backgroundColor = "hsl(" + (194 + Math.floor(166 * audio.volume)) + ", 66%, " + volume * 49 + "%)";
	} else {
		audio.pause();
		audio.volume = 0;
	}		
	obj.vol.innerHTML = "Volume: " + Math.ceil(audio.volume * 100) + "%";
};
window.onkeyup = function (e) {
	switch (e.keyCode) {
		// case 27: 
		// 	document.querySelector("body>div:nth-child(3) span:first-child").innerText = "F11";
		// 	document.querySelector("body>div:nth-child(3) span:last-child").innerText = "enter";
		// 		// backgroundstyle.style.zIndex = '0';
		// 	break;
		case 32: {
			if (audio.paused == true) {
				audio.play();
			} else {
				audio.pause();
			};
		}; break;
		case 17: {
			if (keyDownCode.length == 18) {
				var i;
				for (i = 0; i < 17; i++) {
					if (keyDownCode[i] == null) {
						continue;
					} else {	
						break;
					};
				};
				if (i == 17) {
					keyDownCode = [];
				};
			};
		}; break;
		case 39: {
			if (keyDownCode[17] == 17) {
				nextsong.onmouseup();
			}; 	
			keyDownCode = [];
		}; break;
		case 37: {
			if (keyDownCode[17] == 17) {
				backsong.onmouseup();
			};
			keyDownCode = [];
		}; break;
		// case 38: {
		// 	if (keyDownCode == 17) {
		// 		nextsong.onmouseup();
		// 	};
		// }; break;
		// case 40: {
		// 	if (keyDownCode == 17) {
		// 		nextsong.onmouseup();
		// 	};
		// }; break;
		default: break;
	};
};
window.onkeydown = function (e) {
	switch (e.keyCode) {
		case 17: keyDownCode[17] = 17; break;
		case 37: keyDownCode[37] = 37; if (keyDownCode[17] == null) {audio.currentTime -= 5;}; break;
		case 39: keyDownCode[39] = 39; if (keyDownCode[17] == null) {audio.currentTime += 5;}; break;
		default: break;
	};
};
document.onmousedown = function (argument) {
	if (argument.buttons == 4) {
		scrollLock = !scrollLock;
	};
};
moon.onmousedown = function (e) {
	lock = 1;
	disX = e.clientX - moon.offsetLeft;
};
progress.onmousedown = function (e) {
	lock = 0;
	disX = e.clientX - progress.offsetLeft;
};
body.onmousemove = function (e) {
	body.style.cursor = 'default';
	if(lock == 1) {
		moon.style.left = e.clientX - disX + 'px';	
		percent = moon.offsetLeft / wrapper.offsetWidth;
		playMusic();
	} else if (lock == 0) {
		audio.currentTime = (e.clientX - disX) / (wrapper.offsetWidth - 10) * audio.duration;
	};
};
body.onmouseup = function () {
	lock = null;
	if (audio.paused == false && window.fullScreen == true && audio.volume > 0.2) {
		window.onresize();
	};
};
window.onresize = function (e) {
	var str = document.querySelectorAll('body > *:not(:first-child)');
	if (window.fullScreen == true) {
		tdcxtStrokeStyle = '#000';
		progress.style.backgroundColor = '#000';
		for (var i = 0; i < str.length; i++) {
			str[i].style.visibility = 'hidden';
		};
	} else {
		tdcxtStrokeStyle = '#ff7';
		progress.style.backgroundColor = '#ff7';
		for (var i = 0; i < str.length; i++) {
			str[i].style.visibility = 'visible';
		};
	};
	wrapTimeDomain.width = body.offsetWidth;
	wrap.width = sun.offsetWidth + 50;
	wrap.height = wrap.width;	
	arcRadius = sun.offsetWidth / 2;
	// wrap.style.top = sun.offsetTop - 25 + 'px';
	// wrap.style.left = sun.offsetLeft - 25 + 'px';
	core = wrap.width / 2;
	moon.style.left = percent * wrapper.offsetWidth + 'px'; 	
};
nextsong.onmouseup = function (e) {
	// if (musicSrcCount == musicSrcArr.length - 1) {
	// 	musicSrcCount = 0;
	// } else {
	// 	musicSrcCount ++;
	// }
	// audio.src = musicSrcHolder + musicSrcArr[musicSrcCount];
	// songName.innerText = musicName[musicSrcCount];	
	if (songcoor == pastsongSrcCount.length - 1) {
		musicSrcCount = Math.floor(Math.random() * musicSrcArr.length);
		pastsongSrcCount.push(musicSrcCount);
		audio.src = musicSrcHolder + musicSrcArr[musicSrcCount];
		songName.innerText = musicName[musicSrcCount];
		songcoor ++;
		if (pastsongSrcCount.length == musicSrcArr.length) {
			pastsongSrcCount.shift();
			songcoor --;
		};
	} else {
		audio.src = musicSrcHolder + musicSrcArr[pastsongSrcCount[++songcoor]];
		songName.innerText = musicName[pastsongSrcCount[songcoor]];
	};
};
backsong.onmouseup = function (e) {
	// if (musicSrcCount == 0) {
	// 	musicSrcCount = musicSrcArr.length - 1;
	// } else {
	// 	musicSrcCount --;
	// }
	// audio.src = musicSrcHolder + musicSrcArr[musicSrcCount];
	// songName.innerText = musicName[musicSrcCount];
	if (songcoor == 0) {
		musicSrcCount = Math.floor(Math.random() * musicSrcArr.length);
		pastsongSrcCount.unshift(musicSrcCount);
		audio.src = musicSrcHolder + musicSrcArr[musicSrcCount];
		songName.innerText = musicName[musicSrcCount];
		if (pastsongSrcCount.length == musicSrcArr.length) {
			pastsongSrcCount.pop();
		};
	} else {
		audio.src = musicSrcHolder + musicSrcArr[pastsongSrcCount[--songcoor]];
		songName.innerText = musicName[pastsongSrcCount[songcoor]];
	};
};
(function backgroundSwitch() {
	if (imageUrlCount == 21) {
		imageUrlCount = 0
	};
	backgroundstyle.style.backgroundImage = "url('" + imageUrlHolder + (++imageUrlCount) + ".jpg')";
	var count = 1;
	var timer = window.setInterval(function () {
			backgroundstyle.style.opacity = Number(backgroundstyle.style.opacity) + 0.0002 * count;
			count += 1;
			if (backgroundstyle.style.opacity >= 1) {
				window.clearInterval(timer);
			};
		}, 30);
	var timer_2 = window.setTimeout(function () {	
		count = 1;
		var timer_1 = window.setInterval(function () {
			backgroundstyle.style.opacity -= 0.0002 * count;
			count += 1;
			if (backgroundstyle.style.opacity <= 0.1) {
				window.clearInterval(timer_1);
				window.clearTimeout(timer_2);
				body.style.cursor = 'none';			
				backgroundSwitch();			
			};
		}, 30);
	}, 10000);
})();
(function draw() {
	if (audio.ended == true) {
		// if (musicSrcCount < musicSrcArr.length - 1) {
		// 	audio.src = musicSrcHolder + musicSrcArr[++musicSrcCount];
		// 	songName.innerText = musicName[musicSrcCount];
		// } else {
		// 	audio.src = musicSrcHolder + musicSrcArr[0];
		// 	songName.innerText = musicName[0];
		// 	musicSrcCount = 0;
		// }
		nextsong.onmouseup();	
	};
	if (scrollLock) {
		if (panner.pan.value <= -1) {
			pannerCount = 1;
			pannerState = 1;
		} else if (panner.pan.value >= 1) {
			pannerCount = 1;
			pannerState = -1;
		};
		switch (pannerState) {
			case 1: panner.pan.value += (pannerCount++) * 0.0001; break;
			case -1: panner.pan.value -= (pannerCount++) * 0.0001; break;
			default: break;
		};
	} else {
		panner.pan.value = 0;
		pannerState = -1;
		pannerCount = 1;
	};
	analyser.getByteFrequencyData(output);
	analyser.getByteTimeDomainData(output_1);
	cxt.clearRect(0, 0, wrap.width, wrap.height);
	for (var i = 0; i < output.length; i++) {
		// switch(parseInt(i / 30)) {
		// 	case 0: sColor = '#' + Math.floor((parseInt('0xf00') + Math.abs(parseInt('0xf00') - parseInt('0xf80')) / 30 * (i - 0 * 30))).toString(16); break;
		// 	case 1: sColor = '#' + Math.floor((parseInt('0xf80') + Math.abs(parseInt('0xf80') - parseInt('0xff0')) / 30 * (i - 1 * 30))).toString(16); break;
		// 	case 2: sColor = '#' + Math.floor((parseInt('0xff0') - Math.abs(parseInt('0xff0') - parseInt('0x8f0')) / 30 * (i - 2 * 30))).toString(16); break;
		// 	case 3: sColor = '#' + Math.floor((parseInt('0x8f0') - Math.abs(parseInt('0x8f0') - parseInt('0x0f0')) / 30 * (i - 3 * 30))).toString(16); break;
		// 	case 4: sColor = '#' + Math.floor((parseInt('0x0f0') + Math.abs(parseInt('0x0f0') - parseInt('0x0f8')) / 30 * (i - 4 * 30))).toString(16); break;
		// 	case 5: sColor = '#' + Math.floor((parseInt('0x0f8') + Math.abs(parseInt('0x0f8') - parseInt('0x0ff')) / 30 * (i - 5 * 30))).toString(16); break;
		// 	case 6: sColor = '#' + Math.floor((parseInt('0x0ff') - Math.abs(parseInt('0x0ff') - parseInt('0x08f')) / 30 * (i - 6 * 30))).toString(16); break;
		// 	case 7: sColor = '#' + Math.floor((parseInt('0x08f') - Math.abs(parseInt('0x08f') - parseInt('0x00f')) / 30 * (i - 7 * 30))).toString(16); break;
		// 	case 8: sColor = '#' + Math.floor((parseInt('0x00f') + Math.abs(parseInt('0x00f') - parseInt('0x80f')) / 30 * (i - 8 * 30))).toString(16); break;
		// 	case 9: sColor = '#' + Math.floor((parseInt('0x80f') + Math.abs(parseInt('0x80f') - parseInt('0xf0f')) / 30 * (i - 9 * 30))).toString(16); break;
		// 	case 10: sColor = '#' + Math.floor((parseInt('0xf0f') - Math.abs(parseInt('0xf0f') - parseInt('0xf08')) / 30 * (i - 10 * 30))).toString(16); break;
		// 	case 11: sColor = '#' + Math.floor((parseInt('0xf08') - Math.abs(parseInt('0xf08') - parseInt('0xf00')) / 30 * (i - 11 * 30))).toString(16); break;
		// }	
		var value = output[i] / 10;
		if (value >= 16) {value = 12}
		var gradient_1 = cxt.createLinearGradient((core - Math.sin(i * 0.5 / 180 * Math.PI) * arcRadius), (core + Math.cos(i * 0.5 / 180 * Math.PI) * arcRadius), (core - Math.sin(i * 0.5 / 180 * Math.PI) * (arcRadius + value)), (core + Math.cos(i * 0.5 / 180 * Math.PI) * (arcRadius + value)));
		// // if (sColor.length == 3)
		// // 	sColor = '#0' + sColor.substring(1);
		// // if (sColor.length == 2)
		// // 	sColor = '#00' + sColor.substring(1);
		gradient_1.addColorStop('0.25', 'rgb(256, 256, 119)');
		gradient_1.addColorStop('0.75', 'rgba(256, 256, 119, 0)');
		cxt.beginPath();
		cxt.moveTo((core - Math.sin(i * 0.5 / 180 * Math.PI) * arcRadius), (core + Math.cos(i * 0.5 / 180 * Math.PI) * arcRadius));
		cxt.lineWidth = '1';
		cxt.strokeStyle = gradient_1;
		cxt.lineTo((core - Math.sin(i * 0.5 / 180 * Math.PI) * (arcRadius + value)), (core + Math.cos(i * 0.5 / 180 * Math.PI) * (arcRadius + value)));
		cxt.stroke();
		var gradient_2 = cxt.createLinearGradient((core + Math.sin(i * 0.5 / 180 * Math.PI) * arcRadius), (core + Math.cos(i * 0.5 / 180 * Math.PI) * arcRadius), (core + Math.sin(i * 0.5 / 180 * Math.PI) * (arcRadius + value)), (core + Math.cos(i * 0.5 / 180 * Math.PI) * (arcRadius + value)));
		gradient_2.addColorStop('0.25', 'rgb(256, 256, 119)');
		gradient_2.addColorStop('0.75', 'rgba(256, 256, 119, 0)');
		cxt.beginPath();
		cxt.moveTo((core + Math.sin(i * 0.5 / 180 * Math.PI) * arcRadius), (core + Math.cos(i * 0.5 / 180 * Math.PI) * arcRadius));
		cxt.lineWidth = '1';
		cxt.strokeStyle = gradient_2;
		cxt.lineTo((core + Math.sin(i * 0.5 / 180 * Math.PI) * (arcRadius + value)), (core + Math.cos(i * 0.5 / 180 * Math.PI) * (arcRadius + value)));
		cxt.stroke();
	}
	cxt.beginPath();
	cxt.lineWidth = '1.5';
	cxt.arc(core, core, arcRadius, 1 * Math.PI, 3 * Math.PI, false);
	cxt.strokeStyle = '#ff7';
	cxt.stroke();
	var height = 147, width = wrapTimeDomain.width;
	tdcxt.clearRect(0, 0, wrapTimeDomain.width, wrapTimeDomain.height);
	tdcxt.beginPath();
	tdcxt.lineWidth = '2';
	tdcxt.strokeStyle = tdcxtStrokeStyle;
	for (var i = 0; i < width; i++) {
		tdcxt.lineTo(i, 75 - (height / 3 * (output_1[output_1.length * i / width / 2 | 0] / 256 - 0.5)));
	}
	tdcxt.stroke();
	progress.style.left = (wrapper.clientWidth - 10) * audio.currentTime / audio.duration + 'px';
	progress.style.bottom = (200 + (height / 3 * (output_1[output_1.length * progress.style.left / width / 2 | 0] / 256 - 0.5))) + 'px';
	window.requestAnimationFrame(draw);
})();