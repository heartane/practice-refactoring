/* 
조건식 통합하기

동일한 동작을 수행하는 다양한 조건이 있다면, 
하나의 조건문으로 뭉쳐서 이름을 부여하고 사용하면 훨씬 코드가 깔끔해지고 의도를 잘 나타낼 수 있다.
*/

function disabilityAmount(employee) {
  return ineligibleForDisability(employee) ? 0 : 1;
}

function ineligibleForDisability(employee) {
  return (
    employee.seniority < 2 ||
    employee.monthsDisabled > 12 ||
    employee.isPartTime
  );
}
