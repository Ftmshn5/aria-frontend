import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import Login from './pages/Login';
import Landing from './pages/Landing';
import Signup from './pages/Signup';
import AuthCallback from './pages/AuthCallback';
import MainLayout from './layouts/MainLayout';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Analysis from './pages/Analysis';
import Library from './pages/Library';
import Saved from './pages/Saved';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/auth/callback" element={<AuthCallback />} />

            {/* Protected Routes encapsulated in MainLayout */}
            <Route element={<MainLayout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/analysis" element={<Analysis />} />
              <Route path="/library" element={<Library />} />
              <Route path="/saved" element={<Saved />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
