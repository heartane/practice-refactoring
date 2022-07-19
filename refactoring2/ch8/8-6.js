/* 
문장 슬라이드하기

사용하는 것과 가까이 위치하는 것이 좋다. 
그래야 코드를 읽어나갈 때 흐름이 끊기지 않는다.
*/

// 예제 1
const pricingPlan = retrievePricingPlan();
const chargePerUnit = pricingPlan.unit;
const order = retreiveOrder();
let charge;

// 예제 2
function someFunc() {
  const result = availableResources.length
    ? availableResources.pop()
    : createResource();
  allocatedResources.push(result);
  return result;
}
