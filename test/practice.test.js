import add from '../helper/add.js';

test('add 함수는 두 인자를 합한 값을 리턴합니다.', () => {
  expect(add(1, 2)).toBe(3);
});
