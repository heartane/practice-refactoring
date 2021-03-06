/* 
사용자가 생산 계획을 검토하고 수정하도록 해주는 어플리케이션 서비스의 일부
*/

/* 
Json 데이터를 가지고 지역 정보를 생성하는 클래스
setter로 받는 데이터는 UI로 입력한 숫자를 인수로 받는데,
이 값은 문자열로 전달되기 때문에 parseInt를 이용해 숫자로 파싱한다.
*/
export class Province {
  constructor(doc) {
    // 속성은 모두 범위 제한 건다. getter로 간접적으로 확인 가능
    this._name = doc.name;
    this._producers = []; // 생산자
    this._totalProduction = 0; // 총 생산량
    this._demand = doc.demand;
    this._price = doc.price;
    doc.producers.forEach((d) => this.addProducer(new Producer(this, d)));
  }

  addProducer(arg) {
    this._producers.push(arg);
    this._totalProduction += arg.production;
  }

  get name() {
    return this._name;
  }
  get producers() {
    return this._producers.slice();
  }

  get totalProduction() {
    return this._totalProduction;
  }
  set totalProduction(arg) {
    this._totalProduction = arg;
  }

  get demand() {
    return this._demand;
  }
  set demand(arg) {
    if (arg === '') {
      throw new Error('demand must not be empty');
    }
    if (parseInt(arg) <= 0) {
      throw new Error('demand must be positive');
    }
    this._demand = parseInt(arg);
  }

  get price() {
    return this._price;
  }
  set price(arg) {
    this._price = parseInt(arg);
  }

  // 생산 부족분 계산
  get shortfall() {
    return this._demand - this._totalProduction;
  }

  // 수익 계산 코드
  get profit() {
    return this.demandValue - this.demandCost;
  }
  get demandValue() {
    return this.satisfiedDemand * this.price;
  }
  get satisfiedDemand() {
    return Math.min(this._demand, this.totalProduction);
  }

  get demandCost() {
    let remainingDemand = this.demand;
    let result = 0;
    this.producers
      .sort((a, b) => a.cost - b.cost)
      .forEach((p) => {
        const contribution = Math.min(remainingDemand, p.production);
        remainingDemand -= contribution;
        result += contribution * p.cost;
      });
    return result;
  }
}

/* 
생산업체의 데이터를 가진 클래스
*/
export class Producer {
  constructor(aProvince, data) {
    this._province = aProvince;
    this._name = data.name;
    this._cost = data.cost;
    this._production = data.production || 0;
  }

  get name() {
    return this._name;
  }

  get cost() {
    return this._cost;
  }
  set cost(arg) {
    this._cost = parseInt(arg);
  }

  get production() {
    return this._production;
  }
  // 지역 데이터 갱신
  set production(amountStr) {
    const amount = parseInt(amountStr);
    const newProduction = Number.isNaN(amount) ? 0 : amount;

    this._province.totalProduction += newProduction - this._production;
    this._production = newProduction;
  }
}

/* 
프로방스의 인수로 사용할 Json 더미데이터 생성 함수
*/
export function sampleProvinceData() {
  return {
    name: 'Asia',
    producers: [
      { name: 'Byzantium', cost: 10, production: 9 },
      { name: 'Attalia', cost: 12, production: 10 },
      { name: 'Sinope', cost: 10, production: 6 },
    ],
    demand: 30,
    price: 20,
  };
}
