import { useState, useEffect } from 'react';
import { api } from '../api/client';
import { useAuth } from '../contexts/AuthContext';
import { IActivity, IClock, Tag, Spinner } from '../components/Icons';

const EMOTION_LABELS = {
  joy: 'Mutlu', happiness: 'Mutlu', happy: 'Mutlu',
  sadness: 'Hüzünlü', sad: 'Hüzünlü', melancholy: 'Hüzünlü',
  anger: 'Ateşli', angry: 'Ateşli', frustration: 'Ateşli',
  calm: 'Sakin', relaxed: 'Sakin', contentment: 'Sakin',
  excitement: 'Enerjik', energetic: 'Enerjik',
  love: 'Romantik', romantic: 'Romantik', tenderness: 'Romantik',
  nostalgia: 'Nostaljik', nostalgic: 'Nostaljik',
  concentration: 'Odaklanmış', focus: 'Odaklanmış', focused: 'Odaklanmış',
};

const EMOTION_COLORS = {
  Mutlu: '#3DD68C', Hüzünlü: '#6E6AFF', Ateşli: '#FF5A6A', Sakin: '#61DAFB',
  Enerjik: '#F5A623', Romantik: '#EC4899', Nostaljik: '#C4A87A', Odaklanmış: '#A78BFA',
};

function getLabel(emotion) {
  if (!emotion) return 'Bilinmiyor';
  return EMOTION_LABELS[emotion.toLowerCase()] || emotion;
}

function getColor(label) {
  return EMOTION_COLORS[label] || 'var(--ac)';
}

function EnergyRing({ energy, positivity, initials }) {
  const sz = 148, r = 62, circ = 2 * Math.PI * r;
  const segments = [
    { value: energy, color: '#6E6AFF' },
    { value: positivity, color: '#3DD68C' },
  ];
  let offset = 0;
  return (
    <div style={{ position: 'relative', width: sz, height: sz, flexShrink: 0 }}>
      <div style={{ position: 'absolute', inset: -10, borderRadius: '50%', border: '1px dashed rgba(110,106,255,0.2)', animation: 'rotSlow 14s linear infinite' }} />
      <svg width={sz} height={sz} viewBox={`0 0 ${sz} ${sz}`} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={sz / 2} cy={sz / 2} r={r} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5" />
        {segments.map((s, i) => {
          const el = (
            <circle key={i} cx={sz / 2} cy={sz / 2} r={r} fill="none"
              stroke={s.color} strokeWidth="5" strokeLinecap="round"
              strokeDasharray={`${circ * s.value / 100} ${circ}`}
              strokeDashoffset={-offset}
              style={{ transition: 'all .9s ease' }}
            />
          );
          offset += circ * s.value / 100;
          return el;
        })}
      </svg>
      <div style={{
        position: 'absolute', inset: 10, borderRadius: '50%',
        background: 'var(--sf2)', border: '1px solid var(--bd)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: '1.6rem',
        color: 'var(--ac)', letterSpacing: '-0.04em',
      }}>{initials}</div>
    </div>
  );
}

