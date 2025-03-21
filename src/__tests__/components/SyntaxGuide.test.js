import React from 'react';
import { render, screen } from '../test-utils';
import SyntaxGuide from '../../components/common/SyntaxGuide';

describe('SyntaxGuide Component', () => {
  const mockMethodData = {
    methodName: 'filter()',
    syntax: 'array.filter(callback(element[, index[, array]])[, thisArg])',
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
      }
    ],
    returnValue: '테스트를 통과한 요소로 이루어진 새로운 배열',
    description: '주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환합니다.',
    example: 'const words = ["spray", "limit", "elite", "exuberant", "destruction"];\nconst result = words.filter(word => word.length > 6);\nconsole.log(result);',
    mdnLink: 'https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/filter'
  };

  test('기본 구성 요소를 올바르게 렌더링한다', () => {
    render(<SyntaxGuide {...mockMethodData} />);
    
    // 메서드 구문 확인
    expect(screen.getByText('메서드 구문')).toBeInTheDocument();
    expect(screen.getByText(mockMethodData.syntax)).toBeInTheDocument();
    
    // 파라미터 확인
    expect(screen.getByText('파라미터')).toBeInTheDocument();
    expect(screen.getByText(/callback/)).toBeInTheDocument();
    
    // 선택적 파라미터 확인
    expect(screen.getByText(/index/)).toBeInTheDocument();
    expect(screen.getByText(/선택사항/)).toBeInTheDocument();
    
    // 반환값 확인
    expect(screen.getByText('반환 값')).toBeInTheDocument();
    expect(screen.getByText(mockMethodData.returnValue)).toBeInTheDocument();
    
    // 설명 확인
    expect(screen.getByText('설명')).toBeInTheDocument();
    expect(screen.getByText(mockMethodData.description)).toBeInTheDocument();
    
    // 예제 확인
    expect(screen.getByText('예제')).toBeInTheDocument();
    
    // MDN 링크 확인
    const mdnLink = screen.getByText(`MDN 웹 문서에서 ${mockMethodData.methodName} 자세히 보기`);
    expect(mdnLink).toBeInTheDocument();
    expect(mdnLink.getAttribute('href')).toBe(mockMethodData.mdnLink);
  });

  test('파라미터가 없을 때도 오류 없이 렌더링된다', () => {
    const noParamData = { ...mockMethodData, parameters: [] };
    render(<SyntaxGuide {...noParamData} />);
    
    // 기본 정보는 표시되지만 파라미터 섹션은 표시되지 않음
    expect(screen.getByText('메서드 구문')).toBeInTheDocument();
    expect(screen.queryByText('파라미터')).not.toBeInTheDocument();
  });

  test('선택적 속성이 없을 때도 오류 없이 렌더링된다', () => {
    const noOptionalProps = {
      methodName: 'slice()',
      syntax: 'array.slice()',
    };
    
    render(<SyntaxGuide {...noOptionalProps} />);
    
    // 기본 구문만 표시되고 나머지 섹션은 표시되지 않음
    expect(screen.getByText('메서드 구문')).toBeInTheDocument();
    expect(screen.queryByText('파라미터')).not.toBeInTheDocument();
    expect(screen.queryByText('반환 값')).not.toBeInTheDocument();
    expect(screen.queryByText('설명')).not.toBeInTheDocument();
    expect(screen.queryByText('예제')).not.toBeInTheDocument();
  });
});
