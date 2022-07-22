/* 
오류 코드를 예외로 바꾸기

특정 함수에서 예외사항이 발생한다면, 일반적으로 값을 반환하는 리턴문은 쓰지않고
에러를 정확하게 던져주고, 어떤 에러인지에 따라 우리가 명확하게 정한 에러를 상속한 세부 클래스를 만들어 사용한다.
그러면 더 명확하게 에러를 핸들링할 수 있다.
*/

function localShippingRules(data) {
  if (data) return new ShippingRules(data);
  else {
    throw new OrderProcessingError(-23);
  }
}

class OrderProcessingError extends Error {
  constructor(errorCode) {
    super();
    this.errorCode = errorCode;
  }
}

try {
  const result = localShippingRules();
} catch (err) {
  if (err instanceof OrderProcessingError) {
    console.log(err);
  }
}
