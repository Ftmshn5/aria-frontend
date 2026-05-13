import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function MainLayout() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-void-eclipse)' }}>
      {/* Sol Menü */}
      <Sidebar />
      
      {/* Ana İçerik Alanı (Sidebar sonrası 240px boşluk bırakılarak sağ tarafa yerleşir) */}
      <main style={{ 
        flex: 1, 
        marginLeft: '240px', 
        padding: '40px',
        overflowY: 'auto',
        height: '100vh',
        background: 'radial-gradient(ellipse at top right, #1a2240 0%, #0b0b0b 60%)'
      }}>
        <Outlet />
      </main>
    </div>
  );
}
