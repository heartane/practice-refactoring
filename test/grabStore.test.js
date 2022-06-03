import { grabStore } from './fixtures/grabConfig.js';

test('showProduct() - 해당 상품을 반환합니다', () => {
  // given
  const productId = 1;

  // when
  const product = grabStore.showProduct(productId);

  // then
  // expect(product).toStrictEqual({ name: '모니터', price: 50000 });
  expect(product.name).toBe('모니터');
  expect(product.price).toBe(50000);
});

test('takeMoney() - 판매한 상품의 금액을 받습니다', () => {
  const productPrice = 100;
  const ownMoney = grabStore._money;

  grabStore._takeMoney(productPrice);
  expect(grabStore._money).toBe(ownMoney + productPrice);
});

test('returnMoney() - 품절 일 경우 환불을 진행합니다', () => {
  const productPrice = 100;
  const ownMoney = grabStore._money;

  grabStore._returnMoney(productPrice);
  expect(grabStore._money).toBe(ownMoney - productPrice);
});

test('takeOutProduct() - 판매 된 상품을 확인하고 재고 목록에서 삭제합니다', () => {
  const productId = 1;
  const product = grabStore._takeOutProduct(productId);

  expect(product.name).toBe('모니터');
  expect(product.price).toBe(50000);
  expect(grabStore._products[productId]);
});
