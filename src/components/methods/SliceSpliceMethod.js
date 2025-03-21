import React, { useState } from 'react';
import SyntaxGuide from '../common/SyntaxGuide';
import methodSyntaxData from '../../data/methodSyntax';

function SliceSpliceMethod({ postsData, validateData }) {
  const [sliceStart, setSliceStart] = useState(0);
  const [sliceEnd, setSliceEnd] = useState(5);
  const [spliceStart, setSpliceStart] = useState(0);
  const [spliceDeleteCount, setSpliceDeleteCount] = useState(1);
  const [spliceAdd, setSpliceAdd] = useState('새로 추가된 항목');
  const [result, setResult] = useState('');
  const [error, setError] = useState(null);
  const [showSyntax, setShowSyntax] = useState(false);
  const [currentMethod, setCurrentMethod] = useState('slice');

  /**
   * slice() 메서드 실행 함수
   * 배열의 특정 부분을 추출 (원본 배열은 변경되지 않음)
   */
  const runSlice = () => {
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
      // 입력값 유효성 검사
      if (
        isNaN(sliceStart) ||
        isNaN(sliceEnd) ||
        sliceStart < 0 ||
        sliceEnd > postsData.length ||
        sliceStart >= sliceEnd
      ) {
        setError(`오류: 유효한 범위를 입력하세요. (시작: 0-${postsData.length - 1}, 끝: 시작보다 큰 값 ~${postsData.length})`);
        
        // 3초 후 에러 메시지 제거
        setTimeout(() => {
          setError(null);
        }, 3000);
        
        return;
      }

      // slice() 메서드를 사용하여 배열의 일부 추출
      const slicedPosts = postsData.slice(sliceStart, sliceEnd);

      // 결과 생성
      let resultText = `slice(${sliceStart}, ${sliceEnd}) - 배열의 일부 추출 (원본 배열 변경 없음)\n\n`;
      resultText += `추출된 항목 (${slicedPosts.length}개):\n`;
      resultText += JSON.stringify(slicedPosts, null, 2);
      resultText += `\n\n원본 배열의 길이: ${postsData.length} (변경 없음)`;

      // 결과 설정
      setResult(resultText);
      setError(null);
      setCurrentMethod('slice');
    } catch (error) {
      console.error('Error:', error);
      setError(`slice() 메서드 실행 중 오류 발생: ${error.message}`);
    }
  };

  /**
   * splice() 메서드 실행 함수
   * 배열에서 요소를 삭제하고, 필요한 경우 새 요소를 추가 (원본 배열이 변경됨)
   */
  const runSplice = () => {
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
      // 원본 데이터 복사 (원본 보존을 위해)
      const dataCopy = JSON.parse(JSON.stringify(postsData));

      // 입력값 유효성 검사
      if (
        isNaN(spliceStart) ||
        isNaN(spliceDeleteCount) ||
        spliceStart < 0 ||
        spliceStart >= dataCopy.length
      ) {
        setError(`오류: 유효한 시작 인덱스를 입력하세요. (0-${dataCopy.length - 1})`);
        
        // 3초 후 에러 메시지 제거
        setTimeout(() => {
          setError(null);
        }, 3000);
        
        return;
      }

      // 삭제 개수가 유효하지 않으면 조정
      const validDeleteCount = Math.max(
        0,
        Math.min(spliceDeleteCount, dataCopy.length - spliceStart)
      );

      // 새 항목 생성 (제목이 입력된 경우)
      let newItem = null;
      if (spliceAdd.trim()) {
        newItem = {
          userId: 999, // 사용자 정의 ID
          id: dataCopy.length + 1, // 기존 최대 ID + 1
          title: spliceAdd.trim(),
          body: "이 항목은 splice() 메서드에 의해 추가되었습니다."
        };
      }

      // splice() 메서드 실행
      const removedItems = newItem
        ? dataCopy.splice(spliceStart, validDeleteCount, newItem)
        : dataCopy.splice(spliceStart, validDeleteCount);

      // 결과 생성
      let resultText = `splice(${spliceStart}, ${validDeleteCount}${
        newItem ? ", newItem" : ""
      }) - 배열에서 요소 삭제 및 추가\n\n`;

      // 제거된 항목 표시
      resultText += `제거된 항목 (${removedItems.length}개):\n`;
      resultText += JSON.stringify(removedItems, null, 2);

      // 새 항목 추가 여부 표시
      if (newItem) {
        resultText += `\n\n추가된 항목:\n`;
        resultText += JSON.stringify(newItem, null, 2);
      }

      // 변경된 배열 정보 표시
      resultText += `\n\n변경된 배열의 길이: ${dataCopy.length}\n`;
      resultText += `변경된 배열의 처음 3개 항목:\n`;
      resultText += JSON.stringify(dataCopy.slice(0, 3), null, 2);

      // 설명 추가
      resultText += `\n\n참고: splice()는 원본 배열을 직접 변경하지만, 이 예제에서는 원본 데이터를 보존하기 위해 복사본에 적용하였습니다.`;

      // 결과 설정
      setResult(resultText);
      setError(null);
      setCurrentMethod('splice');
    } catch (error) {
      console.error('Error:', error);
      setError(`splice() 메서드 실행 중 오류 발생: ${error.message}`);
    }
  };

  // 구문 정보 표시 토글
  const toggleSyntax = () => {
    setShowSyntax(!showSyntax);
  };

  return (
    <div className="method-card">
      <h3>slice() / splice() 시뮤레이션</h3>
      <p>배열의 일부 추출 및 조작하기</p>
      
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
      
      <div className="method-controls">
        <label htmlFor="sliceStart">(slice용)시작 인덱스:</label>
        <input 
          type="number" 
          id="sliceStart" 
          min="0" 
          max="99" 
          value={sliceStart}
          onChange={(e) => setSliceStart(parseInt(e.target.value))}
        />
        <label htmlFor="sliceEnd" id="sliceEndLabel">끝 인덱스:</label>
        <input 
          type="number" 
          id="sliceEnd" 
          min="1" 
          max="100" 
          value={sliceEnd}
          onChange={(e) => setSliceEnd(parseInt(e.target.value))}
        />
        <button id="runSlice" onClick={runSlice} type="button">slice() 실행</button>
      </div>
      
      <div className="method-controls">
        <label htmlFor="spliceStart">(splice용)시작 인덱스:</label>
        <input 
          type="number" 
          id="spliceStart" 
          min="0" 
          max="99" 
          value={spliceStart}
          onChange={(e) => setSpliceStart(parseInt(e.target.value))}
        />
        <label htmlFor="spliceDeleteCount">삭제할 요소 개수:</label>
        <input 
          type="number" 
          id="spliceDeleteCount" 
          min="0" 
          max="100" 
          value={spliceDeleteCount}
          onChange={(e) => setSpliceDeleteCount(parseInt(e.target.value))}
        />
        <label htmlFor="spliceAdd">추가할 항목 (선택사항):</label>
        <input 
          type="text" 
          id="spliceAdd" 
          placeholder="새 제목 입력" 
          value={spliceAdd}
          onChange={(e) => setSpliceAdd(e.target.value)}
        />
        <button id="runSplice" onClick={runSplice} type="button">splice() 실행</button>
      </div>
      
      <pre className="result" id="sliceResult">
        {result}
      </pre>
    </div>
  );
}

export default SliceSpliceMethod;