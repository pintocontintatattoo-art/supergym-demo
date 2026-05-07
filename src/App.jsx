import { useState, useEffect, useRef } from 'react'

/* ─────────────────────────────────────────
   DESIGN TOKENS
───────────────────────────────────────── */
const T = {
  cyan:    '#00d4d4',
  bg:      '#080808',
  bgCard:  '#111111',
  bgNav:   '#0b0b0b',
  border:  '#1c1c1c',
  muted:   '#444444',
  mutedLt: '#888888',
}

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const BRANDS = {
  A: ['Alani Nu', 'Alpha Lion', 'Applied Nutrition'],
  B: ['BPI Sports', 'BSN', 'Bulk Powders', 'BodyTech'],
  C: ['Cellucor', 'Core Nutritionals', 'Crazy Nutrition'],
  D: ['Dark Labs', 'Dymatize'],
  E: ['EHP Labs', 'Evlution Nutrition', 'Elite Labs'],
  F: ['Finaflex', 'Force Factor'],
  G: ['Ghost', 'GNC', 'Gorilla Mind'],
  H: ['Halo Sport', 'HighKey Protein'],
  I: ['ICON Meals', 'Isopure'],
  J: ['Jarrow Formulas', 'Jocko Fuel'],
  K: ['Kaged Muscle', 'Klean Athlete'],
  L: ['Legion Athletics', 'Lifted Naturals'],
  M: ['MusclePharm', 'Muscletech', 'MYPROTEIN'],
  N: ['NutraBio', 'Nutrabolt'],
  O: ['Olympus Labs', 'Optimum Nutrition', 'OxySHRED'],
  P: ['PEScience', 'Primeval Labs', 'ProSupps'],
  R: ['Redcon1', 'Rule One Proteins'],
  S: ['Six Star Pro', 'Swolverine'],
  T: ['Transparent Labs', 'True Nutrition'],
  V: ['Vega Sport', 'Vital Proteins'],
  W: ['Warrior Supplements', 'Whey Protein Co.'],
}

const BRAND_LOGOS = [
  'Optimum Nutrition', 'Ghost', 'Cellucor', 'Dymatize',
  'MusclePharm', 'BSN', 'Kaged', 'Redcon1',
  'Transparent Labs', 'EHP Labs', 'Legion', 'MYPROTEIN',
  'Gorilla Mind', 'PEScience',
]

const CATEGORIES = [
  'Proteínas',
  'Rendimiento',
  'Pérdida de Peso',
  'Vitaminas / Salud',
  'Comida',
  'Ropa / Accesorios',
  'Compra Rápida',
]

const TICKER_ITEMS = [
  ['🚚', 'Envío gratis en compras mayores a $999 MXN'],
  ['⚡', 'Envío express 24 hrs disponible en CDMX y ZM'],
  ['💳', 'Hasta 12 meses sin intereses con tarjetas participantes'],
  ['🏆', '+50 marcas internacionales siempre en stock'],
  ['🎁', 'Envíos a toda la República Mexicana'],
  ['🔒', 'Compra 100% segura y garantizada'],
]

const HERO_SLIDES = [
  {
    badge:     'NUEVO LANZAMIENTO',
    line1:     'SUPERA TUS',
    line2:     'LÍMITES',
    sub:       'Suplementos de élite para atletas de alto rendimiento. Calidad certificada, resultados reales.',
    cta:       'VER COLECCIÓN',
    accentHex: '#00d4d4',
    tag:       'NEW',
  },
  {
    badge:     'TOP VENTAS 2025',
    line1:     'DEFINE TU',
    line2:     'MEJOR VERSIÓN',
    sub:       'Whey Protein · Pre-Entreno · Creatina · Quemadores. Todo lo que necesitas en un solo lugar.',
    cta:       'EXPLORAR',
    accentHex: '#00d4d4',
    tag:       'TOP',
  },
  {
    badge:     'OFERTA ESPECIAL',
    line1:     'HASTA',
    line2:     '40% OFF',
    sub:       'Las mejores marcas internacionales de nutrición deportiva a precios insuperables.',
    cta:       'APROVECHAR',
    accentHex: '#e53e3e',
    tag:       'SALE',
  },
]

