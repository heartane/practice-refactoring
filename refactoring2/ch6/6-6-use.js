import { getDefaultOwner } from './6-6.js';

/* 
참조값을 변경하면 원본 또한 변한다.
*/
const owner = getDefaultOwner();
owner.firstName = '프레지덩';
console.log(owner);
console.log(getDefaultOwner());
