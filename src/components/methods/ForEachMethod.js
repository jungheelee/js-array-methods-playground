import React, { useState } from 'react';
import SyntaxGuide from '../common/SyntaxGuide';
import methodSyntaxData from '../../data/methodSyntax';

function ForEachMethod({ postsData, validateData }) {
  const [result, setResult] = useState('');
  const [error, setError] = useState(null);
  const [showSyntax, setShowSyntax] = useState(false);

  /**
   * forEach() 메서드 실행 함수
   * 배열의 각 요소에 대해 함수를 실행
   */
  const runForEach = () => {
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
      // 결과를 저장할 배열
      const results = [];

      // forEach() 메서드를 사용하여 각 포스트의 글자수 계산
      postsData.forEach((post, index) => {
        // 포스트 ID, 제목 길이, 본문 길이, 총 글자수 계산
        const titleLength = post.title.length;
        const bodyLength = post.body.length;
        const totalLength = titleLength + bodyLength;

        // 결과 객체에 추가 (처음 10개만)
        if (index < 10) {
          results.push({
            id: post.id,
            titleLength,
            bodyLength,
            totalLength
          });
        }
      });

      // 결과 생성
      let resultText = `forEach() - 각 포스트의 글자수 분석\n\n`;
      resultText += JSON.stringify(results, null, 2);
      resultText += "\n\n(처음 10개 항목만 표시)";

      // 결과 설정
      setResult(resultText);
      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setError(`forEach() 메서드 실행 중 오류 발생: ${error.message}`);
    }
  };

  // 구문 정보 표시 토글
  const toggleSyntax = () => {
    setShowSyntax(!showSyntax);
  };

  return (
    <div className="method-card">
      <h3>forEach()</h3>
      <p>배열의 각 요소에 함수 실행</p>
      
      <button 
        className="syntax-toggle" 
        onClick={toggleSyntax}
        type="button"
      >
        {showSyntax ? '구문 정보 닫기' : '구문 정보 보기'}
      </button>
      
      {showSyntax && (
        <SyntaxGuide {...methodSyntaxData.forEach} />
      )}
      
      {error && (
        <div className="alert alert-danger" role="alert" style={{ margin: '10px 0' }}>
          {error}
        </div>
      )}
      
      <div className="method-controls">
        <button id="runForEach" onClick={runForEach} type="button">포스트별 글자수 계산</button>
      </div>
      
      <pre className="result" id="forEachResult">
        {result}
      </pre>
    </div>
  );
}

export default ForEachMethod;
