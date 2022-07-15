/* 
변수로 추출하기

긴 표현식을 잘라서 변수로 해당 표현에 의미를 부여하면 이해를 더욱 도울 수 있다.
이해하는데 문제가 없다면 짧은 변수를 지향하자. 하지만 정말 필요한 정보라면 필요!!
*/

export function price(order) {
  const originalPrice = order.quantity * order.itemPrice;
  const discount = Math.max(0, order.quantity - 500) * order.itemPrice * 0.05;
  const delivery = Math.min(order.quantity * order.itemPrice * 0.1, 100);

  return originalPrice - discount + delivery;
}
