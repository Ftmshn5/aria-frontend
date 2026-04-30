import { useState } from 'react';
import { Mail, Lock, User, Music } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // TODO: connect to backend signup API
    console.log('Signup', { name, email });
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
        maxWidth: '420px',
        width: '100%',
        padding: '36px',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
        textAlign: 'center'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '6px' }}>
          <div style={{
            background: 'var(--color-abyss-blue)',
            padding: '14px',
            borderRadius: '50%'
          }}>
            <Music size={28} color="var(--color-silver-mist)" />
          </div>
        </div>

        <div>
          <h1 className="text-gradient" style={{ marginBottom: '6px', fontSize: '1.8rem' }}>Kayıt Ol</h1>
          <p style={{ color: 'rgba(228,228,228,0.7)', fontSize: '0.9rem' }}>
            Hesap oluşturarak ARIA deneyimine başla
          </p>
        </div>

        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <User size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'rgba(228,228,228,0.5)' }} />
            <input
              type="text"
              placeholder="Adınız"
              className="input-glass"
              style={{ paddingLeft: '44px' }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Mail size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'rgba(228,228,228,0.5)' }} />
            <input
              type="email"
              placeholder="E-posta Adresiniz"
              className="input-glass"
              style={{ paddingLeft: '44px' }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={{ position: 'relative' }}>
            <Lock size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: 'rgba(228,228,228,0.5)' }} />
            <input
              type="password"
              placeholder="Şifreniz"
              className="input-glass"
              style={{ paddingLeft: '44px' }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '8px' }}>
            Kayıt Ol
          </button>
        </form>

        <div style={{ marginTop: '10px', fontSize: '0.85rem', color: 'rgba(228,228,228,0.5)' }}>
          Zaten hesabınız var mı? <button onClick={() => navigate('/')} style={{ background: 'transparent', border: 'none', color: '#8a9ee0', cursor: 'pointer', padding: 0 }}>Giriş Yap</button>
        </div>
      </div>
    </div>
  );
}
