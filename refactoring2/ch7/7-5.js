/* 
클래스 추출하기

클래스는 하나의 책임, 역할, 도메인을 가져야 한다.
여러 행동이 섞여있다면, 역할 분담을 위해 추출을 고민하자.
*/
class Person {
  #name;
  #phoneNumber;
  constructor(name, phoneNumber) {
    this.#name = name;
    this.#phoneNumber = phoneNumber;
  }

  get name() {
    return this.#name;
  }
  set name(arg) {
    this.#name = arg;
  }
  get phoneNumber() {
    return this.#phoneNumber.toString;
  }
  get officeAreaCode() {
    return this.#phoneNumber.areaCode;
  }
  get officeNumber() {
    return this.#phoneNumber.number;
  }
}

export class TelephoneNumber {
  #areaCode;
  #number;
  constructor(areaCode, number) {
    this.#areaCode = areaCode;
    this.#number = number;
  }
  get toString() {
    return `(${this.areaCode}) ${this.number}`;
  }

  get areaCode() {
    return this.#areaCode;
  }

  set areaCode(arg) {
    this.#areaCode = arg;
  }

  get number() {
    return this.#number;
  }

  set number(arg) {
    this.#number = arg;
  }
}

const phoneNumber = new TelephoneNumber('010', '12345678');
const person = new Person('문', phoneNumber);
console.log(person.name);
console.log(person.phoneNumber);
console.log(person.officeAreaCode);
console.log(person.officeNumber);
