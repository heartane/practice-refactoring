/* 
골격을 개선하고 기능을 변경한다.
- 정리한 메인 함수의 코드에 대응하는 HTML 버전 만들기
  - 하위 함수까지 반영하고 싶지 않다?

단계 쪼개기가 필요하다.
- 이를 위해서 먼저 함수 추출하기가 필요하다.
1. 데이터를 처리하는 단계
2. 처리한 결과를 가지고 텍스트나 HTML로 표현하는 단계
- 그 사이에 데이터 구조를 변환시켜 줄 조력자(매개) 필요 -> 중간 데이터

먼저 중간 매개자를 통해 처리한 데이터를 한 곳에 모으자
  - 한 버킷이 렌더링에 필요한 데이터를 모두 가지면 매개변수를 줄일 수 있다.
  - 렌더 책임을 가진 함수는 그 데이터로 알맞게 자신의 역할만 할 수 있다.
  - 
*/

import INVOICE from '../invoices.json';
import PLAYS from '../plays.json';

// 최종 출력 코드
function statement(invoice, plays) {
  const statementData = {}; // 중간 매개자
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(extendPerformance); // 각 공연의 데이터

  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);
  // 매개변수없이 직접 접근이 가능하지만, 명확성을 선호한다면 전달하자.
  console.log('statementData', statementData);

  return renderPlainText(statementData); // 모든 정보를 가진 매개변수

  // 한 공연에 필요한 데이터 처리 로직을 모두 이쪽으로!
  function extendPerformance(performance) {
    const result = { ...performance }; // 얕은 복사 -> 모든 정보를 담을 버킷이 만들어졌다!
    result.play = getPlayInfo(performance); // play 정보를 함께 버무려!
    result.amount = amountFor(result);
    result.volumeCredits = volumeCreditsFor(result);
    // console.log('불리기', result);
    return result;
  }

  // 공연 정보 조회 함수
  function getPlayInfo(performance) {
    return plays[performance.playID];
  }

  // 공연에 대한 요금 책정 함수
  function amountFor(performance) {
    let result = 0;
    console.log(performance);
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
    let result = 0;
    for (let perf of data.performances) {
      result += perf.volumeCredits;
    }
    return result;
  }

  // 총액 계산 함수
  function totalAmount(data) {
    let result = 0;
    for (let perf of data.performances) {
      result += perf.amount;
    }
    return result;
  }
}

// 텍스트로 렌더링 책임을 가진 함수
function renderPlainText(data) {
  // 최상위 함수 statement와 매개변수가 다르다!
  let result = `청구 내역(고객명: ${data.customer})\n`;

  for (let perf of data.performances) {
    // 청구 내역을 출력한다.
    result += `${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`;
  }

  result += `총액: ${usd(data.totalAmount)}\n`;
  result += `적립 포인트: ${data.totalVolumeCredits}점\n`;
  return result;

  // 화폐 포맷 설정 함수
  function usd(amount) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount / 100);
  }
}

const res = statement(INVOICE[0], PLAYS);
console.log(res);
