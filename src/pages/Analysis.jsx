import { useState, useRef, useEffect, useCallback } from 'react';
import { api } from '../api/client';
import './Analysis.css';
import { IBrain, IHeart, IZap, IMoon, ISun, ICoffee, IFlame, ICloudRain, IClock,
  IMusic, IPlay, IPlus, IRefresh, ISparkles, IBarChart, IX, IBookmark, Spinner } from '../components/Icons';

/* ── Data ────────────────────────────────────────────────────── */
const MOODS = [
  { id:'enerjik',  key:'energetic', label:'Enerjik',     Icon:IZap,       x: 0.65, y: 0.55, color:'#F5A623', size:1.0 },
  { id:'huzunlu',  key:'sad',       label:'Hüzünlü',     Icon:ICloudRain, x:-0.55, y:-0.60, color:'#6E6AFF', size:1.1 },
  { id:'mutlu',    key:'happy',     label:'Mutlu',        Icon:ISun,       x: 0.60, y: 0.30, color:'#3DD68C', size:1.2 },
  { id:'sakin',    key:'relaxed',   label:'Sakin',        Icon:IMoon,      x: 0.20, y:-0.65, color:'#61DAFB', size:0.9 },
  { id:'odakli',   key:'focused',   label:'Odaklanmış',  Icon:ICoffee,    x: 0.15, y: 0.10, color:'#A78BFA', size:0.85},
  { id:'romantik', key:'romantic',  label:'Romantik',    Icon:IHeart,     x: 0.45, y:-0.10, color:'#EC4899', size:1.05},
  { id:'agresif',  key:'angry',     label:'Ateşli',      Icon:IFlame,     x:-0.20, y: 0.80, color:'#FF5A6A', size:0.95},
  { id:'nostaljik', key:'nostalgic', label:'Nostaljik',   Icon:IClock,     x:-0.30, y:-0.20, color:'#C4A87A', size:1.0 },
];

const MOOD_LABELS = {
  happy: 'Mutlu', sad: 'Hüzünlü', angry: 'Ateşli', relaxed: 'Sakin',
  energetic: 'Enerjik', romantic: 'Romantik', nostalgic: 'Nostaljik', focused: 'Odaklanmış',
};

function nearestMood(nx, ny) {
  return MOODS.reduce((best, m) => {
    const d = Math.hypot(m.x - nx, m.y - ny);
    return d < best.d ? { id: m.id, d } : best;
  }, { id: MOODS[0].id, d: Infinity }).id;
}

function formatDuration(ms) {
  if (!ms) return '--:--';
  const s = Math.floor(ms / 1000);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}

const EMOTION_TO_MOOD = {
  joy: 'happy', excitement: 'energetic', love: 'romantic', calm: 'relaxed',
  sadness: 'sad', melancholy: 'sad', anger: 'angry', frustration: 'angry',
  nostalgia: 'nostalgic', concentration: 'focused', focus: 'focused',
  contentment: 'relaxed', tenderness: 'romantic',
  happy: 'happy', sad: 'sad', angry: 'angry', relaxed: 'relaxed',
  energetic: 'energetic', romantic: 'romantic', nostalgic: 'nostalgic', focused: 'focused',
  positive: 'happy', negative: 'sad', neutral: 'relaxed', mixed: 'nostalgic',
};

function moodFromSentiment(sentimentLabel, dominantEmotion) {
  // Try dominant_emotion first (more specific)
  if (dominantEmotion) {
    const key = EMOTION_TO_MOOD[dominantEmotion.toLowerCase()];
    if (key) {
      const m = MOODS.find(m => m.key === key);
      if (m) return m;
    }
  }
  // Fallback to sentiment_label
  if (sentimentLabel) {
    const key = EMOTION_TO_MOOD[sentimentLabel.toLowerCase()];
    if (key) {
      const m = MOODS.find(m => m.key === key);
      if (m) return m;
    }
    // Direct key match
    const direct = MOODS.find(m => m.key === sentimentLabel);
    if (direct) return direct;
  }
  return MOODS.find(m => m.id === 'sakin');
}

/* ── MiniPlayer ─────────────────────────────────────────────── */
function MiniPlayer({ track, onClose }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    setPlaying(false);
    setProgress(0);
    setDuration(0);
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [track?.spotify_track_id]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime = () => setProgress(audio.currentTime);
    const onLoad = () => setDuration(audio.duration);
    const onEnd = () => setPlaying(false);
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onLoad);
    audio.addEventListener('ended', onEnd);
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onLoad);
      audio.removeEventListener('ended', onEnd);
    };
  }, [track?.spotify_track_id]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); }
    else { audioRef.current.play().catch(() => {}); }
    setPlaying(!playing);
  };

  const seek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    if (audioRef.current && duration) {
      audioRef.current.currentTime = pct * duration;
    }
  };

  if (!track) return null;

  const hasPreview = !!track.preview_url;
  const pct = duration ? (progress / duration) * 100 : 0;

  return (
    <div className="a-player">
      {hasPreview && <audio ref={audioRef} src={track.preview_url} preload="auto" />}
      <div className="a-player__info">
        <div className="a-player__title">{track.title}</div>
        <div className="a-player__artist">{track.artist}</div>
      </div>
      <div className="a-player__controls">
        {hasPreview ? (
          <button onClick={togglePlay} className="a-player__play">
            {playing ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
            ) : (
              <IPlay size={18} />
            )}
          </button>
        ) : (
          <a href={track.external_url} target="_blank" rel="noopener noreferrer" className="a-player__play" title="Spotify'da aç">
            <IPlay size={18} />
          </a>
        )}
      </div>
      {hasPreview && (
        <div className="a-player__bar" onClick={seek}>
          <div className="a-player__bar-fill" style={{ width: `${pct}%` }} />
          <div className="a-player__time">
            <span>{formatDuration(progress * 1000)}</span>
            <span>{formatDuration(duration * 1000)}</span>
          </div>
        </div>
      )}
      {!hasPreview && (
        <div className="a-player__no-preview">
          <span>Önizleme yok</span>
          {track.external_url && <a href={track.external_url} target="_blank" rel="noopener noreferrer">Spotify'da aç</a>}
        </div>
      )}
      <button onClick={onClose} className="a-player__close"><IX size={14} /></button>
    </div>
  );
}

