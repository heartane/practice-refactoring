/* 
여러 함수를 클래스로 묶기

데이터와 이 데이터를 사용하는 곳, 즉 속성과 기능이 서로 분리된 체 여기저기서 유기적으로 얽혀 사용되고 있다.
이렇게 절자적 프로그래밍을 하면 재사용은 물론 유지보수가 매우 어렵다. 따라서 스파게티 코드 정리가 필요하다.

기존 코드는 사용하는 쪽 외부에서 데이터를 능동적으로 조작하는데 
여기저기서 그저 불러와 사용만 하는 것이 아니라, 한 곳에서 명확한 책임을 지니고 허용 데이터를 건내는 것이 어떨까
해당 데이터를 사용하는 밀접한 기능은 클래스 내부로 모아 응집도를 높인다!

클래스로 묶은 효과
- 외부에서 일일이 데이터를 가지고 기능을 만들기 위한 반복적인 수고를 할 필요가 없고
클래스 안에서 제공하는 다양한 메소드를 통해 필요한 값을 얻을 수 있다.
*/

export class Reading {
  /* 
  필드를 프라이빗으로 만드는 이유
  - 우리가 지정한 필드명을 외부에서 변경할 수 없도록 하기 위함이다! 항상 필드를 프라이빗으로 만드는 것이 좋다.
  */
  #customer;
  #quantity;
  #year;
  #month;
  constructor(data) {
    this.#customer = data.customer;
    this.#quantity = data.quantity;
    this.#year = data.year;
    this.#month = data.month;
  }
  get customer() {
    return this.#customer;
  }
  get quantity() {
    return this.#quantity;
  }
  get year() {
    return this.#year;
  }
  get month() {
    return this.#month;
  }
  /* 
  함수를 getter로 변경하면, 속성을 가져오는 것처럼 사용할 수 있다.
  */
  get baseRate() {
    if (this.#year === 2017 && this.#month === 5) return 0.1;
    return 0.2;
  }
  get baseCharge() {
    // quantity는 프라이빗 필드이지만, getter가 있기때문에 이를 사용해도 무방하다.
    return this.baseRate * this.quantity;
  }
  get taxThreshold() {
    return 0.1;
  }

  get taxableCharge() {
    return Math.max(0, this.baseCharge - this.taxThreshold);
  }
}
const reading = new Reading({
  customer: 'ivan',
  quantity: 10,
  month: 5,
  year: 2017,
});

// 일반 객체를 반환하지 않고, 클래스의 인스턴스를 반환토록 한다!
export function acquireReading() {
  return reading;
}
