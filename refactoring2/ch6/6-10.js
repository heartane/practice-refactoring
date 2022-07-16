import _ from 'lodash';
/* 
여러 함수를 변환 함수로 묶기

현재는 변환함수 방식보다 클래스가 주로 사용된다. 왜냐하면 비용이 발생할 수 있다.
변환 함수는 날 것의 원본 데이터(객체)를 인자로 전달하면 이미 계산되어진(필요한 데이터를 가진) 새로운 객체를 반환해주는 함수를 말한다.
그래서 원본은 raw, 거기에 더 풍성하게 추가한 변환 객체는 enrich라 주로 부른다.
*/
const reading = { customer: 'ivan', quantity: 10, month: 5, year: 2017 };

export function acquireReading() {
  return reading;
}

export function enrichReading(original) {
  // 깊은 복사 후 변경하기
  const result = _.cloneDeep(original);
  result.baseCharge = calculateBaseCharge(result);
  return result;
}

function calculateBaseCharge(reading) {
  return baseRate(reading.month, reading.year) * reading.quantity;
}
function baseRate(month, year) {
  if (year === 2017 && month === 5) return 0.1;
  return 0.2;
}
/* 
클래스와 변환 함수의 차이

클래스의 getter를 사용하면, 추후 속성 데이터가 변경되어도 변경된 데이터를 기반으로 
get 호출 시점의 데이터를 가지고 처리한 것을 반환한다.

변환 함수는 이를 호출하는 시점의 데이터를 가지고 새 객체를 반환했기때문에
추후 데이터가 변경된 것을 토대로 업데이트가 되지 않는다. 그 시점에 머물러 있다.
따라서 업데이트를 위해서는 변환함수를 그때그때 재호출해야 한다.
*/
