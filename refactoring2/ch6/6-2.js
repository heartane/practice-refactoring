/* 
함수 인라인하기

- 추출한 함수가 재사용되지않는다? 굳이 추출할 이유가 있을까?
- 행위를 너무 잘게 나누면 불필요한 호출이 일어난다.

언제 어떤 식으로 짜는가는 정해진 규칙이나 만능 정답은 없다.
뭐가 좋은가는 사실 지난날의 나의 경험과 개발자의 직관에 따라 결정되게 된다.
*/

// 예제 1
export function rating(driver) {
  return driver.numberOfLateDeliveries > 5 ? 2 : 1;
}

// 예제 2
function reportLines(customer) {
  const result = [];
  result.push(['name', customer.name]);
  result.push(['location', customer.location]);
  return result;
}
