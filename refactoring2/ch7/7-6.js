/* 
클래스 인라인하기

딱히 어떤 역할을 갖고있지 않고 지나치게 세분화해서
접근하는데 그 꼬리만 길어진다면 통합을 고려한다.

항상 클래스 생성에서는 높은 응집도, 밀접하게 관련된 것을 묶어나가는 것이 중요하다.
하지만 너무 지나치게 미래지향적으로 설계하는 것은 좋지 않다!
*/
export class Shipment {
  #shippingCompany;
  #trackingNumber;
  constructor(trackingNumber, shippingCompany) {
    this.#trackingNumber = trackingNumber;
    this.#shippingCompany = shippingCompany;
  }

  get shippingCompany() {
    return this.#shippingCompany;
  }
  set shippingCompany(arg) {
    this.#shippingCompany = arg;
  }
  get trackingNumber() {
    return this.#trackingNumber;
  }
  set trackingNumber(arg) {
    this.#trackingNumber = arg;
  }
  get trackingInfo() {
    return `${this.shippingCompany}: ${this.trackingNumber}`;
  }
}

const shipment = new Shipment(999, 'Maersk');
console.log(shipment.trackingInfo);

shipment.shippingCompany = 'COSCO';
console.log(shipment.trackingInfo);
