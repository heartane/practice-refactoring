/* 
객체 통째로 넘기기

어느 정도 규모의 인자를 넘길 것인가? 매개변수 범위 규정하기의 정도는 없다.

함수에서 특정한 인자를 전달받을 때, 이것이 객체에 쌓여져 있다면 그대로 전달하는 것이 실용적일 수 있다.
그러나 그 함수가 객체 안의 일부분의 속성만 필요하다면 전체를 전달하는 것은 자칫 위험할 수 있다.

따라서 객체를 통째로 전달하는 것은 간편할 수 있지만, 커플링이 불필요하게 높아질 수 있기 때문에
전달받는 객체에 대한 의존성을 함수가 가져도 괜찮은지를 고려해야 한다.
*/

export function temperatureAlerts(room, plan) {
  const alerts = [];

  if (!plan.withinRange(room.daysTempRange)) {
    alerts.push('room temperature went outside range');
  }

  return alerts;
}

export class HeatingPlan {
  constructor(temperatureRange) {
    this._temperatureRange = temperatureRange;
  }

  withinRange(range) {
    return (
      range.bottom >= this._temperatureRange.low &&
      range.top <= this._temperatureRange.high
    );
  }
}
