/* 
반복문 쪼개기

성능은 아직 하지마라, 그리고 측정 후에 문제가 될 때 하라.
더 나은 코드를 위해 계속 매진하고 축적해서 적용하자
*/

export function reportYoungestAgeAndTotalSalary(people) {
  return `youngestAge: ${youngestAge()}, totalSalary: ${totalSalary()}`;

  function youngestAge() {
    return Math.min(...people.map((p) => p.age));
  }
  function totalSalary() {
    return people.reduce((sum, p) => (sum += p.salary), 0);
  }
}
