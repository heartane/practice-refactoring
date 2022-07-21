/* 
중첩 조건문을 보호 구문으로 바꾸기

쉽게 결과가 도출될 수 있는 부분은 우선적으로 반환해준다.
그리고 보호 구문을 지나 들어온 주요 로직들을 가장 하단에서 처리함으로 조건문 중첩을 해결할 수 있다.
즉, 내가 원하는 조건에서 벗어나는 것들을 먼저 빨리 나가도록(early exit) 하는 구조가 좋다.
*/

export function payAmount(employee) {
  if (employee.isSeparated) {
    return { amount: 0, reasonCode: 'SEP' };
  }

  if (employee.isRetired) {
    return { amount: 0, reasonCode: 'RET' };
  }
  // lorem.ipsum(dolor.sitAmet);
  // consectetur(adipiscing).elit();
  // sed.do.eiusmod = tempor.incididunt.ut(labore) && dolore(magna.aliqua);
  // ut.enim.ad(minim.veniam);
  return someFinalComputation();
}

function someFinalComputation() {
  return { amount: 999, reasonCode: 'UNICORN' };
}
