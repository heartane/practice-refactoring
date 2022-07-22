/* 
질의 함수를 매개변수로 바꾸기

다른 모듈과는 심각한 커플링을 나타내는 것이 질의 함수다.
따라서 외부 의존성이 필요한 경우에는 직접 접근이 아니라 매개변수를 통해 접근해야 한다.
*/

targetTemperature(aPlan, thermostat.currentTemperature);

// 다른모듈에 있는 함수라고 가정
function targetTemperature(plan, currentTemperature) {
  // ...
}
