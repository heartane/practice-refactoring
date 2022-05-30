/* 
1. 복잡한 로직을 하나의 책임을 가진 함수들로 쪼개자.
- 각 공연에 대한 요금 책정하는 Switch문을 하나의 행위로 잡고, 하나의 amountFor 함수로 추출하기
- 변경을 가하지 않는 변수는 매개변수로 넘겨주고, 변경이 필요한 변수는 내부에서 초기화해서 사용하고 반환하기
*/

import INVOICE from '../invoices.json';
import PLAYS from '../plays.json';
import amountFor from './utils/amountFor.js';

// 공연료 청구서 출력 코드
function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역(고객명: ${invoice.customer})\n`;
  const format = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format;

  for (let perf of invoice.performances) {
    const play = plays[perf.playID];
    // 공연에 대한 요금 책정 함수 호출
    let thisAmount = amountFor(play, perf);

    // 포인트를 적립한다.
    volumeCredits += Math.max(perf.audience - 30, 0);
    // 희극 관객 5명마다 추가 포인트를 제공한다.
    if ('comedy' === play.type) volumeCredits += Math.floor(perf.audience / 5);

    // 청구 내역을 출력한다.
    result += `${play.name}: ${format(thisAmount / 100)} (${
      perf.audience
    }석)\n`;
    totalAmount += thisAmount;
  }
  result += `총액: ${format(totalAmount / 100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  return result;
}

const res = statement(INVOICE[0], PLAYS);
console.log(res);
