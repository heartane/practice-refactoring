/* 
파생 변수를 질의 함수로 바꾸기

뭔가 변할 수 있는 데이터를 가지고 있어서 다른 로직에 영향을 줄 수 있는 상태라면,
수동적으로 일일이 수정하지말고, 필요한 경우 실시간으로 바로 데이터를 계산할 수 있도록 질의 함수를 만든다.
*/

// 예제 1
class Order {
  // 다른 코드 있다고 가정
  get discountedTotal() {
    return this._basePrice - this._discount;
  }
  set discount(value) {
    this._discount = value;
  }
}

// 예제 2
class ProductionPlan {
  // 다른 코드 있다고 가정
  get production() {
    return this._adjustments.reduce((sum, a) => sum + a.amount, 0);
  }
  applyAdjustment(adjustment) {
    this._adjustments.push(adjustment);
  }
}