/* ── PlaylistDropdown ────────────────────────────────────────── */
function PlaylistDropdown({ track, onClose }) {
  const ref = useRef(null);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/playlists').then(res => {
      setPlaylists(res.data || []);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  const addToPlaylist = async (plId) => {
    try {
      const pl = playlists.find(p => p.ID === plId || p.id === plId);
      const existingTracks = (pl?.Tracks || pl?.tracks || []).map(t => ({
        spotify_track_id: t.SpotifyTrackID || t.spotify_track_id,
        title: t.Title || t.title,
        artist: t.Artist || t.artist,
        album: t.Album || t.album,
        preview_url: t.PreviewURL || t.preview_url,
        external_url: t.ExternalURL || t.external_url,
        duration_ms: t.DurationMs || t.duration_ms,
        relevance_score: t.RelevanceScore || t.relevance_score,
        reason: t.Reason || t.reason,
      }));
      existingTracks.push({
        spotify_track_id: track.spotify_track_id,
        title: track.title,
        artist: track.artist,
        album: track.album || '',
        preview_url: track.preview_url || '',
        external_url: track.external_url || '',
        duration_ms: track.duration_ms || 0,
        relevance_score: track.relevance_score || 0,
        reason: track.reason || '',
      });
      // Delete and recreate with updated tracks
      await api.del(`/playlists/${plId}`);
      await api.post('/playlists', { name: pl?.Name || pl?.name, tracks: existingTracks });
    } catch (err) {
      console.error('Add to playlist error:', err);
    }
    onClose();
  };

  const createNew = async () => {
    try {
      await api.post('/playlists', {
        name: `${track.title} playlist`,
        tracks: [{
          spotify_track_id: track.spotify_track_id,
          title: track.title, artist: track.artist, album: track.album || '',
          preview_url: track.preview_url || '', external_url: track.external_url || '',
          duration_ms: track.duration_ms || 0, relevance_score: track.relevance_score || 0,
          reason: track.reason || '',
        }],
      });
    } catch (err) {
      console.error('Create playlist error:', err);
    }
    onClose();
  };

  return (
    <div ref={ref} className="a-dropdown">
      <div className="a-dropdown__title">Playlist'e Ekle</div>
      {loading ? (
        <div style={{padding:'12px',textAlign:'center',color:'var(--text-tertiary)',fontSize:'0.8rem'}}>Yükleniyor...</div>
      ) : playlists.length === 0 ? (
        <div style={{padding:'12px',textAlign:'center',color:'var(--text-tertiary)',fontSize:'0.8rem'}}>Henüz playlist yok</div>
      ) : playlists.map(pl => (
        <button key={pl.ID || pl.id} className="a-dropdown__item" onClick={() => addToPlaylist(pl.ID || pl.id)}>
          <IMusic size={12} />
          <span>{pl.Name || pl.name}</span>
          <span style={{marginLeft:'auto',fontSize:'.68rem',color:'var(--text-tertiary)'}}>
            {(pl.Tracks || pl.tracks || []).length} şarkı
          </span>
        </button>
      ))}
      <div className="a-dropdown__sep" />
      <button className="a-dropdown__item a-dropdown__new" onClick={createNew}>
        <IPlus size={12} />
        <span>Yeni Playlist Oluştur</span>
      </button>
    </div>
  );
}

