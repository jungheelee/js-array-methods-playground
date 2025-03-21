import React from 'react';
import '../../styles/SyntaxGuide.css';

/**
 * 배열 메서드의 신텍스 정보를 표시하는 컴포넌트
 * 
 * @param {Object} props - 컴포넌트 속성
 * @param {string} props.methodName - 배열 메서드 이름
 * @param {string} props.syntax - 메서드 신텍스
 * @param {Array} props.parameters - 파라미터 정보 배열 [{name, description}]
 * @param {string} props.returnValue - 반환값 설명
 * @param {string} props.description - 메서드 설명
 * @param {string} props.example - 예제 코드
 * @param {string} props.mdnLink - MDN 문서 링크
 */
const SyntaxGuide = ({ 
  methodName, 
  syntax, 
  parameters = [], 
  returnValue, 
  description,
  example,
  mdnLink
}) => {
  return (
    <div className="syntax-guide" role="region" aria-label="메서드 구문 정보">
      <h4>메서드 구문</h4>
      <pre className="syntax-code" tabIndex="0">{syntax}</pre>
      
      {parameters && parameters.length > 0 && (
        <>
          <h4>파라미터</h4>
          <ul className="parameter-list">
            {parameters.map((param, index) => (
              <li key={index}>
                <code>{param.name}</code>: {param.description}
                {param.optional && <span className="optional"> (선택사항)</span>}
              </li>
            ))}
          </ul>
        </>
      )}
      
      {returnValue && (
        <>
          <h4>반환 값</h4>
          <p>{returnValue}</p>
        </>
      )}
      
      {description && (
        <>
          <h4>설명</h4>
          <p>{description}</p>
        </>
      )}
      
      {example && (
        <>
          <h4>예제</h4>
          <pre className="example-code" tabIndex="0">{example}</pre>
        </>
      )}
      
      {mdnLink && (
        <div className="mdn-link">
          <a 
            href={mdnLink} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label={`MDN 웹 문서에서 ${methodName} 메서드 자세히 보기 (새 창에서 열림)`}
          >
            MDN 웹 문서에서 {methodName} 자세히 보기
          </a>
        </div>
      )}
    </div>
  );
};

export default SyntaxGuide;
