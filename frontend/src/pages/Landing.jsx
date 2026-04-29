import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Music, Brain, Sparkles, Heart, ArrowRight, Headphones, BarChart3, ListMusic, ChevronDown, Zap, Code2, Database, Cpu, Users } from 'lucide-react';

export default function Landing() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: Brain,
      title: 'Duygu Analizi',
      description: 'Yapay zeka ile yazdığın metinden ruh halini anlıyoruz. Üzgün mü, enerjik mi, odaklanmış mı — ARIA hepsini seziyor.',
      color: '#6C63FF'
    },
    {
      icon: Sparkles,
      title: 'Akıllı Kürasyon',
      description: 'RAG tabanlı öneri motoru, ruh haline göre sana özel müzik listesi oluşturuyor. Her an için doğru melodi.',
      color: '#FF6B9D'
    },
    {
      icon: ListMusic,
      title: 'Kişisel Kütüphane',
      description: 'Beğendiğin şarkıları kaydet, mood geçmişini takip et. Müzik zevkin bir hikaye anlatır — biz onu yazıyoruz.',
      color: '#4ECDC4'
    },
    {
      icon: Headphones,
      title: 'Spotify Entegrasyonu',
      description: 'Spotify hesabınla bağlan, önerileri doğrudan çalma listene ekle. Müziğin her yerden seninle.',
      color: '#1DB954'
    }
  ];

  const steps = [
    { 
      number: '01', 
      title: 'Hissettiklerini Yaz', 
      description: 'Bugün nasıl hissediyorsun? Birkaç cümle yaz, ARIA duygunu anlasın.',
      icon: Heart
    },
    { 
      number: '02', 
      title: 'AI Analiz Etsin', 
      description: 'Yapay zeka metni işler, duygu tonunu ve yoğunluğunu tespit eder.',
      icon: BarChart3
    },
    { 
      number: '03', 
      title: 'Müziğini Keşfet', 
      description: 'Ruh haline özel küratörlü şarkı listesi hazırlanır. Dinle, keşfet, kaydet.',
      icon: Music
    }
  ];

  const stats = [
    { value: '50K+', label: 'Şarkı Havuzu' },
    { value: '12', label: 'Duygu Kategorisi' },
    { value: '%94', label: 'Eşleşme Doğruluğu' },
    { value: '7/24', label: 'Erişim' }
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--color-void-eclipse)',
      color: 'var(--color-silver-mist)',
      overflowX: 'hidden'
    }}>
      {/* NAVBAR */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: '16px 40px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: scrollY > 50 ? 'rgba(11, 11, 11, 0.85)' : 'transparent',
        backdropFilter: scrollY > 50 ? 'blur(20px)' : 'none',
        borderBottom: scrollY > 50 ? '1px solid rgba(228, 228, 228, 0.05)' : 'none',
        transition: 'all 0.4s ease'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            background: 'var(--color-abyss-blue)',
            padding: '8px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px var(--color-abyss-glow)'
          }}>
            <Music size={20} color="var(--color-silver-mist)" />
          </div>
          <span className="text-gradient" style={{ fontSize: '1.4rem', fontWeight: '700' }}>ARIA</span>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'transparent',
              border: '1px solid rgba(228, 228, 228, 0.15)',
              color: 'var(--color-silver-mist)',
              padding: '10px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.9rem',
              fontWeight: '500',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-abyss-blue)';
              e.currentTarget.style.background = 'rgba(43, 57, 109, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(228, 228, 228, 0.15)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Giriş Yap
          </button>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
            style={{ padding: '10px 24px', fontSize: '0.9rem' }}
          >
            Başla
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: '120px 40px 80px',
        position: 'relative',
        background: 'radial-gradient(ellipse at top, rgba(43, 57, 109, 0.3) 0%, transparent 60%)'
      }}>
        {/* Animasyonlu arka plan partikülleri */}
        <div style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          pointerEvents: 'none'
        }}>
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: `${60 + i * 40}px`,
              height: `${60 + i * 40}px`,
              borderRadius: '50%',
              background: `radial-gradient(circle, rgba(43, 57, 109, ${0.08 - i * 0.01}) 0%, transparent 70%)`,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animation: `float ${6 + i * 2}s ease-in-out infinite alternate`,
              transform: `translateY(${scrollY * (0.1 + i * 0.05)}px)`
            }} />
          ))}
        </div>

        {/* Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(43, 57, 109, 0.15)',
          border: '1px solid rgba(43, 57, 109, 0.3)',
          borderRadius: '20px',
          padding: '8px 20px',
          marginBottom: '32px',
          fontSize: '0.85rem',
          color: '#8a9ee0',
          animation: 'fadeInDown 0.8s ease-out'
        }}>
          <Zap size={14} />
          RAG Tabanlı Yapay Zeka Destekli
        </div>

        <h1 style={{
          fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
          fontWeight: '800',
          lineHeight: '1.1',
          marginBottom: '24px',
          maxWidth: '800px',
          animation: 'fadeInUp 0.8s ease-out 0.2s both'
        }}>
          <span style={{
            background: 'linear-gradient(135deg, var(--color-silver-mist) 0%, #8a9ee0 50%, var(--color-abyss-blue) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Duyguna Göre
          </span>
          <br />
          Müzik Keşfet
        </h1>

        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.25rem)',
          color: 'rgba(228, 228, 228, 0.6)',
          maxWidth: '600px',
          lineHeight: '1.7',
          marginBottom: '40px',
          animation: 'fadeInUp 0.8s ease-out 0.4s both'
        }}>
          ARIA, yazdığın metinlerden ruh halini analiz eder ve sana özel müzik önerileri sunar. 
          Yapay zeka destekli duygu kürasyon sistemine hoş geldin.
        </p>

        <div style={{
          display: 'flex',
          gap: '16px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          animation: 'fadeInUp 0.8s ease-out 0.6s both'
        }}>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
            style={{
              padding: '16px 36px',
              fontSize: '1.05rem',
              borderRadius: '12px'
            }}
          >
            Hemen Başla <ArrowRight size={20} />
          </button>
          <button
            onClick={() => {
              document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              background: 'transparent',
              border: '1px solid rgba(228, 228, 228, 0.12)',
              color: 'var(--color-silver-mist)',
              padding: '16px 36px',
              borderRadius: '12px',
              fontSize: '1.05rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(228,228,228,0.3)';
              e.currentTarget.style.background = 'rgba(228,228,228,0.03)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(228,228,228,0.12)';
              e.currentTarget.style.background = 'transparent';
            }}
          >
            Keşfet <ChevronDown size={20} />
          </button>
        </div>

        {/* Scroll Indicator */}
        <div style={{
          position: 'absolute',
          bottom: '40px',
          animation: 'bounce 2s ease-in-out infinite'
        }}>
          <ChevronDown size={28} color="rgba(228,228,228,0.3)" />
        </div>
      </section>

      {/* STATS BAR */}
      <section style={{
        padding: '40px',
        borderTop: '1px solid rgba(228, 228, 228, 0.05)',
        borderBottom: '1px solid rgba(228, 228, 228, 0.05)',
        background: 'rgba(43, 57, 109, 0.03)'
      }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '32px',
          textAlign: 'center'
        }}>
          {stats.map((stat, idx) => (
            <div key={idx}>
              <div style={{
                fontSize: '2.2rem',
                fontWeight: '800',
                background: 'linear-gradient(135deg, var(--color-silver-mist), #8a9ee0)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '4px'
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '0.9rem', color: 'rgba(228, 228, 228, 0.5)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section
        id="features"
        style={{
          padding: '100px 40px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <p style={{
            color: '#8a9ee0',
            fontSize: '0.85rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            marginBottom: '12px'
          }}>
            Özellikler
          </p>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '16px' }}>
            Neden <span style={{ color: '#8a9ee0' }}>ARIA</span>?
          </h2>
          <p style={{ color: 'rgba(228,228,228,0.5)', maxWidth: '500px', margin: '0 auto', lineHeight: '1.7' }}>
            Müzik sadece ses değil, bir his meselesidir. ARIA bunu anlıyor.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '24px'
        }}>
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  padding: '32px',
                  cursor: 'default',
                  transition: 'all 0.4s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.borderColor = `${feature.color}33`;
                  e.currentTarget.style.boxShadow = `0 12px 40px ${feature.color}15`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(228, 228, 228, 0.08)';
                  e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.37)';
                }}
              >
                {/* Arka plan glow efekti */}
                <div style={{
                  position: 'absolute',
                  top: '-20px',
                  right: '-20px',
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${feature.color}08, transparent 70%)`,
                  pointerEvents: 'none'
                }} />

                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: `${feature.color}15`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}>
                  <Icon size={24} color={feature.color} />
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '12px', fontWeight: '600' }}>
                  {feature.title}
                </h3>
                <p style={{ color: 'rgba(228,228,228,0.6)', lineHeight: '1.7', fontSize: '0.95rem' }}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="howItWorks"
        style={{
          padding: '100px 40px',
          background: 'radial-gradient(ellipse at bottom, rgba(43, 57, 109, 0.15) 0%, transparent 60%)'
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <p style={{
              color: '#8a9ee0',
              fontSize: '0.85rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              marginBottom: '12px'
            }}>
              Nasıl Çalışır?
            </p>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '16px' }}>
              3 Adımda <span style={{ color: '#8a9ee0' }}>Müzik Kürasyon</span>
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} style={{
                  display: 'flex',
                  gap: '32px',
                  alignItems: 'flex-start',
                  position: 'relative',
                  paddingBottom: idx < steps.length - 1 ? '48px' : '0'
                }}>
                  {/* Sol taraf: Numara ve çizgi */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    flexShrink: 0
                  }}>
                    <div style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '16px',
                      background: 'linear-gradient(135deg, var(--color-abyss-blue), #1a2240)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.1rem',
                      fontWeight: '700',
                      color: '#8a9ee0',
                      boxShadow: '0 0 20px var(--color-abyss-glow)',
                      position: 'relative',
                      zIndex: 2
                    }}>
                      {step.number}
                    </div>
                    {idx < steps.length - 1 && (
                      <div style={{
                        width: '2px',
                        flex: 1,
                        minHeight: '48px',
                        background: 'linear-gradient(to bottom, var(--color-abyss-blue), transparent)',
                        marginTop: '4px'
                      }} />
                    )}
                  </div>

                  {/* Sağ taraf: İçerik */}
                  <div className="glass-panel" style={{
                    padding: '28px',
                    flex: 1,
                    marginTop: '0'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                      <Icon size={20} color="#8a9ee0" />
                      <h3 style={{ fontSize: '1.15rem', fontWeight: '600' }}>{step.title}</h3>
                    </div>
                    <p style={{ color: 'rgba(228,228,228,0.6)', lineHeight: '1.7' }}>
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TECHNOLOGY */}
      <section
        id="tech"
        style={{
          padding: '100px 40px',
          background: 'radial-gradient(ellipse at top left, rgba(43, 57, 109, 0.1) 0%, transparent 70%)'
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <p style={{
              color: '#8a9ee0',
              fontSize: '0.85rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              marginBottom: '12px'
            }}>
              Teknoloji
            </p>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '16px' }}>
              <span style={{ color: '#8a9ee0' }}>Modern Stack</span> ile İnşa Edilmiş
            </h2>
            <p style={{ color: 'rgba(228,228,228,0.5)', maxWidth: '500px', margin: '0 auto', lineHeight: '1.7' }}>
              En son teknolojileri kullanarak, güvenilir ve hızlı bir platform oluşturduk.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px'
          }}>
            {[
              { name: 'React', desc: 'Frontend Framework', icon: Code2, color: '#61DAFB' },
              { name: 'Go Backend', desc: 'API & Microservices', icon: Cpu, color: '#00ADD8' },
              { name: 'PostgreSQL', desc: 'Veritabanı', icon: Database, color: '#336791' },
              { name: 'RAG AI', desc: 'Yapay Zeka Modeli', icon: Brain, color: '#FF6B9D' },
              { name: 'Spotify API', desc: 'Müzik Entegrasyonu', icon: Music, color: '#1DB954' },
              { name: 'Vite', desc: 'Build Tool', icon: Zap, color: '#646CFF' },
            ].map((tech, idx) => {
              const Icon = tech.icon;
              return (
                <div
                  key={idx}
                  className="glass-panel"
                  style={{
                    padding: '24px',
                    textAlign: 'center',
                    cursor: 'default',
                    transition: 'all 0.3s ease',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.borderColor = `${tech.color}33`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'rgba(228, 228, 228, 0.08)';
                  }}
                >
                  <Icon size={32} color={tech.color} style={{ margin: '0 auto 12px' }} />
                  <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '4px' }}>
                    {tech.name}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(228,228,228,0.5)' }}>
                    {tech.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section
        id="team"
        style={{
          padding: '100px 40px'
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <p style={{
              color: '#8a9ee0',
              fontSize: '0.85rem',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '3px',
              marginBottom: '12px'
            }}>
              Ekip
            </p>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '16px' }}>
              Arkadaki <span style={{ color: '#8a9ee0' }}>Yetenekli Ekip</span>
            </h2>
            <p style={{ color: 'rgba(228,228,228,0.5)', maxWidth: '500px', margin: '0 auto', lineHeight: '1.7' }}>
              Teknoloji ve müzik tutkunlarıyla oluşan, hayali gerçeğe dönüştüren ekip.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px'
          }}>
            {[
              {
                name: 'Bünyamin Başköy',
                role: 'Backend Lead & RAG Architect',
                specialty: 'Go, System Design',
                color: '#00ADD8'
              },
              {
                name: 'Mehmet Sait Dündar',
                role: 'AI & Vector Database Engineer',
                specialty: 'ML, Vektor DB, AI',
                color: '#FF6B9D'
              },
              {
                name: 'Fatma Şahin',
                role: 'Frontend Developer',
                specialty: 'React, UX/UI Design',
                color: '#61DAFB'
              },
              {
                name: 'Amir Şeyh Hadir',
                role: 'DevOps & Deployment',
                specialty: 'Docker, Cloud, CI/CD',
                color: '#1DB954'
              },
            ].map((member, idx) => (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  cursor: 'default',
                  transition: 'all 0.3s ease',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = `${member.color}33`;
                  e.currentTarget.style.boxShadow = `0 12px 40px ${member.color}15`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(228, 228, 228, 0.08)';
                  e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.37)';
                }}
              >
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: `linear-gradient(135deg, ${member.color}33, ${member.color}11)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: `2px solid ${member.color}33`,
                  marginBottom: '20px'
                }}>
                  <Users size={32} color={member.color} />
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: '600', marginBottom: '4px', color: member.color }}>
                  {member.name}
                </h3>
                <p style={{ fontSize: '0.9rem', color: 'rgba(228,228,228,0.7)', marginBottom: '12px', fontWeight: '500' }}>
                  {member.role}
                </p>
                <div style={{
                  display: 'inline-flex',
                  gap: '8px',
                  padding: '8px 12px',
                  borderRadius: '12px',
                  background: `${member.color}12`,
                  fontSize: '0.8rem',
                  color: member.color,
                  fontWeight: '500'
                }}>
                  {member.specialty}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        id="cta"
        style={{
          padding: '100px 40px',
          textAlign: 'center'
        }}
      >
        <div className="glass-panel" style={{
          maxWidth: '700px',
          margin: '0 auto',
          padding: '60px 40px',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Arka plan gradient */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at center, rgba(43, 57, 109, 0.15), transparent 70%)',
            pointerEvents: 'none'
          }} />

          <Music size={40} color="#8a9ee0" style={{ marginBottom: '24px' }} />
          <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '16px', position: 'relative' }}>
            Müziğini Hisset, <span style={{ color: '#8a9ee0' }}>ARIA</span>'ya Güven
          </h2>
          <p style={{
            color: 'rgba(228,228,228,0.5)',
            maxWidth: '500px',
            margin: '0 auto 32px',
            lineHeight: '1.7'
          }}>
            Yapay zeka destekli duygu kürasyon deneyimini keşfet. Sadece birkaç cümle yaz, sana özel müzikler dinle.
          </p>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
            style={{
              padding: '16px 40px',
              fontSize: '1.05rem',
              borderRadius: '12px',
              position: 'relative'
            }}
          >
            Ücretsiz Kaydol <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: '32px 40px',
        borderTop: '1px solid rgba(228, 228, 228, 0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: '0.85rem',
        color: 'rgba(228,228,228,0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Music size={16} />
          <span>ARIA © 2026</span>
        </div>
      </footer>

      {/* ANIMATIONS */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-12px);
          }
          60% {
            transform: translateY(-6px);
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          100% {
            transform: translateY(-30px);
          }
        }

        @media (max-width: 768px) {
          section {
            padding-left: 20px !important;
            padding-right: 20px !important;
          }
        }
      `}</style>
    </div>
  );
}
