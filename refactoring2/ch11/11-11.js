/* 
수정된 값 반환하기

함수가 외부의 상태를 변경하거나, 인자로 전달된 특정 객체를 직접적으로 변경하는 것은 사이드 이팩트를 야기한다.
무엇을 반환하는 형식으로 값을 알려야 한다.
*/

export function ascentVelocity(points, totalMinutes) {
  const totalAscent = calculateAscent(points);

  return totalAscent / totalMinutes;
}

function calculateAscent(points) {
  let result;
  for (let i = 1; i < points.length; i++) {
    const verticalChange = points[i].elevation - points[i - 1].elevation;
    result += verticalChange > 0 ? verticalChange : 0;
  }
  return result;
}
