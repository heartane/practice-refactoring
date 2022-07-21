/* 
특이 케이스 추가하기
*/

export class Site {
  constructor(customer) {
    this._customer = customer;
  }

  get customer() {
    return this._customer === 'unknown' ? new UnknowCustomer() : new Customer();
  }
}

export class Customer {
  constructor(name) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  get billingPlan() {
    //
  }

  set billingPlan(arg) {
    //
  }

  get paymentHistory() {
    //
  }
}

export class UnknowCustomer extends Customer {
  get name() {
    return 'occupant';
  }
}

// 사용하는 부분
export function customerName(site) {
  const aCustomer = site.customer;
  // 더 많은 코드가 여기에 있음
  const customerName = aCustomer.name;
  return customerName;
}
