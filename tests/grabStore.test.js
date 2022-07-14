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
  const storeMoney = grabStore._money;

  grabStore._takeMoney(productPrice);
  expect(grabStore._money).toBe(storeMoney + productPrice);
});

test('returnMoney() - 품절 일 경우 환불을 진행합니다', () => {
  const productPrice = 100;
  const storeMoney = grabStore._money;

  grabStore._returnMoney(productPrice);
  expect(grabStore._money).toBe(storeMoney - productPrice);
});

test('takeOutProduct() - 판매 된 상품을 확인하고 재고 목록에서 삭제합니다', () => {
  const productId = 1;
  const product = grabStore._takeOutProduct(productId);

  expect(product.name).toBe('모니터');
  expect(product.price).toBe(50000);
  expect(grabStore._products[productId]);
});

/* 
통합 테스트
조금 더 상위 함수로 여러 함수들의 상호작용을 확인
*/

describe('sellProduct() - 상점이 상품을 판매합니다', () => {
  let productId;
  test('고객이 상품을 구매하면, 상점 금고는 채워지고 해당 상품은 목록에서 제거됩니다', () => {
    productId = 0;
    const storeMoney = grabStore._money;
    const product = grabStore.showProduct(productId);

    grabStore.sellProduct(productId, product.price);
    expect(grabStore._money).toBe(storeMoney + product.price);
    expect(grabStore.showProduct(productId)).toStrictEqual({});
  });

  test('존재하지 않는 상품 구매를 시도하는 경우 에러가 발생합니다', () => {
    productId = 100;

    expect(() => grabStore.sellProduct(productId, 0)).toThrowError();
  });
});
