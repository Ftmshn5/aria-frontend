import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IMusic, IHome, IBrain, IUser, ILogOut, IBookmark } from './Icons';
import { useAuth } from '../contexts/AuthContext';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = useAuth();

  const nav = [
    { path: '/home',     label: 'Ana Sayfa', Icon: IHome },
    { path: '/analysis', label: 'Analiz',    Icon: IBrain },
    { path: '/library',  label: 'Playlist',  Icon: IMusic },
    { path: '/saved',    label: 'Kayıtlı',  Icon: IBookmark },
    { path: '/profile',  label: 'Profil',    Icon: IUser },
  ];

  return (
    <aside style={{
      width: 220, minHeight: '100vh', position: 'fixed', left: 0, top: 0, zIndex: 100,
      background: '#0A0A10', borderRight: '1px solid var(--bd)',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Logo */}
      <div style={{ padding: '28px 22px 24px', borderBottom: '1px solid var(--bd)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 30, height: 30, background: 'var(--ac)', borderRadius: 7,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <IMusic size={15} color="#fff" />
          </div>
          <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: '1.1rem', letterSpacing: '-0.05em', color: 'var(--t1)' }}>ARIA</span>
        </div>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '16px 0' }}>
        {nav.map(({ path, label, Icon }) => {
          const on = location.pathname === path;
          return (
            <Link key={path} to={path} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 11,
              padding: '10px 22px',
              background: on ? 'rgba(110,106,255,0.1)' : 'transparent',
              color: on ? 'var(--ac)' : 'var(--t2)',
              fontWeight: on ? 600 : 400, fontSize: '0.88rem',
              borderLeft: on ? '2px solid var(--ac)' : '2px solid transparent',
              transition: 'all var(--tr)', textAlign: 'left', textDecoration: 'none',
            }}
            onMouseEnter={e => { if (!on) { e.currentTarget.style.color = 'var(--t1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; } }}
            onMouseLeave={e => { if (!on) { e.currentTarget.style.color = 'var(--t2)'; e.currentTarget.style.background = 'transparent'; } }}>
              <Icon size={16} color={on ? 'var(--ac)' : 'currentColor'} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding: '16px 0 28px', borderTop: '1px solid var(--bd)' }}>
        <button onClick={() => auth.logout().then(() => navigate('/login'))} style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: 11,
          padding: '10px 22px', color: 'var(--t3)', fontSize: '0.88rem',
          transition: 'color var(--tr)',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--red)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--t3)'}>
          <ILogOut size={16} /> Çıkış Yap
        </button>
      </div>
    </aside>
  );
}
