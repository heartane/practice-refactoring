/* 
반복문을 파이프라인으로 바꾸기

절차지향적으로 반복문을 도는 것이 아니라 직관적이고 단계적으로 표현하기 위해
함수형 프로그래밍 API를 이용하고 연결해 파이프라인처럼 사용한다.

죽은 코드 제거하기

이제 깃과 같은 버전관리 시스템이 있기때문에 혹시 몰라 주석처리한 것을 과감히 지워도 된다.
히스토리를 통해 확인하고 깔끔하게 불필요한 코드는 제거한다.
*/

export function acquireData(input) {
  return input //
    .split('\n')
    .splice(1)
    .filter((line) => line.trim() !== '')
    .map((line) => line.split(','))
    .filter((line) => line[1].trim() === 'India')
    .map((line) => ({ city: line[0].trim(), phone: line[2].trim() }));
}

const input = `office, country, telephone\n
Chicago, USA, +1 312 373 1000\n
Beijing, China, +86 4008 900 505\n
Bangalore, India, +91 80 4064 9570\n
Porto Alegre, Brazil, +55 51 3079 3550\n
Chennai, India, +91 44 660 44766`;

const result = acquireData(input);
console.log(result);
