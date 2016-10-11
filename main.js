var lat, lon;
var pastLocation = 'Universe';
var audioElm = document.getElementById("audio1");
audioElm.src = "./bgm/bgm.mp3";
var place = 'Street';
var nextTime = 0;
var loopTime = 0;

var spriteData = {
  "Akihabara": {"startTime": 0,"length": 77.7},
  "Ebisu": {"startTime": 78.222,"length": 167.4},
  "Gotanda": {"startTime": 249.1,"length": 85.15},
  "Hamamatsucho": {"startTime": 339.77,"length": 249.55},
  "Harazyuku": {"startTime": 574.88,"length": 109.53},
  "Ikebukuro": {"startTime": 685.99,"length": 90.1},
  "Kanda": {"startTime": 790.66,"length": 77.76},
  "Komagome": {"startTime": 870.99,"length": 138.76},
  "Meguro": {"startTime": 992.22,"length": 115.17},
  "Meziro": {"startTime": 1104.88,"length": 111.54},
  "Nippori": {"startTime": 1226.99,"length": 142.55},
  "Nishinippori": {"startTime": 1368.14,"length": 249.55},
  "Okachimachi": {"startTime": 1530.88,"length": 62.25},
  "Osaki": {"startTime": 1651.54,"length": 91.16},
  "Otsuka": {"startTime": 1710.22,"length": 226.74},
  "Shibuya": {"startTime": 1943.98,"length": 122.61},
  "Shinagawa": {"startTime": 2069.08,"length": 183.06},
  "Shinbashi": {"startTime": 2242.31,"length": 128.94},
  "Shinjuku": {"startTime": 2378.95,"length": 149.23},
  "Shinokubo": {"startTime": 2527.99,"length": 81.39},
  "Street": {"startTime": 2618,"length": 76.30},
  "Sugamo": {"startTime": 2697.87,"length": 122.35},
  "Tabata": {"startTime": 2821.13,"length": 167.70},
  "Takadanobaba": {"startTime": 3002.04,"length": 94.48},
  "Tamachi": {"startTime": 3090.09,"length": 188.44},
  "Tokyo": {"startTime": 3288.09,"length": 76.95},
  "Ueno": {"startTime": 3368.27,"length": 62.25},
  "Uguisudani": {"startTime": 3429.98,"length": 148.16},
  "Yoyogi": {"startTime": 3576.65,"length": 117.65},
  "Yurakucho": {"startTime": 3694.87,"length": 184.58}};
audioElm.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
},false);


function geolocationSuccess(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  var station = require("./Station");
  var nowLocation = station(lat, lon);
  if (audioElm.currentTime >= nextTime) {
      audioElm.currentTime = loopTime
  }
  if (nowLocation == 'Street' && pastLocation != 'Street') {
    pastLocation = 'Street';
    place = 'Street';
    audioElm.currentTime = spriteData.Street.startTime;
    nextTime = spriteData.Street.startTime + spriteData.Street.length;
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
  audioElm.currentTime = spriteData.Street.startTime;
  setTimeout(function() {
    audioElm.play();
  }, 0);
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
