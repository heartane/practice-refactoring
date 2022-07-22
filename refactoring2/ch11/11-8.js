/* 
생성자를 팩토리 함수로 바꾸기

클래스의 인스턴스를 만들 때, 복잡하거나 헷갈리는 생성자를 외부에서 바로 호출해서 생성하는 것이 아니라
생성자는 private으로 캡슐화 해두고, 외부에서는 static을 이용한 팩토리 함수로 간편하게 원하는 인스턴스를 만들 수 있다.
(자바스크립트는 생성자를 private하게 만들 수 없다.)

왜, 언제 사용하는가?
인스턴스를 생성하는 생성자가 복잡할 때, 그 자체를 캡슐화하고
외부에서 조금 더 쉽게 원하는 인스턴스를 생성하도록 한다.
*/

export class Employee {
  constructor(name, typeCode) {
    // private이라 가정
    this._name = name;
    this._typeCode = typeCode;
  }
  get name() {
    return this._name;
  }

  get type() {
    return Employee.legalTypeCodes[this._typeCode];
  }

  static get legalTypeCodes() {
    return { E: 'Engineer', M: 'Manager', S: 'Salesman' };
  }

  static createEngineer(name) {
    return new Employee(name, 'E');
  }

  static createSeniorEngineer(name) {
    return new Employee(name, 'SE');
  }

  static createManager(name) {
    return new Employee(name, 'M');
  }
}

const employee = Employee.createEngineer('람');
console.log(employee.type);
