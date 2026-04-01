import { useState } from 'react';
import { Mail, Lock, Music } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('demo@aria.com');
  const [password, setPassword] = useState('123456');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Dummy login test for MVP
    console.log("Logged in with", email);
    navigate('/profile');
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      padding: '20px',
      background: 'radial-gradient(ellipse at top, #2B396D 0%, #0B0B0B 70%)'
    }}>
      <div className="glass-panel" style={{
        maxWidth: '400px',
        width: '100%',
        padding: '40px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        textAlign: 'center'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
          <div style={{
            background: 'var(--color-abyss-blue)',
            padding: '16px',
            borderRadius: '50%',
            boxShadow: '0 0 20px var(--color-abyss-glow)'
          }}>
            <Music size={32} color="var(--color-silver-mist)" />
          </div>
        </div>
        
        <div>
          <h1 className="text-gradient" style={{ marginBottom: '8px', fontSize: '2rem' }}>ARIA</h1>
          <p style={{ color: 'rgba(228,228,228,0.7)', fontSize: '0.9rem' }}>
            Duygu odaklı müzik kürasyonuna hoş geldiniz
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ position: 'relative' }}>
            <Mail size={20} style={{ position: 'absolute', left: '16px', top: '14px', color: 'rgba(228,228,228,0.5)' }} />
            <input 
              type="email" 
              placeholder="E-posta Adresiniz" 
              className="input-glass" 
              style={{ paddingLeft: '48px' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div style={{ position: 'relative' }}>
            <Lock size={20} style={{ position: 'absolute', left: '16px', top: '14px', color: 'rgba(228,228,228,0.5)' }} />
            <input 
              type="password" 
              placeholder="Şifreniz" 
              className="input-glass" 
              style={{ paddingLeft: '48px' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '8px' }}>
            Giriş Yap
          </button>
        </form>

        <div style={{ marginTop: '16px', fontSize: '0.85rem', color: 'rgba(228,228,228,0.5)' }}>
          Hesabınız yok mu? <a href="#" style={{ color: '#8a9ee0', textDecoration: 'none' }}>Kayıt Ol</a>
        </div>
      </div>
    </div>
  );
}