/* ── SongRow ─────────────────────────────────────────────────── */
function SongRow({ s, i, last, onPlay, isPlaying, onDislike, recId, moodKey }) {
  const [hov, setHov] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [disliking, setDisliking] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (saving) return;
    setSaving(true);
    try {
      if (!saved) {
        await api.post('/saved', {
          spotify_track_id: s.spotify_track_id,
          title: s.title, artist: s.artist, album: s.album || '',
          preview_url: s.preview_url || '', external_url: s.external_url || '',
          duration_ms: s.duration_ms || 0, mood_key: moodKey || '',
        });
      } else {
        await api.del(`/saved/${s.spotify_track_id}`);
      }
      setSaved(!saved);
    } catch (err) {
      console.error('Save error:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleDislike = async () => {
    if (disliking) return;
    setDisliking(true);
    try {
      if (!disliked && s.spotify_track_id) {
        await api.post('/interactions', {
          spotify_track_id: s.spotify_track_id,
          recommendation_id: recId || 0,
          interaction_type: 'dislike',
        });
      } else if (disliked && s.spotify_track_id) {
        await api.del(`/interactions/${s.spotify_track_id}`);
      }
      const newState = !disliked;
      setDisliked(newState);
      if (newState && onDislike) onDislike(s);
    } catch (err) {
      console.error('Interaction error:', err);
    } finally {
      setDisliking(false);
    }
  };

  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      className={`a-song ${isPlaying ? 'a-song--playing' : ''}`}
      style={{
        opacity: disliked ? 0.35 : 1,
        borderBottom: last ? 'none' : undefined,
        animationDelay: `${i * 0.07}s`,
      }}>
      <span style={{fontSize:'0.8rem',color:'var(--text-tertiary)',textAlign:'center',cursor:'pointer'}}
        onClick={() => !disliked && onPlay && onPlay(s)}>
        {hov && !disliked ? <IPlay size={13} color="var(--ac)"/> : i+1}
      </span>
      <div style={{cursor:'pointer'}} onClick={() => !disliked && onPlay && onPlay(s)}>
        <div style={{fontWeight:600,fontSize:'0.88rem',marginBottom:1,color: isPlaying ? 'var(--lavender)' : 'var(--ivory)'}}>{s.title}</div>
        <div style={{fontSize:'0.75rem',color:'var(--text-secondary)'}}>{s.artist}</div>
        {s.reason && <div style={{fontSize:'0.65rem',color:'var(--text-tertiary)',marginTop:2,fontStyle:'italic'}}>{s.reason}</div>}
      </div>
      <span className="mono" style={{fontSize:'0.77rem',color:'var(--text-tertiary)'}}>{formatDuration(s.duration_ms)}</span>
      <div className="a-song__actions">
        <button
          className={`a-song__act a-song__act--dislike ${disliked ? 'a-song__act--disliked' : ''}`}
          onClick={handleDislike}
          disabled={disliking}
          title={disliked ? 'Geri al' : 'Beğenmedim'}
        >
          {disliking ? <Spinner size={13} /> : <IX size={13} />}
        </button>
        {!disliked && (
          <button
            className={`a-song__act ${saved ? 'a-song__act--saved' : ''}`}
            onClick={handleSave}
            disabled={saving}
            title={saved ? 'Kaydı kaldır' : 'Kaydet'}
          >
            {saving ? <Spinner size={13} /> : <IBookmark size={13} />}
          </button>
        )}
        {!disliked && (
          <button className="a-song__act" onClick={() => setShowDropdown(!showDropdown)} title="Playlist'e ekle">
            <IPlus size={13} />
          </button>
        )}
        {showDropdown && (
          <PlaylistDropdown
            track={s}
            onClose={() => setShowDropdown(false)}
          />
        )}
      </div>
    </div>
  );
}

