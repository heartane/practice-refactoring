/* 
테스트에서 또한 SRP가 적용된다.
따라서 하나의 테스트 함수에 여러 부분의 테스트가 진행되어야 한다면,
클로저 형태를 만들어서 구체적인 테스트 함수를 모을 수 있다.

테스트를 작성하면서, 기존에 방어코드가 없었더라도
조금 더 세세하게 예외처리에 대해 생각해볼 수 있다.
*/
import { user } from './fixtures/grabConfig.js';

describe('checkMoneyEnough() -> 소지한 금액이 상품 구매에 충분한지 확인합니다\n', () => {
  let productPrice;
  test('소지한 금액이 원하는 상품가격보다 많다면, true를 반환합니다', () => {
    productPrice = 500;
    const canAfford = user._checkMoneyEnough(productPrice);
    expect(canAfford).toBe(true);
  });
  test('소지한 금액이 원하는 상품가격보다 적다면, false를 반환합니다', () => {
    productPrice = 2000000;
    const canAfford = user._checkMoneyEnough(productPrice);
    expect(canAfford).toBe(false);
  });
});

/* 
기존에 방어코드가 없었지만, 생각 해야 할 예외 상황
- 만약 고객 수중의 돈이 상품의 가격보다 적을 경우, 에러를 발생해야 한다.
*/
describe('giveMoney() -> 상품 구매를 위해 해당 금액을 지불합니다\n', () => {
  let productPrice;

  test('상품 가격이 현재 수중의 돈보다 크다면 에러가 발생합니다', () => {
    productPrice = 2000000;
    expect(() => user._giveMoney(productPrice)).toThrowError();
  });

  test('현재 수중의 돈에서 상품 가격만큼 차감합니다', () => {
    productPrice = 50000;
    const ownMoney = user._money;

    user._giveMoney(productPrice);
    expect(user._money).toBe(ownMoney - productPrice);
  });
});
