/* 
중개자 제거하기

getter & setter로 단순히 데이터만 가진 클래스
즉 별도의 역할이나 로직이 들어있지않다면 굳이 중개가 필요없다.
통합이 나을 수도 있다.
*/
class Person {
  #name;
  #manager;
  #chargeCode;
  constructor(name, manager, chargeCode) {
    this.#name = name;
    this.#manager = manager;
    this.#chargeCode = chargeCode;
  }

  get name() {
    return this.#name;
  }

  get manager() {
    return this.#manager;
  }

  get chargeCode() {
    return this.#chargeCode;
  }
}

const person = new Person('Tom', 'aManager', '999');
console.log(person.name);
console.log(person.manager);
console.log(person.chargeCode);
