import { getDefaultOwner } from './6-6.js';

/* 
참조값을 변경하면 원본 또한 변한다.
따라서 클래스 청사진으로 getter와 setter의 권한을 명시하고
인스턴스를 반환하므로 read-only를 통해 불변성을 유도한다.
*/
const owner = getDefaultOwner();
console.log(owner.firstName);
console.log(getDefaultOwner());
