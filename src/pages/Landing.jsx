import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IMusic, IArrowRight, IBrain, IHeart, IGithub, IUsers, ICode, IZap, IActivity } from '../components/Icons';

const DEMO_STATES = [
  { text: 'Bugün çok yorgunum, biraz melankolik hissediyorum...', mood: 'Melankolik', conf: 94, energy: 28 },
  { text: 'Spor salonundan çıktım, inanılmaz enerjik hissediyorum!', mood: 'Enerjik', conf: 91, energy: 93 },
  { text: 'Kahvemi aldım, derin odaklanma modundayım.', mood: 'Odaklanmış', conf: 88, energy: 62 },
  { text: 'Her şey harika gidiyor, kendimi çok mutlu hissediyorum!', mood: 'Mutlu', conf: 96, energy: 85 },
];

const WEEK = [
  { d: 'Pzt', v: 45 }, { d: 'Sal', v: 70 }, { d: 'Çar', v: 32 }, { d: 'Per', v: 88 },
  { d: 'Cum', v: 60 }, { d: 'Cmt', v: 92 }, { d: 'Paz', v: 55 },
];

const CONTRIBUTORS = [
  { name: 'Bünyamin Başkoy', role: 'Backend Developer', focus: 'Go Gin, Backend, PostgreSQL, Sistem Mimarisi', avatar: 'BB', color: '#6E6AFF' },
  { name: 'Sait Dündar', role: 'ML & Search Engineer', focus: 'RAG Pipeline, Embedding, Qdrant', avatar: 'SD', color: '#3DD68C' },
  { name: 'Fatma Şahin', role: 'Frontend Developer', focus: 'Frontend UI/UX', avatar: 'FŞ', color: '#EC4899' },
  { name: 'Amir Najafi', role: 'Backend Developer', focus: 'Go Gin, Backend, PostgreSQL, Sistem Mimarisi', avatar: 'AN', color: '#F5A623' },
];

const TECH_GROUPS = [
  {
    label: 'Frontend', color: '#61DAFB',
    gridColumn: '1', gridRow: '1', logoLayout: 'row',
    techs: [
      { name: 'React', slug: 'react', color: '#61DAFB' },
      { name: 'Vite', slug: 'vite', color: '#646CFF' },
    ],
  },
  {
    label: 'ML / AI', color: '#A78BFA',
    gridColumn: '2', gridRow: '1', logoLayout: 'row',
    techs: [
      { name: 'Python', slug: 'python', color: '#3776AB' },
      { name: 'FastAPI', slug: 'fastapi', color: '#009688' },
      { name: 'Qwen', slug: null, color: '#6F5AF6' },
    ],
  },
  {
    label: 'Backend', color: '#00ADD8',
    gridColumn: '1 / 3', gridRow: '2', logoLayout: 'row',
    techs: [
      { name: 'Go', slug: 'go', color: '#00ADD8' },
      { name: 'PostgreSQL', slug: 'postgresql', color: '#4169E1' },
      { name: 'Redis', slug: 'redis', color: '#DC382D' },
    ],
  },
  {
    label: 'Database', color: '#EC4899',
    gridColumn: '3', gridRow: '1 / 3', logoLayout: 'col',
    techs: [
      { name: 'PostgreSQL', slug: 'postgresql', color: '#4169E1' },
      { name: 'Qdrant', slug: null, color: '#FF3E6C' },
    ],
  },
  {
    label: 'Other', color: '#3DD68C',
    gridColumn: '4', gridRow: '1 / 3', logoLayout: 'col',
    techs: [
      { name: 'Docker', slug: 'docker', color: '#2496ED' },
      { name: 'Spotify', slug: 'spotify', color: '#1DB954' },
    ],
  },
];

const REPO_STATS = [
  { label: 'Backend Repo', desc: 'Go API + PostgreSQL + Collaborative Filtering', lang: 'Go', langColor: '#00ADD8', files: '~40', loc: '~3K' },
  { label: 'Intelligence Repo', desc: 'RAG Pipeline + Embedding + LLM + Reranker', lang: 'Python', langColor: '#3572A5', files: '~25', loc: '~2K' },
  { label: 'Frontend Repo', desc: 'React UI + Custom Design System + SVG Icons', lang: 'JSX', langColor: '#F7DF1E', files: '~15', loc: '~2K' },
];

