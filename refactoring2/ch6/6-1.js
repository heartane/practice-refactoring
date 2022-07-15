/* 
하나의 함수가 많은 일을 담고있다.

문제점
  1. 함수가 길어지면서 그만큼 행위에 대한 이해가 어려워진다.
  2. 재사용이 어렵다
  3. 버그 발생 시, 단번에 파악하고 잡아내기 힘들다.

서술만 하던 구조에서 각각의 행위를 단번에 표현하는 타이틀, 함수명만 표시한 체 추출한다.
신문의 헤드라인처럼 개발자가 세부 구현 사항을 훑으며 전부 이해하지 않아도  
함수명만으로 전체 구조를 파악할 수 있도록 리팩토링한다.
*/
export function printOwing(invoice) {
  printBanner();

  let outstanding = calculateOutstanding(invoice.orders);

  recordDueDate(invoice);

  printDetails(invoice, outstanding);
}

function printBanner() {
  console.log('***********************');
  console.log('**** Customer Owes ****');
  console.log('***********************');
}

/* 
함수 내에서 어떤 변수가 반환을 목적으로 하는 변수라면 result라 이름 짓는 것이 좋다.
그래야 읽으면서 단번에 인지하고 제대로 반환되는지도 확인할 수 있다.
더 이상 절차지향적인 반복문은 사용하지 않는다.
*/
function calculateOutstanding(orders) {
  // return orders.reduce((sum, order) => sum + order.amount, 0);
  let result = 0;
  for (const o of orders) {
    result += o.amount;
  }
  return result;
}

function recordDueDate(invoice) {
  const today = new Date();
  invoice.dueDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + 30
  );
  return invoice;
}

function printDetails(invoice, outstanding) {
  console.log(`name: ${invoice.customer}`);
  console.log(`amount: ${outstanding}`);
  console.log(`due: ${invoice.dueDate.toLocaleDateString()}`);
}

const invoice = {
  orders: [{ amount: 2 }, { amount: 5 }],
  customer: '라미',
};
printOwing(invoice);

/* 
예전에는 함수 제일 위에 사용할 모든 지역변수를 선언하는 것인 관행이었지만,
이제는 해당 변수를 사용하는 곳에 제일 가깝게 위치시킨다.
*/
