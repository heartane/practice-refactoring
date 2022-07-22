/* 
플래그 인수 제거하기

예제 1
하나의 함수에서 불리언에 따라 다른 행동을 하는 것보다
함수를 분리하는 것이 좋다. 함수명은 그 의미를 명확하게 전달하기 위해 명령형으로 작성한다.
*/

function setWidth(value) {
  this._width = value;
}
function setHeight(value) {
  this._height = value;
}

/* 
예제 2
불리언 플래그를 제거하고 함수를 분리했는데 그 내부로직이 비슷하다면 
동일 코드 중복으로 재사용성이 떨어지는 것이 아닐까?

그런 경우, 외부에서 사용하는 함수는 SRP에 따라 다른 인터페이스로 개별 역할을 제대로 제시해주고
내부 로직은 플래그를 사용할 수 있다. 다만 이것은 내부애 은닉된 기밀 함수여야 한다.
*/
class Concert {
  regularBook(customer) {}
  premiumBook(customer) {}
  #book(customer, isPremium) {}
}

/* 
예제 3
제일 좋은 함수는 매개변수가 없는 함수다!
function setSwitch(on);
*/
function switchOn() {}
function switchOff() {}
