import React from 'react';
import { render, screen, fireEvent, waitFor } from '../test-utils';
import DataContainer from '../../components/DataContainer';
import { mockPostsData } from '../test-utils';

// fetch 함수 모킹
global.fetch = jest.fn();

describe('DataContainer Component', () => {
  const mockSetPostsData = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  test('초기 상태에서 올바르게 렌더링된다', () => {
    render(<DataContainer postsData={[]} setPostsData={mockSetPostsData} />);
    
    // 제목과 버튼 확인
    expect(screen.getByText('API 데이터')).toBeInTheDocument();
    expect(screen.getByText('데이터 가져오기')).toBeInTheDocument();
    expect(screen.getByText('데이터 지우기')).toBeInTheDocument();
    
    // 초기 상태에서는 JSON 표시 영역이 비어있어야 함
    const jsonDisplay = screen.getByTestId('jsonData') || screen.getByRole('pre', { id: 'jsonData' });
    expect(jsonDisplay.textContent).toBe('');
  });
  
  test('데이터가 있을 때 올바르게 표시한다', () => {
    render(<DataContainer postsData={mockPostsData} setPostsData={mockSetPostsData} />);
    
    // JSON 데이터가 표시되어야 함
    const jsonDisplay = screen.getByTestId('jsonData') || screen.getByRole('pre', { id: 'jsonData' });
    expect(jsonDisplay.textContent).toContain(`총 ${mockPostsData.length}개 항목`);
    expect(jsonDisplay.textContent).toContain('(처음 5개 항목만 표시)');
  });
  
  test('데이터 가져오기 버튼이 클릭되면 fetch를 호출한다', async () => {
    // fetch 성공 모킹
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce(mockPostsData)
    });
    
    render(<DataContainer postsData={[]} setPostsData={mockSetPostsData} />);
    
    // 버튼 클릭
    fireEvent.click(screen.getByText('데이터 가져오기'));
    
    // fetch가 호출되었는지 확인
    expect(global.fetch).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/posts');
    
    // 데이터가 설정되었는지 확인
    await waitFor(() => {
      expect(mockSetPostsData).toHaveBeenCalledWith(mockPostsData);
    });
  });
  
  test('데이터 지우기 버튼이 클릭되면 데이터를 초기화한다', () => {
    render(<DataContainer postsData={mockPostsData} setPostsData={mockSetPostsData} />);
    
    // 버튼 클릭
    fireEvent.click(screen.getByText('데이터 지우기'));
    
    // 데이터가 초기화되었는지 확인
    expect(mockSetPostsData).toHaveBeenCalledWith([]);
  });
  
  test('fetch 실패 시 오류 메시지를 표시한다', async () => {
    // fetch 실패 모킹
    const errorMessage = 'API 요청 실패';
    global.fetch.mockRejectedValueOnce(new Error(errorMessage));
    
    render(<DataContainer postsData={[]} setPostsData={mockSetPostsData} />);
    
    // 버튼 클릭
    fireEvent.click(screen.getByText('데이터 가져오기'));
    
    // 오류 메시지가 표시되는지 확인
    await waitFor(() => {
      expect(screen.getByText(new RegExp(errorMessage))).toBeInTheDocument();
    });
  });
});
