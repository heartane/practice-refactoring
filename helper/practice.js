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
    this.value += num;
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
