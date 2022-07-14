import { Province, sampleProvinceData } from '../helper/refactoring2TestSample';

/* 
fixture, 테스트에 필요한 데이터와 객체를 설정하는 것
*/
describe('province class', () => {
  // given
  let asia;
  beforeEach(() => {
    asia = new Province(sampleProvinceData()); // fixture 설정
  });

  test('shortfall 부족한 생산분 체크', () => {
    expect(asia.shortfall).toBe(5);
  });

  test('profit 총 수익 체크', () => {
    expect(asia.profit).toBe(230);
  });

  test('production 생산량 변경', () => {
    asia.producers[0].production = 20;
    expect(asia.shortfall).toBe(30 - (20 + 10 + 6));
    expect(asia.profit).toBe(292);
  });

  /* 
  경계 조건 고려하기
  바운더리를 확인하는 테스트 작성을 통해, 휴먼 에러가 날 수 있는 부분을 확인하고
  이런 특이 상황을 처리할 방법을 모색한다.

  이 과정을 통해 설계적인 측면을 고려할 수 있다.
  */
  describe('producers issue, 생산자 경계 조건', () => {
    describe('no producers, 생산자가 없다면?', () => {
      let noProducers;
      beforeEach(() => {
        const data = {
          name: 'No producers',
          producers: [],
          demand: 30,
          price: 20,
        };
        noProducers = new Province(data);
      });
      test('shortfall', () => {
        expect(noProducers.shortfall).toBe(30);
      });
      test('profit', () => {
        expect(noProducers.profit).toBe(0);
      });
    });

    describe('string producers, 생산자가 문자열이라면?', () => {
      test('배열이어야 한다. 입력값의 유효성 검사가 요구된다.', () => {
        const data = {
          name: 'string producers',
          producers: '',
          demand: 30,
          price: 20,
        };
        const province = new Province(data);
        expect(province.shortfall).toBe(0);
      });
    });
  });

  describe('demand issue, 수요 경계 조건', () => {
    test('zero demand, 수요가 없다면?', () => {
      expect(() => (asia.demand = 0)).toThrow();
    });
    test('negative demand, 수요가 마이너스라면?', () => {
      expect(() => (asia.demand = -1)).toThrow();
    });
    test('empty string demand, 수요를 입력하지 않았다면?', () => {
      expect(() => (asia.demand = '')).toThrow();
    });
  });
});

/* 
문제를 가진 테스트가 모두 통과하고 있다! 
이런 과정을 통해 코드를 더 단단히 수정해 나갈 수 있다.
*/
