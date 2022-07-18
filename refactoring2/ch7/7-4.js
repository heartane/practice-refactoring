/* 
임수 변수를 질의 함수로 바꾸기

간결하고 명확하게 함수의 역할이 잘 작성되어있어도, 
재사용이 필요한 부분이 있다면 추출을 고려한다.
각각의 변수들에 할당되었던 것들의 활용도가 더 높아진다.
*/

class Order {
  #quantity;
  #item;
  constructor(quantity, item) {
    this.#quantity = quantity;
    this.#item = item;
  }
  get basePrice() {
    return this.#quantity * this.#item.price;
  }
  get discountFactor() {
    return this.basePrice > 1000 ? 0.95 : 0.98;
  }
  get price() {
    return this.basePrice * this.discountFactor;
  }
}
