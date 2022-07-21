/* 
조건부 로직을 다형성으로 바꾸기2

상속은 새, 동물, 사람 등 현실에 존재하는 물질뿐만 아니라
점수, 등급 등 현존하지 않는 부분도 클래스로 만들어 서로 공통된 것은 하나의 추상화된 클래스에 묶고
다른 부분은 따로 빼서 오버라이딩을 구현하면 조건문을 굳이 사용하지 않아도 다형성만으로 깔끔하게 로직을 구성할 수 있다.
*/

export function rating(voyage, history) {
  // 투자 등급
  if (voyage.zone === 'china' && history.some((v) => 'china' === v.zone)) {
    return new ChinaZoneRating(voyage, history).grade;
  }
  return new Rating(voyage, history).grade;
}
class Rating {
  constructor(voyage, history) {
    this.voyage = voyage;
    this.history = history;
  }

  get grade() {
    const profit = this.voyageProfitFactor;
    const risk = this.voyageRisk;
    const historyRisk = this.captainHistoryRisk;
    return profit * 3 > risk + historyRisk * 2 ? 'A' : 'B';
  }

  get voyageProfitFactor() {
    // 수익 요인
    let result = 2;
    if (this.voyage.zone === 'china') result += 1;
    if (this.voyage.zone === 'east-indies') result += 1;
    result += this.voyageAndHistoryLengthFactor;
    return result;
  }

  get voyageAndHistoryLengthFactor() {
    let result = 0;
    if (this.history.length > 8) result += 1;
    if (this.voyage.length > 14) result -= 1;
    return result;
  }

  get voyageRisk() {
    // 항해 경로 위험요소
    let result = 1;
    if (this.voyage.length > 4) result += 2;
    if (this.voyage.length > 8) result += this.voyage.length - 8;
    if (['china', 'east-indies'].includes(this.voyage.zone)) result += 4;
    return Math.max(result, 0);
  }
  get captainHistoryRisk() {
    // 선장의 항해 이력 위험 요소
    let result = 1;
    if (this.history.length < 5) result += 4;
    result += this.history.filter((v) => v.profit < 0).length;
    return Math.max(result, 0);
  }
}

class ChinaZoneRating extends Rating {
  get captainHistoryRisk() {
    const result = super.captainHistoryRisk - 2;
    return Math.max(result, 0);
  }

  get voyageAndHistoryLengthFactor() {
    let result = 3;
    if (this.history.length > 10) result += 1;
    if (this.voyage.length > 12) result += 1;
    if (this.voyage.length > 18) result -= 1;
    return result;
  }
}

const voyage = { zone: 'west-indies', length: 10 };
const history = [
  { zone: 'east-indies', profit: 5 },
  { zone: 'west-indies', profit: 15 },
  { zone: 'china', profit: -2 },
  { zone: 'west-africa', profit: 7 },
];

const rate = rating(voyage, history);
console.log(rate);
