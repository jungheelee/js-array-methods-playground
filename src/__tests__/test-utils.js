import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Jest DOM 확장 추가

export const mockPostsData = [
  {
    userId: 1,
    id: 1,
    title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    userId: 1,
    id: 2,
    title: "qui est esse",
    body: "est rerum tempore vitae sequi sint nihil reprehenderit dolor beatae ea dolores neque fugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis qui aperiam non debitis possimus qui neque nisi nulla"
  },
  {
    userId: 2,
    id: 3,
    title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    body: "et iusto sed quo iure voluptatem occaecati omnis eligendi aut ad voluptatem doloribus vel accusantium quis pariatur molestiae porro eius odio et labore et velit aut"
  },
  {
    userId: 2,
    id: 4,
    title: "eum et est occaecati",
    body: "ullam et saepe reiciendis voluptatem adipisci sit amet autem assumenda provident rerum culpa quis hic commodi nesciunt rem tenetur doloremque ipsam iure quis sunt voluptatem rerum illo velit"
  },
  {
    userId: 3,
    id: 5,
    title: "nesciunt quas odio",
    body: "repudiandae veniam quaerat sunt sed alias aut fugiat sit autem sed est voluptatem omnis possimus esse voluptatibus quis est aut tenetur dolor neque"
  }
];

// 커스텀 렌더 함수 - 필요한 프로바이더나 전역 상태 등을 추가할 수 있음
const customRender = (ui, options = {}) => {
  const Wrapper = options.wrapper || React.Fragment;
  return render(ui, {
    wrapper: Wrapper,
    ...options
  });
};

// 모의 함수 헬퍼
export const createMockFn = () => jest.fn();

// 유효성 검사 헬퍼 함수
export const createMockValidateFn = (isValid = true) => jest.fn().mockReturnValue(isValid);

// 비동기 작업 테스트를 위한 헬퍼
export const mockApiCall = (data) => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue(data),
  });
};

// 비동기 작업 실패 모의
export const mockApiCallFailure = (errorMessage = 'API 요청 실패') => {
  global.fetch = jest.fn().mockRejectedValue(new Error(errorMessage));
};

// 테스트 유틸리티 다시 내보내기
export * from '@testing-library/react';
export { customRender as render, screen, fireEvent, waitFor };
