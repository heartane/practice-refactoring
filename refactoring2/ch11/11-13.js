/* 
예외를 사전확인으로 바꾸기

예상하지 못한 사항이 발생했을 때, 어플리케이션이 죽어 사용자가 당황하지 않도록
그 처리를 유연하게 하기 위한 부분이지 우리가 예상 가능한 것을 처리하기 위함이 아니다.

예외처리를 남용하며 사용하는 경우가 있다.
우리가 예상한 에러라면 그 케이스에 맞게 로직을 구성하면 된다.
(사전확인이나 기본값을 지정한다.)

예외인지 예상하는 실패 케이스인지를 분리하는 것이 중요하다.
*/

const values = [];
function getValueForPeriod(periodNumber) {
  return values[periodNumber] ?? null;
}

getValueForPeriod(-10);
