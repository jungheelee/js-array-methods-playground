import React, { useState } from 'react';
import SyntaxGuide from '../common/SyntaxGuide';
import methodSyntaxData from '../../data/methodSyntax';

function ReduceMethod({ postsData, validateData }) {
  const [reduceType, setReduceType] = useState('countByUser');
  const [result, setResult] = useState('');
  const [error, setError] = useState(null);
  const [showSyntax, setShowSyntax] = useState(false);

  /**
   * reduce() 메서드 실행 함수
   * 배열의 각 요소에 대해 주어진 리듀서 함수를 실행하고 하나의 결과값을 반환
   */
  const runReduce = () => {
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
      let result;
      let description = "";

      // 선택된 집계 유형에 따라 다른 reduce() 함수 적용
      switch (reduceType) {
        case "countByUser":
          // 사용자별 포스트 개수 집계
          result = postsData.reduce((acc, post) => {
            // 해당 사용자 ID의 카운트 증가
            acc[`User ${post.userId}`] = (acc[`User ${post.userId}`] || 0) + 1;
            return acc;
          }, {});
          description = "사용자별 포스트 개수";
          break;

        case "titleLengths":
          // 제목 길이의 평균 계산
          result = postsData.reduce(
            (acc, post, idx, arr) => {
              // 현재까지의 합계에 현재 제목 길이를 더함
              acc.sum += post.title.length;

              // 마지막 요소에서 평균 계산
              if (idx === arr.length - 1) {
                acc.average = (acc.sum / arr.length).toFixed(2);
              }
              return acc;
            },
            { sum: 0, average: 0 }
          );
          description = "제목 길이 평균";
          break;

        case "wordFrequency":
          // 제목에서 단어 빈도 분석 (3글자 이상 단어만)
          result = postsData.reduce((acc, post) => {
            // 제목에서 단어 추출 (비알파벳 문자를 공백으로 대체 후 분할)
            const words = post.title
              .toLowerCase()
              .replace(/[^a-z]/g, " ")
              .split(/\s+/);

            // 각 단어에 대해 빈도 집계 (3글자 이상인 경우)
            words.forEach((word) => {
              if (word.length >= 3) {
                acc[word] = (acc[word] || 0) + 1;
              }
            });

            return acc;
          }, {});

          // 빈도 기준 내림차순 정렬
          const sortedWords = Object.entries(result)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .reduce((obj, [word, count]) => {
              obj[word] = count;
              return obj;
            }, {});

          result = sortedWords;
          description = "제목에서 가장 많이 사용된 단어 (상위 10개)";
          break;
          
        default:
          // 기본값: 사용자별 포스트 개수
          result = postsData.reduce((acc, post) => {
            acc[`User ${post.userId}`] = (acc[`User ${post.userId}`] || 0) + 1;
            return acc;
          }, {});
          description = "사용자별 포스트 개수";
      }

      // 결과 생성
      let resultText = `reduce() - ${description}\n\n`;
      resultText += JSON.stringify(result, null, 2);

      // 결과 설정
      setResult(resultText);
      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setError(`reduce() 메서드 실행 중 오류 발생: ${error.message}`);
    }
  };

  // 구문 정보 표시 토글
  const toggleSyntax = () => {
    setShowSyntax(!showSyntax);
  };

  return (
    <div className="method-card">
      <h3>reduce()</h3>
      <p>배열 데이터 집계하기</p>
      
      <button 
        className="syntax-toggle" 
        onClick={toggleSyntax}
        type="button"
      >
        {showSyntax ? '구문 정보 닫기' : '구문 정보 보기'}
      </button>
      
      {showSyntax && (
        <SyntaxGuide {...methodSyntaxData.reduce} />
      )}
      
      {error && (
        <div className="alert alert-danger" role="alert" style={{ margin: '10px 0' }}>
          {error}
        </div>
      )}
      
      <div className="method-controls">
        <select 
          id="reduceType"
          value={reduceType}
          onChange={(e) => setReduceType(e.target.value)}
        >
          <option value="countByUser">사용자별 포스트 개수</option>
          <option value="titleLengths">제목 길이 평균</option>
          <option value="wordFrequency">제목에서 단어 빈도 분석</option>
        </select>
        <button id="runReduce" onClick={runReduce} type="button">실행</button>
      </div>
      
      <pre className="result" id="reduceResult">
        {result}
      </pre>
    </div>
  );
}

export default ReduceMethod;
