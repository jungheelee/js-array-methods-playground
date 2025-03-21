import React, { useState } from 'react';
import SyntaxGuide from '../common/SyntaxGuide';
import methodSyntaxData from '../../data/methodSyntax';

function SortMethod({ postsData, validateData }) {
  const [sortType, setSortType] = useState('idAsc');
  const [result, setResult] = useState('');
  const [error, setError] = useState(null);
  const [showSyntax, setShowSyntax] = useState(false);

  /**
   * sort() 메서드 실행 함수
   * 배열의 요소를 정렬
   */
  const runSort = () => {
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
      // 원본 데이터 복사 (sort는 원본 배열을 변경하므로)
      const dataCopy = [...postsData];
      let description = "";

      // 선택된 정렬 유형에 따라 다른 정렬 함수 적용
      switch (sortType) {
        case "idAsc":
          // ID 오름차순 정렬
          dataCopy.sort((a, b) => a.id - b.id);
          description = "ID 오름차순 정렬";
          break;

        case "idDesc":
          // ID 내림차순 정렬
          dataCopy.sort((a, b) => b.id - a.id);
          description = "ID 내림차순 정렬";
          break;

        case "titleAsc":
          // 제목 오름차순 정렬 (알파벳 순)
          dataCopy.sort((a, b) => a.title.localeCompare(b.title));
          description = "제목 오름차순 정렬";
          break;

        case "titleDesc":
          // 제목 내림차순 정렬 (알파벳 역순)
          dataCopy.sort((a, b) => b.title.localeCompare(a.title));
          description = "제목 내림차순 정렬";
          break;
          
        default:
          dataCopy.sort((a, b) => a.id - b.id);
          description = "ID 오름차순 정렬";
      }

      // 결과 생성
      let resultText = `sort() - ${description}\n\n`;
      resultText += JSON.stringify(dataCopy.slice(0, 3), null, 2);
      resultText += "\n\n(처음 3개 항목만 표시)";

      // 결과 설정
      setResult(resultText);
      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setError(`sort() 메서드 실행 중 오류 발생: ${error.message}`);
    }
  };

  // 구문 정보 표시 토글
  const toggleSyntax = () => {
    setShowSyntax(!showSyntax);
  };

  return (
    <div className="method-card">
      <h3>sort()</h3>
      <p>배열 요소 정렬하기</p>
      
      <button 
        className="syntax-toggle" 
        onClick={toggleSyntax}
      >
        {showSyntax ? '구문 정보 닫기' : '구문 정보 보기'}
      </button>
      
      {showSyntax && (
        <SyntaxGuide {...methodSyntaxData.sort} />
      )}
      
      {error && (
        <div className="alert alert-danger" role="alert" style={{ margin: '10px 0' }}>
          {error}
        </div>
      )}
      
      <div className="method-controls">
        <select 
          id="sortType"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="idAsc">ID 오름차순</option>
          <option value="idDesc">ID 내림차순</option>
          <option value="titleAsc">제목 오름차순</option>
          <option value="titleDesc">제목 내림차순</option>
        </select>
        <button id="runSort" onClick={runSort}>실행</button>
      </div>
      
      <pre className="result" id="sortResult">
        {result}
      </pre>
    </div>
  );
}

export default SortMethod;
