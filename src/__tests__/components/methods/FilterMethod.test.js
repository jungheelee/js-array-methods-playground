import React from 'react';
import { render, screen, fireEvent } from '../../test-utils';
import FilterMethod from '../../../components/methods/FilterMethod';
import { mockPostsData } from '../../test-utils';

// SyntaxGuide 컴포넌트 모킹
jest.mock('../../../components/common/SyntaxGuide', () => {
  return function MockSyntaxGuide() {
    return <div data-testid="syntax-guide">구문 가이드 컴포넌트</div>;
  };
});

describe('FilterMethod Component', () => {
  // 테스트용 props
  const mockProps = {
    postsData: mockPostsData,
    validateData: jest.fn().mockReturnValue(true) // 기본값으로 유효한 데이터
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('기본 UI가 올바르게 렌더링된다', () => {
    render(<FilterMethod {...mockProps} />);
    
    // 제목, 설명, 입력 필드, 버튼 확인
    expect(screen.getByText('filter()')).toBeInTheDocument();
    expect(screen.getByText('조건에 맞는 요소만 골라내기')).toBeInTheDocument();
    expect(screen.getByText('구문 정보 보기')).toBeInTheDocument();
    expect(screen.getByLabelText('User ID로 필터링:')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '실행' })).toBeInTheDocument();
  });
  
  test('구문 정보 토글 버튼이 작동한다', () => {
    render(<FilterMethod {...mockProps} />);
    
    // 초기 상태에서는 구문 가이드가 표시되지 않아야 함
    expect(screen.queryByTestId('syntax-guide')).not.toBeInTheDocument();
    
    // 토글 버튼 클릭
    fireEvent.click(screen.getByText('구문 정보 보기'));
    
    // 구문 가이드가 표시되어야 함
    expect(screen.getByTestId('syntax-guide')).toBeInTheDocument();
    
    // 다시 토글 버튼 클릭
    fireEvent.click(screen.getByText('구문 정보 닫기'));
    
    // 구문 가이드가 숨겨져야 함
    expect(screen.queryByTestId('syntax-guide')).not.toBeInTheDocument();
  });
  
  test('UserID 입력값이 변경되면 상태가 업데이트된다', () => {
    render(<FilterMethod {...mockProps} />);
    
    const input = screen.getByLabelText('User ID로 필터링:');
    fireEvent.change(input, { target: { value: '2' } });
    
    expect(input.value).toBe('2');
  });
  
  test('실행 버튼 클릭 시 filter 결과를 표시한다', () => {
    render(<FilterMethod {...mockProps} />);
    
    // User ID를 2로 변경
    const input = screen.getByLabelText('User ID로 필터링:');
    fireEvent.change(input, { target: { value: '2' } });
    
    // 실행 버튼 클릭
    fireEvent.click(screen.getByRole('button', { name: '실행' }));
    
    // userId=2인 포스트 필터링 결과 확인
    const resultElement = screen.getByRole('pre');
    expect(resultElement.textContent).toContain('userId가 2인 포스트');
    
    // mockPostsData에서 userId=2인 포스트는 2개
    const filteredCount = mockPostsData.filter(post => post.userId === 2).length;
    expect(resultElement.textContent).toContain(`${filteredCount}개 찾음`);
  });
  
  test('유효하지 않은 데이터로 실행 시 오류 메시지를 표시한다', () => {
    // validateData가 false를 반환하도록 설정
    const invalidDataProps = {
      ...mockProps,
      validateData: jest.fn().mockReturnValue(false)
    };
    
    render(<FilterMethod {...invalidDataProps} />);
    
    // 실행 버튼 클릭
    fireEvent.click(screen.getByRole('button', { name: '실행' }));
    
    // 오류 메시지 확인
    expect(screen.getByText(/먼저 "데이터 가져오기" 버튼을 클릭하여 데이터를 로드해주세요/)).toBeInTheDocument();
  });
});