const NAV_TABS = [
  { id: 'lab', label: 'Laboratuvar' },
  { id: 'how', label: 'Nasıl Çalışır' },
  { id: 'tech', label: 'Teknoloji' },
  { id: 'contributors', label: 'Ekip' },
  { id: 'github', label: 'GitHub' },
];

function HeroDemoCard() {
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState('');

  useEffect(() => {
    const st = DEMO_STATES[idx];
    let i = 0; setTyped('');
    const iv = setInterval(() => {
      if (i <= st.text.length) { setTyped(st.text.slice(0, i)); i++; }
      else { clearInterval(iv); setTimeout(() => setIdx(p => (p + 1) % DEMO_STATES.length), 2000); }
    }, 38);
    return () => clearInterval(iv);
  }, [idx]);

  const cur = DEMO_STATES[idx];
  const circ = 2 * Math.PI * 24;

  return (
    <div className="sf2" style={{ padding: '24px', width: 340, userSelect: 'none' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
        <div style={{ display: 'flex', gap: 6 }}>
          {['#FF5A6A', '#F5A623', '#3DD68C'].map(c => (
            <div key={c} style={{ width: 8, height: 8, borderRadius: '50%', background: c, opacity: .7 }} />
          ))}
        </div>
        <span className="lbl">ARIA ANALİZ</span>
      </div>

      <div style={{ minHeight: 68, marginBottom: 18 }}>
        <p style={{ fontSize: '0.88rem', color: 'var(--t2)', lineHeight: 1.6, fontStyle: 'italic' }}>
          "{typed}<span style={{ animation: 'blink 1s steps(1) infinite', fontStyle: 'normal', color: 'var(--ac)' }}>|</span>"
        </p>
      </div>

      <div style={{ height: 1, background: 'var(--bd)', marginBottom: 16 }} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <span className="lbl" style={{ display: 'block', marginBottom: 4 }}>TESPİT</span>
          <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, fontSize: '1rem', color: 'var(--ac)' }}>
            {cur.mood}
          </span>
        </div>
        <div style={{ position: 'relative', width: 52, height: 52 }}>
          <svg viewBox="0 0 56 56" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
            <circle cx="28" cy="28" r="24" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
            <circle cx="28" cy="28" r="24" fill="none" stroke="var(--ac)"
              strokeWidth="4" strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={circ * (1 - cur.conf / 100)}
              style={{ transition: 'stroke-dashoffset .9s ease' }}
            />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="mono" style={{ fontSize: '0.72rem', color: 'var(--t1)', fontWeight: 600 }}>
              {cur.conf}%
            </span>
          </div>
        </div>
        <div style={{ width: 80 }}>
          <span className="lbl" style={{ display: 'block', marginBottom: 6 }}>ENERJİ</span>
          <div style={{ height: 4, background: 'rgba(255,255,255,0.07)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${cur.energy}%`, background: 'var(--ac)', borderRadius: 2, transition: 'width .9s ease' }} />
          </div>
          <span className="mono" style={{ fontSize: '0.7rem', color: 'var(--t3)', marginTop: 4, display: 'block' }}>{cur.energy}/100</span>
        </div>
      </div>
    </div>
  );
}

function BentoSection() {
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState('');

  useEffect(() => {
    const st = DEMO_STATES[idx]; let i = 0; setTyped('');
    const iv = setInterval(() => {
      if (i <= st.text.length) { setTyped(st.text.slice(0, i)); i++; }
      else { clearInterval(iv); setTimeout(() => setIdx(p => (p + 1) % DEMO_STATES.length), 2200); }
    }, 38);
    return () => clearInterval(iv);
  }, [idx]);

  const cur = DEMO_STATES[idx];
  const circ = 2 * Math.PI * 30;

  const cell = (extra = {}) => ({
    background: 'var(--sf)', border: '1px solid var(--bd)', borderRadius: 10,
    padding: 22, transition: 'border-color var(--tr)', ...extra
  });

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
      <div style={{ ...cell(), gridColumn: 'span 2', minHeight: 160 }}>
        <span className="lbl" style={{ display: 'block', marginBottom: 14 }}>CANLI GİRİŞ ANALİZİ</span>
        <p style={{ fontSize: '0.95rem', color: 'var(--t1)', lineHeight: 1.65, minHeight: 52, fontStyle: 'italic', opacity: .85 }}>
          "{typed}<span style={{ animation: 'blink 1s steps(1) infinite', fontStyle: 'normal', color: 'var(--ac)' }}>|</span>"
        </p>
        <div style={{ marginTop: 14, display: 'flex', gap: 6, alignItems: 'center' }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--ac)', animation: `dotPulse 1.2s ease ${i * .2}s infinite` }} />
          ))}
          <span className="lbl" style={{ marginLeft: 4 }}>İŞLENİYOR</span>
        </div>
      </div>

      <div style={{ ...cell(), display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
        <span className="lbl">GÜVEN</span>
        <div style={{ position: 'relative', width: 80, height: 80 }}>
          <svg viewBox="0 0 72 72" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
            <circle cx="36" cy="36" r="30" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
            <circle cx="36" cy="36" r="30" fill="none" stroke="var(--ac)"
              strokeWidth="5" strokeLinecap="round"
              strokeDasharray={circ} strokeDashoffset={circ * (1 - cur.conf / 100)}
              style={{ transition: 'stroke-dashoffset .9s ease' }} />
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <span className="mono" style={{ fontWeight: 700, fontSize: '1.3rem', color: 'var(--t1)', lineHeight: 1 }}>{cur.conf}</span>
            <span style={{ fontSize: '0.6rem', color: 'var(--t3)' }}>%</span>
          </div>
        </div>
        <span style={{ fontSize: '0.82rem', color: 'var(--ac)', fontFamily: "'Montserrat',sans-serif", fontWeight: 700 }}>{cur.mood}</span>
      </div>

      <div style={{ ...cell() }}>
        <span className="lbl" style={{ display: 'block', marginBottom: 14 }}>ENERJİ SEVİYESİ</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
          <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${cur.energy}%`, background: 'var(--ac)', borderRadius: 3, transition: 'width .9s ease' }} />
          </div>
          <span className="mono" style={{ fontSize: '0.78rem', color: 'var(--t1)', minWidth: 28 }}>{cur.energy}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.62rem', color: 'var(--t3)' }}>
          <span>Sakin</span><span>Orta</span><span>Yüksek</span>
        </div>
      </div>

      <div style={{ ...cell(), gridColumn: 'span 2' }}>
        <span className="lbl" style={{ display: 'block', marginBottom: 14 }}>HAFTALIK MOOD AKIŞI</span>
        <div style={{ display: 'flex', gap: 7, alignItems: 'flex-end', height: 64 }}>
          {WEEK.map((d, i) => (
            <div key={d.d} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
              <div style={{
                width: '100%', height: `${d.v * .64}px`,
                background: `rgba(110,106,255,${.2 + d.v / 200})`,
                border: '1px solid rgba(110,106,255,0.3)',
                borderRadius: '3px 3px 0 0',
                transformOrigin: 'bottom',
                animation: `barRise .6s ${i * .06}s cubic-bezier(.4,0,.2,1) both`,
              }} />
              <span style={{ fontSize: '0.6rem', color: 'var(--t3)' }}>{d.d}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Landing() {
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', fn, { passive: true });

    // Reveal animations
    const revealObs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); }),
      { threshold: .1 }
    );
    document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

    // Active section detection
    const sectionIds = ['lab', 'how', 'tech', 'contributors', 'github'];
    const sectionObs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            const matched = NAV_TABS.find(t => t.id === e.target.id);
            if (matched) setActiveTab(matched.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-60px 0px -40% 0px' }
    );
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) sectionObs.observe(el);
    });

    return () => { window.removeEventListener('scroll', fn); revealObs.disconnect(); sectionObs.disconnect(); };
  }, []);

  const go = () => navigate('/home');
  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setActiveTab(id); };

  return (
    <div style={{ background: 'var(--bg)', color: 'var(--t1)', overflowX: 'hidden' }}>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        padding: '0 56px', height: 60,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: scrollY > 50 ? 'rgba(10,10,16,0.92)' : 'transparent',
        borderBottom: scrollY > 50 ? '1px solid var(--bd)' : 'none',
        backdropFilter: scrollY > 50 ? 'blur(12px)' : 'none',
        transition: 'all .3s ease',
      }}>
        {/* Logo — text only, JetBrains Mono */}
        <span className="mono" style={{
          fontWeight: 700,
          fontSize: '1.4rem', letterSpacing: '-0.04em', color: 'var(--t1)',
          cursor: 'pointer', userSelect: 'none',
          background: 'linear-gradient(135deg, var(--t1) 0%, var(--ac) 100%)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          ARIA
        </span>

        {/* Center tabs */}
        <div style={{ display: 'flex', gap: 2, alignSelf: 'stretch', alignItems: 'flex-end' }}>
          {NAV_TABS.map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button key={tab.id} onClick={() => scrollTo(tab.id)} style={{
                padding: '0 14px', fontSize: '0.82rem', fontWeight: 500,
                color: isActive ? 'var(--t1)' : 'var(--t2)',
                background: 'none', borderRadius: 0,
                height: '100%',
                borderBottom: `3px solid ${isActive ? 'var(--ac)' : 'transparent'}`,
                transition: 'all var(--tr)', position: 'relative',
              }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--t1)'; e.currentTarget.style.borderBottomColor = 'var(--ac)'; }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = isActive ? 'var(--t1)' : 'var(--t2)';
                  e.currentTarget.style.borderBottomColor = isActive ? 'var(--ac)' : 'transparent';
                }}>
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Right buttons */}
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="btn-bd" style={{ padding: '8px 18px', fontSize: '0.84rem' }} onClick={go}>Giriş Yap</button>
          <button className="btn-ac" style={{ padding: '8px 18px', fontSize: '0.84rem' }} onClick={go}>Başla <IArrowRight size={14} /></button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: '100vh', display: 'grid', gridTemplateColumns: '55% 45%',
        padding: '0 0 0 56px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '100px 60px 80px 0', animation: 'slideUp .6s ease both' }}>
          <span className="lbl" style={{ marginBottom: 24 }}>RAG TABANLI DUYGU ANALİZİ · 2026</span>
          <h1 style={{
            fontSize: 'clamp(4rem,9vw,8rem)', fontWeight: 900, lineHeight: .98,
            marginBottom: 32, letterSpacing: '-0.05em',
            fontFamily: "'Montserrat',sans-serif", color: 'var(--t1)',
          }}>
            Duyguna<br />
            Göre<br />
            <span style={{ color: 'var(--ac)' }}>Müzik.</span>
          </h1>
          <p style={{ color: 'var(--t2)', fontSize: '1rem', lineHeight: 1.7, maxWidth: 400, marginBottom: 40 }}>
            Ruh halinizi anlık analiz eden, vektörel uzayda eşleştiren ve sizi en iyi ifade eden müzikleri bulan yapay zeka sistemi.
          </p>
          <div style={{ display: 'flex', gap: 10, marginBottom: 60 }}>
            <button className="btn-ac" style={{ padding: '12px 26px', fontSize: '0.92rem' }} onClick={go}>
              Yolculuğa Başla <IArrowRight size={16} />
            </button>
            <button className="btn-bd" style={{ padding: '12px 26px', fontSize: '0.92rem' }}
              onClick={() => scrollTo('lab')}>
              Nasıl Çalışır
            </button>
          </div>
          <div style={{ display: 'flex', gap: 40, borderTop: '1px solid var(--bd)', paddingTop: 28 }}>
            {[
              { v: '50K+', l: 'Şarkı' },
              { v: '%94', l: 'Doğruluk' },
              { v: '12', l: 'Duygu Modu' },
              { v: '7/24', l: 'Aktif' },
            ].map(s => (
              <div key={s.l}>
                <div className="mono" style={{ fontSize: '1.4rem', fontWeight: 600, color: 'var(--t1)', lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--t3)', marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 56px 80px 20px', animation: 'slideUp .6s .12s ease both' }}>
          <HeroDemoCard />
        </div>
      </section>

      {/* ── LABORATUVAR ── */}
      <section id="lab" style={{ padding: '100px 56px', maxWidth: 1100, margin: '0 auto' }}>
        <div className="sec-divider reveal">
          <span className="sec-num">01</span>
          <div className="sec-line" />
          <span className="sec-label">THE LABORATORY</span>
        </div>
        <div className="reveal" style={{ marginBottom: 48 }}>
          <h2 style={{ fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 900, marginBottom: 14 }}>
            Yapay Zeka<br />Çalışırken
          </h2>
          <p style={{ color: 'var(--t2)', maxWidth: 480, fontSize: '0.97rem' }}>
            Her kelimenizde saklı bir duygu var. ARIA bunu anlık olarak çözümler, güven skorunu hesaplar ve haftalık ruh hali haritanızı çıkarır.
          </p>
        </div>
        <div className="reveal"><BentoSection /></div>
      </section>

      {/* ── NASIL ÇALIŞIR ── */}
      <section id="how" style={{ padding: '100px 56px', borderTop: '1px solid var(--bd)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="sec-divider reveal">
            <span className="sec-num">02</span>
            <div className="sec-line" />
            <span className="sec-label">NASIL ÇALIŞIR</span>
          </div>

          <div className="reveal" style={{ marginBottom: 56 }}>
            <h2 style={{ fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 900, marginBottom: 14 }}>
              İster Yaz İster Tıkla.<br /><span style={{ color: 'var(--ac)' }}>Gerisini Biz Hallederiz.</span>
            </h2>
          </div>

          {/* 3 step cards */}
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 64 }}>
            {[
              { n: '01', Icon: IHeart, color: '#EC4899', title: 'Yaz', hint: 'Ne hissediyorsun?' },
              { n: '02', Icon: IBrain, color: '#6E6AFF', title: 'Analiz', hint: 'RAG + Vektör + LLM' },
              { n: '03', Icon: IMusic, color: '#3DD68C', title: 'Playlist', hint: 'Sana özel, anında.' },
            ].map((s, i, arr) => (
              <div key={s.n} style={{ position: 'relative', display: 'flex', alignItems: 'stretch', gap: 0 }}>
                <div style={{
                  flex: 1, padding: '32px 28px 28px',
                  border: `1.5px solid ${s.color}30`,
                  borderRadius: 16,
                  background: `linear-gradient(135deg, ${s.color}08 0%, transparent 60%)`,
                  display: 'flex', flexDirection: 'column', gap: 16,
                  transition: 'all var(--tr)',
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = s.color + '60'; e.currentTarget.style.boxShadow = `0 0 32px ${s.color}15`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = s.color + '30'; e.currentTarget.style.boxShadow = 'none'; }}>
                  {/* Step badge + icon */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{
                      fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.12em',
                      color: s.color, fontFamily: "'Montserrat',sans-serif",
                    }}>{s.n}</span>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: s.color + '15', border: `1px solid ${s.color}30`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <s.Icon size={20} color={s.color} />
                    </div>
                  </div>
                  {/* Title */}
                  <div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--t1)', marginBottom: 4, fontFamily: "'Montserrat',sans-serif" }}>{s.title}</h3>
                    <p style={{ fontSize: '0.82rem', color: 'var(--t3)', margin: 0 }}>{s.hint}</p>
                  </div>
                </div>
                {/* Arrow connector */}
                {i < arr.length - 1 && (
                  <div style={{
                    position: 'absolute', right: -20, top: '50%', transform: 'translateY(-50%)',
                    zIndex: 2, color: 'var(--t3)', display: 'flex', alignItems: 'center',
                  }}>
                    <IArrowRight size={16} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Visual pipeline flow */}
          <div className="reveal">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40 }}>
              <span className="lbl">PİPELİNE</span>
              <div style={{ flex: 1, height: 1, background: 'var(--bd)' }} />
            </div>

            {/* Nodes */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 0, position: 'relative' }}>
              {/* connecting line behind nodes */}
              <div style={{
                position: 'absolute', top: 36, left: 36, right: 36, height: 1,
                background: 'linear-gradient(to right, #EC489940, #6E6AFF40, #A78BFA40, #3DD68C40, #F5A62340)',
                zIndex: 0,
              }} />

              {[
                { label: 'Metin', sub: 'Duygu girişi', color: '#EC4899', symbol: '✍' },
                { label: 'Vektör', sub: 'BAAI/bge-m3 · 1024d', color: '#6E6AFF', symbol: '[ ]' },
                { label: 'Qdrant', sub: 'Cosine · top_k 50', color: '#A78BFA', symbol: 'Q' },
                { label: 'Reranker', sub: 'CrossEncoder', color: '#3DD68C', symbol: '↕' },
                { label: 'Qwen 2.5', sub: 'Final kürasyon', color: '#F5A623', symbol: '✦' },
                { label: 'Playlist', sub: '5 şarkı · anında', color: '#EC4899', symbol: '♪' },
              ].map((node, i) => (
                <div key={node.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, position: 'relative', zIndex: 1, flex: 1 }}>
                  {/* Circle node */}
                  <div style={{
                    width: 72, height: 72, borderRadius: '50%',
                    background: `radial-gradient(circle at 35% 35%, ${node.color}25, ${node.color}08)`,
                    border: `2px solid ${node.color}50`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: node.symbol === '[ ]' ? '0.7rem' : '1.3rem',
                    color: node.color,
                    fontFamily: node.symbol === '[ ]' ? "'JetBrains Mono', monospace" : 'inherit',
                    fontWeight: 700,
                    boxShadow: `0 0 20px ${node.color}15`,
                    transition: 'all var(--tr)',
                  }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 32px ${node.color}40`; e.currentTarget.style.borderColor = node.color + '90'; e.currentTarget.style.transform = 'scale(1.1)'; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = `0 0 20px ${node.color}15`; e.currentTarget.style.borderColor = node.color + '50'; e.currentTarget.style.transform = 'none'; }}>
                    {node.symbol === '[ ]'
                      ? <span style={{ fontSize: '0.6rem', letterSpacing: 3, color: node.color }}>●◆▲●</span>
                      : node.symbol}
                  </div>
                  {/* Label */}
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.78rem', fontWeight: 800, color: 'var(--t1)', fontFamily: "'Montserrat',sans-serif" }}>{node.label}</div>
                    <div style={{ fontSize: '0.62rem', color: 'var(--t3)', marginTop: 2, lineHeight: 1.4 }}>{node.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── TEKNOLOJİ ── */}
      <section id="tech" style={{ padding: '100px 56px', borderTop: '1px solid var(--bd)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="sec-divider reveal">
            <span className="sec-num">03</span>
            <div className="sec-line" />
            <span className="sec-label">TEKNOLOJİ</span>
          </div>
          <div className="reveal" style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 900, marginBottom: 14 }}>
              Arkasındaki<br />Teknoloji
            </h2>
            <p style={{ color: 'var(--t2)', maxWidth: 520, fontSize: '0.97rem' }}>
              Modern yapay zeka, vektörel arama ve mikro servis mimarisi ile inşa edildi. Her katman belirli bir sorumluluğa sahip.
            </p>
          </div>

          <div className="reveal" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1.2fr 1fr',
            gridTemplateRows: '200px 220px',
            gap: 12,
          }}>
            {TECH_GROUPS.map((group, gi) => (
              <div key={group.label} style={{
                gridColumn: group.gridColumn,
                gridRow: group.gridRow,
                border: `1.5px solid ${group.color}35`,
                borderRadius: 14,
                background: `linear-gradient(135deg, ${group.color}07 0%, transparent 70%)`,
                display: 'flex', flexDirection: 'column',
                padding: '16px 18px',
                gap: 10,
                transition: 'border-color var(--tr), box-shadow var(--tr)',
                animation: `pageIn .4s ${gi * .08}s both`,
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = group.color + '65'; e.currentTarget.style.boxShadow = `0 0 28px ${group.color}18`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = group.color + '35'; e.currentTarget.style.boxShadow = 'none'; }}>

                {/* Label */}
                <span style={{
                  fontSize: '0.63rem', fontWeight: 800, letterSpacing: '0.12em',
                  color: group.color, textTransform: 'uppercase',
                  fontFamily: "'Montserrat',sans-serif",
                }}>{group.label}</span>

                {/* Logos */}
                <div style={{
                  flex: 1, display: 'flex', gap: 20,
                  flexDirection: group.logoLayout === 'col' ? 'column' : 'row',
                  alignItems: 'center',
                  justifyContent: group.techs.length === 1 ? 'center' : 'space-evenly',
                }}>
                  {group.techs.map(tech => (
                    <div key={tech.name} style={{
                      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9,
                    }}>
                      <div style={{
                        width: 64, height: 64,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: tech.color + '10', borderRadius: 16,
                        border: `1px solid ${tech.color}22`,
                        transition: 'all var(--tr)',
                      }}
                        onMouseEnter={e => { e.currentTarget.style.background = tech.color + '20'; e.currentTarget.style.transform = 'scale(1.08)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = tech.color + '10'; e.currentTarget.style.transform = 'none'; }}>
                        {tech.slug ? (
                          <img
                            src={`https://cdn.simpleicons.org/${tech.slug}/${tech.color.replace('#', '')}`}
                            alt={tech.name} width={36} height={36}
                            style={{ objectFit: 'contain' }}
                          />
                        ) : (
                          <span style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: '1.8rem', color: tech.color }}>{tech.name[0]}</span>
                        )}
                      </div>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--t2)' }}>{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>


        </div>
      </section>

      {/* ── EKİP / CONTRIBUTORS ── */}
      <section id="contributors" style={{ padding: '100px 56px', borderTop: '1px solid var(--bd)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="sec-divider reveal">
            <span className="sec-num">04</span>
            <div className="sec-line" />
            <span className="sec-label">EKİP</span>
          </div>
          <div className="reveal" style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 900, marginBottom: 14 }}>
              Arkasındaki<br />İnsanlar
            </h2>
            <p style={{ color: 'var(--t2)', maxWidth: 480, fontSize: '0.97rem' }}>
              Dört kişilik ekip — her biri farklı bir uzmanlık alanından. Birlikte ARIA'yı sıfırdan inşa ettik.
            </p>
          </div>

          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            {CONTRIBUTORS.map((c, ci) => (
              <div key={c.name} className="sf" style={{
                padding: '28px 22px', textAlign: 'center',
                animation: `pageIn .4s ${ci * .08}s both`,
              }}>
                {/* Avatar */}
                <div style={{
                  width: 72, height: 72, borderRadius: '50%', margin: '0 auto 18px',
                  background: c.color + '18', border: `2px solid ${c.color}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Montserrat',sans-serif", fontWeight: 900, fontSize: '1.3rem',
                  color: c.color, letterSpacing: '-0.03em',
                }}>
                  {c.avatar}
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: 4, fontFamily: "'Montserrat',sans-serif" }}>{c.name}</h3>
                <div style={{
                  display: 'inline-block', padding: '3px 10px', borderRadius: 4,
                  background: c.color + '18', border: `1px solid ${c.color}30`,
                  color: c.color, fontSize: '0.7rem', fontWeight: 600, marginBottom: 14,
                }}>{c.role}</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--t2)', lineHeight: 1.5 }}>{c.focus}</p>
              </div>
            ))}
          </div>

          {/* Team stats */}
          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 20 }}>
            {[
              { v: '4', l: 'Geliştirici', Icon: IUsers },
              { v: '3', l: 'Repository', Icon: ICode },
              { v: '7K+', l: 'Satır Kod', Icon: IActivity },
              { v: '14', l: 'Hafta Sprint', Icon: IZap },
            ].map((s, i) => (
              <div key={s.l} className="sf" style={{
                padding: '20px', display: 'flex', alignItems: 'center', gap: 14,
                animation: `pageIn .35s ${i * .06}s both`,
              }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 8, background: 'var(--ac-d)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <s.Icon size={17} color="var(--ac)" />
                </div>
                <div>
                  <div className="mono" style={{ fontSize: '1.4rem', fontWeight: 600, lineHeight: 1 }}>{s.v}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--t3)', marginTop: 2 }}>{s.l}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GITHUB ── */}
      <section id="github" style={{ padding: '100px 56px', borderTop: '1px solid var(--bd)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="sec-divider reveal">
            <span className="sec-num">05</span>
            <div className="sec-line" />
            <span className="sec-label">OPEN SOURCE</span>
          </div>
          <div className="reveal" style={{ marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(2rem,4vw,3.2rem)', fontWeight: 900, marginBottom: 14 }}>
              Açık Kaynak<br />Kod
            </h2>
            <p style={{ color: 'var(--t2)', maxWidth: 520, fontSize: '0.97rem' }}>
              ARIA tamamen açık kaynak. Tüm kaynak kodu GitHub'da. İnceleyebilir, katkıda bulunabilir ya da fork'layıp kendi versiyonunuzu oluşturabilirsiniz.
            </p>
          </div>

          <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {REPO_STATS.map((repo, ri) => (
              <div key={repo.label} className="sf" style={{
                padding: '24px', animation: `pageIn .4s ${ri * .08}s both`,
                cursor: 'pointer', transition: 'all var(--tr)',
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <IGithub size={18} color="var(--t1)" />
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 800, fontFamily: "'Montserrat',sans-serif" }}>{repo.label}</h3>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--t2)', lineHeight: 1.5, marginBottom: 18 }}>{repo.desc}</p>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: repo.langColor }} />
                    <span style={{ fontSize: '0.76rem', color: 'var(--t2)' }}>{repo.lang}</span>
                  </div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--t3)' }}>{repo.files} dosya</span>
                  <span style={{ fontSize: '0.72rem', color: 'var(--t3)' }}>{repo.loc} satır</span>
                </div>
              </div>
            ))}
          </div>

          {/* Commit activity visualization */}
          <div className="reveal sf" style={{ marginTop: 20, padding: '24px 28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <span className="lbl">SON AKTİVİTE</span>
              <span style={{ fontSize: '0.76rem', color: 'var(--t3)' }}>Son 7 gün</span>
            </div>
            <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 56 }}>
              {[8, 14, 5, 22, 11, 17, 9, 13, 6, 20, 15, 3, 18, 10, 25, 7, 12, 19, 4, 16, 21].map((v, i) => (
                <div key={i} style={{
                  flex: 1, height: `${v * 2.2}px`,
                  background: `rgba(110,106,255,${.15 + v / 60})`,
                  border: '1px solid rgba(110,106,255,.2)',
                  borderRadius: '2px 2px 0 0', transformOrigin: 'bottom',
                  animation: `barRise .5s ${i * .03}s ease both`,
                }} />
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: '0.65rem', color: 'var(--t3)' }}>
              <span>7 gün önce</span>
              <span>Bugün</span>
            </div>
          </div>

          {/* GitHub CTA */}
          <div className="reveal" style={{ textAlign: 'center', marginTop: 36 }}>
            <a href="https://github.com/bunyaminbaskoy" target="_blank" rel="noopener noreferrer"
              className="btn-bd" style={{ padding: '12px 28px', fontSize: '0.9rem', gap: 10 }}>
              <IGithub size={17} /> GitHub'da İncele <IArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 56px', borderTop: '1px solid var(--bd)', textAlign: 'center' }}>
        <div className="reveal" style={{ maxWidth: 560, margin: '0 auto' }}>
          <span className="lbl" style={{ display: 'block', marginBottom: 20 }}>HAZIR MISIN?</span>
          <h2 style={{ fontSize: 'clamp(2.2rem,5vw,3.8rem)', fontWeight: 900, marginBottom: 20, lineHeight: 1.05 }}>
            Duygularına<br />Bir Ses Ver.
          </h2>
          <p style={{ color: 'var(--t2)', marginBottom: 36, fontSize: '0.97rem' }}>
            Sadece birkaç cümle. ARIA gerisini halleder.
          </p>
          <button className="btn-ac" style={{ padding: '14px 32px', fontSize: '0.97rem', borderRadius: 9 }} onClick={go}>
            ARIA ile Başla <IArrowRight size={17} />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: '24px 56px', borderTop: '1px solid var(--bd)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: 'var(--t3)' }}>
          <IMusic size={13} /> ARIA © 2026
        </div>
        <span style={{ fontSize: '0.78rem', color: 'var(--t3)' }}>Bünyamin · Sait · Fatma · Amir</span>
      </footer>
    </div>
  );
}