export default function Profile() {
  const { user } = useAuth();
  const [tab, setTab] = useState('overview');
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/stats').then(res => {
      setStats(res.data);
    }).catch(err => {
      console.error('Stats fetch failed:', err);
    }).finally(() => setLoading(false));
  }, []);

  const TABS = [
    { id: 'overview', label: 'Genel Bakış' },
    { id: 'history', label: 'Mood Geçmişi' },
  ];

  const email = user?.email || user?.Email || '';
  const name = email.split('@')[0] || 'Kullanıcı';
  const initials = name.substring(0, 2).toUpperCase();

  if (loading) {
    return (
      <div style={{ maxWidth: 1060, margin: '0 auto', textAlign: 'center', padding: '80px 0' }}>
        <Spinner size={32} />
        <p style={{ color: 'var(--t3)', marginTop: 12 }}>Profil yükleniyor...</p>
      </div>
    );
  }

  const data = stats || {};
  const analysisCount = data.analysis_count || 0;
  const playlistCount = data.playlist_count || 0;
  const savedCount = data.saved_count || 0;
  const uniqueMoods = data.unique_moods || 0;
  const topMoods = data.top_moods || [];
  const weekly = data.weekly || [];
  const history = data.history || [];

  // Calculate energy/positivity averages from history
  const avgEnergy = history.length > 0
    ? Math.round(history.reduce((s, h) => s + (h.energy || 0), 0) / history.length * 100)
    : 0;
  const avgValence = history.length > 0
    ? Math.round(history.reduce((s, h) => s + (h.valence || 0), 0) / history.length * 100)
    : 0;

  // Total moods for percentages
  const totalMoodCount = topMoods.reduce((s, m) => s + m.count, 0);
  const maxWeekly = Math.max(...weekly.map(w => w.count), 1);

  return (
    <div style={{ maxWidth: 1060, margin: '0 auto', animation: 'pageIn .38s ease both' }}>

      {/* Profile Header */}
      <div style={{ marginBottom: 28, display: 'flex', gap: 28, alignItems: 'flex-start', paddingBottom: 28, borderBottom: '1px solid var(--bd)' }}>
        <EnergyRing energy={avgEnergy} positivity={avgValence} initials={initials} />
        <div style={{ flex: 1 }}>
          <span className="lbl" style={{ display: 'block', marginBottom: 10 }}>
            {analysisCount > 0 ? `${analysisCount} ANALİZ TAMAMLANDI` : 'ARIA KULLANICISI'}
          </span>
          <h1 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: 4 }}>{name}</h1>
          <p style={{ color: 'var(--t3)', fontSize: '0.85rem', marginBottom: 20 }}>{email}</p>
          <div style={{ display: 'flex', gap: 20, marginBottom: 20 }}>
            {[
              { l: 'Enerji', v: avgEnergy, c: '#6E6AFF' },
              { l: 'Pozitiflik', v: avgValence, c: '#3DD68C' },
            ].map(s => (
              <div key={s.l} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ width: 24, height: 3, borderRadius: 2, background: s.c }} />
                <span style={{ fontSize: '0.76rem', color: 'var(--t2)' }}>{s.l}</span>
                <span className="mono" style={{ fontSize: '0.8rem', color: s.c, fontWeight: 600 }}>%{s.v}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 32 }}>
            {[
              { v: analysisCount, l: 'Analiz' },
              { v: savedCount, l: 'Kayıtlı Şarkı' },
              { v: playlistCount, l: 'Playlist' },
              { v: `${uniqueMoods}/8`, l: 'Mood' },
            ].map(s => (
              <div key={s.l}>
                <div className="mono" style={{ fontSize: '1.4rem', fontWeight: 600, lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--t3)', marginTop: 3 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 24, borderBottom: '1px solid var(--bd)' }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: '10px 18px', fontSize: '0.85rem', fontWeight: tab === t.id ? 600 : 400,
            color: tab === t.id ? 'var(--t1)' : 'var(--t3)',
            borderBottom: tab === t.id ? '2px solid var(--ac)' : '2px solid transparent',
            marginBottom: '-1px', transition: 'all var(--tr)', background: 'none',
          }}>{t.label}</button>
        ))}
      </div>

      {/* Overview */}
      {tab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, animation: 'pageIn .35s ease both' }}>

          {/* Weekly mood chart */}
          <div className="sf" style={{ padding: '20px' }}>
            <span className="lbl" style={{ display: 'block', marginBottom: 16 }}>HAFTALIK MOOD</span>
            {weekly.some(w => w.count > 0) ? (
              <div style={{ display: 'flex', gap: 7, alignItems: 'flex-end', height: 88 }}>
                {weekly.map((d, i) => {
                  const pct = maxWeekly > 0 ? (d.count / maxWeekly) * 100 : 0;
                  const label = getLabel(d.dominant_emotion);
                  const color = getColor(label);
                  return (
                    <div key={d.day} title={`${label} (${d.count})`}
                      style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
                      <div style={{
                        width: '100%', height: `${Math.max(pct * 0.88, d.count > 0 ? 8 : 2)}px`,
                        background: d.count > 0 ? `${color}40` : 'rgba(255,255,255,0.05)',
                        border: d.count > 0 ? `1px solid ${color}60` : '1px solid rgba(255,255,255,0.08)',
                        borderRadius: '3px 3px 0 0', transformOrigin: 'bottom',
                        animation: `barRise .6s ${i * 0.07}s ease both`,
                      }} />
                      <span style={{ fontSize: '0.6rem', color: 'var(--t3)' }}>{d.day}</span>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ height: 88, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--t3)', fontSize: '0.82rem' }}>
                Henüz veri yok
              </div>
            )}
          </div>

          {/* Top moods */}
          <div className="sf" style={{ padding: '20px' }}>
            <span className="lbl" style={{ display: 'block', marginBottom: 16 }}>EN SIK RUH HALLERİ</span>
            {topMoods.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {topMoods.map(m => {
                  const label = getLabel(m.dominant_emotion);
                  const color = getColor(label);
                  const pct = totalMoodCount > 0 ? Math.round((m.count / totalMoodCount) * 100) : 0;
                  return (
                    <div key={m.dominant_emotion}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: 6 }}>
                        <span style={{ color: 'var(--t2)' }}>{label}</span>
                        <span className="mono" style={{ color: 'var(--t1)', fontWeight: 600 }}>%{pct}</span>
                      </div>
                      <div style={{ height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 2, transition: 'width 1s ease' }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 80, color: 'var(--t3)', fontSize: '0.82rem' }}>
                Henüz analiz yapılmadı
              </div>
            )}
          </div>

          {/* Stats cards */}
          {[
            { v: analysisCount, l: 'Toplam Analiz', c: 'var(--ac)' },
            { v: savedCount, l: 'Kaydedilen Şarkı', c: '#3DD68C' },
            { v: playlistCount, l: 'Oluşturulan Playlist', c: '#A78BFA' },
            { v: `${uniqueMoods}/8`, l: 'Mood Keşfedildi', c: '#F5A623' },
          ].map(s => (
            <div key={s.l} className="sf" style={{ padding: '20px' }}>
              <div className="mono" style={{ fontSize: '2rem', fontWeight: 600, color: s.c, lineHeight: 1, marginBottom: 6 }}>{s.v}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--t3)' }}>{s.l}</div>
            </div>
          ))}
        </div>
      )}

      {/* History */}
      {tab === 'history' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, animation: 'pageIn .35s ease both' }}>
          {history.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '52px 0', color: 'var(--t3)' }}>
              <p style={{ fontSize: '0.9rem' }}>Henüz analiz geçmişi yok</p>
              <p style={{ fontSize: '0.78rem', marginTop: 6 }}>Analiz sayfasından ilk analizini yap!</p>
            </div>
          ) : history.map((h, i) => {
            const label = getLabel(h.dominant_emotion);
            const color = getColor(label);
            const sentiment = h.sentiment_label || '';
            const isNegative = ['negative', 'mixed'].includes(sentiment);
            const date = new Date(h.created_at);
            const dateStr = date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

            return (
              <div key={i} className="sf" style={{
                padding: '16px 20px', display: 'flex', gap: 14, alignItems: 'flex-start',
                borderLeft: `2px solid ${color}`, borderRadius: '0 10px 10px 0',
                animation: `pageIn .35s ${i * 0.08}s both`,
              }}>
                <IActivity size={15} color={color} style={{ marginTop: 2, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 7 }}>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      <Tag color={color}>{label}</Tag>
                      {isNegative && (
                        <span style={{
                          fontSize: '0.65rem', padding: '1px 6px', borderRadius: 3,
                          background: 'rgba(255,90,106,0.12)', color: '#FF5A6A', fontWeight: 600,
                        }}>Negatif</span>
                      )}
                      {h.energy != null && (
                        <span style={{ fontSize: '0.65rem', color: 'var(--t3)' }}>
                          Enerji: {Math.round(h.energy * 100)}%
                        </span>
                      )}
                    </div>
                    <span className="lbl" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <IClock size={9} /> {dateStr}
                    </span>
                  </div>
                  <p style={{ fontStyle: 'italic', color: 'var(--t2)', fontSize: '0.86rem', lineHeight: 1.6 }}>
                    "{h.raw_text?.length > 120 ? h.raw_text.substring(0, 120) + '...' : h.raw_text}"
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
