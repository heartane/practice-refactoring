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
  return station.readings.filter((r) => !range.contains(r.temp));
}

/* 
클래스로 묶는 이유?
데이터와 데이터를 처리하는 로직이 분리되었던 것을 한 곳에 묶어주기 위해!
*/
export class NumberRange {
  #min;
  #max;
  constructor(min, max) {
    this.#min = min;
    this.#max = max;
  }
  get min() {
    return this.#min;
  }
  get max() {
    return this.#max;
  }
  contains(number) {
    return number >= this.#min && number <= this.#max;
  }
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

const operationPlan = new NumberRange(51, 53);

const result = readingsOutsideRange(station, operationPlan);
console.log(result);
