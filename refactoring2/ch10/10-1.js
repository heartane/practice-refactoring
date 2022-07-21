/* 
조건문 분해하기

조건문에서 연속적인 연산자와 부정의 연속은 이해를 어렵게 한다.
따라서 표현식을 이해하기 쉽게 변수나 질의 함수로 추출해서 의미를 명확하게 표현하는 것이 좋다.
*/

function calculateCharge(date, quantity, plan) {
  return isSummer() ? calculateSummerCharge() : calculateRegularCharge();

  function isSummer() {
    return !date.isBefore(plan.summerStart) && !date.isAfter(plan.summerEnd);
  }
  function calculateSummerCharge() {
    return quantity * plan.summerRate;
  }
  function calculateRegularCharge() {
    return quantity * plan.regularRate + plan.regularServiceCharge;
  }
}
