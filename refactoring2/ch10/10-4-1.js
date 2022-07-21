/* 
조건부 로직을 다형성으로 바꾸기

switch문은 새로운 것이 추가될 때마다 조건을 추가하면서 하염없이 길어진다.

이를 클래스로 추상화하고 상속을 통한 다형성을 이용하면 쉽게 공통의 속성의 고유한 값을 얻을 수 있다.
또 새로운 요구사항이 생겼을 때는 쉽게 인스턴스를 만들고 추가할 수 있다.
만약 이 중 수정사항이 생기면 해당 클래스에서 쉽게 유지보수할 수 있다.
*/

// abstract class는 아니지만, 제일 최상위 부모 클래스
class Bird {
  #name;
  constructor(name) {
    this.#name = name;
  }
  get name() {
    return this.#name;
  }

  get plumage() {
    return 'unknown';
  }

  get airSpeedVelocity() {
    return null;
  }
}

class EuropeanSwallow extends Bird {
  constructor() {
    super('EuropeanSwallow');
  }

  get plumage() {
    return 'average';
  }

  get airSpeedVelocity() {
    return 35;
  }
}

class AfricanSwallow extends Bird {
  constructor() {
    super('AfricanSwallow');
  }

  get plumage() {
    return this.numberOfCoconuts > 2 ? 'tired' : 'average';
  }

  get airSpeedVelocity() {
    return 40 - 2 * this.numberOfCoconuts;
  }
}

class NorwegianBlueParrot extends Bird {
  constructor() {
    super('NorwegianBlueParrot');
  }

  get plumage() {
    return this.voltage > 100 ? 'scorched' : 'beautiful';
  }

  get airSpeedVelocity() {
    return this.isNailed ? 0 : 10 + this.voltage / 10;
  }
}

export function plumages(birds) {
  return new Map(birds.map((b) => [b.name, b.plumage]));
}
export function speeds(birds) {
  return new Map(birds.map((b) => [b.name, b.airSpeedVelocity]));
}

const result = plumages([new NorwegianBlueParrot(), new AfricanSwallow()]);
console.log(result);
