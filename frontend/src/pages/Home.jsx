import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Music, Heart, Sparkles, Clock, TrendingUp } from 'lucide-react';

export default function Home() {
  const [mood, setMood] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);

  const handleAnalyzeClick = async () => {
    if (!mood.trim()) return;
    setIsLoading(true);
    
    // Simüle edilmiş API çağrısı
    setTimeout(() => {
      setRecommendations([
        { id: 1, title: 'Fade Away', artist: 'Alan Walker', mood: 'Düşünceli', plays: 2400 },
        { id: 2, title: 'Golden', artist: 'Harry Styles', mood: 'Huzurlu', plays: 1800 },
        { id: 3, title: 'Someone Like You', artist: 'Adele', mood: 'Melankolik', plays: 3200 },
        { id: 4, title: 'Don\'t Start Now', artist: 'Dua Lipa', mood: 'Enerjik', plays: 2800 },
      ]);
      setIsLoading(false);
    }, 1500);
  };

  const recentMoods = [
    { mood: 'Üzgün', count: 12, color: '#FF6B9D' },
    { mood: 'Enerjik', count: 8, color: '#4ECDC4' },
    { mood: 'Odaklanmış', count: 15, color: '#6C63FF' },
    { mood: 'Huzurlu', count: 10, color: '#1DB954' },
  ];

  const savedPlaylists = [
    { name: 'Gece Üzüntüsü', songs: 24, mood: 'Melankolik' },
    { name: 'Workout Enerjisi', songs: 18, mood: 'Enerjik' },
    { name: 'Çalışma Modunda', songs: 32, mood: 'Odaklanmış' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{ maxWidth: '1000px' }}
    >
      {/* Başlık */}
      <motion.div variants={itemVariants} style={{ marginBottom: '40px' }}>
        <h1 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
          Hoşgeldin! 🎵
        </h1>
        <p style={{ color: 'rgba(228,228,228,0.6)', fontSize: '1.1rem' }}>
          Bugün ne hissediyorsun? Bize söyle, sana müzik önerelim...
        </p>
      </motion.div>

      {/* Duygu Analiz Alanı */}
      <motion.div
        variants={itemVariants}
        className="glass-panel"
        style={{
          padding: '30px',
          marginBottom: '40px',
          background: 'rgba(43, 57, 109, 0.15)',
        }}
      >
        <div style={{ display: 'flex', gap: '12px', alignItems: 'stretch' }}>
          <input
            type="text"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAnalyzeClick()}
            placeholder="Örn: Bugün çok üzgünüm, neşeli şarkılar dinlemek istiyorum..."
            className="input-glass"
            style={{ flex: 1, minHeight: '50px' }}
          />
          <button
            onClick={handleAnalyzeClick}
            disabled={!mood.trim() || isLoading}
            className="btn-primary"
            style={{
              minWidth: '120px',
              opacity: !mood.trim() || isLoading ? 0.6 : 1,
              cursor: !mood.trim() || isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTop: '2px solid white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite'
                  }}
                />
                Analiz
              </div>
            ) : (
              <>
                <Send size={18} />
                Analiz Et
              </>
            )}
          </button>
        </div>
      </motion.div>

      {/* Önerilen Şarkılar */}
      {recommendations.length > 0 && (
        <motion.div
          variants={itemVariants}
          style={{ marginBottom: '40px' }}
        >
          <h2 style={{ marginBottom: '20px', fontSize: '1.5rem' }}>
            <Sparkles size={24} style={{ display: 'inline', marginRight: '10px', color: '#FF6B9D' }} />
            Sana Özel Öneriler
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '15px'
          }}>
            {recommendations.map((song, idx) => (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="glass-panel"
                style={{
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.borderColor = 'var(--color-abyss-blue)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(228, 228, 228, 0.08)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Music size={20} color="#FF6B9D" />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {song.title}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'rgba(228,228,228,0.6)' }}>
                      {song.artist}
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--color-abyss-blue)' }}>
                  <Heart size={14} />
                  {song.mood}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        {/* Son Duygu Durumları */}
        <motion.div variants={itemVariants}>
          <h2 style={{ marginBottom: '20px', fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <TrendingUp size={22} />
            Duygu İstatistikleri
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {recentMoods.map((item) => (
              <div
                key={item.mood}
                className="glass-panel"
                style={{
                  padding: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: item.color
                    }}
                  />
                  <span>{item.mood}</span>
                </div>
                <span style={{ color: 'rgba(228,228,228,0.6)', fontWeight: '600' }}>
                  {item.count} kez
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Kaydedilmiş Playlist'ler */}
        <motion.div variants={itemVariants}>
          <h2 style={{ marginBottom: '20px', fontSize: '1.3rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Clock size={22} />
            Son Playlist'lerim
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {savedPlaylists.map((playlist) => (
              <motion.div
                key={playlist.name}
                className="glass-panel"
                style={{
                  padding: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer'
                }}
                whileHover={{
                  background: 'rgba(43, 57, 109, 0.2)',
                }}
              >
                <div>
                  <h3 style={{ marginBottom: '4px', fontSize: '0.95rem' }}>
                    {playlist.name}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(228,228,228,0.5)' }}>
                    {playlist.songs} şarkı • {playlist.mood}
                  </p>
                </div>
                <Music size={18} color="var(--color-abyss-blue)" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </motion.div>
  );
}
