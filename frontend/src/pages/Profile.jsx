import { Play, Heart, Clock, Activity } from 'lucide-react';

export default function Profile() {
  // Dummy Kullanıcı Verisi
  const user = {
    name: 'Kullanıcı',
    email: 'user@havsan.cloud',
    membership: 'Premium',
    totalAnalyzed: 42,
    favoriteMood: 'Melankolik & Odaklanmış'
  };

  // Dummy Şarkı Listesi
  const favoriteSongs = [
    { id: 1, title: 'Gülümse', artist: 'Sezen Aksu', duration: '5:02', mood: 'Hüzünlü' },
    { id: 2, title: 'Kum Gibi', artist: 'Ahmet Kaya', duration: '4:26', mood: 'Melankolik' },
    { id: 3, title: 'Starboy', artist: 'The Weeknd', duration: '3:50', mood: 'Enerjik' },
    { id: 4, title: 'Blinding Lights', artist: 'The Weeknd', duration: '3:20', mood: 'Hareketli' },
  ];

  // Dummy Mood Geçmişi
  const moodHistory = [
    { date: 'Bugün, 14:30', input: '"Yağmurlu bir gün, biraz kahve ve çalışmak..."', detected: 'Odaklanmış', color: '#4A6FA5' },
    { date: 'Dün, 20:15', input: '"Yorucu bir haftaydı, sadece uzanıp dinlenmek istiyorum."', detected: 'Yorgun / Dingin', color: '#8b8bc3' },
    { date: '12 Mart, 09:00', input: '"Spor salonuna gidiyordum, harika hissediyorum!"', detected: 'Enerjik', color: '#d2b48c' },
  ];

  return (
    <div style={{ color: 'var(--color-silver-mist)', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Üst Profil Kartı */}
      <div className="glass-panel" style={{ 
        padding: '30px', 
        display: 'flex', 
        gap: '30px', 
        alignItems: 'center',
        marginBottom: '40px' 
      }}>
        <div style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--color-abyss-blue), #1a2240)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '3rem',
          fontWeight: 'bold',
          boxShadow: '0 0 30px rgba(43, 57, 109, 0.4)'
        }}>
          KU
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '2px', color: 'rgba(228,228,228,0.6)' }}>
            {user.membership} Profil
          </p>
          <h1 style={{ fontSize: '3rem', margin: '5px 0 15px 0' }}>{user.name}</h1>
          <p style={{ color: 'rgba(228,228,228,0.7)' }}>{user.email} • En sık tespit edilen ruh hali: {user.favoriteMood}</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        {/* Favori Şarkılar */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Heart size={24} color="var(--color-abyss-blue)" /> Favori Şarkılar
            </h2>
          </div>
          <div className="glass-panel" style={{ padding: '0' }}>
            {favoriteSongs.map((song, idx) => (
              <div key={song.id} style={{
                display: 'flex',
                alignItems: 'center',
                padding: '16px 20px',
                borderBottom: idx !== favoriteSongs.length - 1 ? '1px solid rgba(228, 228, 228, 0.05)' : 'none',
                transition: 'background 0.2s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(228, 228, 228, 0.03)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ width: '30px', color: 'rgba(228,228,228,0.5)' }}>{idx + 1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: '600', marginBottom: '4px' }}>{song.title}</div>
                  <div style={{ fontSize: '0.85rem', color: 'rgba(228,228,228,0.6)' }}>{song.artist} • {song.mood}</div>
                </div>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center', color: 'rgba(228,228,228,0.5)' }}>
                  <Heart size={18} fill="currentColor" />
                  <span style={{ fontSize: '0.9rem' }}>{song.duration}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ruh Hali Geçmişi (Mood History) */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Activity size={24} color="var(--color-abyss-blue)" /> Mood Geçmişi
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {moodHistory.map((history, idx) => (
              <div key={idx} className="glass-panel" style={{ padding: '20px', borderLeft: `4px solid ${history.color}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ 
                    background: 'rgba(228,228,228,0.1)', 
                    padding: '4px 10px', 
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    color: history.color,
                    fontWeight: 'bold'
                  }}>
                    {history.detected}
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'rgba(228,228,228,0.4)', display: 'flex', gap: '5px', alignItems: 'center' }}>
                    <Clock size={14} /> {history.date}
                  </span>
                </div>
                <p style={{ fontStyle: 'italic', color: 'rgba(228,228,228,0.8)', fontSize: '0.95rem' }}>
                  {history.input}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
