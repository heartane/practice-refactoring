/* 
반복문 쪼개기

성능은 아직 하지마라, 그리고 측정 후에 문제가 될 때 하라.
*/

export function reportYoungestAgeAndTotalSalary(people) {
  return `youngestAge: ${youngestAge()}, totalSalary: ${totalSalary()}`;

  function youngestAge() {
    let youngest = people[0] ? people[0].age : Infinity;
    for (const p of people) {
      if (p.age < youngest) youngest = p.age;
    }
    return youngest;
  }
  function totalSalary() {
    let totalSalary = 0;
    for (const p of people) {
      totalSalary += p.salary;
    }
    return totalSalary;
  }
}
