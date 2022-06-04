import { add, Calculator } from '../helper/practice.js';

test('add 함수는 두 인자를 합한 값을 리턴합니다.', () => {
  expect(add(1, 2)).toBe(3);
});

/* 
describe, 한 함수 혹은 클래스에 테스트 함수를 가독성있게 모을 수 있다.
beforeEach, 매번 테스트 데이터를 초기화하는 수고를 덜 수 있다.
*/
describe('Calculator test', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('inits with 0', () => {
    expect(calculator.value).toBe(0);
  });

  test('set value', () => {
    calculator.set(1);
    expect(calculator.value).toBe(1);
  });

  test('clear value', () => {
    calculator.set(1);
    calculator.clear();
    expect(calculator.value).toBe(0);
  });

  test('add value', () => {
    calculator.add(2);
    expect(calculator.value).toBe(2);
  });

  test('substract value', () => {
    calculator.substract(1);
    expect(calculator.value).toBe(-1);
  });

  test('multiply value', () => {
    calculator.set(2);
    calculator.multiply(4);
    expect(calculator.value).toBe(8);
  });

  describe('divides', () => {
    test('0 / 0 === NaN', () => {
      calculator.divide(0);
      expect(calculator.value).toBeNaN();
    });

    test('1 / 0 === Infinity', () => {
      calculator.set(1);
      calculator.divide(0);
      expect(calculator.value).toBe(Infinity);
    });

    test('divide value', () => {
      calculator.set(12);
      calculator.divide(4);
      expect(calculator.value).toBe(3);
    });
  });
});
