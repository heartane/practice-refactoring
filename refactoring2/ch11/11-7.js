/* 
setter 제거하기

클래스 설계 시 R/W에 대한 제어를 고려해야 한다.
write는 항상 setter를 통하고, 이때 인자의 데이터 유효성 검사가 필요하다.
*/
class Person {
  get name() {}
  // set name(value) {}
}
