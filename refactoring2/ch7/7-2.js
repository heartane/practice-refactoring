/* 
컬랙션 캡슐화하기

자료구조를 외부에서 자유롭게 조작할 수 없도록 내부로 캡슐화한다.
클래스의 컬랙션을 외부에 노출하고 있진 않는가?
*/

export class Person {
  #name;
  #courses;
  constructor(name) {
    this.#name = name;
    this.#courses = [];
  }

  get name() {
    return this.#name;
  }

  get courses() {
    return [...this.#courses];
  }

  enrollCourse(course) {
    this.#courses.push(course);
  }
  dropCourse(course, runIfAbsent) {
    const index = this.#courses.indexOf(course);
    if (index === -1) {
      runIfAbsent();
      return;
    }
    this.#courses.splice(index, 1);
  }
}

export class Course {
  #name;
  #isAdvanced;
  constructor(name, isAdvanced) {
    this.#name = name;
    this.#isAdvanced = isAdvanced;
  }

  get name() {
    return this.#name;
  }

  get isAdvanced() {
    return this.#isAdvanced;
  }
}

const rami = new Person('라미');
const course = new Course('리팩토링', true);

rami.enrollCourse(course);
console.log(rami.courses.length);

rami.dropCourse(course, () => {
  console.log('해당 코스가 없습니다.');
});
rami.dropCourse(course, () => {
  console.log('해당 코스가 없습니다.');
});
console.log(rami.courses.length);
