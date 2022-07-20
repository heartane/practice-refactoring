/* 
필드 이름 바꾸기

필드(속성)명은 클래스를 대표하는 타이틀이 되기때문에 매우 중요하다! 
*/
class Organization {
  constructor(data) {
    this._name = data.name;
    this._country = data.country;
  }
  get title() {
    return this._name;
  }
  set title(value) {
    this._name = value;
  }
  get country() {
    return this._country;
  }
  set country(value) {
    this._country = value;
  }
}
const organization = new Organization({
  name: '삼성',
  country: '대한민국',
});
