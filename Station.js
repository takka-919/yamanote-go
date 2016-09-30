module.exports = function(lat, lon) {
  for (let station of Stations) {
    station.find(lat, lon);
  }
  document.write(nowLocation);

};

var ikiti = 0.00377778;
var nowLocation = 'street'; 

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
