/* 
기본형을 객체로 바꾸기

컬랙션이나 레코드를 외부에서 조작하지 않도록 하자!
클래스 내부에 책임을 분리할 필요는 없는가?
분리한다면, 어느 클래스가 해당 동작의 책임을 지녀야 하는가?
각 책임을 가진 클래스가 DI를 통해 협력하는 방식으로 작동할 수 있도록 고민하자

클래스 내부에서 제한과 감시를 할 수 있다.
*/

export class Order {
  constructor(priority) {
    this.priority = priority;
  }

  isHighPriority() {
    return this.priority.higherThan('normal');
  }
}

class Priority {
  #value;
  constructor(value) {
    if (Priority.legalValues().includes(value)) {
      this.#value = value;
    } else {
      // 생성자 내부에서 에러를 발생하는 방식은 보안에 취약하다.
      throw new Error(`${value} is invalid for Priority`);
    }
  }

  index(value) {
    return Priority.legalValues().indexOf(value);
  }

  equals(other) {
    return this.index(this.#value) === this.index(other);
  }

  higherThan(other) {
    return this.index(this.#value) > this.index(other);
  }

  /* 
  static 함수는 인스턴스 레벨이 아니라 클래스 레벨의 함수로,
  인스턴스를 생성하지 않고, 클래스 이름만으로 호출이 가능하다.
  */
  static legalValues() {
    return ['low', 'normal', 'high', 'rush'];
  }
}

const orders = [
  new Order(new Priority('normal')),
  new Order(new Priority('high')),
  new Order(new Priority('rush')),
];

const highPriorityCount = orders.filter((o) => o.isHighPriority()).length;
console.log(highPriorityCount);
