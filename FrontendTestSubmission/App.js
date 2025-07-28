import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import URLShortener from './components/URLShortener';
import StatsPage from './components/StatsPage';
import { registerClick } from './services/api';

const Redirector = () => {
  const { shortCode } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    const url = registerClick(shortCode);
    if (url) window.location.href = url;
    else navigate('/');
  }, [shortCode, navigate]);

  return <div>Redirecting...</div>;
};

function App() {
  const [shortened, setShortened] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<URLShortener onNewShortened={(url) => setShortened([...shortened, url])} />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/:shortCode" element={<Redirector />} />
      </Routes>
    </Router>
  );
}

export default App;
