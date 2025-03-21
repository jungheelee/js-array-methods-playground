import React from 'react';
import { render, screen } from '../test-utils';
import Footer from '../../components/Footer';

describe('Footer Component', () => {
  test('올바른 내용과 링크를 렌더링한다', () => {
    render(<Footer />);
    
    // 텍스트 내용 확인
    expect(screen.getByText(/JavaScript 배열 메서드 학습 페이지/)).toBeInTheDocument();
    
    // JSONPlaceholder 링크 확인
    const linkElement = screen.getByText('JSONPlaceholder');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.tagName).toBe('A');
    expect(linkElement).toHaveAttribute('href', 'https://jsonplaceholder.typicode.com/');
    expect(linkElement).toHaveAttribute('target', '_blank');
    expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
