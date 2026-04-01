import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Library, User, LogOut, Music } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();

  const navItems = [
    { name: 'Ana Sayfa', path: '/home', icon: Home },
    { name: 'Analiz (Ara)', path: '/analysis', icon: Search },
    { name: 'Kütüphanem', path: '/library', icon: Library },
  ];

  const bottomItems = [
    { name: 'Profil', path: '/profile', icon: User },
    { name: 'Çıkış Yap', path: '/', icon: LogOut },
  ];

  const getLinkStyle = (path) => {
    const isActive = location.pathname.startsWith(path);
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      padding: '12px 20px',
      color: isActive ? 'var(--color-silver-mist)' : 'rgba(228,228,228,0.5)',
      textDecoration: 'none',
      fontWeight: isActive ? '600' : '400',
      transition: 'all 0.2s ease',
      borderLeft: isActive ? '3px solid var(--color-abyss-blue)' : '3px solid transparent',
      background: isActive ? 'rgba(43, 57, 109, 0.1)' : 'transparent',
    };
  };

  return (
    <div style={{
      width: '240px',
      height: '100vh',
      background: 'rgba(11, 11, 11, 0.7)',
      backdropFilter: 'blur(10px)',
      borderRight: '1px solid rgba(228, 228, 228, 0.05)',
      display: 'flex',
      flexDirection: 'column',
      position: 'fixed',
      left: 0,
      top: 0,
      zIndex: 100
    }}>
      {/* Logo Area */}
      <div style={{
        padding: '30px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        marginBottom: '20px'
      }}>
        <div style={{ background: 'var(--color-abyss-blue)', padding: '8px', borderRadius: '50%' }}>
          <Music size={24} color="var(--color-silver-mist)" />
        </div>
        <span className="text-gradient" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>ARIA</span>
      </div>

      {/* Main Navigation */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link 
              key={item.path} 
              to={item.path} 
              style={getLinkStyle(item.path)}
              onMouseEnter={(e) => {
                if (!location.pathname.startsWith(item.path)) {
                  e.currentTarget.style.color = 'var(--color-silver-mist)';
                }
              }}
              onMouseLeave={(e) => {
                if (!location.pathname.startsWith(item.path)) {
                  e.currentTarget.style.color = 'rgba(228,228,228,0.5)';
                }
              }}
            >
              <Icon size={22} />
              {item.name}
            </Link>
          );
        })}
      </div>

      {/* Bottom Navigation */}
      <div style={{ display: 'flex', flexDirection: 'column', paddingBottom: '30px' }}>
        {bottomItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link 
              key={item.path} 
              to={item.path} 
              style={{...getLinkStyle(item.path), borderLeft: '3px solid transparent'}}
            >
              <Icon size={22} />
              {item.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
