/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var lat, lon;
	var pastLocation = 'Street';
	var audioElm = document.getElementById("audio1");
	var place = 'Tokyo';

	function geolocationSuccess(position) {
	  lat = position.coords.latitude;
	  lon = position.coords.longitude;
	  var station = __webpack_require__(1);
	  var nowLocation = station(lat, lon);
	  if (nowLocation == 'Street' && pastLocation != 'Street') {
	    pastLocation = 'Street';
	    place = 'Street';
	    //play('Street');
	  } else if (pastLocation == 'Street' && nowLocation != 'Street') {
	    pastLocation = nowLocation
	    place = nowLocation;
	    //play(nowLocation);
	  }
	}

	function geolocationError(error) {
	  var errorMessage = {
	    0: "原因不明のエラーが発生しました…。" ,
	    1: "位置情報の取得が許可されませんでした…。" ,
	    2: "電波状況などで位置情報が取得できませんでした…。" ,
	    3: "位置情報の取得に時間がかかり過ぎてタイムアウトしました…。" ,
	  } ;

	  console.log( errorMessage[error.code] ) ;
	}

	var geoOptions = {
	  "enableHighAccuracy": false ,
	  "timeout": 8000 ,
	  "maximumAge": 5000
	};

	if(!navigator.geolocation) {
	  console.log('あなたの端末では、現在位置を取得できません。');
	} else {
	  navigator.geolocation.watchPosition(//やたら高頻度で位置情報を収集します 
	    geolocationSuccess, geolocationError, geoOptions
	  );
	}

	function togglePlay() {
	  if (document.getElementById("audio1")) {

	    if (audioElm.paused == true) {
	      playAudio(audioElm);    //  if player is paused, then play the file
	    } else {
	      pauseAudio(audioElm);   //  if player is playing, then pause
	    }
	  }
	}

	function playAudio(audioElm) {
	  document.getElementById("btn").innerHTML = "Pause"; // Set button text == Pause
	  // Get file from text box and assign it to the source of the audio element 
	  var bgmURL = ["./bgm/", place, ".mp3"].join("");
	  audioElm.src = bgmURL;
	  audioElm.play();
	}

	function pauseAudio(audioElm) {
	  document.getElementById("btn").innerHTML = "play"; // Set button text == Play
	  audioElm.pause();
	}

	window.onload = function() {  
	  var btn = document.getElementById('btn');
	  btn.onclick = function() {
	      // サウンドを再生
	    togglePlay();
	  };
	};



	//////////以下はweb audio api

	// window.AudioContext = window.AudioContext || window.webkitAudioContext;  
	// var context = new AudioContext();

	// // Audio 用の buffer を読み込む
	// var getAudioBuffer = function(url, fn) {  
	//   var req = new XMLHttpRequest();
	//   // array buffer を指定
	//   req.responseType = 'arraybuffer';

	//   req.onreadystatechange = function() {
	//     if (req.readyState === 4) {
	//       if (req.status === 0 || req.status === 200) {
	//         // array buffer を audio buffer に変換
	//         context.decodeAudioData(req.response, function(buffer) {
	//           // コールバックを実行
	//           fn(buffer);
	//         });
	//       }
	//     }
	//   };

	//   req.open('GET', url, true);
	//   req.send('');
	// };

	// // サウンドを再生
	// var playSound = function(buffer) {  
	//   // source を作成
	//   var source = context.createBufferSource();
	//   // buffer をセット
	//   source.buffer = buffer;
	//   // context に connect
	//   source.connect(context.destination);
	//   // 再生
	//   source.start(0);
	// };

	// function play(place) {
	//   if (place == 'Street') {
	//     getAudioBuffer('./bgm/Street.mp3', function(buffer) {
	//       playSound(buffer);
	//     });
	//   } else {
	//     var bgmURL = ["./bgm/", place, ".mp3"].join("");
	//     getAudioBuffer(bgmURL, function(buffer) {
	//       playSound(buffer);
	//     });
	//   }

	// }
	// // main


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = function(lat, lon) {
	  for (let station of Stations) {
	    station.find(lat, lon);
	  }
	  return nowLocation;

	};

	var ikiti = 0.00377778;
	var nowLocation = 'Street'; 

	class Station {
	  constructor(name, lat, lon) {
	    this.name = name;
	    this.lat = lat;
	    this.lon = lon;
	  }

	  set name(name) {
	    this._name = name;
	  }
	  get name() {
	    return this._name;
	  }
	  find(mylat, mylon) {
	    var latmin = this.lat - ikiti;
	    var latmax = this.lat + ikiti;
	    var lonmin = this.lon - ikiti;
	    var lonmax = this.lon + ikiti;
	    if (mylat > latmin && mylat < latmax){
	      if (mylon > lonmin && mylon < lonmax) {
	        nowLocation = this._name
	      }
	    }
	  }
	}

	var Stations = [ 
	  new Station('Tokyo', 35.681382, 139.76608399999998),
	  new Station('Kanda', 35.69169, 139.77088300000003),
	  new Station('Akihabara', 35.698683, 139.77421900000002),
	  new Station('Okachimachi', 35.707438, 139.774632),
	  new Station('Ueno', 35.713768, 139.77725399999997),
	  new Station('Uguisudani', 35.720495, 139.77883700000007),
	  new Station('Nippori', 35.727772, 139.770987), 
	  new Station('Nishinippori', 35.732135, 139.76678700000002),
	  new Station('Tabata', 35.738062, 139.76085999999998),
	  new Station('Komagome', 35.736489, 139.74687500000005),
	  new Station('Sugamo', 35.733492, 139.73934499999996),
	  new Station('Otsuka', 35.731401, 139.72866199999999),
	  new Station('Ikebukuro', 35.728926, 139.71038),
	  new Station('Meziro', 35.721204, 139.706587),
	  new Station('Takadanobaba', 35.712285, 139.70378200000005),
	  new Station('Shinokubo', 35.701306, 139.70004399999993),
	  new Station('Shinjuku', 35.690921, 139.70025799999996),
	  new Station('Yoyogi', 35.683061, 139.702042),
	  new Station('Harazyuku', 35.670168, 139.70268699999997),
	  new Station('Shibuya', 35.658517, 139.70133399999997),
	  new Station('Ebisu', 35.64669, 139.710106),
	  new Station('Meguro', 35.633998, 139.715828),
	  new Station('Gotanda', 35.626446, 139.72344399999997),
	  new Station('Osaki', 35.6197, 139.72855300000003),
	  new Station('Shinagawa', 35.630152, 139.74044000000004),
	  new Station('Tamachi', 35.645736, 139.74757499999998),
	  new Station('Hamamatsucho', 35.655646, 139.756749),
	  new Station('Shinbashi', 35.665498, 139.75964),
	  new Station('Yurakucho', 35.675069, 139.763328)
	];


/***/ }
/******/ ]);