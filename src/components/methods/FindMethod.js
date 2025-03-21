import React, { useState } from 'react';
import SyntaxGuide from '../common/SyntaxGuide';
import methodSyntaxData from '../../data/methodSyntax';

function FindMethod({ postsData, validateData }) {
  const [findId, setFindId] = useState(5);
  const [result, setResult] = useState('');
  const [error, setError] = useState(null);
  const [showSyntax, setShowSyntax] = useState(false);
  const [currentMethod, setCurrentMethod] = useState('find');

  /**
   * find() 메서드 실행 함수
   * 조건과 일치하는 첫 번째 요소를 반환
   */
  const runFind = () => {
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
      // find() 메서드를 사용하여 해당 ID와 일치하는 첫 번째 포스트 찾기
      const foundPost = postsData.find((post) => post.id === findId);

      // 결과 생성
      let resultText = '';
      
      if (foundPost) {
        resultText = `find() - ID가 ${findId}인 포스트 찾기\n\n`;
        resultText += JSON.stringify(foundPost, null, 2);
      } else {
        resultText = `find() - ID가 ${findId}인 포스트를 찾을 수 없습니다.`;
      }

      // 결과 설정
      setResult(resultText);
      setError(null);
      setCurrentMethod('find');
    } catch (error) {
      console.error('Error:', error);
      setError(`find() 메서드 실행 중 오류 발생: ${error.message}`);
    }
  };

  /**
   * findIndex() 메서드 실행 함수
   * 조건과 일치하는 첫 번째 요소의 인덱스를 반환
   */
  const runFindIndex = () => {
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
      // findIndex() 메서드를 사용하여 해당 ID와 일치하는 첫 번째 포스트의 인덱스 찾기
      const index = postsData.findIndex((post) => post.id === findId);

      // 결과 생성
      let resultText = '';
      
      if (index !== -1) {
        resultText = `findIndex() - ID가 ${findId}인 포스트의 인덱스: ${index}\n\n`;
        resultText += `해당 포스트: \n${JSON.stringify(postsData[index], null, 2)}`;
      } else {
        resultText = `findIndex() - ID가 ${findId}인 포스트를 찾을 수 없습니다. (반환값: ${index})`;
      }

      // 결과 설정
      setResult(resultText);
      setError(null);
      setCurrentMethod('findIndex');
    } catch (error) {
      console.error('Error:', error);
      setError(`findIndex() 메서드 실행 중 오류 발생: ${error.message}`);
    }
  };

  // 구문 정보 표시 토글
  const toggleSyntax = () => {
    setShowSyntax(!showSyntax);
  };

  return (
    <div className="method-card">
      <h3>find() / findIndex()</h3>
      <p>특정 조건의 요소 찾기</p>
      
      <button 
        className="syntax-toggle" 
        onClick={toggleSyntax}
      >
        {showSyntax ? '구문 정보 닫기' : '구문 정보 보기'}
      </button>
      
      {showSyntax && (
        <SyntaxGuide {...methodSyntaxData[currentMethod]} />
      )}
      
      {error && (
        <div className="alert alert-danger" role="alert" style={{ margin: '10px 0' }}>
          {error}
        </div>
      )}
      
      <div className="method-controls">
        <label htmlFor="findId">ID로 찾기:</label>
        <input 
          type="number" 
          id="findId" 
          min="1" 
          max="100" 
          value={findId}
          onChange={(e) => setFindId(parseInt(e.target.value))}
        />
        <button id="runFind" onClick={runFind}>find() 실행</button>
        <button id="runFindIndex" onClick={runFindIndex}>findIndex() 실행</button>
      </div>
      
      <pre className="result" id="findResult">
        {result}
      </pre>
    </div>
  );
}

export default FindMethod;
