import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './components/Home';
import { Quiz } from './components/Quiz';
import { PhotoUpload } from './components/PhotoUpload';
import { Results } from './components/Results';
import { ProgressTracker } from './components/ProgressTracker';
import { SkinPassport } from './components/SkinPassport';
import { ShareProfile } from './components/ShareProfile';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/photo" element={<PhotoUpload />} />
          <Route path="/results" element={<Results />} />
          <Route path="/tracker" element={<ProgressTracker />} />
          <Route path="/passport" element={<SkinPassport />} />
          <Route path="/share" element={<ShareProfile />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;