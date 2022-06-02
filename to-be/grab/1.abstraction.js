/* 
기존 그랩 스토어에서 상위 개념을 뽑아 추상화한다.
그리고 그 추상화 된 클래스를 고객에 의존성 주입(Dependency Injection)한다.

이것의 장점?
- 추후 새로운 요구사항으로 다른 스토어를 생성할 경우, 매우 용이하다.
- 그 다양한 상점들을 아우르는 상위 개념의 클래스를 고객에 주입함으로, 유연하고 확장성있게 개발할 수 있다.
*/

// 추상화된 상점 클래스
class Store {
  constructor(name) {
    this.money = 0;
    this.name = name;
    this.products = {};
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

// 추상화된 상점 클래스를 상속하는 특정 스토어 -> 하위 클래스
class GrabStore extends Store {
  constructor(name) {
    super(name);
    this.products = {
      0: { name: '키보드', price: 30000 },
      1: { name: '모니터', price: 50000 },
    };
  }
}

// 추후 새로운 상점을 만들 때 용이
class RamiStore extends Store {
  constructor(name) {
    super(name);
    this.products = {
      0: { name: '치마', price: 40000 },
      1: { name: '바지', price: 60000 },
      2: { name: '부츠', price: 20000 },
    };
  }
}

// 고객 클래스에 추상화된 클래스를 주입한다. -> 생성자 함수의 인자로 전달한다. -> 이들은 이제 협력관계!
class User {
  constructor(store) {
    this.money = 0;
    this.store = store;
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

/* 
실행 환경 레벨
추상적인 상위 클래스로 정적 의존성을 주입한 코드 레벨과 달리, 
실행 레벨에서는 구체적인 하위 클래스로 인스턴스 생성하여 동적 의존성을 주입한다.

이렇게 레벨에 따라 의존성을 달리 주입하여, 코드에 유연성을 주고 확장을 용이하게 한다.
 */

const chulsoo = new User(new GrabStore('그랩상점'));
const younghee = new User(new RamiStore('라미상점'));
