/* 
함수 선언 변경하기 - 매개변수 Flag & Default

불리언 인자에 따라 다른 행위(동작)를 하는 함수에서
이 불리언을 Flag 깃발이라고 하는데, 이런 함수는 좋지 않다.

만약 기존과 다르게 해당 함수를 Flag로 변경해야 한다면, 
기존 로직에 영향을 주지 않도록 default값을 준다.
*/

export default class Book {
  #reservations;
  constructor() {
    this.#reservations = [];
  }

  addReservation(customer, isPriority = false) {
    // 우선 예약 기능이 추가되면서 Flag 인자가 들어온다.
    if (isPriority) {
      // ...
    } else {
      this.#reservations.push(customer);
    }
  }

  hasReservation(customer) {
    return this.#reservations.some(
      (reservedCustomer) => reservedCustomer.id === customer.id
    );
  }
}
