import React, { useState } from 'react';
import '../styles/DataContainer.css';

function DataContainer({ postsData, setPostsData }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  
  // 버튼 하이라이트 상태 관리
  const [highlightFetchButton, setHighlightFetchButton] = useState(false);

  /**
   * JSONPlaceholder API에서 포스트 데이터를 가져오는 함수
   */
  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // API 호출
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      
      // 응답이 성공적인지 확인
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      // 데이터가 유효한지 확인
      if (!data || !Array.isArray(data) || data.length === 0) {
        throw new Error("받은 데이터가 유효하지 않습니다.");
      }
      
      // 데이터 저장
      setPostsData(data);
      
      // 성공 메시지 표시
      showSuccessMessage("데이터를 성공적으로 가져왔습니다.");
    } catch (error) {
      console.error("Error:", error);
      setError(`Error fetching data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 데이터 및 결과 표시 영역을 초기화하는 함수
   */
  const clearData = () => {
    setPostsData([]);
    showSuccessMessage("모든 데이터가 초기화되었습니다.");
  };

  /**
   * 성공 메시지를 표시하는 함수
   * @param {string} message - 성공 메시지
   */
  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    
    // 3초 후 메시지 제거
    setTimeout(() => {
      setSuccessMessage(null);
    }, 3000);
  };

  /**
   * 버튼 하이라이트 효과를 표시하는 함수
   */
  const highlightButton = () => {
    setHighlightFetchButton(true);
    
    // 2초 후 효과 제거
    setTimeout(() => {
      setHighlightFetchButton(false);
    }, 2000);
  };

  return (
    <section className="data-container">
      <h2>API 데이터</h2>
      
      {/* 성공 메시지 표시 */}
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      
      <div className="button-container">
        <button 
          id="fetchData" 
          onClick={fetchPosts}
          className={highlightFetchButton ? "highlight-button" : ""}
          disabled={loading}
        >
          {loading ? "로딩 중..." : "데이터 가져오기"}
        </button>
        <button 
          id="clearData" 
          onClick={clearData}
          disabled={loading || postsData.length === 0}
        >
          데이터 지우기
        </button>
      </div>
      
      {/* 에러 메시지 표시 */}
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      
      {/* JSON 데이터 표시 */}
      <pre id="jsonData" className="json-display">
        {postsData.length > 0 
          ? `총 ${postsData.length}개 항목\n\n${JSON.stringify(postsData.slice(0, 5), null, 2)}...\n\n(처음 5개 항목만 표시)`
          : ""}
      </pre>
    </section>
  );
}

export default DataContainer;
