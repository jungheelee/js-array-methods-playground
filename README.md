# JavaScript 배열 메서드 학습 애플리케이션

이 애플리케이션은 JavaScript 배열 메서드를 실습할 수 있는 인터랙티브한 학습 도구입니다. JSONPlaceholder API에서 가져온 데이터를 활용하여 다양한 배열 메서드의 동작을 시각적으로 확인할 수 있습니다.

## 기능

- JSONPlaceholder API에서 데이터 가져오기
- 다양한 배열 메서드 실습:
  - filter(): 조건에 맞는 요소만 골라내기
  - map(): 배열의 각 요소를 변환하기
  - sort(): 배열 요소 정렬하기
  - find()/findIndex(): 특정 조건의 요소 찾기
  - reduce(): 배열 데이터 집계하기
  - every()/some(): 배열의 조건 검사
  - forEach(): 배열의 각 요소에 함수 실행
  - slice()/splice(): 배열의 일부 추출 및 조작하기
- 각 메서드별 구문 정보와 예제 제공

## 개발 환경

- React (create-react-app)
- Bootstrap
- Jest 및 React Testing Library (테스트)

## 시작하기

### 필요 조건

- Node.js 14.0.0 이상
- npm 또는 yarn

### 설치

```bash
# 저장소 복제
git clone https://github.com/yourusername/array-methods-app.git

# 프로젝트 폴더로 이동
cd array-methods-app

# 의존성 설치
npm install
# 또는
yarn install

# 개발 서버 실행
npm start
# 또는
yarn start
```

### 테스트 실행

```bash
# 모든 테스트 실행
npm test
# 또는
yarn test

# 특정 컴포넌트 테스트만 실행
npm test -- -t 'FilterMethod'
# 또는
yarn test -t 'FilterMethod'

# 테스트 커버리지 보고서 생성
npm test -- --coverage
# 또는
yarn test --coverage
```

## 프로젝트 구조

```
array-methods-app/
  ├── public/              # 정적 파일
  ├── src/                 # 소스 코드
  │   ├── components/      # 리액트 컴포넌트
  │   │   ├── common/      # 공통 컴포넌트
  │   │   ├── methods/     # 배열 메서드 컴포넌트
  │   │   └── ...
  │   ├── data/            # 데이터 파일
  │   ├── styles/          # CSS 파일
  │   ├── __tests__/       # 테스트 파일
  │   ├── App.js           # 메인 애플리케이션 컴포넌트
  │   └── index.js         # 진입점
  ├── package.json         # 프로젝트 메타데이터 및 의존성
  └── README.md            # 이 파일
```

## 테스트 구조

```
src/__tests__/
  ├── test-utils.js        # 테스트 유틸리티 및 목 데이터
  ├── App.test.js          # App 컴포넌트 테스트
  ├── components/          # 일반 컴포넌트 테스트
  │   ├── Header.test.js
  │   ├── Footer.test.js
  │   ├── DataContainer.test.js
  │   └── SyntaxGuide.test.js
  └── components/methods/  # 메서드 컴포넌트 테스트
      ├── FilterMethod.test.js
      ├── MapMethod.test.js
      └── ...
```

## 라이선스

MIT
