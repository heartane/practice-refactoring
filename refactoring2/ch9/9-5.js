/* 
값을 참조로 바꾸기

불변성을 유지하면 안정적이나, 한 모듈의 변화를 다른 모듈이 인지하지 못한다.
변할 때마다 계속 새로운 인스턴스를 만든다면, 예전 버전의 인스턴스를 가진 측에서는 새로 업데이트한 것이 반영되지 않았기에 그 또한 버그를 만들 수도 있다.
변경 사항이 외부에서도 즉각적으로 업데이트되어야하는 환경이라면 가변성을 가진 클래스로 값보다는 참조를 사용하는 것이 필요하다.

참조 사용 시 고유한 id별로 하나의 인스턴스를 만드는 것을 보장하고 싶다면 레포지토리 패턴을 사용하는 것이 좋다.

*/

const customerRepository = new CustomerRepository();
const order = new Order(
  data.number,
  customerRepository.registerCustomer(data.customerId)
);

class Order {
  constructor(number, customer) {
    this._number = number;
    this._customer = customer;
  }

  get customer() {
    return this._customer;
  }
}

class Customer {
  constructor(id, name) {
    this._id = id;
    this._name = name;
  }

  get id() {
    return this._id;
  }
}

class CustomerRepository {
  #customers;
  constructor() {
    this.#customers = new Map();
  }

  registerCustomer(id) {
    if (!this.#customers.has(id)) {
      this.#customers.set(id, new Customer(id));
    }
    return findCustomer(id);
  }

  findCustomer(id) {
    return this.#customers.get(id);
  }
}