const FEATURED_PRODUCTS = [
  { name: 'Gold Standard Whey', brand: 'Optimum Nutrition', price: '$899', oldPrice: '$1,099', badge: 'TOP VENTA', rating: 4.9, reviews: 2341, category: 'Proteína' },
  { name: 'Pre-Workout C4', brand: 'Cellucor', price: '$649', oldPrice: '$799', badge: 'OFERTA', rating: 4.7, reviews: 1876, category: 'Pre-entreno' },
  { name: 'Creatine Monohydrate', brand: 'Transparent Labs', price: '$499', oldPrice: null, badge: 'NUEVO', rating: 4.8, reviews: 934, category: 'Creatina' },
  { name: 'Burn Lab Pro', brand: 'EHP Labs', price: '$799', oldPrice: '$999', badge: 'HOT', rating: 4.6, reviews: 1203, category: 'Quemador' },
  { name: 'BCAA Energy', brand: 'EVL Nutrition', price: '$549', oldPrice: null, badge: null, rating: 4.5, reviews: 678, category: 'Aminoácidos' },
  { name: 'Whey Isolate', brand: 'Ghost', price: '$999', oldPrice: '$1,199', badge: 'TOP VENTA', rating: 4.9, reviews: 3102, category: 'Proteína' },
  { name: 'Flex Jogger Pro', brand: 'Gym Wear Co', price: '$599', oldPrice: '$749', badge: 'ROPA', rating: 4.4, reviews: 421, category: 'Ropa' },
  { name: 'Shaker Bottle 900ml', brand: 'Blender Bottle', price: '$249', oldPrice: null, badge: 'ACCESORIO', rating: 4.7, reviews: 2890, category: 'Accesorio' },
]

const SOCIAL_ITEMS = [
  { handle: '@fitlife_mx', followers: '1.2M', label: 'Influencer', color: '#1a1a2e' },
  { handle: '@gymrat_oficial', followers: '890K', label: 'Atleta', color: '#16213e' },
  { handle: '@nutricoach_pro', followers: '650K', label: 'Nutriólogo', color: '#0f3460' },
  { handle: '@powerlift_mx', followers: '2.1M', label: 'Powerlifter', color: '#1a1a2e' },
  { handle: '@shred_girls', followers: '780K', label: 'Fitness', color: '#16213e' },
]

