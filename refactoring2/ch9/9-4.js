/* 
참조를 값으로 바꾸기

value는 값 그자체로 불변성을 띈다.
따라서 재할당은 가능하지만, 다른 값으로 변경할 수는 없다.

reference는 가변성을 띈다.
재할당도 가능하고, 내용물에 직접 접근해서 다른 값으로 변경할 수도 있다.
따라서 외부에서 이 특징으로 인해 값이 변경될 여지가 있다.

불변성을 유지하는 것은 프로그램의 안정성을 높인다.
실수로 곳곳에서 업데이트하면서 생길 수 있는 버그를 방지해준다.

업데이트가 일어나야 한다면, 
이 참조를 값처럼 사용해서 재할당만 일어날 수 있도록 하는 방식이 필요하다.

인스턴스 생성으로 인해 메모리 낭비?
미세하게 메모리 성능을 잃게되더라도 안정성을 높일 수 있다는 것을 유념하자
*/

class Person {
  #name;
  #telephoneNumber;
  constructor(name, areaCode, number) {
    this.#name = name;
    this.#telephoneNumber = new TelephoneNumber(areaCode, number);
  }

  get name() {
    return this.#name;
  }

  set name(arg) {
    this.#name = arg;
  }

  get telephoneNumber() {
    // 참조값을 그대로 반환하면 외부에서 변경을 가할 수 있다.
    return this.#telephoneNumber;
  }

  get officeAreaCode() {
    return this.#telephoneNumber.areaCode;
  }

  set officeAreaCode(value) {
    this.#telephoneNumber = new TelephoneNumber(value, this.officeNumber);
  }

  get officeNumber() {
    return this.#telephoneNumber.number;
  }

  set officeNumber(value) {
    this.#telephoneNumber = new TelephoneNumber(this.officeAreaCode, value);
  }
}

class TelephoneNumber {
  #areaCode;
  #number;
  constructor(area, number) {
    this.#areaCode = area;
    this.#number = number;
  }

  get areaCode() {
    return this.#areaCode;
  }
  get number() {
    return this.#number;
  }
  get toString() {
    return `(${this.#areaCode}) ${this.#number}`;
  }
}

const person = new Person('프라덕', '010', '12345678');
console.log(person.name);
console.log(person.officeAreaCode);
console.log(person.officeNumber);
console.log((person.officeNumber = '9989898989'));
console.log(person.telephoneNumber.number);
