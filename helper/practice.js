export function add(a, b) {
  return a + b;
}

export class Calculator {
  constructor() {
    this.value = 0;
  }

  set(num) {
    this.value = num;
  }

  clear() {
    this.value = 0;
  }

  add(num) {
    const sum = this.value + num;
    if (sum >= 1000) {
      throw new Error('이 계산기는 1000 미만의 숫자만 제공합니다');
    }
    this.value = sum;
  }

  substract(num) {
    this.value -= num;
  }

  multiply(num) {
    this.value *= num;
  }

  divide(num) {
    this.value /= num;
  }
}

/* 
비동기 코드 
*/
export function fetchProduct(error) {
  if (error === 'error') {
    return Promise.reject('network error');
  }
  return Promise.resolve({ item: 'Cookie', price: 2500 });
}

export function fetchUser(id, cb) {
  setTimeout(() => {
    console.log('wait 0.1 sec.');
    const user = {
      id: id,
      name: 'User' + id,
      email: id + '@test.com',
    };
    cb(user);
  }, 100);
}
