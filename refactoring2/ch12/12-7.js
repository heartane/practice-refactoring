/* 
서브클래스 제거하기

서브 클래스가 필요없는 경우는 언제일까?
서브 클래스마다 다형성을 이용해 다른 동작을 핸들링하는 유즈 케이스가 없고
그저 속성 하나만 달라서 상속을 통해 하위 클래스를 만든거라면 오버 엔지니어링에 가깝다.
이럴 때는 하나의 클래스에서 속성을 다르게 설정하는 것이 더 나을 수도 있다.

외부에서 전혀 알 필요없는 세부 로직들은 잘 캡슐화하고, 
생성에 편리하게 static 팩토리 메서드를 제공해준다.
*/

class Person {
  #name;
  #genderCode;
  constructor(name, genderCode) {
    this.#name = name;
    this.#genderCode = genderCode;
  }

  get name() {
    return this.#name;
  }

  get genderCode() {
    return this.#genderCode;
  }

  get isMale() {
    return this.#genderCode === 'M';
  }

  static create(record) {
    switch (record.gender) {
      case 'M':
        return new Person(record.name, 'M');
      case 'F':
        return new Person(record.name, 'F');
      default:
        return new Person(record.name, 'X');
    }
  }
}

function loadFromInput(data) {
  const result = [];
  data.forEach((record) => result.push(Person.create(record)));
  return result;
}

const people = loadFromInput([
  { name: '영희', gender: 'F' },
  { name: '철수', gender: 'M' },
  { name: '밥', gender: 'M' },
]);

const numberOfMales = people.filter((p) => p.isMale).length;
console.log(numberOfMales);
