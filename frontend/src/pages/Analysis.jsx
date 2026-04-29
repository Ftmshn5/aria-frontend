import { useState } from 'react';
import { 
  Send, Brain, Music, Heart, Zap, CloudRain, 
  Sun, Moon, Coffee, Flame, Smile, Frown,
  Play, Plus, Clock, Sparkles, BarChart3, RefreshCw
} from 'lucide-react';

// Dummy mood verileri — backend bağlanınca API'den gelecek
const MOOD_MAP = {
  enerjik: { label: 'Enerjik', color: '#FF6B6B', icon: Zap, gradient: 'linear-gradient(135deg, #FF6B6B, #ee5a24)' },
  huzunlu: { label: 'Hüzünlü', color: '#74b9ff', icon: CloudRain, gradient: 'linear-gradient(135deg, #74b9ff, #0984e3)' },
  mutlu: { label: 'Mutlu', color: '#ffeaa7', icon: Sun, gradient: 'linear-gradient(135deg, #ffeaa7, #fdcb6e)' },
  sakin: { label: 'Sakin', color: '#81ecec', icon: Moon, gradient: 'linear-gradient(135deg, #81ecec, #00cec9)' },
  odaklanmis: { label: 'Odaklanmış', color: '#a29bfe', icon: Coffee, gradient: 'linear-gradient(135deg, #a29bfe, #6c5ce7)' },
  romantik: { label: 'Romantik', color: '#fd79a8', icon: Heart, gradient: 'linear-gradient(135deg, #fd79a8, #e84393)' },
  agresif: { label: 'Agresif', color: '#e17055', icon: Flame, gradient: 'linear-gradient(135deg, #e17055, #d63031)' },
  nostaljik: { label: 'Nostaljik', color: '#dfe6e9', icon: Clock, gradient: 'linear-gradient(135deg, #dfe6e9, #b2bec3)' },
};

// Dummy şarkı önerileri — backend'deki RAG sistemi bu verileri üretecek
const DUMMY_SUGGESTIONS = {
  enerjik: [
    { id: 1, title: 'Blinding Lights', artist: 'The Weeknd', album: 'After Hours', duration: '3:20', energy: 92 },
    { id: 2, title: 'Levitating', artist: 'Dua Lipa', album: 'Future Nostalgia', duration: '3:23', energy: 88 },
    { id: 3, title: 'Uptown Funk', artist: 'Bruno Mars', album: 'Uptown Special', duration: '4:30', energy: 95 },
    { id: 4, title: 'Shake It Off', artist: 'Taylor Swift', album: '1989', duration: '3:39', energy: 85 },
    { id: 5, title: "Can't Stop the Feeling", artist: 'Justin Timberlake', album: 'Trolls', duration: '3:56', energy: 90 },
  ],
  huzunlu: [
    { id: 1, title: 'Gülümse', artist: 'Sezen Aksu', album: 'Gülümse', duration: '5:02', energy: 25 },
    { id: 2, title: 'Someone Like You', artist: 'Adele', album: '21', duration: '4:45', energy: 20 },
    { id: 3, title: 'Kum Gibi', artist: 'Ahmet Kaya', album: 'Dokunma', duration: '4:26', energy: 18 },
    { id: 4, title: 'Fix You', artist: 'Coldplay', album: 'X&Y', duration: '4:54', energy: 30 },
    { id: 5, title: 'Hurt', artist: 'Johnny Cash', album: 'IV', duration: '3:38', energy: 15 },
  ],
  mutlu: [
    { id: 1, title: 'Happy', artist: 'Pharrell Williams', album: 'G I R L', duration: '3:53', energy: 88 },
    { id: 2, title: 'Walking on Sunshine', artist: 'Katrina & The Waves', album: 'Walking on Sunshine', duration: '3:58', energy: 90 },
    { id: 3, title: 'Good as Hell', artist: 'Lizzo', album: 'Cuz I Love You', duration: '2:39', energy: 85 },
    { id: 4, title: 'Best Day of My Life', artist: 'American Authors', album: 'Oh, What a Life', duration: '3:14', energy: 87 },
    { id: 5, title: 'On Top of the World', artist: 'Imagine Dragons', album: 'Night Visions', duration: '3:12', energy: 82 },
  ],
  sakin: [
    { id: 1, title: 'Weightless', artist: 'Marconi Union', album: 'Weightless', duration: '8:09', energy: 10 },
    { id: 2, title: 'Clair de Lune', artist: 'Debussy', album: 'Suite Bergamasque', duration: '5:12', energy: 12 },
    { id: 3, title: 'Sunset Lover', artist: 'Petit Biscuit', album: 'Presence', duration: '3:38', energy: 25 },
    { id: 4, title: 'Breathe Me', artist: 'Sia', album: 'Colour the Small One', duration: '4:34', energy: 20 },
    { id: 5, title: 'River Flows in You', artist: 'Yiruma', album: 'First Love', duration: '3:12', energy: 15 },
  ],
};

