/* 
메서드 올리기

서브 클래스에 중복해서 사용된다면, 부모 클래스의 메서드로 끌어올려서 중복을 방지하자.
코드 재사용성뿐만 아니라 해당 클래스의 공통된 규격을 한번에 파악할 수 있다.
*/

// 예시 1
class Employee {
  get name() {}
}

class Salesperson extends Employee {}

class Engineer extends Employee {}

// 예시 2
class Party {
  get annualCost() {
    return this.monthlyCost * 12;
  }
}

class Department extends Party {}
class Employee extends Party {}
