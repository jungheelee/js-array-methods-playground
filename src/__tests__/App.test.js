import React from 'react';
import { render, screen } from './test-utils';
import { fireEvent } from '@testing-library/react';
import App from '../App';

// 하위 컴포넌트들 모킹
jest.mock('../components/Header', () => {
  return function MockHeader() {
    return <header data-testid="mock-header">Header 컴포넌트</header>;
  };
});

jest.mock('../components/DataContainer', () => {
  return function MockDataContainer({ postsData, setPostsData }) {
    return (
      <div data-testid="mock-data-container">
        <span>DataContainer 컴포넌트</span>
        <button onClick={() => setPostsData([{ id: 1, title: '테스트' }])}>데이터 설정</button>
      </div>
    );
  };
});

jest.mock('../components/MethodsContainer', () => {
  return function MockMethodsContainer({ postsData }) {
    return (
      <div data-testid="mock-methods-container">
        <span>MethodsContainer 컴포넌트</span>
        <span>데이터 개수: {postsData.length}</span>
      </div>
    );
  };
});

jest.mock('../components/Footer', () => {
  return function MockFooter() {
    return <footer data-testid="mock-footer">Footer 컴포넌트</footer>;
  };
});

describe('App Component', () => {
  test('모든 주요 컴포넌트를 렌더링한다', () => {
    render(<App />);
    
    // 모든 주요 컴포넌트가 렌더링되었는지 확인
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-data-container')).toBeInTheDocument();
    expect(screen.getByTestId('mock-methods-container')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
  });
  
  test('데이터 상태가 컴포넌트 간에 공유된다', () => {
    render(<App />);
    
    // 초기 상태에서는 데이터가 없어야 함
    expect(screen.getByText('데이터 개수: 0')).toBeInTheDocument();
    
    // DataContainer에서 데이터 설정 버튼 클릭
    fireEvent.click(screen.getByText('데이터 설정'));
    
    // MethodsContainer가 업데이트된 데이터를 받았는지 확인
    expect(screen.getByText('데이터 개수: 1')).toBeInTheDocument();
  });
});
