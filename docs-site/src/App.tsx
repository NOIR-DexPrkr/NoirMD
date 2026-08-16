import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Background from './components/Background';
import Home from './pages/Home';
import DocPage from './pages/DocPage';

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col relative transition-colors duration-500 ease-in-out">
      <Background />

      <main className="w-full flex-1 flex flex-col mx-auto relative z-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/docs/:slug" element={<DocPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;