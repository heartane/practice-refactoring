/* 
변수 캡슐화하기

데이터는 외부에 노출하지 않은 체 get함수를 통해 간접적으로 보여주는 형태라도
객체라는 데이터 타입 특성 상 주소를 참조하기 때문에 mutable 가변적이다.
따라서 이렇게 변경이 가능한 형태를 여기저기 사용하면 매우 위험하다.

이를 방지하는 방법?
- 객체를 바로 반환하지만, 복사한 것을 반환한다. -> 하지만 얕은 복사 🚨
*/

let defaultOwner = { firstName: '마틴', lastName: '파울러' };

export function getDefaultOwner() {
  return { ...defaultOwner };
}
