/* 
상황
- 고객이 상점의 상품을 구매하는 기본적인 코드
- 고객과 상점이 서로 돈을 가지고 있고, 거래가 일어나면 돈을 주고 받는다.

리팩토링 전 코드를 보고 떠오르는 문제점
- 상점 클래스 그랩 스토어로 너무 구체적이다. -> 스토어라는 추상화된 상위 클래스가 필요하다.
- 고객도 특정 상점을 주입받아 사용한다. -> 어떤 상점이든 협력할 수 있도록 추상화된 클래스를 주입한다.
- 상점이나 고객 클래스가 그대로 노출되어 있다. -> 은닉이 필요하다. 의존성을 주입받은 고객이 상점을 더럽힐 수 있다!
  - 고객이 상점의 속성에 직접 접근한다. -> 상점이 허용한 메소드로 간접적으로 접근할 수 있도록 한다.
*/

// 상점 코드
class GrabStore {
  constructor() {
    this.money = 0;
    this.name = '그랩마켓';
    this.products = {
      0: { name: '키보드', price: 30000 },
      1: { name: '모니터', price: 50000 },
    };
  }
  setMoney(money) {
    this.money = money;
  }
  setProducts(products) {
    this.products = products;
  }
  getMoney() {
    return this.money;
  }
  getProducts() {
    return this.products;
  }
}

// 사용자 코드
class User {
  constructor() {
    this.money = 0;
    this.store = new GrabStore();
    this.belongs = [];
  }
  setMoney(money) {
    this.money = money;
  }
  setBelongs(belongs) {
    this.belongs = belongs;
  }
  getMoney() {
    return this.money;
  }
  getBelongs() {
    return this.belongs;
  }
  getStore() {
    return this.store;
  }
  seeProduct(productId) {
    const products = this.store.getProducts();
    return products[productId];
  }
  purchaseProduct(productId) {
    const product = this.seeProduct(productId);

    if (this.money >= product['price']) {
      delete this.store.products['productId'];
      console.log(this.store.products);
      this.money -= product['price'];
      this.store.money += product['price'];
      this.belongs.push(product);
      return product;
    } else {
      throw new Error('잔돈이 부족합니다');
    }
  }
}

// 실행 코드
let user = new User();
console.log('유저 인스턴스 생성', user);
user.setMoney(100000);
user.purchaseProduct(0);
console.log('돈을 가지고 0번 구매', user);
