/* 
제어 플래그를 탈출문으로 바꾸기

불리언 플래그에 따라 로직 분기하는 것을 대체할 수 있는 프로그래밍 방법이 많다.
최대한 불리언 타입의 변수를 사용하지 않도록하는 것이 좋다.
*/

for (const p of people) {
  if (p === 'Don') {
    sendAlert();
    break;
  }
}
