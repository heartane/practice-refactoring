/* 
앞서 데이터 생성 함수를 모듈화한 덕분에 출력 데이터 구조를 변경하지 않는 한
출력 포맷 관련 코드는 신경 쓸 일이 없어졌다.

조건부 로직을 다형성으로 바꿔보자
- amountFor, volumeCreditsFor 함수가 조건에 따리 분기하고 있다.
- 먼저 클래스로 계산하는 행위를 묶어보자
  - 필요한 속성(데이터)를 생성자 함수에 전달하기
  - 기존 함수들을 클래스 안으로 옮기기 (함수 옮기기)
- 다형성 구조를 지원하는 팩토리 메소드를 만든다.
- 조건에 따라 상위클래스를 상속하는 하위클래스를 만들자
  - 상위 클래스 메소드에 조건문을 하위클래스에 적절히 오버라이딩한다.
  - 하위 클래스를 생성하고 호출 시 적절한 클래스를 사용하면 된다.
*/

// 각 공연에 비용처리에 대한 계산 상위 클래스
class PerformanceCalculator {
  constructor(aPerformance, aPlay) {
    this.performance = aPerformance;
    this.play = aPlay;
  }
  // 공연에 대한 요금 책정 함수
  get amount() {
    let result = 0;

    switch (this.play.type) {
      case 'tragedy':
        throw '오류발생';
      case 'comedy':
        result = 30000;
        if (this.performance.audience > 20)
          result += 1000 + 500 * (this.performance.audience - 20);
        result += 300 * this.performance.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${this.play.type}`);
    }
    return result;
  }

  // 공연 포인트 적립 함수
  get volumeCredits() {
    let result = 0;
    result += Math.max(this.performance.audience - 30, 0);

    if ('comedy' === this.play.type)
      result += Math.floor(this.performance.audience / 5);
    return result;
  }
}
// 상속하는 하위 클래스
class TragedyCalculator extends PerformanceCalculator {
  // 오버라이딩
  get amount() {
    let result = 0;
    if (this.performance.audience > 30) {
      result += 1000 * (this.performance.audience - 30);
    }
    return result;
  }
}
class ComedyCalculator extends PerformanceCalculator {}

// 팩토릴 메소드로 조건에 따른 인스턴스 생성 -> 다형성 적용 완료
function createPerformanceCalculator(aPerformance, aPlay) {
  switch (aPlay.type) {
    case 'comedy':
      return new ComedyCalculator(aPerformance, aPlay);
    case 'tragedy':
      return new TragedyCalculator(aPerformance, aPlay);
    default:
      throw new Error(`알 수 없는 장르: ${aPlay.type}`);
  }
}

export default function createStatementData(invoice, plays) {
  const result = {};
  result.customer = invoice.customer;
  result.performances = invoice.performances.map(extendPerformance);
  result.totalAmount = totalAmount(result);
  result.totalVolumeCredits = totalVolumeCredits(result);

  return result;

  // 한 공연에 필요한 데이터 처리 로직
  function extendPerformance(aPerformance) {
    const calculator = createPerformanceCalculator(
      aPerformance,
      getPlayInfo(aPerformance)
    ); // 클래스로 인스턴스 생성 대신, 팩토리 함수 적용
    console.log(calculator);
    const result = { ...aPerformance };
    result.play = calculator.play;
    result.amount = calculator.amount;
    result.volumeCredits = calculator.volumeCredits;
    return result;
  }

  // 공연 정보 조회 함수
  function getPlayInfo(aPerformance) {
    return plays[aPerformance.playID];
  }

  // 공연에 대한 요금 책정 함수 -> 다형성 적용 요함
  function amountFor(aPerformance) {
    return new PerformanceCalculator(aPerformance, getPlayInfo(aPerformance))
      .amount;
  }

  // 공연 포인트 적립 함수 -> 다형성 적용 요함
  function volumeCreditsFor(aPerformance) {
    return new PerformanceCalculator(aPerformance, getPlayInfo(aPerformance))
      .volumeCredits;
  }

  // 총 적립 포인트 계산 함수
  function totalVolumeCredits(data) {
    return data.performances.reduce(
      (total, perf) => total + perf.volumeCredits,
      0
    );
  }

  // 총액 계산 함수
  function totalAmount(data) {
    return data.performances.reduce((total, perf) => total + perf.amount, 0);
  }
}
