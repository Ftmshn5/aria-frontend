import { useState, useEffect } from 'react';
import { api } from '../api/client';
import { IBookmark, ISearch, IPlay, IClock, IMusic, IX, Spinner } from '../components/Icons';

const MOOD_META = {
  happy:     { label: 'Mutlu',       color: '#3DD68C' },
  sad:       { label: 'Hüzünlü',    color: '#6E6AFF' },
  angry:     { label: 'Ateşli',     color: '#FF5A6A' },
  relaxed:   { label: 'Sakin',      color: '#61DAFB' },
  energetic: { label: 'Enerjik',    color: '#F5A623' },
  romantic:  { label: 'Romantik',   color: '#EC4899' },
  nostalgic: { label: 'Nostaljik',  color: '#C4A87A' },
  focused:   { label: 'Odaklanmış', color: '#A78BFA' },
};

function formatDuration(ms) {
  if (!ms) return '--:--';
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

function TrackRow({ track, index, onRemove }) {
  const [hov, setHov] = useState(false);
  const [removing, setRemoving] = useState(false);

  const handleRemove = async () => {
    setRemoving(true);
    await onRemove(track.spotify_track_id);
    setRemoving(false);
  };

  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: 'grid', gridTemplateColumns: '32px 1fr auto 40px',
        gap: 12, padding: '10px 16px', alignItems: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        background: hov ? 'rgba(255,255,255,0.03)' : 'transparent',
        transition: 'background .15s',
      }}>
      <span style={{ fontSize: '0.8rem', color: 'var(--t3)', textAlign: 'center' }}>
        {hov && track.external_url ? (
          <a href={track.external_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ac)' }}>
            <IPlay size={13} />
          </a>
        ) : index + 1}
      </span>
      <div>
        <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--t1)' }}>{track.title}</div>
        <div style={{ fontSize: '0.75rem', color: 'var(--t2)' }}>{track.artist}</div>
      </div>
      <span className="mono" style={{ fontSize: '0.77rem', color: 'var(--t3)' }}>
        {formatDuration(track.duration_ms)}
      </span>
      <button onClick={handleRemove} disabled={removing} title="Kaydı kaldır"
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: hov ? '#FF5A6A' : 'transparent', transition: 'color .15s',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
        {removing ? <Spinner size={13} /> : <IX size={13} />}
      </button>
    </div>
  );
}

