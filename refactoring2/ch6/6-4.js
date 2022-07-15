/* 
변수 인라인하기
- 한눈에 봐도 이해가 명확하고 간결하면 변수 추출이 필요할까?
*/

export function isDeliveryFree(anOrder) {
  return anOrder.basePrice > 1000;
}
