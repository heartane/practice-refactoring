/* 
함수를 명령으로 바꾸기

소프트웨어 규모가 커지고, 아키텍처가 복잡해질수록 객체 지향 프로그래밍이 빛을 발한다.
더 독립된 모듈들로 구성해갈 수 있다.
여기에 함수형 프로그래밍을 함께 섞어서 사용하면서 그 밸런스를 맞춰나가자.

Command 커맨드 객체
클래스 중에서도 딱 한가지 명령을 수행하는 객체를 말한다.

어떻게 사용하느냐에 따라 (생성자 함수로 만들어진 속성이 업데이트되어야 하는지) 캡슐화 작업을 해준다.
또 메소드 안의 결과값을 보관하고 싶다면 따로 추출해두거나 하는 작업들은 
니즈에 따라 개발자가 클래스의 활용도를 고심하며 구성해나가야 한다.
*/

export function score(candidate, medicalExam, scoringGuide) {
  return new Scorer(candidate, medicalExam, scoringGuide).execute();
}

class Scorer {
  constructor(candidate, medicalExam, scoringGuide) {
    this.candidate = candidate;
    this.medicalExam = medicalExam;
    this.scoringGuide = scoringGuide;
  }

  execute() {
    let result = 0;
    let healthLevel = 0;
    let highMedicalRiskFlag = false;

    if (this.medicalExam.isSmoker) {
      healthLevel += 10;
      highMedicalRiskFlag = true;
    }

    let certificationGrade = 'regular';
    if (
      this.scoringGuide.stateWithLowCertification(this.candidate.originState)
    ) {
      certificationGrade = 'low';
      result -= 5;
    }
    // lots more code like this
    result -= Math.max(healthLevel - 5, 0);
    return result;
  }
}

export class ScoringGuide {
  stateWithLowCertification(state) {
    return state < 5;
  }
}
