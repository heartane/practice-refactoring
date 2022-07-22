/* 
명령을 함수로 바꾸기

프로그램 많은 부분에서 특정 동작으로 재사용한다면, 필요 속성과 명령 기능을 묶어 커맨드 객체를 만드는 것은 좋지만
단 한번만 사용한다면 그 인스턴스 생성은 불필요한 메모리 자원을 소모하는 셈이다. 따라서 함수로 사용하는 것이 좋다.

유틸리티 함수를 만들 때 매번 인스턴스를 생성하지 않고 클래스의 static 함수를 이용하는 것도 
불필요한 메모리 자원을 방지하기 위함이다.
*/

function charge(customer, usage, provider) {
  const baseCharge = customer.baseRate * usage;
  return baseCharge + provider.connectionCharge;
}
