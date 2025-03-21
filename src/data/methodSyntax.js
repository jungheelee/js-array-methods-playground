/**
 * 배열 메서드 구문 정보
 * 각 메서드의 구문, 파라미터, 반환값, 설명 등을 정의
 */

const methodSyntaxData = {
  filter: {
    methodName: 'filter()',
    syntax: 'array.filter(callback(element[, index[, array]])[, thisArg])',
    parameters: [
      {
        name: 'callback',
        description: '각 요소를 시험할 함수. true를 반환하면 요소를 유지하고, false를 반환하면 버림'
      },
      {
        name: 'element',
        description: '처리할 현재 요소'
      },
      {
        name: 'index',
        description: '처리할 현재 요소의 인덱스',
        optional: true
      },
      {
        name: 'array',
        description: 'filter를 호출한 배열',
        optional: true
      },
      {
        name: 'thisArg',
        description: 'callback을 실행할 때 this로 사용하는 값',
        optional: true
      }
    ],
    returnValue: '테스트를 통과한 요소로 이루어진 새로운 배열. 어떤 요소도 테스트를 통과하지 못했으면 빈 배열을 반환.',
    description: 'filter() 메서드는 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환합니다.',
    example: `const numbers = [1, 2, 3, 4, 5];
const evenNumbers = numbers.filter(number => number % 2 === 0);
console.log(evenNumbers); // [2, 4]`,
    mdnLink: 'https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/filter'
  },
  
  map: {
    methodName: 'map()',
    syntax: 'array.map(callback(element[, index[, array]])[, thisArg])',
    parameters: [
      {
        name: 'callback',
        description: '새로운 배열 요소를 생성하는 함수'
      },
      {
        name: 'element',
        description: '처리할 현재 요소'
      },
      {
        name: 'index',
        description: '처리할 현재 요소의 인덱스',
        optional: true
      },
      {
        name: 'array',
        description: 'map을 호출한 배열',
        optional: true
      },
      {
        name: 'thisArg',
        description: 'callback을 실행할 때 this로 사용하는 값',
        optional: true
      }
    ],
    returnValue: '배열의 각 요소에 대해 실행한 callback의 결과를 모은 새로운 배열',
    description: 'map() 메서드는 배열 내의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환합니다.',
    example: `const numbers = [1, 2, 3, 4];
const doubled = numbers.map(number => number * 2);
console.log(doubled); // [2, 4, 6, 8]`,
    mdnLink: 'https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/map'
  },
  
  sort: {
    methodName: 'sort()',
    syntax: 'array.sort([compareFunction])',
    parameters: [
      {
        name: 'compareFunction',
        description: '정렬 순서를 정의하는 함수. 생략하면 요소를 문자열로 변환하고 유니코드 코드 포인트 순서로 정렬',
        optional: true
      }
    ],
    returnValue: '정렬된 배열. 원 배열이 정렬되며, 참조가 반환됨에 주의',
    description: 'sort() 메서드는 배열의 요소를 적절한 위치에 정렬한 후 그 배열을 반환합니다. 정렬은 기본적으로 문자열의 유니코드 코드 포인트를 따릅니다.',
    example: `// 배열 선언
const numbers = [4, 2, 5, 1, 3];
// 오름차순 정렬
numbers.sort((a, b) => a - b);
console.log(numbers); // [1, 2, 3, 4, 5]

// 내림차순 정렬
numbers.sort((a, b) => b - a);
console.log(numbers); // [5, 4, 3, 2, 1]`,
    mdnLink: 'https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/sort'
  },
  
  find: {
    methodName: 'find()',
    syntax: 'array.find(callback(element[, index[, array]])[, thisArg])',
    parameters: [
      {
        name: 'callback',
        description: '배열의 각 요소에 대해 실행할 함수. true를 반환하면 해당 요소를 반환하고 순회를 중단'
      },
      {
        name: 'element',
        description: '처리할 현재 요소'
      },
      {
        name: 'index',
        description: '처리할 현재 요소의 인덱스',
        optional: true
      },
      {
        name: 'array',
        description: 'find를 호출한 배열',
        optional: true
      },
      {
        name: 'thisArg',
        description: 'callback을 실행할 때 this로 사용하는 값',
        optional: true
      }
    ],
    returnValue: '주어진 판별 함수를 만족하는 첫 번째 요소의 값. 없으면 undefined를 반환',
    description: 'find() 메서드는 주어진 판별 함수를 만족하는 첫 번째 요소의 값을 반환합니다. 그런 요소가 없다면 undefined를 반환합니다.',
    example: `const numbers = [5, 12, 8, 130, 44];
const found = numbers.find(element => element > 10);
console.log(found); // 12`,
    mdnLink: 'https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/find'
  },
  
  findIndex: {
    methodName: 'findIndex()',
    syntax: 'array.findIndex(callback(element[, index[, array]])[, thisArg])',
    parameters: [
      {
        name: 'callback',
        description: '배열의 각 요소에 대해 실행할 함수. true를 반환하면 해당 요소의 인덱스를 반환하고 순회를 중단'
      },
      {
        name: 'element',
        description: '처리할 현재 요소'
      },
      {
        name: 'index',
        description: '처리할 현재 요소의 인덱스',
        optional: true
      },
      {
        name: 'array',
        description: 'findIndex를 호출한 배열',
        optional: true
      },
      {
        name: 'thisArg',
        description: 'callback을 실행할 때 this로 사용하는 값',
        optional: true
      }
    ],
    returnValue: '주어진 판별 함수를 만족하는 첫 번째 요소의 인덱스. 없으면 -1을 반환',
    description: 'findIndex() 메서드는 주어진 판별 함수를 만족하는 배열의 첫 번째 요소에 대한 인덱스를 반환합니다. 만족하는 요소가 없으면 -1을 반환합니다.',
    example: `const numbers = [5, 12, 8, 130, 44];
const foundIndex = numbers.findIndex(element => element > 10);
console.log(foundIndex); // 1 (12의 인덱스)`,
    mdnLink: 'https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex'
  },
  
  reduce: {
    methodName: 'reduce()',
    syntax: 'array.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])',
    parameters: [
      {
        name: 'callback',
        description: '배열의 각 요소에 대해 실행할 함수'
      },
      {
        name: 'accumulator',
        description: '누산기. 콜백의 반환값을 누적'
      },
      {
        name: 'currentValue',
        description: '처리할 현재 요소'
      },
      {
        name: 'index',
        description: '처리할 현재 요소의 인덱스',
        optional: true
      },
      {
        name: 'array',
        description: 'reduce를 호출한 배열',
        optional: true
      },
      {
        name: 'initialValue',
        description: '콜백의 최초 호출에서 accumulator에 제공하는 값',
        optional: true
      }
    ],
    returnValue: '누적 계산의 결과 값',
    description: 'reduce() 메서드는 배열의 각 요소에 대해 주어진 리듀서(reducer) 함수를 실행하고, 하나의 결과값을 반환합니다.',
    example: `const numbers = [1, 2, 3, 4];
const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log(sum); // 10

// 객체 배열에서 특정 속성의 합계 구하기
const items = [
  { name: 'Apple', price: 1.5 },
  { name: 'Banana', price: 0.8 },
  { name: 'Orange', price: 1.2 }
];
const totalPrice = items.reduce((total, item) => total + item.price, 0);
console.log(totalPrice); // 3.5`,
    mdnLink: 'https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce'
  },
  
  every: {
    methodName: 'every()',
    syntax: 'array.every(callback(element[, index[, array]])[, thisArg])',
    parameters: [
      {
        name: 'callback',
        description: '각 요소를 시험할 함수'
      },
      {
        name: 'element',
        description: '처리할 현재 요소'
      },
      {
        name: 'index',
        description: '처리할 현재 요소의 인덱스',
        optional: true
      },
      {
        name: 'array',
        description: 'every를 호출한 배열',
        optional: true
      },
      {
        name: 'thisArg',
        description: 'callback을 실행할 때 this로 사용하는 값',
        optional: true
      }
    ],
    returnValue: '배열의 모든 요소가 제공된 함수로 구현된 테스트를 통과하면 true, 그렇지 않으면 false',
    description: 'every() 메서드는 배열 안의 모든 요소가 주어진 판별 함수를 통과하는지 테스트합니다. 빈 배열에서 호출하면 무조건 true를 반환합니다.',
    example: `const numbers = [1, 2, 3, 4, 5];
const allPositive = numbers.every(number => number > 0);
console.log(allPositive); // true

const allEven = numbers.every(number => number % 2 === 0);
console.log(allEven); // false`,
    mdnLink: 'https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/every'
  },
  
  some: {
    methodName: 'some()',
    syntax: 'array.some(callback(element[, index[, array]])[, thisArg])',
    parameters: [
      {
        name: 'callback',
        description: '각 요소를 시험할 함수'
      },
      {
        name: 'element',
        description: '처리할 현재 요소'
      },
      {
        name: 'index',
        description: '처리할 현재 요소의 인덱스',
        optional: true
      },
      {
        name: 'array',
        description: 'some을 호출한 배열',
        optional: true
      },
      {
        name: 'thisArg',
        description: 'callback을 실행할 때 this로 사용하는 값',
        optional: true
      }
    ],
    returnValue: '배열의 요소 중 하나라도 제공된 함수로 구현된 테스트를 통과하면 true, 그렇지 않으면 false',
    description: 'some() 메서드는 배열 안의 어떤 요소라도 주어진 판별 함수를 통과하는지 테스트합니다. 빈 배열에서 호출하면 무조건 false를 반환합니다.',
    example: `const numbers = [1, 2, 3, 4, 5];
const hasEven = numbers.some(number => number % 2 === 0);
console.log(hasEven); // true

const hasNegative = numbers.some(number => number < 0);
console.log(hasNegative); // false`,
    mdnLink: 'https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/some'
  },
  
  forEach: {
    methodName: 'forEach()',
    syntax: 'array.forEach(callback(element[, index[, array]])[, thisArg])',
    parameters: [
      {
        name: 'callback',
        description: '각 요소에 대해 실행할 함수'
      },
      {
        name: 'element',
        description: '처리할 현재 요소'
      },
      {
        name: 'index',
        description: '처리할 현재 요소의 인덱스',
        optional: true
      },
      {
        name: 'array',
        description: 'forEach를 호출한 배열',
        optional: true
      },
      {
        name: 'thisArg',
        description: 'callback을 실행할 때 this로 사용하는 값',
        optional: true
      }
    ],
    returnValue: 'undefined',
    description: 'forEach() 메서드는 주어진 함수를 배열 요소 각각에 대해 실행합니다. 반환값은 없습니다.',
    example: `const items = ['item1', 'item2', 'item3'];
items.forEach((item, index) => {
  console.log(\`\${index}: \${item}\`);
});
// 출력:
// 0: item1
// 1: item2
// 2: item3`,
    mdnLink: 'https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach'
  },
  
  slice: {
    methodName: 'slice()',
    syntax: 'array.slice([begin[, end]])',
    parameters: [
      {
        name: 'begin',
        description: '추출 시작점에 대한 인덱스. 음수 인덱스는 배열의 끝에서부터의 길이를 나타냄',
        optional: true
      },
      {
        name: 'end',
        description: '추출을 종료할 인덱스로, 해당 인덱스는 포함하지 않음. 생략하면 배열의 끝까지 추출',
        optional: true
      }
    ],
    returnValue: '추출한 요소를 포함한 새로운 배열',
    description: 'slice() 메서드는 어떤 배열의 begin 인덱스부터 end 인덱스까지(end 미포함)에 대한 얕은 복사본을 새로운 배열 객체로 반환합니다. 원본 배열은 바뀌지 않습니다.',
    example: `const fruits = ['사과', '바나나', '오렌지', '수박', '포도'];
const sliced = fruits.slice(1, 3);
console.log(sliced); // ['바나나', '오렌지']

// 끝에서부터 가져오기
const last = fruits.slice(-2);
console.log(last); // ['수박', '포도']`,
    mdnLink: 'https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/slice'
  },
  
  splice: {
    methodName: 'splice()',
    syntax: 'array.splice(start[, deleteCount[, item1[, item2[, ...]]]])',
    parameters: [
      {
        name: 'start',
        description: '배열의 변경을 시작할 인덱스. 음수 인덱스는 배열의 끝에서부터의 길이를 나타냄'
      },
      {
        name: 'deleteCount',
        description: '배열에서 제거할 요소의 수',
        optional: true
      },
      {
        name: 'item1, item2, ...',
        description: '배열에 추가할 요소. 지정하지 않으면 요소를 제거하기만 함',
        optional: true
      }
    ],
    returnValue: '제거한 요소를 담은 배열. 아무 요소도 제거하지 않았으면 빈 배열을 반환',
    description: 'splice() 메서드는 배열의 기존 요소를 삭제 또는 교체하거나 새 요소를 추가하여 배열의 내용을 변경합니다. 원본 배열이 변경됩니다.',
    example: `const months = ['Jan', 'March', 'April', 'June'];

// 인덱스 1에 요소 삽입
months.splice(1, 0, 'Feb');
console.log(months); // ['Jan', 'Feb', 'March', 'April', 'June']

// 인덱스 4에서 1개 요소 제거
months.splice(4, 1);
console.log(months); // ['Jan', 'Feb', 'March', 'April']

// 인덱스 2에서 1개 요소 제거하고 새 요소 추가
const removed = months.splice(2, 1, 'May');
console.log(months); // ['Jan', 'Feb', 'May', 'April']
console.log(removed); // ['March']`,
    mdnLink: 'https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/splice'
  }
};

export default methodSyntaxData;
