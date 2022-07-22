/* 
질의 함수와 변경 함수 분리하기

함수를 만들 때 궁극적인 핵심은 사이드 이팩트없는 함수를 만들자다.
함수명에 따른 동작에만 집중하도록! 재사용성이 증가하고 문제 발생 시 더욱 집약적으로 파악할 수 있다.
특정 로직의 조합이 필요하다면, 한 곳에서 호출만으로 그 흐름을 빠르게 파악할 수 있다.
*/

// 예제 1
function totalOutstanding() {
  return customer.invoices.reduce((total, each) => each.amount + total, 0);
}

function sendBill() {
  // do something
}

// 예제 2
export function alertForMiscreant(people, alarm) {
  const miscreant = findMiscreant(people);
  setOffAlarms(alarm, miscreant);
}

function findMiscreant(people) {
  for (const p of people) {
    if (p === 'Don' || p === 'John') {
      return p;
    }
  }
  return '';
}

function setOffAlarms(alarm, p) {
  alarm.setOff('Found Miscreant ' + p);
}
