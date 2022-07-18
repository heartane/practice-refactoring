/* 
  알고리즘 교체하기

  반드시 테스트 코드가 있는 상태에서 안전하게 하자!
*/
function foundPerson(people) {
  const candidates = ['Don', 'John', 'Kent'];
  return people.find((name) => candidates.includes(name)) || '';
}

console.log(foundPerson(['John']));
console.log(foundPerson(['Don', 'John']));
console.log(foundPerson(['Kent', 'Don', 'John']));
console.log(foundPerson(['Lisa', 'Don', 'Tom']));
