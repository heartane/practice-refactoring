/* 
매개 변수를 질의 함수로 바꾸기

같은 모듈 안에서 서로 동일한 의존성을 가지고 있을 때는
굳이 불필요한 매개변수를 남용하지 말고 바로 필요한 데이터를 질의함수로 가지고 올 수 있도록 하자.
*/
export class Order {
  constructor(quantity, itemPrice) {
    this.quantity = quantity;
    this.itemPrice = itemPrice;
  }

  get basePrice() {
    return this.quantity * this.itemPrice;
  }

  get discountLevel() {
    return this.quantity > 100 ? 2 : 1;
  }

  get finalPrice() {
    return this.discountedPrice();
  }

  #discountedPrice() {
    switch (this.discountLevel) {
      case 1:
        return this.basePrice * 0.95;
      case 2:
        return this.basePrice * 0.9;
    }
  }
}
