/* 
타입 코드를 서브클래스로 바꾸기

생성자에서 에러를 던지는 것은 좋지 않고
외부의 실수를 validate하는 것보다 실수를 하지 않도록 코드를 유도하는 것이 좋다.
*/

class Employee {
  #name;
  constructor(name) {
    this.#name = name;
  }

  get type() {
    return 'employee';
  }

  get toString() {
    return `${this.#name} (${this.type})`;
  }

  static createEmployee(name, type) {
    switch (type) {
      case 'engineer':
        return new Engineer(name);
      case 'manager':
        return new Manager(name);
      case 'salesperson':
        return new Salesperson(name);
      default:
        throw new Error(`${type} 라는 직원 유형은 없습니다`);
    }
  }
}

class Engineer extends Employee {
  get type() {
    return 'engineer';
  }
}

class Manager extends Employee {
  get type() {
    return 'manager';
  }
}

class Salesperson extends Employee {
  get type() {
    return 'salesperson';
  }
}

const employee = new Employee('람');
const rami = new Engineer('라미');
const bob = Employee.createEmployee('밥', 'manager');

console.log(rami.toString);
console.log(bob.toString);
