/* 
매개 변수 객체 만들기

어떤 인자가 필요한지, 또 그 순서까지 고려할 사항이 많아지면서 호출이 고통스러워진다.
매개변수는 최대 3개를 넘지않는게 좋다.

연관있는 데이터 구조 혹은 클래스 하나로 묶어주는 것이 좋다.
*/

export function doLotsOfThings(a, b, c, e, f) {
  // do something...💩
}

export function readingsOutsideRange(station, range) {
  return station.readings.filter(
    (r) => r.temp < range.temperatureFloor || r.temp > range.temperatureCeiling
  );
}

const station = {
  name: 'ZB1',
  readings: [
    { temp: 47, time: '2016-11-10 09:10' },
    { temp: 53, time: '2016-11-10 09:20' },
    { temp: 58, time: '2016-11-10 09:30' },
    { temp: 53, time: '2016-11-10 09:40' },
    { temp: 51, time: '2016-11-10 09:50' },
  ],
};

// 순수 데이터 객체
const operationPlan = {
  temperatureFloor: 51,
  temperatureCeiling: 53,
};

readingsOutsideRange(station, operationPlan);
