import { useState, useEffect } from 'react';
import { api } from '../api/client';
import { ILibrary, ISearch, IPlay, IClock, IMusic, IX, IPlus } from '../components/Icons';

function formatDuration(ms) {
  if (!ms) return '--:--';
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

function TrackRow({ track, index, onRemove }) {
  const [hov, setHov] = useState(false);
  const t = {
    id: track.ID || track.id,
    title: track.Title || track.title,
    artist: track.Artist || track.artist,
    duration_ms: track.DurationMs || track.duration_ms,
    external_url: track.ExternalURL || track.external_url,
  };

  return (
    <div onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: 'grid', gridTemplateColumns: '32px 1fr auto 40px',
        gap: 12, padding: '10px 16px', alignItems: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
        transition: 'background .15s',
        background: hov ? 'rgba(255,255,255,0.03)' : 'transparent',
      }}>
      <span style={{ fontSize: '0.8rem', color: 'var(--t3)', textAlign: 'center' }}>
        {hov && t.external_url ? (
          <a href={t.external_url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--ac)' }}>
            <IPlay size={13} />
          </a>
        ) : index + 1}
      </span>
      <div>
        <div style={{ fontWeight: 600, fontSize: '0.88rem', color: 'var(--t1)' }}>{t.title}</div>
        <div style={{ fontSize: '0.75rem', color: 'var(--t2)' }}>{t.artist}</div>
      </div>
      <span className="mono" style={{ fontSize: '0.77rem', color: 'var(--t3)' }}>
        {formatDuration(t.duration_ms)}
      </span>
      <button onClick={() => onRemove(t.id)} title="Kaldır"
        style={{
          background: 'none', border: 'none', cursor: 'pointer',
          color: hov ? '#FF5A6A' : 'transparent', transition: 'color .15s',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
        <IX size={13} />
      </button>
    </div>
  );
}

function PlaylistDetail({ playlist, onBack, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(playlist.Name || playlist.name);
  const tracks = playlist.Tracks || playlist.tracks || [];
  const plId = playlist.ID || playlist.id;

  const saveName = async () => {
    if (!name.trim()) return;
    try {
      await api.put(`/playlists/${plId}`, { name: name.trim() });
      setEditing(false);
      onUpdate();
    } catch (err) {
      console.error('Rename failed:', err);
    }
  };

  const removeTrack = async (trackId) => {
    try {
      await api.del(`/playlists/${plId}/tracks/${trackId}`);
      onUpdate();
    } catch (err) {
      console.error('Remove track failed:', err);
    }
  };

  const deletePlaylist = async () => {
    try {
      await api.del(`/playlists/${plId}`);
      onBack();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const totalMs = tracks.reduce((s, t) => s + (t.DurationMs || t.duration_ms || 0), 0);

  return (
    <div style={{ animation: 'pageIn .3s ease both' }}>
      <button onClick={onBack} style={{
        background: 'none', border: 'none', color: 'var(--t2)', cursor: 'pointer',
        fontSize: '0.84rem', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 6,
      }}>← Kütüphaneye Dön</button>

      <div className="sf" style={{ padding: '24px', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          {editing ? (
            <div style={{ display: 'flex', gap: 8, flex: 1 }}>
              <input value={name} onChange={e => setName(e.target.value)}
                className="inp" style={{ flex: 1, fontSize: '1.1rem', fontWeight: 700 }}
                autoFocus onKeyDown={e => e.key === 'Enter' && saveName()} />
              <button onClick={saveName} className="btn-ac" style={{ padding: '8px 16px', fontSize: '0.82rem' }}>Kaydet</button>
              <button onClick={() => { setEditing(false); setName(playlist.Name || playlist.name); }}
                style={{ background: 'none', border: '1px solid var(--bd)', borderRadius: 6, padding: '8px 12px', color: 'var(--t2)', cursor: 'pointer', fontSize: '0.82rem' }}>İptal</button>
            </div>
          ) : (
            <h2 style={{ fontSize: '1.3rem', fontWeight: 900, fontFamily: "'Montserrat',sans-serif", cursor: 'pointer' }}
              onClick={() => setEditing(true)} title="İsmi değiştirmek için tıkla">
              {name}
            </h2>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, color: 'var(--t3)', fontSize: '0.82rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <IMusic size={12} /> {tracks.length} şarkı
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <IClock size={12} /> {formatDuration(totalMs)}
          </span>
          <button onClick={deletePlaylist} style={{
            marginLeft: 'auto', background: 'none', border: '1px solid rgba(255,90,106,0.3)',
            borderRadius: 6, padding: '6px 14px', color: '#FF5A6A', cursor: 'pointer', fontSize: '0.78rem',
          }}>Playlist'i Sil</button>
        </div>
      </div>

      <div className="sf" style={{ overflow: 'hidden' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '32px 1fr auto 40px', gap: 12, padding: '10px 16px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <span className="lbl">#</span><span className="lbl">ŞARKI</span><span className="lbl">SÜRE</span><span />
        </div>
        {tracks.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: 'var(--t3)' }}>
            <IMusic size={28} style={{ opacity: 0.2, marginBottom: 10 }} />
            <p style={{ fontSize: '0.85rem' }}>Bu playlist'te henüz şarkı yok</p>
          </div>
        ) : tracks.map((t, i) => (
          <TrackRow key={t.ID || t.id || i} track={t} index={i} onRemove={removeTrack} />
        ))}
      </div>
    </div>
  );
}

export default function Library() {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [detail, setDetail] = useState(null);

  const fetchPlaylists = async () => {
    try {
      const res = await api.get('/playlists');
      setPlaylists(res.data || []);
    } catch (err) {
      console.error('Fetch playlists failed:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPlaylists(); }, []);

  const openDetail = async (id) => {
    try {
      const res = await api.get(`/playlists/${id}`);
      setDetail(res.data);
      setSelectedId(id);
    } catch (err) {
      console.error('Fetch playlist detail failed:', err);
    }
  };

  const refreshDetail = async () => {
    if (selectedId) await openDetail(selectedId);
    fetchPlaylists();
  };

  const closeDetail = () => {
    setDetail(null);
    setSelectedId(null);
    fetchPlaylists();
  };

  if (detail) {
    return (
      <div style={{ maxWidth: 1060, margin: '0 auto' }}>
        <PlaylistDetail playlist={detail} onBack={closeDetail} onUpdate={refreshDetail} />
      </div>
    );
  }

  const filtered = playlists.filter(pl => {
    const n = (pl.Name || pl.name || '').toLowerCase();
    return !search || n.includes(search.toLowerCase());
  });

  return (
    <div style={{ maxWidth: 1060, margin: '0 auto', animation: 'pageIn .38s ease both' }}>

      {/* Header */}
      <div style={{ marginBottom: 28, display: 'flex', alignItems: 'center', gap: 12 }}>
        <ILibrary size={20} color="var(--ac)" />
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 900 }}>Kütüphane</h1>
          <p style={{ color: 'var(--t2)', fontSize: '0.85rem', marginTop: 2 }}>Oluşturduğun playlistler burada.</p>
        </div>
      </div>

      {/* Search */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 24 }}>
        <div style={{ position: 'relative', flex: '1 1 180px' }}>
          <ISearch size={14} color="var(--t3)" style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)' }} />
          <input value={search} onChange={e => setSearch(e.target.value)} className="inp"
            placeholder="Playlist ara..." style={{ paddingLeft: 32, height: 36, fontSize: '0.84rem' }} />
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--t3)' }}>
          <p style={{ fontSize: '0.9rem' }}>Yükleniyor...</p>
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--t3)', borderTop: '1px solid var(--bd)' }}>
          <IMusic size={36} style={{ opacity: 0.15, marginBottom: 14 }} />
          <p style={{ fontSize: '0.9rem' }}>{search ? 'Eşleşen playlist bulunamadı' : 'Henüz playlist oluşturmadın'}</p>
          <p style={{ fontSize: '0.78rem', color: 'var(--t3)', marginTop: 6 }}>Analiz sayfasında "Playlist" formatını seçerek otomatik oluşturabilirsin</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 12 }}>
          {filtered.map((pl, i) => {
            const name = pl.Name || pl.name;
            const tracks = pl.Tracks || pl.tracks || [];
            const id = pl.ID || pl.id;
            const totalMs = tracks.reduce((s, t) => s + (t.DurationMs || t.duration_ms || 0), 0);

            return (
              <div key={id} style={{ animation: `pageIn .35s ${i * .06}s both` }}>
                <PlaylistCard name={name} trackCount={tracks.length} duration={formatDuration(totalMs)}
                  onClick={() => openDetail(id)} />
              </div>
            );
          })}
        </div>
      )}

      {/* Footer stats */}
      {playlists.length > 0 && (
        <div style={{ display: 'flex', gap: 0, marginTop: 28, borderTop: '1px solid var(--bd)', paddingTop: 20 }}>
          {[
            { v: playlists.length, l: 'Playlist' },
            { v: playlists.reduce((a, p) => a + ((p.Tracks || p.tracks || []).length), 0), l: 'Toplam şarkı' },
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

function PlaylistCard({ name, trackCount, duration, onClick }) {
  const [hov, setHov] = useState(false);
  return (
    <div className="sf" onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', gap: 16, alignItems: 'center', padding: '16px',
        cursor: 'pointer', transition: 'all var(--tr)',
        borderColor: hov ? 'var(--bdh)' : 'var(--bd)',
        transform: hov ? 'translateY(-2px)' : 'none',
      }}>
      <div style={{
        width: 56, height: 56, flexShrink: 0, borderRadius: 8,
        background: 'linear-gradient(135deg, rgba(198,166,255,0.12), rgba(198,166,255,0.04))',
        border: '1px solid rgba(198,166,255,0.15)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <IMusic size={20} color="var(--ac)" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 style={{
          fontSize: '0.93rem', fontWeight: 700, marginBottom: 3,
          fontFamily: "'Montserrat',sans-serif",
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>{name}</h3>
        <span className="lbl" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <IClock size={10} /> {trackCount} şarkı · {duration}
        </span>
      </div>
      <div style={{
        opacity: hov ? 1 : 0, transition: 'opacity var(--tr)',
        width: 32, height: 32, borderRadius: '50%', background: 'var(--ac)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}>
        <IPlay size={13} color="#fff" />
      </div>
    </div>
  );
}
