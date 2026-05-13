import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Music, Heart, Trash2, Play, Share2, 
  MoreVertical, Filter, Download, X, ChevronDown
} from 'lucide-react';

export default function Library() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMood, setSelectedMood] = useState('Tümü');
  const [selectedSong, setSelectedSong] = useState(null);
  const [sortBy, setSortBy] = useState('recent');

  // Simüle edilmiş kaydedilmiş şarkılar
  const savedSongs = [
    {
      id: 1,
      title: 'Fade Away',
      artist: 'Alan Walker',
      mood: 'Düşünceli',
      date: '3 saat önce',
      plays: 24,
      duration: '3:45'
    },
    {
      id: 2,
      title: 'Golden',
      artist: 'Harry Styles',
      mood: 'Huzurlu',
      date: '1 gün önce',
      plays: 18,
      duration: '3:12'
    },
    {
      id: 3,
      title: 'Someone Like You',
      artist: 'Adele',
      mood: 'Melankolik',
      date: '2 gün önce',
      plays: 32,
      duration: '4:05'
    },
    {
      id: 4,
      title: 'Don\'t Start Now',
      artist: 'Dua Lipa',
      mood: 'Enerjik',
      date: '5 gün önce',
      plays: 28,
      duration: '3:23'
    },
    {
      id: 5,
      title: 'Blinding Lights',
      artist: 'The Weeknd',
      mood: 'Enerjik',
      date: '1 hafta önce',
      plays: 15,
      duration: '3:20'
    },
    {
      id: 6,
      title: 'Perfect',
      artist: 'Ed Sheeran',
      mood: 'Romantik',
      date: '1 hafta önce',
      plays: 12,
      duration: '4:23'
    },
    {
      id: 7,
      title: 'Shape of You',
      artist: 'Ed Sheeran',
      mood: 'Huzurlu',
      date: '2 hafta önce',
      plays: 8,
      duration: '3:53'
    },
    {
      id: 8,
      title: 'Bad Guy',
      artist: 'Billie Eilish',
      mood: 'Melankolik',
      date: '2 hafta önce',
      plays: 20,
      duration: '3:14'
    },
  ];

  const moods = ['Tümü', 'Enerjik', 'Huzurlu', 'Melankolik', 'Düşünceli', 'Romantik'];

  // Filtreleme
  const filteredSongs = savedSongs
    .filter(song => {
      const matchesMood = selectedMood === 'Tümü' || song.mood === selectedMood;
      const matchesSearch = searchTerm === '' || 
        song.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesMood && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'plays') return b.plays - a.plays;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0; // recent olarak bırak
    });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  };

  const getMoodColor = (mood) => {
    const colors = {
      'Enerjik': '#4ECDC4',
      'Huzurlu': '#1DB954',
      'Melankolik': '#FF6B9D',
      'Düşünceli': '#6C63FF',
      'Romantik': '#FF1744'
    };
    return colors[mood] || '#E4E4E4';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ maxWidth: '1200px' }}
    >
      {/* Başlık */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: '30px' }}
      >
        <h1 className="text-gradient" style={{ fontSize: '2rem', marginBottom: '10px' }}>
          <Heart size={28} style={{ display: 'inline', marginRight: '10px', color: '#FF6B9D' }} />
          Müzik Kütüphanem
        </h1>
        <p style={{ color: 'rgba(228,228,228,0.6)' }}>
          {filteredSongs.length} şarkı kaydedilmiş
        </p>
      </motion.div>

      {/* Kontrol Paneli */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-panel"
        style={{
          padding: '20px',
          marginBottom: '30px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr auto',
          gap: '15px',
          alignItems: 'end'
        }}
      >
        {/* Arama */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Search size={18} color="rgba(228,228,228,0.6)" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Şarkı veya sanatçı ara..."
            className="input-glass"
            style={{ margin: 0 }}
          />
        </div>

        {/* Mood Filtreleme */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {moods.map((mood) => (
            <button
              key={mood}
              onClick={() => setSelectedMood(mood)}
              style={{
                padding: '8px 16px',
                border: 'none',
                borderRadius: '20px',
                background: selectedMood === mood
                  ? 'var(--color-abyss-blue)'
                  : 'rgba(228, 228, 228, 0.05)',
                color: selectedMood === mood
                  ? 'var(--color-silver-mist)'
                  : 'rgba(228,228,228,0.6)',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: selectedMood === mood ? '600' : '400',
                transition: 'all 0.2s ease',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                if (selectedMood !== mood) {
                  e.currentTarget.style.background = 'rgba(228, 228, 228, 0.1)';
                  e.currentTarget.style.color = 'var(--color-silver-mist)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedMood !== mood) {
                  e.currentTarget.style.background = 'rgba(228, 228, 228, 0.05)';
                  e.currentTarget.style.color = 'rgba(228,228,228,0.6)';
                }
              }}
            >
              <Filter size={14} style={{ display: 'inline', marginRight: '4px' }} />
              {mood}
            </button>
          ))}
        </div>

        {/* Sıralama */}
        <div style={{ position: 'relative' }}>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-glass"
            style={{
              appearance: 'none',
              paddingRight: '32px',
              cursor: 'pointer'
            }}
          >
            <option value="recent">Son Eklenen</option>
            <option value="plays">En Çok Çalınan</option>
            <option value="title">Başlık (A-Z)</option>
          </select>
          <ChevronDown
            size={18}
            style={{
              position: 'absolute',
              right: '10px',
              top: '50%',
              transform: 'translateY(-50%)',
              pointerEvents: 'none',
              color: 'rgba(228,228,228,0.5)'
            }}
          />
        </div>
      </motion.div>

      {/* Şarkı Listesi */}
      <AnimatePresence mode="wait">
        {filteredSongs.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            {filteredSongs.map((song) => (
              <motion.div
                key={song.id}
                variants={itemVariants}
                exit="exit"
                className="glass-panel"
                style={{
                  padding: '16px',
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr auto',
                  gap: '16px',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
                onClick={() => setSelectedSong(song.id)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(43, 57, 109, 0.15)';
                  e.currentTarget.style.borderColor = 'var(--color-abyss-blue)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(228, 228, 228, 0.03)';
                  e.currentTarget.style.borderColor = 'rgba(228, 228, 228, 0.08)';
                }}
              >
                {/* Şarkı Bilgisi */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  width: '100%',
                  minWidth: 0
                }}>
                  <div
                    style={{
                      width: '40px',
                      height: '40px',
                      background: `linear-gradient(135deg, ${getMoodColor(song.mood)}, ${getMoodColor(song.mood)}99)`,
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}
                  >
                    <Music size={20} color="white" />
                  </div>

                  <div style={{ minWidth: 0, flex: 1 }}>
                    <h3 style={{
                      margin: 0,
                      marginBottom: '4px',
                      fontSize: '0.95rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {song.title}
                    </h3>
                    <div style={{
                      display: 'flex',
                      gap: '12px',
                      fontSize: '0.8rem',
                      color: 'rgba(228,228,228,0.5)'
                    }}>
                      <span>{song.artist}</span>
                      <span>•</span>
                      <span style={{
                        color: getMoodColor(song.mood),
                        fontWeight: '500'
                      }}>
                        {song.mood}
                      </span>
                      <span>•</span>
                      <span>{song.date}</span>
                    </div>
                  </div>
                </div>

                {/* İstatistikler ve Aksiyonlar */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  color: 'rgba(228,228,228,0.6)',
                  fontSize: '0.85rem'
                }}>
                  <span style={{ whiteSpace: 'nowrap' }}>
                    ▶ {song.plays}
                  </span>
                  <span style={{ color: 'rgba(228,228,228,0.3)' }}>|</span>
                  <span style={{ whiteSpace: 'nowrap' }}>
                    {song.duration}
                  </span>
                </div>

                {/* Aksiyonlar */}
                <div style={{
                  display: 'flex',
                  gap: '8px',
                  opacity: selectedSong === song.id ? 1 : 0.6,
                  transition: 'opacity 0.2s ease'
                }}>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      background: 'rgba(43, 57, 109, 0.3)',
                      border: 'none',
                      color: 'var(--color-silver-mist)',
                      padding: '8px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.85rem'
                    }}
                  >
                    <Play size={16} fill="white" />
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      background: 'rgba(43, 57, 109, 0.3)',
                      border: 'none',
                      color: '#FF6B9D',
                      padding: '8px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Heart size={16} fill="#FF6B9D" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      background: 'rgba(43, 57, 109, 0.3)',
                      border: 'none',
                      color: 'var(--color-silver-mist)',
                      padding: '8px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Share2 size={16} />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      background: 'rgba(255, 107, 157, 0.2)',
                      border: 'none',
                      color: '#FF6B9D',
                      padding: '8px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Trash2 size={16} />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="glass-panel"
            style={{
              padding: '60px 40px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '15px'
            }}
          >
            <Music size={48} color="rgba(228,228,228,0.3)" strokeWidth={1} />
            <h3 style={{ fontSize: '1.2rem', color: 'rgba(228,228,228,0.6)' }}>
              Henüz şarkı kaydedilmedi
            </h3>
            <p style={{ color: 'rgba(228,228,228,0.4)' }}>
              Duygu analizine başla ve beğendiğin şarkıları kütüphanene ekle
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* İstatistik Kartları */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          marginTop: '40px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: '15px'
        }}
      >
        <div className="glass-panel" style={{ padding: '20px', textAlign: 'center' }}>
          <p style={{ color: 'rgba(228,228,228,0.6)', fontSize: '0.9rem', marginBottom: '8px' }}>
            Toplam Şarkı
          </p>
          <h3 style={{ fontSize: '2rem', color: '#4ECDC4', margin: 0 }}>
            {savedSongs.length}
          </h3>
        </div>
        <div className="glass-panel" style={{ padding: '20px', textAlign: 'center' }}>
          <p style={{ color: 'rgba(228,228,228,0.6)', fontSize: '0.9rem', marginBottom: '8px' }}>
            Toplam Dinleme
          </p>
          <h3 style={{ fontSize: '2rem', color: '#FF6B9D', margin: 0 }}>
            {savedSongs.reduce((sum, s) => sum + s.plays, 0)}
          </h3>
        </div>
        <div className="glass-panel" style={{ padding: '20px', textAlign: 'center' }}>
          <p style={{ color: 'rgba(228,228,228,0.6)', fontSize: '0.9rem', marginBottom: '8px' }}>
            En Çok Mood
          </p>
          <h3 style={{ fontSize: '1.3rem', color: '#6C63FF', margin: 0 }}>
            Enerjik
          </h3>
        </div>
      </motion.div>
    </motion.div>
  );
}
