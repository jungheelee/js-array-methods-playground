import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../test-utils';
import MapMethod from '../../../components/methods/MapMethod';
import { mockPostsData } from '../../test-utils';

// SyntaxGuide 컴포넌트 모킹
jest.mock('../../../components/common/SyntaxGuide', () => {
  return function MockSyntaxGuide() {
    return <div data-testid="syntax-guide">구문 가이드 컴포넌트</div>;
  };
});

describe('MapMethod Component', () => {
  // 테스트용 props
  const mockProps = {
    postsData: mockPostsData,
    validateData: jest.fn().mockReturnValue(true) // 기본값으로 유효한 데이터
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('기본 UI가 올바르게 렌더링된다', () => {
    render(<MapMethod {...mockProps} />);
    
    // 제목, 설명, 선택 필드, 버튼 확인
    expect(screen.getByText('map()')).toBeInTheDocument();
    expect(screen.getByText('배열의 각 요소를 변환하기')).toBeInTheDocument();
    expect(screen.getByText('구문 정보 보기')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '실행' })).toBeInTheDocument();
    
    // 선택 옵션 확인
    expect(screen.getByRole('option', { name: '제목만 추출' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '제목 대문자로 변환' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '제목과 본문 첫 20자' })).toBeInTheDocument();
  });
  
  test('구문 정보 토글 버튼이 작동한다', () => {
    render(<MapMethod {...mockProps} />);
    
    // 초기 상태에서는 구문 가이드가 표시되지 않아야 함
    expect(screen.queryByTestId('syntax-guide')).not.toBeInTheDocument();
    
    // 토글 버튼 클릭
    fireEvent.click(screen.getByText('구문 정보 보기'));
    
    // 구문 가이드가 표시되어야 함
    expect(screen.getByTestId('syntax-guide')).toBeInTheDocument();
  });
  
  test('선택값이 변경되면 상태가 업데이트된다', () => {
    render(<MapMethod {...mockProps} />);
    
    // select 요소 가져오기
    const selectElement = screen.getByRole('combobox');
    
    // '제목 대문자로 변환' 옵션으로 변경
    fireEvent.change(selectElement, { target: { value: 'upperCase' } });
    
    // 선택된 값이 변경되었는지 확인
    expect(selectElement.value).toBe('upperCase');
  });
  
  test('실행 버튼 클릭 시 map 결과를 표시한다 - 제목만 추출', async () => {
    render(<MapMethod {...mockProps} />);
    
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'titles' } });

    // 실행 버튼 클릭
    fireEvent.click(screen.getByRole('button', { name: '실행' }));
    
    // map 결과 확인
    const resultElement = await waitFor(() => screen.getByRole('document'));
    expect(resultElement.textContent).toContain('map() - 제목만 추출');
    
    // 결과가 배열인지 확인 (대괄호로 시작하는지)
    expect(resultElement.textContent).toMatch(/\[\s*"[^"]+"/);
  });
  
  test('실행 버튼 클릭 시 map 결과를 표시한다 - 대문자 변환', () => {
    render(<MapMethod {...mockProps} />);
    
    // 'upperCase' 옵션 선택
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'upperCase' } });
    
    // 실행 버튼 클릭
    fireEvent.click(screen.getByRole('button', { name: '실행' }));
    
    // map 결과 확인
    const resultElement = screen.getByText(/map\(\) - 제목을 대문자로 변환/);
    expect(resultElement.textContent).toContain('map() - 제목을 대문자로 변환');
    
    // 대문자 변환 결과 확인 (모든 문자가 대문자인지)
    const upperCaseRegex = /\[\s*"[A-Z\s,.]+"/;
    expect(resultElement.textContent).toMatch(upperCaseRegex);
  });
  
  test('유효하지 않은 데이터로 실행 시 오류 메시지를 표시한다', () => {
    // validateData가 false를 반환하도록 설정
    const invalidDataProps = {
      ...mockProps,
      validateData: jest.fn().mockReturnValue(false)
    };
    
    render(<MapMethod {...invalidDataProps} />);
    
    // 실행 버튼 클릭
    fireEvent.click(screen.getByRole('button', { name: '실행' }));
    
    // 오류 메시지 확인
    expect(screen.getByText(/먼저 "데이터 가져오기" 버튼을 클릭하여 데이터를 로드해주세요/)).toBeInTheDocument();
  });
});