/* ── Accordion Results ───────────────────────────────────────── */
function Results({ matchTracks, shiftTracks, mode, setMode, onPlay, playingTrackId, recId, onDislike, shiftLoading, onRequestShift, moodKey }) {
  const panels = [
    { key:'match', label:'Moduna uygun şarkılar', sub:'Bu hissi derinleştir', Icon:IMusic, color:'var(--lavender)', songs: matchTracks },
    { key:'shift', label:'Modumu değiştirmek istiyorum', sub:'Bambaşka bir enerjiye', Icon:ISparkles, color:'var(--matte-rose)', songs: shiftTracks },
  ];
  return (
    <div className="a-accordion">
      {panels.map(p=>{
        const open = mode === p.key;
        return (
          <div key={p.key} className="a-accordion__item" style={{borderColor: open ? `${p.color}55` : undefined}}>
            <button onClick={()=> {
              if (open) { setMode(null); return; }
              setMode(p.key);
              if (p.key === 'shift' && p.songs.length === 0 && onRequestShift) onRequestShift();
            }} className="a-accordion__trigger"
              style={{background: open ? `${p.color}10` : undefined}}>
              <div style={{width:36,height:36,borderRadius:8,background:`${p.color}18`,border:`1px solid ${p.color}30`,display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                <p.Icon size={16} color={p.color}/>
              </div>
              <div style={{flex:1}}>
                <div style={{fontWeight:700,fontSize:'0.88rem',color:'var(--ivory)'}}>{p.label}</div>
                <div style={{fontSize:'0.72rem',color:'var(--text-tertiary)',marginTop:2}}>{p.sub}</div>
              </div>
              <span style={{color:'var(--text-tertiary)',display:'inline-block',transform:open?'rotate(180deg)':'none',transition:'transform .2s'}}>▼</span>
            </button>
            {open && (
              <div style={{borderTop:'1px solid var(--glass-border)',animation:'a-slideDown .2s ease both'}}>
                {shiftLoading && p.key === 'shift' ? (
                  <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:10,padding:'28px 18px'}}>
                    <Spinner size={18} /> <span style={{color:'var(--text-secondary)',fontSize:'0.85rem'}}>Alternatif öneriler yükleniyor...</span>
                  </div>
                ) : p.songs.length === 0 ? (
                  <div style={{padding:'28px 18px',textAlign:'center',color:'var(--text-tertiary)',fontSize:'0.85rem'}}>Henüz öneri yok</div>
                ) : (
                  <>
                    <div style={{display:'grid',gridTemplateColumns:'32px 1fr auto 60px',gap:12,padding:'8px 18px',borderBottom:'1px solid rgba(255,255,255,0.03)'}}>
                      <span className="a-lbl">#</span><span className="a-lbl">ŞARKI</span><span className="a-lbl">SÜRE</span><span/>
                    </div>
                    {p.songs.map((s,i)=>(
                      <SongRow key={s.spotify_track_id || i} s={s} i={i} last={i===p.songs.length-1}
                        onPlay={onPlay} isPlaying={playingTrackId === s.spotify_track_id}
                        onDislike={onDislike} recId={recId} moodKey={moodKey} />
                    ))}
                    <div className="a-energy">
                      {p.songs.map((s,i)=>{
                        const e = Math.round((s.relevance_score || 0) * 100);
                        return (
                          <div key={i} className="a-energy__bar">
                            <div className="a-energy__fill" style={{height:`${e*0.27}px`,background:`${p.color}28`,border:`1px solid ${p.color}40`,animationDelay:`${i*.07}s`}}/>
                            <span className="mono" style={{fontSize:'0.55rem',color:'var(--text-tertiary)'}}>{e}</span>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ── Chart Tab ───────────────────────────────────────────────── */
function ChartTab({ onSelect }) {
  const svgRef = useRef(null);
  const [dot, setDot] = useState(null);
  const W=500,H=400,cx=W/2,cy=H/2,PAD=32;

  const handleClick = (e) => {
    const rect = svgRef.current.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    const nx = (px - cx) / (cx - PAD);
    const ny = -(py - cy) / (cy - PAD);
    const id = nearestMood(nx, ny);
    setDot({ nx, ny, id });
  };

  const mood = dot ? MOODS.find(m=>m.id===dot.id) : null;
  const svgX = dot ? cx + dot.nx*(cx-PAD) : null;
  const svgY = dot ? cy - dot.ny*(cy-PAD) : null;

  return (
    <div className="a-ws">
      <div className="a-glass">
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:14,marginBottom:14}}>
          <span className="a-lbl">DUYGU HARİTASI</span>
          <span style={{fontSize:'0.72rem',color:'var(--text-tertiary)'}}>Tıkla ve nokta bırak</span>
        </div>
        <svg ref={svgRef} width={W} height={H} onClick={handleClick}
          style={{display:'block',width:'100%',height:'auto',cursor:'crosshair',borderRadius:10,background:'linear-gradient(145deg, rgba(255,255,255,0.035), rgba(255,255,255,0.012))'}}>
          <rect width={W} height={H} rx={10} fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.08)" strokeWidth={1}/>
          {[-1,-0.5,0,0.5,1].map(v=>{
            const sx=cx+v*(cx-PAD), sy=cy-v*(cy-PAD);
            return <g key={v}>
              <line x1={sx} y1={PAD} x2={sx} y2={H-PAD} stroke="rgba(255,255,255,0.05)" strokeWidth={v===0?1.5:0.5}/>
              <line x1={PAD} y1={sy} x2={W-PAD} y2={sy} stroke="rgba(255,255,255,0.05)" strokeWidth={v===0?1.5:0.5}/>
            </g>;
          })}
          <rect x={cx} y={PAD} width={cx-PAD} height={cy-PAD} fill="#3DD68C" opacity={0.02}/>
          <rect x={PAD} y={PAD} width={cx-PAD} height={cy-PAD} fill="#FF5A6A" opacity={0.02}/>
          <rect x={cx} y={cy} width={cx-PAD} height={cy-PAD} fill="#61DAFB" opacity={0.02}/>
          <rect x={PAD} y={cy} width={cx-PAD} height={cy-PAD} fill="#6E6AFF" opacity={0.02}/>
          <text x={cx} y={PAD-4} textAnchor="middle" fill="#3DD68C" fontSize={10} fontWeight={700} fontFamily="Montserrat,sans-serif">ENERJİK</text>
          <text x={cx} y={H-4} textAnchor="middle" fill="#6E6AFF" fontSize={10} fontWeight={700} fontFamily="Montserrat,sans-serif">SAKİN</text>
          <text x={PAD+2} y={cy-6} textAnchor="start" fill="#EC4899" fontSize={10} fontWeight={700} fontFamily="Montserrat,sans-serif">HÜZÜN</text>
          <text x={W-PAD-2} y={cy-6} textAnchor="end" fill="#F5A623" fontSize={10} fontWeight={700} fontFamily="Montserrat,sans-serif">MUTLU</text>
          {dot&&<>
            <line x1={svgX} y1={PAD} x2={svgX} y2={H-PAD} stroke={mood.color} strokeWidth={0.8} opacity={0.3} strokeDasharray="4 3"/>
            <line x1={PAD} y1={svgY} x2={W-PAD} y2={svgY} stroke={mood.color} strokeWidth={0.8} opacity={0.3} strokeDasharray="4 3"/>
            <circle cx={svgX} cy={svgY} r={18} fill={mood.color} opacity={0.1}>
              <animate attributeName="r" values="12;20;12" dur="1.8s" repeatCount="indefinite"/>
            </circle>
            <circle cx={svgX} cy={svgY} r={9} fill={mood.color} opacity={0.9}/>
            <circle cx={svgX} cy={svgY} r={3.5} fill="#fff"/>
            <text x={svgX} y={svgY-15} textAnchor="middle" fill={mood.color} fontSize={11} fontWeight={800} fontFamily="Montserrat,sans-serif">{mood.label}</text>
          </>}
          {!dot&&(
            <text x={cx} y={cy+5} textAnchor="middle" fill="rgba(255,255,255,0.2)" fontSize={13} fontFamily="Montserrat,sans-serif">Bir nokta seçildiğinde analiz hazırlanır</text>
          )}
        </svg>
      </div>

      <div className="a-ws__side">
        <div className="a-glass" style={{display:'grid',gap:12}}>
          <div style={{fontWeight:700,fontSize:'0.88rem',marginBottom:6,color:'var(--ivory)'}}>Eksenler</div>
          <p style={{color:'var(--text-secondary)',fontSize:'0.82rem',lineHeight:1.7,margin:0}}>
            Yatay eksen: Hüzün → Mutlu<br/>
            Dikey eksen: Sakin → Enerjik
          </p>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginTop:10}}>
            <div className="a-stat"><span>Konum</span><strong>Yakın mod</strong></div>
            <div className="a-stat"><span>Skor</span><strong>Anlık eşleşme</strong></div>
          </div>
        </div>

        {mood&&(
          <div className="a-glass" style={{border:`1.5px solid ${mood.color}45`,animation:'a-cardIn .25s ease both'}}>
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              <div style={{width:36,height:36,borderRadius:8,background:mood.color+'18',border:`1px solid ${mood.color}30`,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <mood.Icon size={16} color={mood.color}/>
              </div>
              <div>
                <div style={{fontWeight:800,color:mood.color,fontSize:'1rem'}}>{mood.label}</div>
                <div style={{fontSize:'0.72rem',color:'var(--text-tertiary)',marginTop:2}}>Tespit edilen duygu modu</div>
              </div>
            </div>
          </div>
        )}

        {dot&&(
          <button onClick={()=>onSelect(dot.id)} className="a-btn">Analiz Et</button>
        )}
      </div>
    </div>
  );
}

/* ── Bubbles Tab ─────────────────────────────────────────────── */
function BubblesTab({ onSelect }) {
  const CR = 240, CW = CR*2+20, CH = CR*2+20;
  const canvasRef = useRef(null);
  const sim = useRef({
    bubbles: MOODS.map(m => ({
      ...m,
      x: (Math.random()-0.5)*100,
      y: (Math.random()-0.5)*100,
      vx: (Math.random()-0.5)*2,
      vy: (Math.random()-0.5)*2,
      r: 42 + Math.random()*22,
    })),
    resize: null,
  });
  const raf = useRef(null);
  const [dominant, setDominant] = useState(MOODS[0].id);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const ocx = CW/2, ocy = CH/2;
    const loop = () => {
      const { bubbles } = sim.current;
      bubbles.forEach(b => {
        if (sim.current.resize?.id === b.id) return;
        b.vy += 0.09; b.vx *= 0.992; b.vy *= 0.992;
        b.x += b.vx; b.y += b.vy;
        const d = Math.hypot(b.x, b.y);
        if (d + b.r > CR) {
          const nx=b.x/d||0, ny=b.y/d||1;
          const dot=b.vx*nx+b.vy*ny;
          b.vx-=1.7*dot*nx; b.vy-=1.7*dot*ny;
          const push=CR-b.r; b.x=nx*push; b.y=ny*push;
        }
      });
      for(let i=0;i<bubbles.length;i++) for(let j=i+1;j<bubbles.length;j++){
        const a=bubbles[i],b=bubbles[j];
        const dx=b.x-a.x,dy=b.y-a.y,dist=Math.hypot(dx,dy)||0.01,minD=a.r+b.r;
        if(dist<minD){
          const nx=dx/dist,ny=dy/dist,ov=(minD-dist)/2;
          a.x-=nx*ov;a.y-=ny*ov;b.x+=nx*ov;b.y+=ny*ov;
          const dv=(a.vx-b.vx)*nx+(a.vy-b.vy)*ny;
          if(dv>0){a.vx-=dv*nx;a.vy-=dv*ny;b.vx+=dv*nx;b.vy+=dv*ny;}
        }
      }
      ctx.clearRect(0,0,CW,CH);
      ctx.beginPath();ctx.arc(ocx,ocy,CR,0,Math.PI*2);
      ctx.fillStyle='rgba(255,255,255,0.012)';ctx.fill();
      ctx.strokeStyle='rgba(255,255,255,0.1)';ctx.lineWidth=1.5;ctx.stroke();
      ctx.strokeStyle='rgba(255,255,255,0.04)';ctx.lineWidth=1;
      ctx.beginPath();ctx.moveTo(ocx,ocy-CR+8);ctx.lineTo(ocx,ocy+CR-8);ctx.stroke();
      ctx.beginPath();ctx.moveTo(ocx-CR+8,ocy);ctx.lineTo(ocx+CR-8,ocy);ctx.stroke();
      let domId=bubbles[0].id,domR=0;
      bubbles.forEach(b=>{
        const bx=ocx+b.x,by=ocy+b.y;
        const g=ctx.createRadialGradient(bx-b.r*.3,by-b.r*.35,0,bx,by,b.r);
        g.addColorStop(0,b.color+'60');g.addColorStop(1,b.color+'1A');
        ctx.beginPath();ctx.arc(bx,by,b.r,0,Math.PI*2);
        ctx.fillStyle=g;ctx.fill();
        ctx.strokeStyle=b.color+'70';ctx.lineWidth=2;ctx.stroke();
        ctx.beginPath();ctx.arc(bx,by,b.r+5,0,Math.PI*2);
        ctx.strokeStyle=b.color+'18';ctx.lineWidth=8;ctx.stroke();
        ctx.fillStyle=b.color;ctx.textAlign='center';ctx.textBaseline='middle';
        ctx.font=`800 ${Math.max(10,Math.min(15,b.r*0.28))}px Montserrat,sans-serif`;
        ctx.fillText(b.label,bx,by);
        if(b.r>domR){domR=b.r;domId=b.id;}
      });
      setDominant(domId);
      raf.current=requestAnimationFrame(loop);
    };
    raf.current=requestAnimationFrame(loop);
    return ()=>cancelAnimationFrame(raf.current);
  }, []);

  const getLocal=(e)=>{const rect=canvasRef.current.getBoundingClientRect();return{x:e.clientX-rect.left-CW/2,y:e.clientY-rect.top-CH/2};};
  const onDown=(e)=>{const{x,y}=getLocal(e);for(const b of sim.current.bubbles){const d=Math.hypot(x-b.x,y-b.y);if(d>=b.r-12&&d<=b.r+14){sim.current.resize={id:b.id,cx:b.x,cy:b.y};return;}}};
  const onMove=(e)=>{if(!sim.current.resize)return;const{x,y}=getLocal(e);const{id,cx,cy}=sim.current.resize;const nb=sim.current.bubbles.find(b=>b.id===id);if(nb)nb.r=Math.max(26,Math.min(CR*0.56,Math.hypot(x-cx,y-cy)));};
  const onUp=()=>{sim.current.resize=null;};
  const dom=MOODS.find(m=>m.id===dominant);

  return (
    <div className="a-ws">
      <div className="a-glass" style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
        <span className="a-lbl" style={{display:'block',marginBottom:10,alignSelf:'flex-start'}}>DUYGU YOĞUNLUĞU</span>
        <canvas ref={canvasRef} width={CW} height={CH}
          onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}
          style={{borderRadius:12,cursor:'crosshair',display:'block',width:'100%',maxWidth:CW,height:'auto'}}/>
      </div>
      <div className="a-ws__side">
        <div className="a-glass">
          <p style={{color:'var(--text-secondary)',fontSize:'0.84rem',lineHeight:1.7,margin:0}}>
            Balonların <strong style={{color:'var(--ivory)'}}>kenarlarını sürükle</strong> ve büyüklüklerini ayarla.<br/>
            <span style={{color:'var(--text-tertiary)',fontSize:'0.78rem'}}>En büyük balon → baskın duygu modu olarak analiz edilir.</span>
          </p>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8,marginTop:12}}>
            <div className="a-stat"><span>Girdi</span><strong>8 duygu</strong></div>
            <div className="a-stat"><span>Sonuç</span><strong>Baskın mod</strong></div>
          </div>
        </div>
        {dom&&(
          <div className="a-glass" style={{border:`1.5px solid ${dom.color}50`,animation:'a-cardIn .2s ease both'}}>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <div style={{width:10,height:10,borderRadius:'50%',background:dom.color}}/>
              <div style={{fontWeight:800,color:dom.color,fontSize:'1rem'}}>{dom.label}</div>
            </div>
            <div style={{fontSize:'0.72rem',color:'var(--text-tertiary)',marginTop:4}}>Baskın duygu modu</div>
          </div>
        )}
        <button onClick={()=>onSelect(dominant)} className="a-btn">
          <ISparkles size={14}/> Analiz Et
        </button>
      </div>
    </div>
  );
}

/* ── Text Tab ────────────────────────────────────────────────── */
function TextTab({ text, setText, onAnalyze, canAnalyze, busy }) {
  return (
    <div className="a-glass" style={{maxWidth:760,margin:'0 auto'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:16,marginBottom:14}}>
        <span className="a-lbl">DUYGULARINI ANLAT</span>
        <span style={{fontSize:'0.72rem',color:'var(--text-tertiary)'}}>Kısa veya detaylı</span>
      </div>
      <div style={{border:'1px solid var(--glass-border)',borderRadius:12,padding:'14px 16px',background:'linear-gradient(180deg, rgba(255,255,255,0.035), rgba(255,255,255,0.015))'}}>
        <textarea value={text} onChange={e=>setText(e.target.value)} className="a-textarea"
          placeholder='"Bugün nasıl hissediyorum? Birkaç cümle yeterli..."'/>
        <div style={{height:1,background:'var(--glass-border)',margin:'12px 0'}}/>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            <div className="a-stat"><span>Uzunluk</span><strong>{text.trim().length} karakter</strong></div>
            <div className="a-stat"><span>Durum</span><strong>{canAnalyze?'Hazır':'Bekliyor'}</strong></div>
          </div>
          <button onClick={onAnalyze} disabled={!canAnalyze||busy} className="a-btn"
            style={{width:'auto',padding:'10px 22px',fontSize:'0.86rem',opacity:canAnalyze?1:0.45}}>
            {busy?<><Spinner size={14} color="#fff"/> İşleniyor</>:<>Analiz Et</>}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Main ────────────────────────────────────────────────────── */

const TAB_META = [
  { id:'chart',   label:'Grafik',          desc:'Koordinat haritasında nokta koy' },
  { id:'text',    label:'Yazı',            desc:'Nasıl hissettiğini anlat' },
  { id:'bubbles', label:'Duygu Balonları', desc:'Duygu kartlarından seçim yap' },
];

export default function Analysis() {
  const [format, setFormat] = useState(null);
  const [tab,    setTab]    = useState(null);
  const [text,   setText]   = useState('');
  const [busy,   setBusy]   = useState(false);
  const [error,  setError]  = useState(null);
  const [mode,   setMode]   = useState(null);

  // Real data from backend
  const [moodResult, setMoodResult] = useState(null);   // mood object from backend
  const [matchTracks, setMatchTracks] = useState([]);    // match mode tracks
  const [shiftTracks, setShiftTracks] = useState([]);    // shift mode tracks
  const [recId, setRecId] = useState(null);              // recommendation ID
  const [detectedMood, setDetectedMood] = useState(null); // MOODS entry

  // Player
  const [playingTrack, setPlayingTrack] = useState(null);

  // Shift loading
  const [shiftLoading, setShiftLoading] = useState(false);

  // Dislike count to trigger collab filtering
  const [dislikeCount, setDislikeCount] = useState(0);

  const reset = () => {
    setMoodResult(null); setMatchTracks([]); setShiftTracks([]);
    setRecId(null); setDetectedMood(null);
    setText(''); setMode(null); setTab(null); setFormat(null);
    setError(null); setPlayingTrack(null); setDislikeCount(0);
  };

  const analyze = useCallback(async (detId) => {
    if (!detId && !text.trim()) return;
    setBusy(true); setError(null);
    setMoodResult(null); setMatchTracks([]); setShiftTracks([]);
    setRecId(null); setDetectedMood(null); setMode(null);

    try {
      const body = {};
      if (detId) {
        const m = MOODS.find(m => m.id === detId);
        body.mood_key = m ? m.key : detId;
      } else {
        body.text = text.trim();
      }
      body.mode = 'match';
      body.limit = format === 'single' ? 5 : 10;

      const res = await api.post('/recommendations/generate', body);
      const data = res.data;

      const mood = data.mood;
      const rec = data.recommendation;
      const tracks = rec?.tracks || [];

      setMoodResult(mood);
      setMatchTracks(tracks);
      setRecId(rec?.id);

      const dm = moodFromSentiment(mood?.sentiment_label, mood?.dominant_emotion);
      setDetectedMood(dm);

      // Auto-save as playlist when format is 'playlist'
      if (format === 'playlist' && tracks.length > 0) {
        try {
          const playlistName = `${dm?.label || 'Aria'} — ${new Date().toLocaleDateString('tr-TR')}`;
          await api.post('/playlists', {
            name: playlistName,
            tracks: tracks.map(t => ({
              spotify_track_id: t.spotify_track_id,
              title: t.title, artist: t.artist, album: t.album || '',
              preview_url: t.preview_url || '', external_url: t.external_url || '',
              duration_ms: t.duration_ms || 0, relevance_score: t.relevance_score || 0,
              reason: t.reason || '',
            })),
          });
        } catch (e) {
          console.error('Auto-save playlist failed:', e);
        }
      }

    } catch (err) {
      setError(err.message || 'Analiz sırasında bir hata oluştu');
    } finally {
      setBusy(false);
    }
  }, [text, format]);

  const requestShift = useCallback(async () => {
    if (!moodResult || shiftLoading) return;
    setShiftLoading(true);
    try {
      const body = {};
      // Use detected mood key (happy, sad, etc.) not sentiment_label (positive, negative)
      body.mood_key = detectedMood?.key || 'relaxed';
      body.mode = 'shift';
      body.limit = format === 'single' ? 5 : 10;

      const res = await api.post('/recommendations/generate', body);
      const tracks = res.data?.recommendation?.tracks || [];
      setShiftTracks(tracks);
    } catch (err) {
      console.error('Shift request failed:', err);
    } finally {
      setShiftLoading(false);
    }
  }, [moodResult, shiftLoading, detectedMood, format]);

  // Collaborative filtering: after 3 dislikes, re-generate
  const handleDislike = useCallback(async () => {
    const newCount = dislikeCount + 1;
    setDislikeCount(newCount);
    if (newCount >= 3 && moodResult) {
      setDislikeCount(0);
      try {
        const body = {};
        if (moodResult.sentiment_label) {
          body.mood_key = moodResult.sentiment_label;
        } else if (moodResult.raw_text) {
          body.text = moodResult.raw_text;
        }
        body.mode = 'match';
        body.limit = format === 'single' ? 5 : 10;

        const res = await api.post('/recommendations/generate', body);
        const data = res.data;
        const newTracks = data.recommendation?.tracks || [];
        // Merge: keep non-disliked existing, add new ones
        setMatchTracks(prev => {
          const existing = prev.filter(t => !document.querySelector(`.a-song__act--disliked[data-id="${t.spotify_track_id}"]`));
          const existingIds = new Set(existing.map(t => t.spotify_track_id));
          const fresh = newTracks.filter(t => !existingIds.has(t.spotify_track_id));
          return [...existing, ...fresh].slice(0, 20);
        });
        if (data.recommendation?.id) setRecId(data.recommendation.id);
      } catch (err) {
        console.error('Collab re-generate failed:', err);
      }
    }
  }, [dislikeCount, moodResult, format]);

  const hasResult = detectedMood && matchTracks.length > 0;
  const showHero = !tab && !hasResult && !busy;
  const showContent = !!tab && !hasResult && !busy;

  return (
    <div className="analysis-page">

      {/* ── HERO: Format Toggle + Method Selector ─────────── */}
      {showHero && (
        <div className="a-hero">
          <div className="a-hero__header">
            <div className="a-hero__sub">ARIA ANALİZ</div>
            <h1 className="a-hero__title">Nasıl hissediyorsun?</h1>
          </div>

          <div className="a-toggle">
            <button className={`a-toggle__btn ${format === 'single' ? 'a-toggle__btn--active' : ''}`}
              onClick={() => setFormat('single')}>Tek Şarkı</button>
            <button className={`a-toggle__btn ${format === 'playlist' ? 'a-toggle__btn--active' : ''}`}
              onClick={() => setFormat('playlist')}>Playlist</button>
          </div>

          {format && (
            <div className="a-bento">
              {TAB_META.map((t,i) => (
                <button key={t.id} onClick={()=>setTab(t.id)} className="a-bento__card"
                  style={{animationDelay:`${i*.08}s`}}>
                  <div className="a-bento__icon">
                    {t.id==='chart'&&<IBarChart size={24} color="var(--lavender)"/>}
                    {t.id==='text'&&<IBrain size={24} color="var(--lavender)"/>}
                    {t.id==='bubbles'&&<ISparkles size={24} color="var(--lavender)"/>}
                  </div>
                  <div className="a-bento__label">{t.label}</div>
                  <div className="a-bento__desc">{t.desc}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ── SMALL TAB BAR + CONTENT ───────────────────────── */}
      {showContent && (
        <div style={{animation:'a-cardIn .3s ease both'}}>
          <div className="a-tabs">
            {TAB_META.map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)}
                className={`a-tabs__btn ${tab===t.id ? 'a-tabs__btn--on' : ''}`}>
                {t.id==='chart'&&<IBarChart size={13}/>}
                {t.id==='text'&&<IBrain size={13}/>}
                {t.id==='bubbles'&&<ISparkles size={13}/>}
                {t.label}
              </button>
            ))}
            <button onClick={()=>setTab(null)} className="a-tabs__back">← Geri</button>
          </div>

          <div style={{animation:'a-cardIn .25s ease both'}}>
            {tab==='chart'   && <ChartTab onSelect={id=>analyze(id)}/>}
            {tab==='bubbles' && <BubblesTab onSelect={id=>analyze(id)}/>}
            {tab==='text'    && <TextTab text={text} setText={setText} onAnalyze={()=>analyze(null)} canAnalyze={!!text.trim()} busy={busy}/>}
          </div>
        </div>
      )}

      {/* ── LOADING ───────────────────────────────────────── */}
      {busy && (
        <div className="a-loading">
          <Spinner size={40}/>
          <p style={{color:'var(--text-secondary)',fontSize:'0.92rem'}}>Analiz ediliyor...</p>
          <p style={{color:'var(--text-tertiary)',fontSize:'0.78rem'}}>AI duygu analizi ve Qdrant şarkı eşleşmesi yapılıyor</p>
        </div>
      )}

      {/* ── ERROR ─────────────────────────────────────────── */}
      {error && !busy && (
        <div className="a-loading">
          <div style={{color:'var(--matte-rust)',fontSize:'1.1rem',fontWeight:700,marginBottom:8}}>Hata</div>
          <p style={{color:'var(--text-secondary)',fontSize:'0.88rem',textAlign:'center',maxWidth:400}}>{error}</p>
          <button onClick={reset} className="a-btn" style={{width:'auto',padding:'10px 22px',marginTop:12}}>
            <IRefresh size={13}/> Tekrar Dene
          </button>
        </div>
      )}

      {/* ── RESULTS ───────────────────────────────────────── */}
      {hasResult && !busy && (
        <div className="a-results" style={{ paddingBottom: playingTrack ? 90 : 0 }}>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20}}>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <div style={{width:44,height:44,borderRadius:12,background:'rgba(198,166,255,0.08)',border:'1px solid rgba(198,166,255,0.18)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <detectedMood.Icon size={20} color="var(--lavender)"/>
              </div>
              <div>
                <div style={{fontFamily:"'Montserrat',sans-serif",fontWeight:900,fontSize:'1.2rem',color:'var(--lavender)'}}>
                  {detectedMood.label}
                </div>
                <div style={{fontSize:'0.72rem',color:'var(--text-tertiary)'}}>
                  {moodResult?.dominant_emotion && `Duygu: ${moodResult.dominant_emotion}`}
                  {moodResult?.energy != null && ` · Enerji: ${Math.round(moodResult.energy * 100)}%`}
                  {` · ${format === 'playlist' ? 'Playlist' : 'Tek şarkı'}`}
                </div>
              </div>
            </div>
            <button onClick={reset} className="a-btn" style={{width:'auto',padding:'8px 18px',fontSize:'0.82rem'}}>
              <IRefresh size={13}/> Yeniden Başla
            </button>
          </div>

          {moodResult?.valence != null && (
            <div className="a-results__bar">
              <div className="a-results__bar-fill" style={{width:`${Math.round(moodResult.valence * 100)}%`,background:'var(--lavender)'}}/>
            </div>
          )}

          <Results
            matchTracks={matchTracks}
            shiftTracks={shiftTracks}
            mode={mode}
            setMode={setMode}
            onPlay={setPlayingTrack}
            playingTrackId={playingTrack?.spotify_track_id}
            recId={recId}
            onDislike={handleDislike}
            shiftLoading={shiftLoading}
            onRequestShift={requestShift}
            moodKey={detectedMood?.key}
          />
        </div>
      )}

      {/* ── MINI PLAYER ───────────────────────────────────── */}
      <MiniPlayer track={playingTrack} onClose={() => setPlayingTrack(null)} />
    </div>
  );
}
