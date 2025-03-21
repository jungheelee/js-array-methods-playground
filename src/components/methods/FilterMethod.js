import React, { useState } from 'react';
import SyntaxGuide from '../common/SyntaxGuide';
import methodSyntaxData from '../../data/methodSyntax';

function FilterMethod({ postsData, validateData }) {
  const [filterUserId, setFilterUserId] = useState(1);
  const [result, setResult] = useState('');
  const [error, setError] = useState(null);
  const [showSyntax, setShowSyntax] = useState(false);

  /**
   * filter() 메서드 실행 함수
   * 지정된 조건과 일치하는 요소만 추출하여 새 배열 생성
   */
  const runFilter = () => {
    // 데이터 유효성 검사
    if (!validateData()) {
      setError('먼저 "데이터 가져오기" 버튼을 클릭하여 데이터를 로드해주세요.');
      
      // 3초 후 에러 메시지 제거
      setTimeout(() => {
        setError(null);
      }, 3000);
      
      return;
    }

    try {
      // filter() 메서드를 사용하여 해당 userId와 일치하는 포스트만 추출
      const filteredPosts = postsData.filter((post) => post.userId === filterUserId);

      // 결과 생성
      let resultText = `userId가 ${filterUserId}인 포스트: ${filteredPosts.length}개 찾음\n\n`;
      resultText += JSON.stringify(filteredPosts.slice(0, 3), null, 2);

      // 결과가 더 많을 경우 메시지 추가
      if (filteredPosts.length > 3) {
        resultText += "\n\n(처음 3개 항목만 표시)";
      }

      // 결과 설정
      setResult(resultText);
      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setError(`filter() 메서드 실행 중 오류 발생: ${error.message}`);
    }
  };

  // 구문 정보 표시 토글
  const toggleSyntax = () => {
    setShowSyntax(!showSyntax);
  };

  return (
    <div className="method-card">
      <h3>filter()</h3>
      <p>조건에 맞는 요소만 골라내기</p>
      
      <button 
        className="syntax-toggle" 
        onClick={toggleSyntax}
        type="button"
      >
        {showSyntax ? '구문 정보 닫기' : '구문 정보 보기'}
      </button>
      
      {showSyntax && (
        <SyntaxGuide {...methodSyntaxData.filter} />
      )}
      
      {error && (
        <div className="alert alert-danger" role="alert" style={{ margin: '10px 0' }}>
          {error}
        </div>
      )}
      
      <div className="method-controls" role="group" aria-label="filter 메서드 제어">
        <label htmlFor="filterUserId">User ID로 필터링:</label>
        <input 
          type="number" 
          id="filterUserId" 
          min="1" 
          max="10" 
          value={filterUserId}
          onChange={(e) => setFilterUserId(parseInt(e.target.value))}
          aria-describedby="filterInstructions"
        />
        <button id="runFilter" onClick={runFilter} type="button">실행</button>
      </div>
      
      <pre className="result" id="filterResult" aria-live="polite" tabIndex="0" aria-label="filter 메서드 결과">
        {result}
      </pre>
    </div>
  );
}

export default FilterMethod;
