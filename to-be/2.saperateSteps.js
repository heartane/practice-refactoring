/* 
골격을 개선하고 기능을 변경한다.
- 정리한 메인 함수의 코드에 대응하는 HTML 버전 만들기
  - 하위 함수까지 반영하고 싶지 않다?
단계 쪼개기가 필요하다.
- 이를 위해서 먼저 함수 추출하기가 필요하다.
1. 데이터를 처리하는 단계
2. 처리한 결과를 가지고 텍스트나 HTML로 표현하는 단계
- 그 사이에 데이터 구조를 변환시켜 줄 조력자(매개) 필요 -> 중간 데이터
*/

import INVOICE from '../invoices.json';
import PLAYS from '../plays.json';

// 최종 출력 코드
function statement(invoice, plays) {
  const statementData = {}; // 중간 매개자
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances;
  return renderPlainText(statementData, plays);
}

// 공연료 청구서 계산 코드 -> 텍스트로 출력
function renderPlainText(data, plays) {
  // 최상위 함수 statement와 매개변수가 다르다!
  let result = `청구 내역(고객명: ${data.customer})\n`; // 중간 매개자를 통해 데이터를 얻는다.

  for (let perf of data.performances) {
    // 청구 내역을 출력한다.
    result += `${getPlayInfo(perf).name}: ${usd(amountFor(perf))} (${
      perf.audience
    }석)\n`;
  }

  result += `총액: ${usd(totalAmount())}\n`;
  result += `적립 포인트: ${totalVolumeCredits()}점\n`;
  return result;

  // 공연에 대한 요금 책정 함수
  function amountFor(performanceInfo) {
    let result = 0;

    switch (getPlayInfo(performanceInfo).type) {
      case 'tragedy':
        result = 40000;
        if (performanceInfo.audience > 30)
          result += 1000 * (performanceInfo.audience - 30);
        break;
      case 'comedy':
        result = 30000;
        if (performanceInfo.audience > 20)
          result += 1000 + 500 * (performanceInfo.audience - 20);
        result += 300 * performanceInfo.audience;
        break;
      default:
        throw new Error(
          `알 수 없는 장르: ${getPlayInfo(performanceInfo).type}`
        );
    }
    return result;
  }

  // 공연 정보 조회 함수
  function getPlayInfo(performanceInfo) {
    return plays[performanceInfo.playID];
  }

  // 공연 포인트 적립 함수
  function volumeCreditsFor(performanceInfo) {
    let result = 0;
    result += Math.max(performanceInfo.audience - 30, 0);

    // 희극은 관객 5명마다 추가 포인트 제공
    if ('comedy' === getPlayInfo(performanceInfo).type)
      result += Math.floor(performanceInfo.audience / 5);
    return result;
  }

  // 총 적립 포인트 계산 함수
  function totalVolumeCredits() {
    let result = 0;
    for (let perf of data.performances) {
      result += volumeCreditsFor(perf);
    }
    return result;
  }

  // 총액 계산 함수
  function totalAmount() {
    let result = 0;
    for (let perf of data.performances) {
      result += amountFor(perf);
    }
    return result;
  }

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
