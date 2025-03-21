import React, { useState } from 'react';
import SyntaxGuide from '../common/SyntaxGuide';
import methodSyntaxData from '../../data/methodSyntax';

function MapMethod({ postsData, validateData }) {
  const [mapType, setMapType] = useState('titles');
  const [result, setResult] = useState('');
  const [error, setError] = useState(null);
  const [showSyntax, setShowSyntax] = useState(false);

  /**
   * map() 메서드 실행 함수
   * 배열의 각 요소를 변환하여 새 배열 생성
   */
  const runMap = () => {
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
      let mappedData = [];
      let description = "";

      // 선택된 변환 유형에 따라 다른 map() 함수 적용
      switch (mapType) {
        case "titles":
          // 제목만 추출하여 새 배열 생성
          mappedData = postsData.map((post) => post.title);
          description = "제목만 추출";
          break;

        case "upperCase":
          // 제목을 대문자로 변환하여 새 배열 생성
          mappedData = postsData.map((post) => post.title.toUpperCase());
          description = "제목을 대문자로 변환";
          break;

        case "custom":
          // 제목과 본문 첫 20자를 결합하여 새 배열 생성
          mappedData = postsData.map((post) => ({
            id: post.id,
            title: post.title,
            shortBody: post.body.substring(0, 20) + "..."
          }));
          description = "제목과 본문 첫 20자 추출";
          break;
          
        default:
          mappedData = postsData.map((post) => post.title);
          description = "제목만 추출";
      }

      // 결과 생성
      let resultText = `map() - ${description}\n\n`;
      resultText += JSON.stringify(mappedData.slice(0, 3), null, 2);

      // 결과가 더 많을 경우 메시지 추가
      if (mappedData.length > 3) {
        resultText += "\n\n(처음 3개 항목만 표시)";
      }

      // 결과 설정
      setResult(resultText);
      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setError(`map() 메서드 실행 중 오류 발생: ${error.message}`);
    }
  };

  // 구문 정보 표시 토글
  const toggleSyntax = () => {
    setShowSyntax(!showSyntax);
  };

  return (
    <div className="method-card">
      <h3>map()</h3>
      <p>배열의 각 요소를 변환하기</p>
      
      <button 
        className="syntax-toggle" 
        onClick={toggleSyntax}
        type="button"
      >
        {showSyntax ? '구문 정보 닫기' : '구문 정보 보기'}
      </button>
      
      {showSyntax && (
        <SyntaxGuide {...methodSyntaxData.map} />
      )}
      
      {error && (
        <div className="alert alert-danger" role="alert" style={{ margin: '10px 0' }}>
          {error}
        </div>
      )}
      
      <div className="method-controls" role="group" aria-label="map 메서드 제어">
        <label htmlFor="mapType" className="sr-only">변환 유형 선택:</label>
        <select 
          id="mapType"
          value={mapType}
          onChange={(e) => setMapType(e.target.value)}
          aria-label="변환 유형 선택"
        >
          <option value="titles">제목만 추출</option>
          <option value="upperCase">제목 대문자로 변환</option>
          <option value="custom">제목과 본문 첫 20자</option>
        </select>
        <button id="runMap" onClick={runMap} type="button">실행</button>
      </div>
      
      <pre className="result" id="mapResult" role="region" aria-live="polite" tabIndex="0" aria-label="map 메서드 결과">
        {result}
      </pre>
    </div>
  );
}

export default MapMethod;