/* ─────────────────────────────────────────
   GLOBAL CSS
───────────────────────────────────────── */
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Barlow+Condensed:wght@600;700;800;900&display=swap');

  .sg-ticker { animation: sgTick 42s linear infinite; display: inline-flex; white-space: nowrap; }
  @keyframes sgTick { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

  .sg-nav-btn {
    background: none; border: none; color: #999;
    font-family: 'Barlow Condensed', sans-serif; font-weight: 700;
    font-size: 15px; letter-spacing: 2px; padding: 0;
    display: flex; align-items: center; gap: 5px; cursor: pointer;
    transition: color .15s;
  }
  .sg-nav-btn:hover, .sg-nav-btn.sg-active { color: #00d4d4; }
  .sg-chevron { transition: transform .2s; }
  .sg-chevron.open { transform: rotate(180deg); }

  .sg-cat-btn {
    background: none; border: none; color: #888;
    font-family: 'Barlow', sans-serif; font-weight: 600;
    font-size: 12px; letter-spacing: .5px;
    padding: 0 16px; height: 100%; white-space: nowrap;
    transition: background .2s, color .2s; cursor: pointer;
  }
  .sg-cat-btn:hover { background: #00d4d4; color: #000; }

  .sg-icon-btn { background: none; border: none; color: #777; display: flex; align-items: center; transition: color .2s; padding: 0; cursor: pointer; }
  .sg-icon-btn:hover { color: #00d4d4; }

  .sg-brand { color: #777; font-family: 'Barlow', sans-serif; font-size: 12.5px; cursor: pointer; padding: 2.5px 0; display: block; transition: color .15s, transform .15s; }
  .sg-brand:hover { color: #00d4d4; transform: translateX(5px); }

  .sg-pill {
    background: #161616; border: 1px solid #222;
    padding: 8px 18px; cursor: pointer;
    font-family: 'Barlow Condensed', sans-serif; font-weight: 700;
    font-size: 11px; letter-spacing: 1.5px; color: #555;
    transition: border-color .2s, color .2s;
  }
  .sg-pill:hover { border-color: #00d4d4; color: #00d4d4; }

  .sg-cta-solid {
    background: #00d4d4; color: #000; border: 2px solid #00d4d4;
    font-family: 'Barlow Condensed', sans-serif; font-weight: 700;
    font-size: 13px; letter-spacing: 3px; padding: 14px 34px;
    cursor: pointer; transition: all .2s;
  }
  .sg-cta-solid:hover { background: transparent; color: #00d4d4; }

  .sg-cta-ghost {
    background: transparent; color: #fff; border: 2px solid #2a2a2a;
    font-family: 'Barlow Condensed', sans-serif; font-weight: 700;
    font-size: 13px; letter-spacing: 3px; padding: 14px 34px;
    cursor: pointer; transition: border-color .2s, color .2s;
  }
  .sg-cta-ghost:hover { border-color: #555; color: #ccc; }

  .sg-mega { animation: sgMegaIn .18s ease; }
  @keyframes sgMegaIn { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }

  .sg-dot { border: none; padding: 0; height: 7px; border-radius: 4px; transition: width .35s ease, background .35s ease; cursor: pointer; }

  .sg-arrow {
    background: rgba(0,0,0,.55); border: 1px solid #2a2a2a;
    color: #aaa; width: 44px; height: 44px;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; transition: all .2s; cursor: pointer;
  }
  .sg-arrow:hover { background: #00d4d4; border-color: #00d4d4; color: #000; }

  .sg-search-input {
    background: #181818; border: 1px solid #00d4d4; color: #fff;
    padding: 7px 14px; font-family: 'Barlow', sans-serif; font-size: 13px;
    outline: none; width: 230px;
  }
  .sg-search-input::placeholder { color: #3a3a3a; }

  .sg-grid-bg {
    background-image:
      linear-gradient(rgba(0,212,212,.022) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,212,212,.022) 1px, transparent 1px);
    background-size: 64px 64px;
  }

  .sg-prod-card {
    background: #111; border: 1px solid #1c1c1c;
    cursor: pointer; transition: border-color .2s, transform .2s;
  }
  .sg-prod-card:hover { border-color: #00d4d4; transform: translateY(-3px); }

  .sg-add-btn {
    background: transparent; border: 1px solid #2a2a2a; color: #888;
    font-family: 'Barlow Condensed', sans-serif; font-weight: 700;
    font-size: 11px; letter-spacing: 2px; padding: 8px 16px;
    cursor: pointer; transition: all .2s; width: 100%;
  }
  .sg-add-btn:hover { background: #00d4d4; border-color: #00d4d4; color: #000; }

  .sg-social-card {
    background: #111; border: 1px solid #1c1c1c; overflow: hidden;
    cursor: pointer; transition: border-color .2s;
  }
  .sg-social-card:hover { border-color: #00d4d4; }

  .sg-footer-input {
    background: #0a0a0a; border: 1px solid #2a2a2a; color: #fff;
    padding: 12px 16px; font-family: 'Barlow', sans-serif; font-size: 13px;
    outline: none; flex: 1;
  }
  .sg-footer-input::placeholder { color: #333; }
  .sg-footer-input:focus { border-color: #00d4d4; }

  .sg-footer-link { color: #555; font-family: 'Barlow', sans-serif; font-size: 13px; cursor: pointer; padding: 4px 0; display: block; transition: color .15s; }
  .sg-footer-link:hover { color: #00d4d4; }

  .sg-social-icon {
    width: 36px; height: 36px; border: 1px solid #222;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: border-color .2s, color .2s; color: #555;
  }
  .sg-social-icon:hover { border-color: #00d4d4; color: #00d4d4; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: #0a0a0a; }
  ::-webkit-scrollbar-thumb { background: #1e1e1e; border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: #00d4d4; }
`

/* ─────────────────────────────────────────
   SPLIT BRAND COLUMNS
───────────────────────────────────────── */
const brandEntries = Object.entries(BRANDS)
const perCol = Math.ceil(brandEntries.length / 4)
const BRAND_COLS = [
  brandEntries.slice(0, perCol),
  brandEntries.slice(perCol, perCol * 2),
  brandEntries.slice(perCol * 2, perCol * 3),
  brandEntries.slice(perCol * 3),
]

/* ─────────────────────────────────────────
   STAR RATING
───────────────────────────────────────── */
function Stars({ rating }) {
  return (
    <span style={{ color: '#f6c90e', fontSize: '12px', letterSpacing: '1px' }}>
      {'★'.repeat(Math.floor(rating))}{'☆'.repeat(5 - Math.floor(rating))}
    </span>
  )
}

/* ─────────────────────────────────────────
   INFO BAR
───────────────────────────────────────── */
function InfoBar() {
  return (
    <div style={{ background: '#0a0a0a', borderBottom: `1px solid ${T.border}`, height: '36px', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
      <div className="sg-ticker">
        {[0, 1].map(rep => (
          <span key={rep} style={{ display: 'inline-flex', alignItems: 'center' }}>
            {TICKER_ITEMS.map(([icon, text], j) => (
              <span key={j} style={{ display: 'inline-flex', alignItems: 'center' }}>
                <span style={{ color: T.cyan, fontFamily: 'Barlow, sans-serif', fontWeight: 600, fontSize: '12px', letterSpacing: '.3px', padding: '0 24px' }}>
                  {icon}&nbsp;&nbsp;{text}
                </span>
                <span style={{ color: '#1e1e1e', fontSize: '20px' }}>│</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   MEGA MENUS
───────────────────────────────────────── */
function MegaMarcas() {
  const total = Object.values(BRANDS).flat().length
  return (
    <div className="sg-mega" style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#111', borderTop: `2px solid ${T.cyan}`, boxShadow: '0 28px 80px rgba(0,0,0,.95)', zIndex: 900 }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '28px 40px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '22px' }}>
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '19px', letterSpacing: '4px', color: T.cyan }}>
            TODAS LAS MARCAS
          </span>
          <div style={{ flex: 1, height: '1px', background: T.border }} />
          <span style={{ fontFamily: 'Barlow, sans-serif', fontSize: '10.5px', color: '#333', letterSpacing: '2.5px' }}>
            {total} MARCAS DISPONIBLES
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0 28px', marginBottom: '26px' }}>
          {BRAND_COLS.map((col, ci) => (
            <div key={ci}>
              {col.map(([letter, items]) => (
                <div key={letter} style={{ marginBottom: '14px' }}>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '28px', color: T.cyan, lineHeight: 1, borderBottom: `1px solid ${T.border}`, paddingBottom: '3px', marginBottom: '5px' }}>
                    {letter}
                  </div>
                  {items.map(b => <span key={b} className="sg-brand">{b}</span>)}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${T.border}`, paddingTop: '18px' }}>
          <div style={{ fontFamily: 'Barlow, sans-serif', fontSize: '9.5px', color: '#2e2e2e', letterSpacing: '3px', marginBottom: '12px' }}>
            MARCAS DESTACADAS
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {BRAND_LOGOS.map((logo, i) => (
              <button key={i} className="sg-pill">{logo.toUpperCase()}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function MegaFlat({ items }) {
  return (
    <div className="sg-mega" style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: T.cyan, boxShadow: '0 20px 60px rgba(0,0,0,.9)', zIndex: 900 }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '18px 40px', display: 'flex', gap: '36px', alignItems: 'center' }}>
        {items.map((it, i) => (
          <button key={i} style={{ background: 'none', border: 'none', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '13.5px', letterSpacing: '1.5px', color: '#000', cursor: 'pointer' }}>
            {it}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   HERO
───────────────────────────────────────── */
function HeroSection() {
  const [slide, setSlide] = useState(0)
  const n = HERO_SLIDES.length

  useEffect(() => {
    const t = setInterval(() => setSlide(p => (p + 1) % n), 5200)
    return () => clearInterval(t)
  }, [])

  const s = HERO_SLIDES[slide]

  return (
    <section className="sg-grid-bg" style={{ position: 'relative', height: '590px', background: '#050505', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: '57%', top: '8%', bottom: '8%', width: '1px', background: `linear-gradient(to bottom, transparent, ${T.cyan} 40%, ${T.cyan} 60%, transparent)`, opacity: .15 }} />

      {HERO_SLIDES.map((sl, i) => (
        <div key={i} style={{ position: 'absolute', inset: 0, opacity: slide === i ? 1 : 0, transition: 'opacity .9s ease', display: 'flex', alignItems: 'center', pointerEvents: slide === i ? 'auto' : 'none' }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 64px', width: '100%', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
              <div style={{ width: '7px', height: '7px', background: sl.accentHex, borderRadius: '50%' }} />
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '11.5px', letterSpacing: '4px', color: sl.accentHex }}>
                {sl.badge}
              </span>
            </div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: 'clamp(68px, 9vw, 124px)', lineHeight: .88, letterSpacing: '-2px', userSelect: 'none' }}>
              <div style={{ color: '#dedede' }}>{sl.line1}</div>
              <div style={{ color: sl.accentHex }}>{sl.line2}</div>
            </div>
            <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '14px', color: '#555', marginTop: '18px', maxWidth: '380px', lineHeight: 1.65, letterSpacing: '.3px' }}>
              {sl.sub}
            </p>
            <div style={{ display: 'flex', gap: '12px', marginTop: '36px' }}>
              <button className="sg-cta-solid">{sl.cta}</button>
              <button className="sg-cta-ghost">VER TODO</button>
            </div>
            <div style={{ display: 'flex', gap: '36px', marginTop: '48px' }}>
              {[['50+', 'Marcas'], ['5,000+', 'Productos'], ['4.9★', 'Calificación'], ['24h', 'Envío Express']].map(([v, l], j) => (
                <div key={j}>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '24px', color: '#d0d0d0', letterSpacing: '-.5px' }}>{v}</div>
                  <div style={{ fontFamily: 'Barlow, sans-serif', fontSize: '10px', color: '#383838', letterSpacing: '2px', marginTop: '2px' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Product card placeholder */}
          <div style={{ position: 'absolute', right: '7%', top: '50%', transform: 'translateY(-50%)', zIndex: 1 }}>
            <div style={{ width: '260px', height: '360px', border: `1px solid ${T.border}`, background: '#0d0d0d', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '14px', right: '14px', background: sl.accentHex, color: sl.accentHex === '#e53e3e' ? '#fff' : '#000', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '10px', letterSpacing: '2px', padding: '4px 10px' }}>
                {sl.tag}
              </div>
              <div style={{ width: '120px', height: '160px', border: `1px solid #1e1e1e`, background: '#151515', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '11px', color: '#2e2e2e', letterSpacing: '2px', textAlign: 'center', lineHeight: 1.4 }}>
                  PRODUCTO<br />DESTACADO
                </div>
              </div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '13px', color: '#3a3a3a', letterSpacing: '2px', marginBottom: '8px' }}>
                SUPLEMENTO ÉLITE
              </div>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '2px', background: sl.accentHex }} />
              <div style={{ position: 'absolute', bottom: '14px', left: '16px' }}>
                <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '22px', color: sl.accentHex, letterSpacing: '-1px' }}>$899</div>
                <div style={{ fontFamily: 'Barlow, sans-serif', fontSize: '10px', color: '#333', letterSpacing: '1px' }}>MXN</div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div style={{ position: 'absolute', bottom: '28px', left: '64px', display: 'flex', alignItems: 'center', gap: '14px', zIndex: 10 }}>
        <div style={{ display: 'flex', gap: '7px' }}>
          {HERO_SLIDES.map((_, i) => (
            <button key={i} className="sg-dot" onClick={() => setSlide(i)} style={{ width: slide === i ? '34px' : '8px', background: slide === i ? T.cyan : '#252525' }} />
          ))}
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button className="sg-arrow" onClick={() => setSlide(p => (p - 1 + n) % n)}>←</button>
          <button className="sg-arrow" onClick={() => setSlide(p => (p + 1) % n)}>→</button>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: '34px', right: '36px', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '12px', color: '#2a2a2a', letterSpacing: '2px' }}>
        0{slide + 1}&nbsp;/&nbsp;0{n}
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   SOCIAL PROOF
───────────────────────────────────────── */
function SocialSection() {
  return (
    <section style={{ padding: '72px 0', background: '#070707', borderTop: `1px solid ${T.border}` }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
          <div style={{ width: '3px', height: '28px', background: T.cyan }} />
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '22px', letterSpacing: '4px', color: '#fff' }}>
            NOS RESPALDAN
          </span>
          <div style={{ flex: 1, height: '1px', background: T.border }} />
          <span style={{ fontFamily: 'Barlow, sans-serif', fontSize: '11px', color: '#333', letterSpacing: '2px' }}>
            COMUNIDAD REAL
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1px', background: T.border }}>
          {SOCIAL_ITEMS.map((item, i) => (
            <div key={i} className="sg-social-card" style={{ background: '#111' }}>
              <div style={{ aspectRatio: '1', background: item.color, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '32px', color: 'rgba(255,255,255,.08)' }}>
                    ▶
                  </div>
                </div>
                <div style={{ position: 'absolute', top: '10px', left: '10px', background: T.cyan, color: '#000', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '9px', letterSpacing: '1.5px', padding: '3px 7px' }}>
                  {item.label.toUpperCase()}
                </div>
                <div style={{ position: 'absolute', bottom: '10px', right: '10px', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '12px', color: 'rgba(255,255,255,.5)', letterSpacing: '1px' }}>
                  {item.followers}
                </div>
              </div>
              <div style={{ padding: '12px 14px' }}>
                <div style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 600, fontSize: '12px', color: T.cyan }}>{item.handle}</div>
                <div style={{ fontFamily: 'Barlow, sans-serif', fontSize: '11px', color: '#444', marginTop: '2px' }}>{item.followers} seguidores</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   PRODUCT GRID
───────────────────────────────────────── */
function ProductCard({ p }) {
  const BADGE_COLORS = {
    'TOP VENTA': { bg: T.cyan, color: '#000' },
    'OFERTA':    { bg: '#e53e3e', color: '#fff' },
    'NUEVO':     { bg: '#22543d', color: '#9ae6b4' },
    'HOT':       { bg: '#c05621', color: '#fbd38d' },
    'ROPA':      { bg: '#2d3748', color: '#90cdf4' },
    'ACCESORIO': { bg: '#2d3748', color: '#b794f4' },
  }
  const bc = p.badge ? (BADGE_COLORS[p.badge] || { bg: T.muted, color: '#fff' }) : null

  return (
    <div className="sg-prod-card">
      {/* Image area */}
      <div style={{ aspectRatio: '1', background: '#0d0d0d', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: `1px solid ${T.border}` }}>
        {bc && (
          <div style={{ position: 'absolute', top: '10px', left: '10px', background: bc.bg, color: bc.color, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '9px', letterSpacing: '1.5px', padding: '3px 8px' }}>
            {p.badge}
          </div>
        )}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '11px', color: '#1e1e1e', letterSpacing: '2px' }}>
            {p.category.toUpperCase()}
          </div>
        </div>
        {p.oldPrice && (
          <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: '#e53e3e', color: '#fff', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '9px', letterSpacing: '1px', padding: '2px 6px' }}>
            -{Math.round((1 - parseInt(p.price.replace('$','').replace(',','')) / parseInt(p.oldPrice.replace('$','').replace(',',''))) * 100)}%
          </div>
        )}
      </div>
      {/* Info */}
      <div style={{ padding: '14px' }}>
        <div style={{ fontFamily: 'Barlow, sans-serif', fontSize: '10px', color: T.cyan, letterSpacing: '1.5px', marginBottom: '4px' }}>{p.brand.toUpperCase()}</div>
        <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '15px', color: '#d0d0d0', letterSpacing: '.3px', marginBottom: '8px', lineHeight: 1.2 }}>{p.name}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
          <Stars rating={p.rating} />
          <span style={{ fontFamily: 'Barlow, sans-serif', fontSize: '11px', color: '#444' }}>({p.reviews.toLocaleString()})</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '22px', color: '#fff', letterSpacing: '-.5px' }}>{p.price}</span>
          {p.oldPrice && <span style={{ fontFamily: 'Barlow, sans-serif', fontSize: '12px', color: '#3a3a3a', textDecoration: 'line-through' }}>{p.oldPrice}</span>}
        </div>
        <button className="sg-add-btn">+ AGREGAR AL CARRITO</button>
      </div>
    </div>
  )
}

function FeaturedSection() {
  return (
    <section style={{ padding: '72px 0', background: T.bg, borderTop: `1px solid ${T.border}` }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '3px', height: '28px', background: T.cyan }} />
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '22px', letterSpacing: '4px', color: '#fff' }}>
              PRODUCTOS DESTACADOS
            </span>
          </div>
          <button className="sg-cta-ghost" style={{ padding: '8px 24px', fontSize: '11px' }}>VER TODOS →</button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', background: T.border }}>
          {FEATURED_PRODUCTS.map((p, i) => <ProductCard key={i} p={p} />)}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   PROMO BANNER
───────────────────────────────────────── */
function PromoBanner() {
  return (
    <section style={{ background: T.cyan, padding: '0' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '32px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '32px', color: '#000', letterSpacing: '-1px', lineHeight: 1 }}>
            COMBOS Y STACKS ESPECIALES
          </div>
          <div style={{ fontFamily: 'Barlow, sans-serif', fontSize: '14px', color: 'rgba(0,0,0,.6)', marginTop: '4px' }}>
            Ahorra más combinando los mejores suplementos del mercado
          </div>
        </div>
        <button style={{ background: '#000', color: T.cyan, border: '2px solid #000', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '13px', letterSpacing: '3px', padding: '14px 36px', cursor: 'pointer', transition: 'all .2s', whiteSpace: 'nowrap' }}>
          VER COMBOS →
        </button>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   PAYMENT ALERT BAR
───────────────────────────────────────── */
function PaymentAlert() {
  return (
    <div style={{ background: '#c53030', padding: '14px 40px' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
        <span style={{ fontFamily: 'Barlow, sans-serif', fontWeight: 600, fontSize: '13px', color: '#fff', letterSpacing: '.3px' }}>
          <strong>AVISO:</strong>&nbsp;Los pagos con Tarjeta de Crédito tienen un cargo adicional del 3.5%. Te recomendamos pagar con transferencia o depósito para evitar cargos.
        </span>
        <a href="#" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '12px', color: 'rgba(255,255,255,.7)', letterSpacing: '1.5px', textDecoration: 'none', whiteSpace: 'nowrap', borderBottom: '1px solid rgba(255,255,255,.3)' }}>
          VER MÉTODOS DE PAGO →
        </a>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────
   FOOTER
───────────────────────────────────────── */
function Footer() {
  const dudas = ['¿Cómo hago mi pedido?', 'Métodos de pago', 'Tiempos de entrega', 'Seguimiento de pedido', 'Cambios y devoluciones']
  const ayuda = ['Centro de ayuda', 'Chat en vivo', 'WhatsApp directo', 'Correo electrónico', 'Llámanos']
  const nosotros = ['Quiénes somos', 'Nuestra historia', 'Trabaja con nosotros', 'Blog / Noticias', 'Aviso de privacidad']

  return (
    <footer style={{ background: '#060606', borderTop: `1px solid ${T.border}`, padding: '60px 0 0' }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 1fr 1fr', gap: '48px', marginBottom: '48px' }}>

          {/* Newsletter */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <div style={{ width: '36px', height: '36px', background: T.cyan, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '16px', color: '#000' }}>SG</span>
              </div>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '15px', letterSpacing: '3px', color: '#fff' }}>SUPERGYM</span>
            </div>
            <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '12.5px', color: '#3a3a3a', lineHeight: 1.7, marginBottom: '20px' }}>
              Suplementos deportivos, ropa gym y accesorios. Las mejores marcas internacionales al mejor precio.
            </p>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '11px', letterSpacing: '3px', color: '#555', marginBottom: '10px' }}>
              RECIBE OFERTAS EXCLUSIVAS
            </div>
            <div style={{ display: 'flex' }}>
              <input className="sg-footer-input" placeholder="tu@correo.com" />
              <button style={{ background: T.cyan, color: '#000', border: 'none', padding: '0 18px', fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '11px', letterSpacing: '2px', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                SUSCRIBIR
              </button>
            </div>
          </div>

          {/* Dudas */}
          <div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '12px', letterSpacing: '3px', color: T.cyan, marginBottom: '16px', paddingBottom: '10px', borderBottom: `1px solid ${T.border}` }}>
              DUDAS
            </div>
            {dudas.map((l, i) => <span key={i} className="sg-footer-link">{l}</span>)}
          </div>

          {/* Ayuda */}
          <div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '12px', letterSpacing: '3px', color: T.cyan, marginBottom: '16px', paddingBottom: '10px', borderBottom: `1px solid ${T.border}` }}>
              AYUDA
            </div>
            {ayuda.map((l, i) => <span key={i} className="sg-footer-link">{l}</span>)}
          </div>

          {/* Nosotros */}
          <div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '12px', letterSpacing: '3px', color: T.cyan, marginBottom: '16px', paddingBottom: '10px', borderBottom: `1px solid ${T.border}` }}>
              NOSOTROS
            </div>
            {nosotros.map((l, i) => <span key={i} className="sg-footer-link">{l}</span>)}
          </div>

          {/* Redes */}
          <div>
            <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '12px', letterSpacing: '3px', color: T.cyan, marginBottom: '16px', paddingBottom: '10px', borderBottom: `1px solid ${T.border}` }}>
              REDES SOCIALES
            </div>
            <p style={{ fontFamily: 'Barlow, sans-serif', fontSize: '12px', color: '#333', marginBottom: '16px', lineHeight: 1.6 }}>
              Síguenos para recibir tips, recetas y las últimas novedades.
            </p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['IG', 'FB', 'TT', 'YT', 'WA'].map((icon, i) => (
                <div key={i} className="sg-social-icon">
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: '11px' }}>{icon}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop: `1px solid ${T.border}`, padding: '20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'Barlow, sans-serif', fontSize: '11.5px', color: '#2e2e2e' }}>
            © {new Date().getFullYear()} SuperGym. Todos los derechos reservados.
          </span>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Términos y condiciones', 'Política de privacidad', 'Cookies'].map((l, i) => (
              <span key={i} style={{ fontFamily: 'Barlow, sans-serif', fontSize: '11px', color: '#2e2e2e', cursor: 'pointer', transition: 'color .15s' }}
                onMouseEnter={e => e.target.style.color = T.cyan}
                onMouseLeave={e => e.target.style.color = '#2e2e2e'}
              >{l}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ─────────────────────────────────────────
   APP ROOT
───────────────────────────────────────── */
export default function App() {
  const [menu, setMenu] = useState(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const headerRef = useRef(null)

  useEffect(() => {
    const fn = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) setMenu(null)
    }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  const toggle = (key) => setMenu(prev => prev === key ? null : key)

  return (
    <div style={{ fontFamily: 'Barlow, sans-serif', background: T.bg, color: '#fff', minHeight: '100vh' }}>
      <style>{GLOBAL_CSS}</style>

      <InfoBar />

      <header ref={headerRef} style={{ background: T.bg, position: 'sticky', top: 0, zIndex: 1000, borderBottom: `1px solid ${T.border}` }}>
        {/* Level 1 */}
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px', display: 'flex', alignItems: 'center', height: '68px', gap: '48px' }}>
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0, cursor: 'pointer' }}>
            <div style={{ width: '44px', height: '44px', background: T.cyan, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '22px', color: '#000', letterSpacing: '-1px' }}>SG</span>
            </div>
            <div>
              <div style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, fontSize: '18px', letterSpacing: '3.5px', color: '#fff', lineHeight: 1 }}>SUPERGYM</div>
              <div style={{ fontFamily: 'Barlow, sans-serif', fontSize: '9px', letterSpacing: '3.5px', color: T.muted, marginTop: '2px' }}>NUTRICIÓN DEPORTIVA</div>
            </div>
          </div>

          {/* Nav */}
          <nav style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: '48px' }}>
            {[{ label: 'MARCAS', key: 'marcas' }, { label: 'TOPS', key: 'tops' }, { label: 'ESPECIALES', key: 'especiales' }].map(({ label, key }) => (
              <button key={key} className={`sg-nav-btn ${menu === key ? 'sg-active' : ''}`} onClick={() => toggle(key)}>
                {label}
                <svg className={`sg-chevron ${menu === key ? 'open' : ''}`} width="10" height="6" viewBox="0 0 10 6" fill="none">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            ))}
          </nav>

          {/* Icons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {searchOpen && <input autoFocus className="sg-search-input" placeholder="Buscar marcas, productos..." onBlur={() => setSearchOpen(false)} />}
              <button className="sg-icon-btn" onClick={() => setSearchOpen(!searchOpen)}>
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
              </button>
            </div>
            <button className="sg-icon-btn">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </button>
            <button className="sg-icon-btn" style={{ position: 'relative' }}>
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" x2="21" y1="6" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              <span style={{ position: 'absolute', top: '-8px', right: '-9px', background: T.cyan, color: '#000', borderRadius: '50%', width: '18px', height: '18px', fontSize: '10px', fontWeight: 700, fontFamily: 'Barlow, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>3</span>
            </button>
          </div>
        </div>

        {/* Level 2: Categories */}
        <div style={{ background: '#0b0b0b', borderTop: `1px solid ${T.border}` }}>
          <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 40px', display: 'flex', height: '44px' }}>
            {CATEGORIES.map((cat, i) => (
              <button key={i} className="sg-cat-btn" style={{ borderRight: i < CATEGORIES.length - 1 ? `1px solid ${T.border}` : 'none' }}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Mega Menus */}
        {menu === 'marcas'     && <MegaMarcas />}
        {menu === 'tops'       && <MegaFlat items={['Top Proteínas', 'Top Pre-Entrenos', 'Top Creatinas', 'Top Quemadores', 'Top Vitaminas', 'Top Gainers']} />}
        {menu === 'especiales' && <MegaFlat items={['Combos & Stacks', 'Descuentos del Día', 'Liquidación', 'Novedad', 'Kits Gym', 'Gym Wear']} />}
      </header>

      <HeroSection />
      <SocialSection />
      <FeaturedSection />
      <PromoBanner />
      <PaymentAlert />
      <Footer />
    </div>
  )
}
