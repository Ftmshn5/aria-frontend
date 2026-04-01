import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import MainLayout from './layouts/MainLayout';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Analysis from './pages/Analysis';
import Library from './pages/Library';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Public Route */}
          <Route path="/" element={<Login />} />
          
          {/* Protected Routes encapsulated in MainLayout */}
          <Route element={<MainLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/analysis" element={<Analysis />} />
            <Route path="/library" element={<Library />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
