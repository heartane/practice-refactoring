/* 
상점이나 고객 클래스가 그대로 노출되어 있다. 
-> 은닉이 필요하다. 의존성을 주입받은 고객이 상점을 더럽힐 수 있다!
-> 자바스크립트의 private은 #로 표현

고객이 상점의 속성에 직접 접근한다. 
-> 상점이 허용한 메소드로 간접적으로 접근할 수 있도록 한다.

이것의 장점?
- 실무에서 가장 중요한 것은 안정성이다.
- 따라서 값의 불변성이 중요하다. 
- 협력 관계에서 허용된 범위 내에서 간접적으로 접근함으로, 예기치 못한 결과를 방지할 수 있다.
- 이렇게 의존성을 최대한 낮추며, 낮은 결합도를 추구한 설계를 위해 노력해야 한다.
*/

// 추상화된 상점 클래스
class Store {
  _money = 0;
  _products = {};

  constructor(name) {
    this.name = name;
  }
  // 고객이 원하는 상품 보여주기
  showProduct(productId) {
    return this._products[productId];
  }
  // 결제했을때 해당 상품 빼기
  giveProduct(productId) {
    delete this._products[productId];
  }
  // 결제 실패했을때 돈 다시 받기
  takeMoney(money) {
    this._money += money;
  }
}

// 추상화된 상점 클래스를 상속하는 특정 스토어 -> 하위 클래스
class GrabStore extends Store {
  constructor(name) {
    super(name);
    this._products = {
      0: { name: '키보드', price: 30000 },
      1: { name: '모니터', price: 50000 },
    };
  }
  setMoney(money) {
    this._money = money;
  }
  setProducts(products) {
    this._products = products;
  }
}

/* 
문제점 -> 고객이 상점과 깊숙히 연결되어 있다.
- 구매 메소드
  - 상품의 가격에 직접 접근하고 있다. -> 해당 상점 메소드 만들기
  - 구매 시, 고객이 직접 상점의 상품 목록에서 해당 상품을 없앤다. -> 상점에서 하도록 하기
  - 되도록 의존성을 주입받는 고객이 적극적이지 못하도록! 수동적일 수 있도록 구성하기
    - 상품을 직접 보는게 아니라, 상점이 보여주도록 하자.
*/
class User {
  #belongs = [];
  #money = 0;

  constructor(store) {
    this.store = store;
  }
  setMoney(money) {
    this.#money = money;
  }
  getMoney() {
    return this.#money;
  }
  getBelongs() {
    return this.#belongs;
  }
  getStore() {
    return this.store;
  }
  seeProduct(productId) {
    const product = this.store.showProduct(productId);
    return product;
  }
  purchaseProduct(productId) {
    const product = this.seeProduct(productId);

    if (this.#money >= product['price']) {
      this.store.giveProduct(productId); // 상품 구매
      this.#money -= product['price']; // 돈 주기
      this.store.takeMoney(product['price']); // 상점 돈 받기
      this.#belongs.push(product); // 고객 보관함에 추가
      return product;
    } else {
      throw new Error('잔돈이 부족합니다');
    }
  }
}

const chulsoo = new User(new GrabStore('그랩상점'));

console.log(chulsoo);
