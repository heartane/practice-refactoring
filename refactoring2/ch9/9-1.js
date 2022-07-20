/* 
변수 쪼개기

임시 변수가 아닌 의미있는 이름을 부여하자
- 변수가 정말 업데이트되어야 할 명확한 이유(반환값 등)가 있는 것이 아니라면, const를 사용하며 재할당을 지양한다.

함수 인자값을 업데이트하는 것은 매우 좋지않은 습관!
*/

// 예제 1
const perimeter = (width + height) * 2;
console.log(perimeter);
const area = width * height;
console.log(area);

// 예제 2
function distanceTravelled(scenario, time) {
  let result;

  const primaryAcceleration = scenario.primaryForce / scenario.mass; // 가속도(a) = 힘(F) / 질량(m)
  const primaryTime = Math.min(time, scenario.delay);
  result = 0.5 * primaryAcceleration * primaryTime * primaryTime; // 전파된 거리

  const secondaryTime = time - scenario.delay;
  if (secondaryTime > 0) {
    // 두 번째 힘을 반영해 다시 계산
    const primaryVelocity = primaryAcceleration * scenario.delay;
    const secondaryAcceleration =
      (scenario.primaryForce + scenario.secondaryForce) / scenario.mass;
    result +=
      primaryVelocity * secondaryTime +
      0.5 * secondaryAcceleration * secondaryTime * secondaryTime;
  }
}

// 예제 3
function discount(inputValue, quantity) {
  let result = inputValue;
  if (inputValue > 50) result -= 2;
  if (quantity > 100) result -= 1;
  return result;
}
