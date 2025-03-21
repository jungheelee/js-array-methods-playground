import React from 'react';
import { render, screen } from '../test-utils';
import Header from '../../components/Header';

describe('Header Component', () => {
  test('올바른 제목과 설명을 렌더링한다', () => {
    render(<Header />);
    
    // 제목 확인
    const headingElement = screen.getByText('JavaScript 배열 메서드 학습');
    expect(headingElement).toBeInTheDocument();
    
    // 설명 확인
    const descriptionElement = screen.getByText('JSONPlaceholder API의 데이터를 활용한 배열 메서드 실습');
    expect(descriptionElement).toBeInTheDocument();
  });
});
