var lat, lon;
var pastLocation = 'Street';
var audioElm = document.getElementById("audio1");
var place = 'Street';

function geolocationSuccess(position) {
  lat = position.coords.latitude;
  lon = position.coords.longitude;
  var station = require("./Station");
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
