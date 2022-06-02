export default function createStatementData(invoice, plays) {
  const result = {}; // 중간 매개자 버킷
  result.customer = invoice.customer;
  result.performances = invoice.performances.map(extendPerformance);
  result.totalAmount = totalAmount(result);
  result.totalVolumeCredits = totalVolumeCredits(result);

  return result;

  // 한 공연에 필요한 데이터 처리 로직
  function extendPerformance(performance) {
    const result = { ...performance };
    result.play = getPlayInfo(performance);
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditsFor(result);

    return result;
  }

  // 공연 정보 조회 함수
  function getPlayInfo(performance) {
    return plays[performance.playID];
  }

  // 공연에 대한 요금 책정 함수
  function amountFor(performance) {
    let result = 0;

    switch (performance.play.type) {
      case 'tragedy':
        result = 40000;
        if (performance.audience > 30)
          result += 1000 * (performance.audience - 30);
        break;
      case 'comedy':
        result = 30000;
        if (performance.audience > 20)
          result += 1000 + 500 * (performance.audience - 20);
        result += 300 * performance.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${performance.play.type}`);
    }
    return result;
  }

  // 공연 포인트 적립 함수
  function volumeCreditsFor(performance) {
    let result = 0;
    result += Math.max(performance.audience - 30, 0);

    if ('comedy' === performance.play.type)
      result += Math.floor(performance.audience / 5);
    return result;
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