export default function Saved() {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [moodFilter, setMoodFilter] = useState('all');

  const fetchTracks = async () => {
    try {
      const query = moodFilter !== 'all' ? `?mood=${moodFilter}` : '';
      const res = await api.get(`/saved${query}`);
      setTracks(res.data || []);
    } catch (err) {
      console.error('Fetch saved tracks failed:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchTracks();
  }, [moodFilter]);

  const removeTrack = async (spotifyId) => {
    try {
      await api.del(`/saved/${spotifyId}`);
      setTracks(prev => prev.filter(t => t.spotify_track_id !== spotifyId));
    } catch (err) {
      console.error('Remove saved track failed:', err);
    }
  };

  // Group tracks by mood
  const grouped = {};
  const filtered = tracks.filter(t => {
    if (!search) return true;
    return t.title.toLowerCase().includes(search.toLowerCase()) ||
           t.artist.toLowerCase().includes(search.toLowerCase());
  });

  filtered.forEach(t => {
    const key = t.mood_key || 'other';
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(t);
  });

  // Available moods from data
  const availableMoods = [...new Set(tracks.map(t => t.mood_key).filter(Boolean))];

  return (
    <div style={{ maxWidth: 1060, margin: '0 auto', animation: 'pageIn .38s ease both' }}>

      {/* Header */}
      <div style={{ marginBottom: 28, display: 'flex', alignItems: 'center', gap: 12 }}>
        <IBookmark size={20} color="var(--ac)" />
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 900 }}>Kaydedilenler</h1>
          <p style={{ color: 'var(--t2)', fontSize: '0.85rem', marginTop: 2 }}>Beğendiğin şarkılar mood'a göre düzenlendi.</p>
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 24, flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: '1 1 180px' }}>
          <ISearch size={14} color="var(--t3)" style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} className="inp"
            placeholder="Şarkı veya sanatçı ara..." style={{ paddingLeft: 32, height: 36, fontSize: '0.84rem' }} />
        </div>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
          <button onClick={() => setMoodFilter('all')} style={{
            padding: '6px 13px', borderRadius: 5,
            background: moodFilter === 'all' ? 'var(--ac)' : 'var(--sf)',
            border: moodFilter === 'all' ? 'none' : '1px solid var(--bd)',
            color: moodFilter === 'all' ? '#fff' : 'var(--t2)',
            fontSize: '0.8rem', fontWeight: moodFilter === 'all' ? 600 : 400,
            cursor: 'pointer', transition: 'all var(--tr)',
          }}>Tümü</button>
          {availableMoods.map(m => {
            const meta = MOOD_META[m] || { label: m, color: 'var(--ac)' };
            return (
              <button key={m} onClick={() => setMoodFilter(m)} style={{
                padding: '6px 13px', borderRadius: 5,
                background: moodFilter === m ? meta.color : 'var(--sf)',
                border: moodFilter === m ? 'none' : '1px solid var(--bd)',
                color: moodFilter === m ? '#fff' : 'var(--t2)',
                fontSize: '0.8rem', fontWeight: moodFilter === m ? 600 : 400,
                cursor: 'pointer', transition: 'all var(--tr)',
              }}>{meta.label}</button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--t3)' }}>
          <Spinner size={28} />
          <p style={{ fontSize: '0.9rem', marginTop: 12 }}>Yükleniyor...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--t3)', borderTop: '1px solid var(--bd)' }}>
          <IBookmark size={36} style={{ opacity: 0.15, marginBottom: 14 }} />
          <p style={{ fontSize: '0.9rem' }}>{search ? 'Eşleşen şarkı bulunamadı' : 'Henüz şarkı kaydetmedin'}</p>
          <p style={{ fontSize: '0.78rem', color: 'var(--t3)', marginTop: 6 }}>
            Analiz sonuçlarında şarkıların yanındaki kaydet butonunu kullan
          </p>
        </div>
      ) : moodFilter !== 'all' ? (
        // Single mood - flat list
        <div className="sf" style={{ overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '32px 1fr auto 40px', gap: 12, padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <span className="lbl">#</span><span className="lbl">ŞARKI</span><span className="lbl">SÜRE</span><span />
          </div>
          {filtered.map((t, i) => (
            <TrackRow key={t.spotify_track_id || t.id} track={t} index={i} onRemove={removeTrack} />
          ))}
        </div>
      ) : (
        // Grouped by mood
        Object.entries(grouped).map(([moodKey, moodTracks]) => {
          const meta = MOOD_META[moodKey] || { label: moodKey === 'other' ? 'Diğer' : moodKey, color: 'var(--ac)' };
          return (
            <div key={moodKey} style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%', background: meta.color,
                  boxShadow: `0 0 8px ${meta.color}60`,
                }} />
                <span style={{ fontWeight: 700, fontSize: '0.95rem', color: meta.color }}>
                  {meta.label}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--t3)' }}>
                  {moodTracks.length} şarkı
                </span>
              </div>
              <div className="sf" style={{ overflow: 'hidden' }}>
                {moodTracks.map((t, i) => (
                  <TrackRow key={t.spotify_track_id || t.id} track={t} index={i} onRemove={removeTrack} />
                ))}
              </div>
            </div>
          );
        })
      )}

      {/* Footer stats */}
      {tracks.length > 0 && (
        <div style={{ display: 'flex', gap: 0, marginTop: 28, borderTop: '1px solid var(--bd)', paddingTop: 20 }}>
          {[
            { v: tracks.length, l: 'Toplam Şarkı' },
            { v: availableMoods.length, l: 'Farklı Mood' },
          ].map((s, i) => (
            <div key={s.l} style={{ flex: 1, paddingRight: 24, borderRight: i < 1 ? '1px solid var(--bd)' : 'none', paddingLeft: i > 0 ? 24 : 0 }}>
              <div className="mono" style={{ fontSize: '1.6rem', fontWeight: 600, color: 'var(--t1)', lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: '0.72rem', color: 'var(--t3)', marginTop: 4 }}>{s.l}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
