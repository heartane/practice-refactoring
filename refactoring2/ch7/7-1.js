/* 
레코드 캡슐화하기

read-only일지 write도 허용할지를 명시한 청사진을 만든다.
쓰기 허용에서도 구체적인 로직을 통해 감시할 수 있다!
*/
export class Organization {
  #name;
  #country;
  constructor(data) {
    this.#name = data.name;
    this.#country = data.country;
  }
  get name() {
    return this.#name;
  }
  set name(value) {
    this.#name = value;
  }
  get country() {
    return this.#country;
  }
  get rawData() {
    // 요구사항과 상황에 따라 달라질 수 있다. 깊은 복사 필요
    return {
      name: this.#name,
      country: this.#country,
    };
  }
}
const organization = new Organization({
  name: 'Acme Gooseberries',
  country: 'GB',
});

organization.name = '고라파덕';
console.log(organization.name);
console.log(organization.country);
console.log(organization.rawData);
