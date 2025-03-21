import React, { useState } from 'react';
import SyntaxGuide from '../common/SyntaxGuide';
import methodSyntaxData from '../../data/methodSyntax';

function CheckMethod({ postsData, validateData }) {
  const [checkType, setCheckType] = useState('titleLength');
  const [checkWord, setCheckWord] = useState('qui');
  const [result, setResult] = useState('');
  const [error, setError] = useState(null);
  const [showSyntax, setShowSyntax] = useState(false);
  const [currentMethod, setCurrentMethod] = useState('every');

  /**
   * every() 메서드 실행 함수
   * 배열의 모든 요소가 조건을 만족하는지 검사
   * 모든 요소가 조건을 만족하면 true, 하나라도 만족하지 않으면 false 반환
   */
  const runEvery = () => {
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
      const word = checkWord.toLowerCase();
      let result;
      let description = '';
      
      // 선택된 검사 유형에 따라 다른 조건 적용
      switch (checkType) {
        case 'titleLength':
          // 모든 제목의 길이가 20자를 초과하는지 검사
          result = postsData.every(post => post.title.length > 20);
          description = '모든 제목의 길이가 20자를 초과하는지 검사';
          break;
          
        case 'containsWord':
          // 모든 제목에 특정 단어가 포함되어 있는지 검사
          result = postsData.every(post => 
            post.title.toLowerCase().includes(word)
          );
          description = `모든 제목에 '${word}' 단어가 포함되어 있는지 검사`;
          break;
          
        case 'both':
          // 모든 제목이 20자를 초과하고 특정 단어가 포함되어 있는지 검사
          result = postsData.every(post => 
            post.title.length > 20 && post.title.toLowerCase().includes(word)
          );
          description = `모든 제목이 20자를 초과하고 '${word}' 단어를 포함하는지 검사`;
          break;
          
        default:
          result = postsData.every(post => post.title.length > 20);
          description = '모든 제목의 길이가 20자를 초과하는지 검사';
      }

      // 결과 생성
      let resultText = `every() - ${description}\n결과: ${result ? 'true (모든 항목이 조건 만족)' : 'false (조건을 만족하지 않는 항목 존재)'}`;
      
      // 조건을 만족하지 않는 경우 예시 표시
      if (!result) {
        let example;
        
        if (checkType === 'titleLength') {
          example = postsData.find(post => post.title.length <= 20);
          if (example) {
            resultText += `\n\n조건을 만족하지 않는 예시 (ID: ${example.id}):\n`;
            resultText += `제목: "${example.title}"\n`;
            resultText += `길이: ${example.title.length}자`;
          }
        } else if (checkType === 'containsWord') {
          example = postsData.find(post => 
            !post.title.toLowerCase().includes(word)
          );
          if (example) {
            resultText += `\n\n조건을 만족하지 않는 예시 (ID: ${example.id}):\n`;
            resultText += `제목: "${example.title}"`;
          }
        } else if (checkType === 'both') {
          example = postsData.find(post => 
            !(post.title.length > 20 && post.title.toLowerCase().includes(word))
          );
          if (example) {
            resultText += `\n\n조건을 만족하지 않는 예시 (ID: ${example.id}):\n`;
            resultText += `제목: "${example.title}"\n`;
            resultText += `길이: ${example.title.length}자\n`;
            
            // 어떤 조건이 실패했는지 자세히 설명
            if (example.title.length <= 20) {
              resultText += `실패 이유: 제목 길이가 20자 이하`;
            }
            if (!example.title.toLowerCase().includes(word)) {
              resultText += `${example.title.length <= 20 ? ' 및 ' : '실패 이유: '}'${word}' 단어가 제목에 포함되지 않음`;
            }
          }
        }
      }

      // 결과 설정
      setResult(resultText);
      setError(null);
      setCurrentMethod('every');
    } catch (error) {
      console.error('Error:', error);
      setError(`every() 메서드 실행 중 오류 발생: ${error.message}`);
    }
  };

  /**
   * some() 메서드 실행 함수
   * 배열에서 적어도 하나의 요소가 조건을 만족하는지 검사
   * 하나라도 조건을 만족하면 true, 모든 요소가 만족하지 않으면 false 반환
   */
  const runSome = () => {
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
      const word = checkWord.toLowerCase();
      let result;
      let description = '';
      
      // 선택된 검사 유형에 따라 다른 조건 적용
      switch (checkType) {
        case 'titleLength':
          // 하나라도 제목의 길이가 20자를 초과하는지 검사
          result = postsData.some(post => post.title.length > 20);
          description = '하나라도 제목의 길이가 20자를 초과하는지 검사';
          break;
          
        case 'containsWord':
          // 하나라도 제목에 특정 단어가 포함되어 있는지 검사
          result = postsData.some(post => 
            post.title.toLowerCase().includes(word)
          );
          description = `하나라도 제목에 '${word}' 단어가 포함되어 있는지 검사`;
          break;
          
        case 'both':
          // 하나라도 제목이 20자를 초과하고 특정 단어가 포함되어 있는지 검사
          result = postsData.some(post => 
            post.title.length > 20 && post.title.toLowerCase().includes(word)
          );
          description = `하나라도 제목이 20자를 초과하고 '${word}' 단어를 포함하는지 검사`;
          break;
          
        default:
          result = postsData.some(post => post.title.length > 20);
          description = '하나라도 제목의 길이가 20자를 초과하는지 검사';
      }

      // 결과 생성
      let resultText = `some() - ${description}\n결과: ${result ? 'true (조건을 만족하는 항목 존재)' : 'false (모든 항목이 조건 불만족)'}`;
      
      // 조건을 만족하는 경우 예시 표시
      if (result) {
        let example;
        
        if (checkType === 'titleLength') {
          example = postsData.find(post => post.title.length > 20);
          if (example) {
            resultText += `\n\n조건을 만족하는 예시 (ID: ${example.id}):\n`;
            resultText += `제목: "${example.title}"\n`;
            resultText += `길이: ${example.title.length}자`;
          }
        } else if (checkType === 'containsWord') {
          example = postsData.find(post => 
            post.title.toLowerCase().includes(word)
          );
          if (example) {
            resultText += `\n\n조건을 만족하는 예시 (ID: ${example.id}):\n`;
            resultText += `제목: "${example.title}"`;
          }
        } else if (checkType === 'both') {
          example = postsData.find(post => 
            post.title.length > 20 && post.title.toLowerCase().includes(word)
          );
          if (example) {
            resultText += `\n\n조건을 만족하는 예시 (ID: ${example.id}):\n`;
            resultText += `제목: "${example.title}"\n`;
            resultText += `길이: ${example.title.length}자\n`;
            resultText += `포함 단어: '${word}'가 제목에 포함됨`;
          }
        }
      }

      // 결과 설정
      setResult(resultText);
      setError(null);
      setCurrentMethod('some');
    } catch (error) {
      console.error('Error:', error);
      setError(`some() 메서드 실행 중 오류 발생: ${error.message}`);
    }
  };

  // 구문 정보 표시 토글
  const toggleSyntax = () => {
    setShowSyntax(!showSyntax);
  };

  return (
    <div className="method-card">
      <h3>every() / some()</h3>
      <p>배열의 조건 검사</p>
      
      <button 
        className="syntax-toggle" 
        onClick={toggleSyntax}
        type="button"
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
      
      <div className="method-controls" role="group" aria-label="체크 메서드 제어">
        <label htmlFor="checkType" className="sr-only">검사 유형 선택:</label>
        <select 
          id="checkType"
          value={checkType}
          onChange={(e) => setCheckType(e.target.value)}
          aria-label="검사 유형 선택"
        >
          <option value="titleLength">제목 길이 &gt; 20자</option>
          <option value="containsWord">제목에 특정 단어 포함</option>
          <option value="both">제목 길이 &gt; 20자 AND 특정 단어 포함</option>
        </select>
        <label htmlFor="checkWord" className="sr-only">검색할 단어:</label>
        <input 
          type="text" 
          id="checkWord" 
          placeholder="단어 입력" 
          value={checkWord}
          onChange={(e) => setCheckWord(e.target.value)}
          aria-label="검색할 단어 입력"
        />
        <button id="runEvery" onClick={runEvery} type="button">every() 실행</button>
        <button id="runSome" onClick={runSome} type="button">some() 실행</button>
      </div>
      
      <pre className="result" id="checkResult" aria-live="polite" tabIndex="0" aria-label="체크 메서드 결과">
        {result}
      </pre>
    </div>
  );
}

export default CheckMethod;
