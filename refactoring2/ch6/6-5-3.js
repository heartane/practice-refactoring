/* 
함수 선언 변경하기 - 매개변수 DI

매개변수는 해당 함수에 꼭 필요한 것만 정제해서 작성한다.
불필요하게 큰 범위의 객체를 모두 받으면, 재사용이 힘들다.
이렇게 외부 객체에 대한 의존도를 낮추는 것으로 재사용에 용이한 구조를 만든다.
*/

export function inNewEngland(state) {
  return ['MA', 'CT', 'ME', 'VT', 'NH', 'RI'].includes(state);
}
