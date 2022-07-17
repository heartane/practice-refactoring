import fs from 'fs';
/* 
스크립팅 관련 작업 단계 쪼개기

testable을 고려해야 한다.
process 객체에 직접적으로 접근을 하는 형식은 추후 테스트를 어렵게 한다.

1. run 함수를 만들어서 노드의 process 의존성을 제거한다.
2. 사용자에게 입력을 받는 단계 -> 유효성 검사
3. 필요 로직 처리
*/

run(process.argv);

function run(args) {
  const command = parseCommand(args);
  countOrders(command);
}

function parseCommand(args) {
  if (!args[2]) {
    throw new Error('파일 이름을 입력하세요');
  }

  const fileName = `./${args[2]}.json`;
  if (!fs.existsSync(fileName)) {
    throw new Error('파일이 존재하지 않습니다');
  }

  return {
    fileName,
    countReadyOnly: args.includes('-r'),
  };
}

function countOrders({ fileName, countReadyOnly }) {
  const rawData = fs.readFileSync(fileName);
  const orders = JSON.parse(rawData);
  const filtered = countReadyOnly
    ? orders.filter((order) => order.status === 'ready')
    : orders;
  console.log(filtered.length);
}
