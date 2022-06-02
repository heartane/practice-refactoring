/* 
단계가 명확히 분리됐다면, 각 코드를 별도 파일로 분리하자
  - 한 코드 베이스가 아니기 때문에 변수명도 명확한 의미로 변경하자.  
루트 디렉토리에는!
- 일반 텍스트 데이터를 출력해주는 함수 & 텍스트로 데이터 형태를 만든 함수
- HTML 데이터를 출력해주는 함수 & HTML로 데이터 형태를 만든 함수
데이터를 생성하는 함수는 다른 디렉토리에!

계산과 출력 담당이 분리됐다.
- 이렇게 모듈화를 하면 각 부분의 행위와 협력 과정을 파악하기 쉽다.
- 덕분에 데이터 생성 함수를 재활용할 수 있게됐다.
*/

import INVOICE from '../../../as-is/refactoring2/invoices.json';
import PLAYS from '../../../as-is/refactoring2/plays.json';
import createStatementData from './createStatementData.js';

// 최종 출력 코드
function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays)); // 모든 정보를 가진 매개변수
}

// 텍스트로 렌더링 책임을 가진 함수
function renderPlainText(data) {
  let result = `청구 내역(고객명: ${data.customer})\n`;

  for (let perf of data.performances) {
    result += `${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`;
  }

  result += `총액: ${usd(data.totalAmount)}\n`;
  result += `적립 포인트: ${data.totalVolumeCredits}점\n`;
  return result;
}

function htmlStatement(invoice, plays) {
  return renderHtml(createStatementData(invoice, plays)); // 모든 정보를 가진 매개변수
}
function renderHtml(data) {
  let result = `<h1>청구 내역(고객명: ${data.customer})</h1>\n`;
  result += `<table>\n`;
  result += `<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>`;

  for (let perf of data.performances) {
    result += `<tr><td>${perf.play.name}</td><td>(${perf.audience}석)</td>`;
    result += `<td>${usd(perf.amount)}</td></tr>`;
  }
  result += `</table>\n`;
  result += `<p>총액: <em>${usd(data.totalAmount)}</em></p>\n`;
  result += `<p>적립 포인트: <em>${data.totalVolumeCredits}점</em></p>\n`;
  return result;
}

// 화폐 포맷 함수가 이제 재사용되니 외부로 위치 변경!
function usd(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount / 100);
}

const res = statement(INVOICE[0], PLAYS);
const resHtml = htmlStatement(INVOICE[0], PLAYS);
console.log(res);
console.log(resHtml);
