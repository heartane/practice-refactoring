/* 
함수 매개변수화하기 

살짝 다른 부분으로 인해 공통의 함수로 추출하기 어렵다면, 그 부분은 매개변수로 전달하는 방법을 고려한다.
이를 위해서는 로직에 대한 충분한 이해와 테스트 코드가 동반되어야 한다.
*/

// 예제 1
function salaryRaise(person, factor) {
  person.salary = person.salary.multiply(1 + factor);
}

// 예제 2
export function baseCharge(usage) {
  if (usage < 0) return usd(0);
  const amount =
    withinBand(usage, 0, 100) * 0.03 +
    withinBand(usage, 100, 200) * 0.05 +
    withinBand(usage, 200, Infinity) * 0.07;
  return usd(amount);
}

function withinBand(usage, bottom, top) {
  return usage > bottom ? Math.min(usage, top) - bottom : 0;
}

function usd(value) {
  return {
    currency: '$',
    currencyName: 'USD',
    value: value,
  };
}
