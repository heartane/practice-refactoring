import { GrabStore } from '../to-be/grab/3.responsibility';

test('showProduct() - 해당 상품을 반환합니다', () => {
  // given
  const products = {
    0: { name: '키보드', price: 30000 },
    1: { name: '모니터', price: 50000 },
  };
  const grabStore = new GrabStore('그랩상점', products);
  const productId = 1;

  // when
  const product = grabStore.showProduct(productId);

  // then
  expect(product).toBe(products[productId]);
});
