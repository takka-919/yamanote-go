var lat, lng;

function geolocationSuccess(position) {
  lat = position.coords.latitude;
  lng = position.coords.longitude;
  document.write(lat);
  document.write("\n");
  document.write(lng);
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
  navigator.geolocation.getCurrentPosition(
    geolocationSuccess, geolocationError, geoOptions
  );
}

