/* 
assertion 추가하기

사용자를 위한 용도보다는 개발자가 개발하는 과정에서 생길 수 있는 실수를 방지하고 알려주는 용도
배포용에서는 서비스 시 서버가 죽지않게 버그 리포트만 하고 정상동작하도록 만들어야 한다.
*/

import { strict as assert } from 'node:assert';
class Customer {
  constructor() {
    this.discountRate = 0;
  }
  applyDiscount(number) {
    assert(number >= 0);
    return this.discountRate ? number - this.discountRate * number : number;
  }
}

new Customer().applyDiscount(1);
