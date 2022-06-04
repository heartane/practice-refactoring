/* 
문제점 -> 고객이 결제 부분에 너무 많은 책임을 가지고 있다.
- 상점에서 판매 책임을 갖도록 변경하자
- 판매 행위를 추상화하고, 구체적인 로직을 옮기자 
*/

class Store {
  constructor(name) {
    this.name = name;
    this._money = 0;
    this._products = {};
  }

  showProduct(productId) {
    return this._products[productId] || {};
  }

  sellProduct(productId, money) {
    const product = this.showProduct(productId);
    if (!Object.keys(product).length) {
      throw new Error('상품이 존재하지 않습니다');
    }

    this._takeMoney(money);
    try {
      const soldProduct = this._takeOutProduct(productId);
      return soldProduct;
    } catch (error) {
      this._returnMoney(money);
      throw new Error(`판매 중 문제가 발생했습니다. ${error}`);
    }
  }

  _takeMoney(money) {
    this._money += money;
  }

  _takeOutProduct(productId) {
    const product = { ...this._products[productId] }; // 얕은 복사
    delete this._products[productId];
    return product;
  }

  _returnMoney(money) {
    this._money -= money;
  }
}

export class GrabStore extends Store {
  constructor(name, products) {
    super(name);
    this._products = products;
  }
  setMoney(money) {
    this._money = money;
  }
  setProducts(products) {
    this._products = products;
  }
}

export class User {
  constructor(store, money) {
    this.store = store;
    this._money = money;
    this.belongs = [];
  }

  getMoney() {
    return this._money;
  }

  getBelongs() {
    return this.belongs;
  }

  getStore() {
    return this.store;
  }

  seeProduct(productId) {
    const product = this.store.showProduct(productId);
    return product;
  }

  _giveMoney(money) {
    if (!this._checkMoneyEnough(money)) {
      throw new Error('현재 가진 돈이 부족합니다');
    }
    this._money -= money;
  }

  _takeMoney(money) {
    this._money += money;
  }

  _addBelongs(product) {
    this.belongs.push(product);
  }

  _checkMoneyEnough(price) {
    return this._money >= price;
  }

  purchaseProduct(productId) {
    /* 스토어가 제공하는 퍼블릭 메소드로 간접적으로 접근하도록 행위는 메소드로 구현하고 호출하자
		 상위 메소드에 세세하게 분리된 메소드가 모인 형태. 가독성이 좋게 분리 필요 */
    const product = this.seeProduct(productId);
    const price = product['price'];

    if (this._checkMoneyEnough(price)) {
      this._giveMoney(price);
      try {
        const myProduct = this.store.sellProduct(productId, price);
        this._addBelongs(myProduct);
        return myProduct;
      } catch (error) {
        this._takeMoney(price);
        throw new Error(`구매 중 문제가 발생했습니다. ${error}`);
      }
    } else {
      throw new Error('잔돈이 부족합니다');
    }
  }
}

const products = {
  0: { name: '키보드', price: 30000 },
  1: { name: '모니터', price: 50000 },
};
const store = new GrabStore('그랩상점', products);
const user = new User(store, 100000);
user.purchaseProduct(1);
// console.log(user);
