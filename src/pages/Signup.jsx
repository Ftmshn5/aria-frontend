import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { IMusic } from '../components/Icons';
import { useAuth } from '../contexts/AuthContext';

const BACKEND_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api/v1';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup, user } = useAuth();

  if (user) return <Navigate to="/home" replace />;

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signup(email, password);
      navigate('/home');
    } catch (err) {
      setError(err.message || 'Kayıt başarısız');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    window.location.href = `${BACKEND_URL}/auth/google`;
  };

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', padding: '20px', background: 'var(--bg)',
    }}>
      <div className="sf" style={{
        maxWidth: '420px', width: '100%', padding: '36px',
        display: 'flex', flexDirection: 'column', gap: '18px', textAlign: 'center',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '6px' }}>
          <div style={{
            width: 52, height: 52, background: 'var(--ac)', borderRadius: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <IMusic size={24} color="#fff" />
          </div>
        </div>

        <div>
          <h1 style={{ marginBottom: '6px', fontSize: '1.8rem', fontFamily: "'Montserrat',sans-serif", fontWeight: 900 }}>Kayıt Ol</h1>
          <p style={{ color: 'var(--t2)', fontSize: '0.9rem' }}>
            Hesap oluşturarak ARIA deneyimine başla
          </p>
        </div>

        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <input type="email" placeholder="E-posta Adresiniz" className="inp"
            value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Şifreniz" className="inp"
            value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error && (
            <p style={{ color: 'var(--red)', fontSize: '0.82rem', margin: 0, textAlign: 'left' }}>{error}</p>
          )}
          <button type="submit" className="btn-ac" disabled={loading}
            style={{ marginTop: '8px', width: '100%', justifyContent: 'center', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
          </button>
        </form>

        {/* Separator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ flex: 1, height: 1, background: 'var(--bd)' }} />
          <span style={{ color: 'var(--t3)', fontSize: '0.8rem' }}>veya</span>
          <div style={{ flex: 1, height: 1, background: 'var(--bd)' }} />
        </div>

        {/* Google Signup */}
        <button onClick={handleGoogle} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          width: '100%', padding: '10px 16px', borderRadius: 8,
          background: 'transparent', border: '1px solid var(--bd)',
          color: 'var(--t1)', fontSize: '0.88rem', fontWeight: 500,
          cursor: 'pointer', transition: 'border-color var(--tr), background var(--tr)',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--bdh)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--bd)'; e.currentTarget.style.background = 'transparent'; }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Google ile Kayıt Ol
        </button>

        <div style={{ marginTop: '4px', fontSize: '0.85rem', color: 'var(--t3)' }}>
          Zaten hesabınız var mı?{' '}
          <button onClick={() => navigate('/login')} style={{ background: 'transparent', border: 'none', color: 'var(--ac)', cursor: 'pointer', padding: 0, fontSize: '0.85rem' }}>
            Giriş Yap
          </button>
        </div>
      </div>
    </div>
  );
}
