import { GrabStore, User } from '../../grab/to-be/3.responsibility.js';

const products = {
  0: { name: '키보드', price: 30000 },
  1: { name: '모니터', price: 50000 },
  2: { name: '노트북', price: 600000 },
};
export const grabStore = new GrabStore('그랩상점', products);
export const user = new User(grabStore, 100000);
