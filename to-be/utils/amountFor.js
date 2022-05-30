/* 
값이 변경되는 변수는 내부에서 초기화해서 사용하고 외부에서도 필요하니 반환한다.
- 이해가 쉽도록 반환할 변수는 result로 이름 짓자.
- 매개변수명도 이 하나의 함수만 보고도 이해가 쉽도록 조금 더 자세히 수정해준다.
*/
export default function amountFor(playInfo, performanceInfo) {
  let result = 0;

  switch (playInfo.type) {
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
      throw new Error(`알 수 없는 장르: ${playInfo.type}`);
  }
  return result;
}
