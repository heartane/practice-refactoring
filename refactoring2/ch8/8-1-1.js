/* 
함수 옮기기

자바스크립트에 모듈과 클래스가 없던 시절, 함수 안에 중첩 함수를 이용해 모듈화와 캡슐화를 구현했다.
함수 내부 안에 기능을 캡슐화하고 있다.

그러나 중첩 함수가 감싸고 있는 메인 함수와 밀접하게 연관된 것이 확실한지 체크해야 한다.
재사용하기위해서는 유틸리티 함수로써 외부에 위치해야 한다.
*/
export function trackSummary(points) {
  const time = calculateTime();
  const distance = calculateDistance(points);
  const pace = time / 60 / distance;
  return { time, distance, pace };
}

function calculateTime() {
  return 10000;
}

function calculateDistance(points) {
  let result = 0;
  for (let i = 1; i < points.length; i++) {
    result += distance(points[i - 1], points[i]);
  }
  return result;
}

function distance(p1, p2) {
  // 포뮬라: http://www.movable-type.co.uk/scripts/latlong.html
  const EARTH_RADIUS = 3959; // in miles
  const dLat = radians(p2.lat) - radians(p1.lat);
  const dLon = radians(p2.lon) - radians(p1.lon);
  const a =
    Math.pow(Math.sin(dLat / 2), 2) +
    Math.cos(radians(p2.lat)) *
      Math.cos(radians(p1.lat)) *
      Math.pow(Math.sin(dLon / 2), 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS * c;
}

function radians(degrees) {
  return (degrees * Math.PI) / 180;
}

const newYork = {
  lat: 40.73061,
  lon: -73.935242,
};

const tokyo = {
  lat: 35.652832,
  lon: 139.839478,
};

const summary = trackSummary([newYork, tokyo]);
console.log(summary);
