import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IBrain, IChevRight, IUser, IMusic, IBookmark } from '../components/Icons';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../api/client';

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const h = new Date().getHours();
  const greet = h < 12 ? 'Günaydın' : h < 18 ? 'İyi günler' : 'İyi akşamlar';

  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/stats').then(res => setStats(res.data)).catch(() => {});
  }, []);

  const analysisCount = stats?.analysis_count ?? '-';
  const savedCount = stats?.saved_count ?? '-';
  const playlistCount = stats?.playlist_count ?? '-';
  const uniqueMoods = stats?.unique_moods ?? '-';

  return (
    <div style={{ maxWidth: 1060, margin: '0 auto', animation: 'pageIn .38s ease both' }}>

      {/* Greeting */}
      <div style={{ marginBottom: 36, paddingBottom: 28, borderBottom: '1px solid var(--bd)' }}>
        <span className="lbl" style={{ display: 'block', marginBottom: 8 }}>{greet.toUpperCase()}</span>
        <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: 6 }}>{user?.name || user?.email?.split('@')[0] || 'Kullanıcı'}</h1>
        <p style={{ color: 'var(--t2)', fontSize: '0.9rem' }}>Bugün nasıl hissediyorsun? ARIA dinlemeye hazır.</p>
      </div>

      {/* Quick CTA */}
      <div className="sf" style={{
        marginBottom: 20, padding: '22px 26px',
        display: 'flex', alignItems: 'center', gap: 20,
        background: 'rgba(110,106,255,0.06)', borderColor: 'rgba(110,106,255,0.18)',
      }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 800, marginBottom: 5 }}>Günlük Analiz</h3>
          <p style={{ color: 'var(--t2)', fontSize: '0.86rem' }}>Ruh halini 2 dakikada keşfet. ARIA seni dinliyor.</p>
        </div>
        <button className="btn-ac" style={{ padding: '10px 22px', fontSize: '0.86rem', flexShrink: 0 }}
          onClick={() => navigate('/analysis')}>
          <IBrain size={15} /> Analiz Et
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12, marginBottom: 20 }}>
        {[
          { v: analysisCount, l: 'Analiz' },
          { v: savedCount, l: 'Kayıtlı Şarkı' },
          { v: playlistCount, l: 'Playlist' },
          { v: `${uniqueMoods}/8`, l: 'Mood' },
        ].map(s => (
          <div key={s.l} className="sf" style={{ padding: '18px' }}>
            <div className="mono" style={{ fontSize: '1.6rem', fontWeight: 600, color: 'var(--t1)', lineHeight: 1, marginBottom: 4 }}>{s.v}</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--t3)' }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* Shortcuts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
        {[
          { label: 'Analiz', desc: 'Ruh halini analiz et', path: '/analysis', Icon: IBrain },
          { label: 'Kayıtlı', desc: 'Kaydettiğin şarkılar', path: '/saved', Icon: IBookmark },
          { label: 'Profil', desc: 'İstatistikler ve geçmiş', path: '/profile', Icon: IUser },
        ].map(c => (
          <button key={c.path} onClick={() => navigate(c.path)} className="sf" style={{
            padding: '18px 20px', cursor: 'pointer', textAlign: 'left',
            display: 'flex', alignItems: 'center', gap: 14,
            border: '1px solid var(--bd)', transition: 'all var(--tr)', background: 'var(--sf)',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--bdh)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--bd)'; e.currentTarget.style.transform = 'none'; }}>
            <div style={{ width: 38, height: 38, borderRadius: 8, background: 'var(--ac-d)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <c.Icon size={17} color="var(--ac)" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', marginBottom: 3 }}>{c.label}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--t2)' }}>{c.desc}</div>
            </div>
            <IChevRight size={14} color="var(--t3)" />
          </button>
        ))}
      </div>
    </div>
  );
}
