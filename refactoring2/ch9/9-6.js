/* 
매직 리터럴 바꾸기

추측하기 어렵게 하는 숫자는 상수로 정의해서 의미를 부여한다.
*/
const STANDARD_GRAVITY = 9.81;

function potentialEnergy(mass, height) {
  return mass * STANDARD_GRAVITY * height;
}
