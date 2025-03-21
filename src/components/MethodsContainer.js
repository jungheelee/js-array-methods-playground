import React from 'react';
import '../styles/MethodCard.css';
import FilterMethod from './methods/FilterMethod';
import MapMethod from './methods/MapMethod';
import SortMethod from './methods/SortMethod';
import FindMethod from './methods/FindMethod';
import ReduceMethod from './methods/ReduceMethod';
import CheckMethod from './methods/CheckMethod';
import ForEachMethod from './methods/ForEachMethod';
import SliceSpliceMethod from './methods/SliceSpliceMethod';

function MethodsContainer({ postsData }) {
  // 데이터 유효성 검사 함수
  const validateData = () => {
    return postsData && Array.isArray(postsData) && postsData.length > 0;
  };

  return (
    <section className="methods-container">
      <h2>배열 메서드 실습</h2>
      
      <FilterMethod postsData={postsData} validateData={validateData} />
      <MapMethod postsData={postsData} validateData={validateData} />
      <SortMethod postsData={postsData} validateData={validateData} />
      <FindMethod postsData={postsData} validateData={validateData} />
      <ReduceMethod postsData={postsData} validateData={validateData} />
      <CheckMethod postsData={postsData} validateData={validateData} />
      <ForEachMethod postsData={postsData} validateData={validateData} />
      <SliceSpliceMethod postsData={postsData} validateData={validateData} />
    </section>
  );
}

export default MethodsContainer;