// Fallback önerileri
const DEFAULT_SUGGESTIONS = DUMMY_SUGGESTIONS.sakin;

export default function Analysis() {
  const [inputText, setInputText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [suggestions, setSuggestions] = useState(null);

  // Dummy analiz fonksiyonu — ileride backend'e POST /api/v1/analyze atacak
  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    setIsAnalyzing(true);
    setAnalysisResult(null);
    setSuggestions(null);

    // Yapay gecikme — gerçek API çağrısını simüle eder
    await new Promise((r) => setTimeout(r, 1800));

    // Basit keyword-based dummy analiz
    const text = inputText.toLowerCase();
    let detectedMood = 'sakin';
    
    if (text.includes('enerji') || text.includes('spor') || text.includes('harika') || text.includes('koşu') || text.includes('dans'))
      detectedMood = 'enerjik';
    else if (text.includes('üzgün') || text.includes('ağla') || text.includes('kayıp') || text.includes('yalnız') || text.includes('hüzün'))
      detectedMood = 'huzunlu';
    else if (text.includes('mutlu') || text.includes('sevinç') || text.includes('güzel') || text.includes('harika gün'))
      detectedMood = 'mutlu';
    else if (text.includes('aşk') || text.includes('sevgi') || text.includes('özle') || text.includes('romantik'))
      detectedMood = 'romantik';
    else if (text.includes('odak') || text.includes('çalış') || text.includes('kahve') || text.includes('konsantre'))
      detectedMood = 'odaklanmis';
    else if (text.includes('sinir') || text.includes('kız') || text.includes('öfke'))
      detectedMood = 'agresif';
    else if (text.includes('eski') || text.includes('hatıra') || text.includes('nostalji') || text.includes('çocukluk'))
      detectedMood = 'nostaljik';

    const moodData = MOOD_MAP[detectedMood];
    const moodSuggestions = DUMMY_SUGGESTIONS[detectedMood] || DEFAULT_SUGGESTIONS;

    setAnalysisResult({
      mood: detectedMood,
      ...moodData,
      confidence: Math.floor(Math.random() * 15) + 82, // %82-%97 arası dummy güven oranı
      inputSnippet: inputText.slice(0, 80)
    });
    setSuggestions(moodSuggestions);
    setIsAnalyzing(false);
  };

  const handleReset = () => {
    setInputText('');
    setAnalysisResult(null);
    setSuggestions(null);
  };

  const MoodIcon = analysisResult ? (MOOD_MAP[analysisResult.mood]?.icon || Smile) : null;

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', color: 'var(--color-silver-mist)' }}>
      
      {/* Başlık */}
      <div style={{ marginBottom: '36px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Brain size={28} color="#8a9ee0" />
          Duygu Analizi & Öneri
        </h1>
        <p style={{ color: 'rgba(228,228,228,0.5)', fontSize: '0.95rem' }}>
          Bugün nasıl hissediyorsun? Yaz, ARIA sana özel müzik önersin.
        </p>
      </div>

      {/* ═══════ GİRİŞ ALANI ═══════ */}
      <form onSubmit={handleAnalyze}>
        <div className="glass-panel" style={{ padding: '28px', marginBottom: '32px' }}>
          <label style={{
            display: 'block',
            fontSize: '0.85rem',
            color: 'rgba(228,228,228,0.5)',
            marginBottom: '12px',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            fontWeight: '600'
          }}>
            Bugün ne hissediyorsun?
          </label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder='"Yağmurlu bir gün, biraz melankolik hissediyorum ama çalışmam gerekiyor..."'
            className="input-glass"
            style={{
              minHeight: '120px',
              resize: 'vertical',
              lineHeight: '1.7',
              fontFamily: 'var(--font-primary)',
              marginBottom: '16px'
            }}
          />
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            {analysisResult && (
              <button
                type="button"
                onClick={handleReset}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(228,228,228,0.12)',
                  color: 'rgba(228,228,228,0.6)',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(228,228,228,0.3)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(228,228,228,0.12)'; }}
              >
                <RefreshCw size={16} /> Temizle
              </button>
            )}
            <button
              type="submit"
              className="btn-primary"
              disabled={isAnalyzing || !inputText.trim()}
              style={{
                padding: '12px 28px',
                fontSize: '0.95rem',
                opacity: (isAnalyzing || !inputText.trim()) ? 0.5 : 1,
                cursor: (isAnalyzing || !inputText.trim()) ? 'not-allowed' : 'pointer'
              }}
            >
              {isAnalyzing ? (
                <>
                  <span style={{
                    width: '18px', height: '18px',
                    border: '2px solid rgba(228,228,228,0.3)',
                    borderTopColor: 'var(--color-silver-mist)',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                    display: 'inline-block'
                  }} />
                  Analiz Ediliyor...
                </>
              ) : (
                <>
                  <Sparkles size={18} /> Analiz Et
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* ═══════ ANALİZ SONUCU ═══════ */}
      {analysisResult && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '340px 1fr',
          gap: '28px',
          animation: 'fadeInUp 0.6s ease-out'
        }}>
          {/* Sol Panel — Mood Kartı */}
          <div>
            <div className="glass-panel" style={{
              padding: '32px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden'
            }}>
              {/* Arka plan glow */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(circle at center, ${analysisResult.color}10, transparent 70%)`,
                pointerEvents: 'none'
              }} />

              {/* Mood İkonu */}
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                background: analysisResult.gradient,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                boxShadow: `0 0 30px ${analysisResult.color}40`
              }}>
                {MoodIcon && <MoodIcon size={36} color="#fff" />}
              </div>

              <p style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '2px',
                color: 'rgba(228,228,228,0.4)',
                marginBottom: '8px'
              }}>
                Tespit Edilen Ruh Hali
              </p>
              <h2 style={{
                fontSize: '1.8rem',
                fontWeight: '700',
                color: analysisResult.color,
                marginBottom: '20px'
              }}>
                {analysisResult.label}
              </h2>

              {/* Güven Oranı Barı */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.8rem',
                  color: 'rgba(228,228,228,0.5)',
                  marginBottom: '8px'
                }}>
                  <span>Güven Oranı</span>
                  <span style={{ color: analysisResult.color, fontWeight: '600' }}>
                    %{analysisResult.confidence}
                  </span>
                </div>
                <div style={{
                  height: '6px',
                  borderRadius: '3px',
                  background: 'rgba(228,228,228,0.08)',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%',
                    width: `${analysisResult.confidence}%`,
                    borderRadius: '3px',
                    background: analysisResult.gradient,
                    transition: 'width 1s ease-out'
                  }} />
                </div>
              </div>

              {/* Alıntı */}
              <div style={{
                background: 'rgba(228,228,228,0.03)',
                borderRadius: '8px',
                padding: '12px',
                borderLeft: `3px solid ${analysisResult.color}`
              }}>
                <p style={{
                  fontStyle: 'italic',
                  fontSize: '0.85rem',
                  color: 'rgba(228,228,228,0.6)',
                  lineHeight: '1.5'
                }}>
                  "{analysisResult.inputSnippet}{inputText.length > 80 ? '...' : ''}"
                </p>
              </div>
            </div>

            {/* Hızlı mood etiketleri */}
            <div style={{ marginTop: '16px' }}>
              <p style={{
                fontSize: '0.75rem',
                color: 'rgba(228,228,228,0.4)',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                marginBottom: '10px'
              }}>
                Hızlı Denemeler
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {Object.entries(MOOD_MAP).slice(0, 6).map(([key, mood]) => {
                  const TagIcon = mood.icon;
                  return (
                    <button
                      key={key}
                      onClick={() => {
                        const sampleTexts = {
                          enerjik: 'Bugün çok enerjik hissediyorum, spor yapmak istiyorum!',
                          huzunlu: 'Yalnız hissediyorum, biraz hüzünlü bir gün...',
                          mutlu: 'Çok mutluyum, güzel bir gün geçiriyorum!',
                          sakin: 'Sakin bir akşam, yağmur sesleri dinliyorum.',
                          odaklanmis: 'Kahvemi aldım, çalışmaya odaklanmam lazım.',
                          romantik: 'Sevgilimi çok özledim, aşk şarkıları lazım.'
                        };
                        setInputText(sampleTexts[key] || '');
                      }}
                      style={{
                        background: `${mood.color}10`,
                        border: `1px solid ${mood.color}25`,
                        color: mood.color,
                        padding: '6px 12px',
                        borderRadius: '16px',
                        fontSize: '0.75rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = `${mood.color}20`; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = `${mood.color}10`; }}
                    >
                      <TagIcon size={12} /> {mood.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sağ Panel — Şarkı Önerileri */}
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '16px'
            }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Music size={22} color={analysisResult.color} />
                Sana Özel Öneriler
              </h2>
              <span style={{
                fontSize: '0.8rem',
                color: 'rgba(228,228,228,0.4)',
                background: 'rgba(228,228,228,0.05)',
                padding: '4px 12px',
                borderRadius: '12px'
              }}>
                {suggestions?.length || 0} şarkı
              </span>
            </div>

            <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
              {/* Tablo başlığı */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '40px 1fr 1fr 60px 50px',
                padding: '12px 20px',
                fontSize: '0.75rem',
                color: 'rgba(228,228,228,0.35)',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                borderBottom: '1px solid rgba(228,228,228,0.05)'
              }}>
                <span>#</span>
                <span>Şarkı</span>
                <span>Albüm</span>
                <span>Süre</span>
                <span></span>
              </div>

              {/* Şarkı listesi */}
              {suggestions?.map((song, idx) => (
                <div
                  key={song.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '40px 1fr 1fr 60px 50px',
                    padding: '14px 20px',
                    alignItems: 'center',
                    borderBottom: idx < suggestions.length - 1 ? '1px solid rgba(228,228,228,0.04)' : 'none',
                    transition: 'background 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(228,228,228,0.03)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <span style={{ color: 'rgba(228,228,228,0.4)', fontSize: '0.9rem' }}>{idx + 1}</span>
                  <div>
                    <div style={{ fontWeight: '600', marginBottom: '2px', fontSize: '0.95rem' }}>{song.title}</div>
                    <div style={{ fontSize: '0.8rem', color: 'rgba(228,228,228,0.5)' }}>{song.artist}</div>
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'rgba(228,228,228,0.4)' }}>{song.album}</span>
                  <span style={{ fontSize: '0.85rem', color: 'rgba(228,228,228,0.4)' }}>{song.duration}</span>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Play
                      size={16}
                      color="rgba(228,228,228,0.5)"
                      style={{ cursor: 'pointer', transition: 'color 0.2s' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = analysisResult.color; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(228,228,228,0.5)'; }}
                    />
                    <Plus
                      size={16}
                      color="rgba(228,228,228,0.5)"
                      style={{ cursor: 'pointer', transition: 'color 0.2s' }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = '#4ECDC4'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(228,228,228,0.5)'; }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Enerji barı */}
            {suggestions && (
              <div className="glass-panel" style={{ padding: '20px', marginTop: '16px' }}>
                <p style={{
                  fontSize: '0.8rem',
                  color: 'rgba(228,228,228,0.4)',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  marginBottom: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <BarChart3 size={14} /> Enerji Dağılımı
                </p>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', height: '60px' }}>
                  {suggestions.map((song, idx) => (
                    <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                      <div style={{
                        width: '100%',
                        height: `${song.energy * 0.6}px`,
                        background: analysisResult.gradient,
                        borderRadius: '4px 4px 0 0',
                        opacity: 0.6 + (idx * 0.08),
                        transition: 'height 0.8s ease-out'
                      }} />
                      <span style={{ fontSize: '0.65rem', color: 'rgba(228,228,228,0.3)' }}>{song.energy}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ═══════ BOŞ DURUM (Analiz öncesi) ═══════ */}
      {!analysisResult && !isAnalyzing && (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          color: 'rgba(228,228,228,0.3)'
        }}>
          <Brain size={48} style={{ marginBottom: '16px', opacity: 0.3 }} />
          <p style={{ fontSize: '1rem', marginBottom: '8px' }}>Henüz bir analiz yapılmadı</p>
          <p style={{ fontSize: '0.85rem' }}>Yukarıdaki alana duygularını yaz ve "Analiz Et" butonuna tıkla.</p>
        </div>
      )}

      {/* ═══════ LOADING DURUMU ═══════ */}
      {isAnalyzing && (
        <div style={{
          textAlign: 'center',
          padding: '80px 20px',
          animation: 'fadeInUp 0.4s ease-out'
        }}>
          <div style={{
            width: '56px',
            height: '56px',
            border: '3px solid rgba(228,228,228,0.08)',
            borderTopColor: '#8a9ee0',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 24px'
          }} />
          <p style={{ color: 'rgba(228,228,228,0.6)', fontSize: '1rem', marginBottom: '6px' }}>
            Duygular analiz ediliyor...
          </p>
          <p style={{ color: 'rgba(228,228,228,0.3)', fontSize: '0.85rem' }}>
            AI modeli metni işliyor ve ruh halini belirliyor
          </p>
        </div>
      )}

      {/* Animations */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
