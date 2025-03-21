import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import Header from './components/Header';
import DataContainer from './components/DataContainer';
import MethodsContainer from './components/MethodsContainer';
import Footer from './components/Footer';

function App() {
  // 전역 상태 관리 - 데이터 저장
  const [postsData, setPostsData] = React.useState([]);
  
  return (
    <div className="App" role="application">
      <Header />
      <main role="main" aria-label="배열 메서드 실습 콘텐츠">
        <DataContainer postsData={postsData} setPostsData={setPostsData} />
        <MethodsContainer postsData={postsData} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
