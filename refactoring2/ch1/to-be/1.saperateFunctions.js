/* 
1. 복잡한 로직을 하나의 책임을 가진 함수들로 쪼개자.
- 각 함수는 하는 행위를 명확히 알려주는 이름이 필요하다.
- 변경을 가하지 않는 변수는 매개변수로 넘겨주고, 변경이 필요한 변수는 내부에서 초기화해서 사용하고 반환하기
  - 이해가 쉽도록 반환할 변수는 result로 이름 짓자.
  - 매개변수명도 이 하나의 함수만 보고도 이해가 쉽도록 조금 더 자세히 수정해준다.
2. 임시 변수들을 인라인으로 교체하자
  - 지역 변수를 줄이면 추출 작업이 용이해진다.
  - 임시 변수가 추후 변경이 되지 않는다면, 인라인으로 바꾸자.
  - 반복문과 같이 변수가 변경된다면, 먼저 변수의 복제본을 초기화하고 계산 결과를 반환한다.
    - 반복문 쪼개기로 분리할 부분을 따로 뺀다.
    - 변수와 관련 문장들을 함께 모으면 추출이 쉬워진다.
이렇게 메인 함수의 코드를 줄이고, 각각의 행위는 여러 개의 보조함수로 나누면
각각의 처리 로직은 물론, 전체 흐름을 파악하기 쉬워진다.
*/

import INVOICE from '../as-is/invoices.json';
import PLAYS from '../as-is/plays.json';

// 공연료 청구서 출력 코드
function statement(invoice, plays) {
  let result = `청구 내역(고객명: ${invoice.customer})\n`;

  for (let perf of invoice.performances) {
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
    for (let perf of invoice.performances) {
      result += volumeCreditsFor(perf);
    }
    return result;
  }

  // 총액 계산 함수
  function totalAmount() {
    let result = 0;
    for (let perf of invoice.performances) {
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
