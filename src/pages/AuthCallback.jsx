import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../api/client';
import { Spinner } from '../components/Icons';

export default function AuthCallback() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { setTokensFromOAuth, setUser } = useAuth();

  useEffect(() => {
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');

    if (accessToken && refreshToken) {
      setTokensFromOAuth(accessToken, refreshToken);
      api.get('/auth/me')
        .then(res => {
          setUser(res.data);
          navigate('/home', { replace: true });
        })
        .catch(() => navigate('/login', { replace: true }));
    } else {
      navigate('/login', { replace: true });
    }
  }, []);

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', background: 'var(--bg)', flexDirection: 'column', gap: 16,
    }}>
      <Spinner size={36} />
      <p style={{ color: 'var(--t2)', fontSize: '0.9rem' }}>Giriş yapılıyor...</p>
    </div>
  );
}
