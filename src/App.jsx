import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import capivaraImg from './assets/Capivara_3x4_(1).jpg'
import './App.css'

// ---------- Spring presets ----------
const boingSpring = { type: 'spring', stiffness: 500, damping: 12, mass: 0.6 }
const softSpring = { type: 'spring', stiffness: 300, damping: 18 }

// ---------- 3D tilt hook ----------
function useTilt() {
  const ref = useRef(null)
  const handleMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    el.style.transform = `perspective(1000px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(0)`
  }
  const handleLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateZ(0)'
  }
  return { ref, onMouseMove: handleMove, onMouseLeave: handleLeave }
}

// ---------- Reusable Button ----------
const VARIANTS = {
  primary: {
    background: 'linear-gradient(135deg, #f97316, #ea580c)',
    color: '#ffffff',
    border: 'none',
  },
  secondary: {
    background: 'rgba(255,255,255,0.85)',
    color: '#ea580c',
    border: '2px solid #f97316',
  },
  ghost: {
    background: 'transparent',
    color: '#ea580c',
    border: 'none',
  },
  danger: {
    background: '#dc2626',
    color: '#ffffff',
    border: 'none',
  },
}

const SIZES = {
  small: { padding: '8px 16px', fontSize: '13px' },
  medium: { padding: '12px 22px', fontSize: '15px' },
  large: { padding: '16px 30px', fontSize: '18px' },
}

function Botao({ variant = 'primary', size = 'medium', children, onClick }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.06, y: -3 }}
      whileTap={{ scale: 0.88, y: 2 }}
      transition={boingSpring}
      style={{
        ...VARIANTS[variant],
        ...SIZES[size],
        borderRadius: '14px',
        fontWeight: 600,
        cursor: 'pointer',
        fontFamily: 'inherit',
        boxShadow: variant === 'primary'
          ? '0 8px 20px rgba(249,115,22,0.35)'
          : '0 4px 12px rgba(0,0,0,0.08)',
        backdropFilter: variant === 'secondary' ? 'blur(8px)' : 'none',
      }}
      className="btn-shimmer"
    >
      {children}
    </motion.button>
  )
}

// ---------- Toggle ----------
function Toggle() {
  const [on, setOn] = useState(false)
  return (
    <div
      onClick={() => setOn((v) => !v)}
      style={{
        width: '64px',
        height: '34px',
        borderRadius: '999px',
        background: on ? '#f97316' : '#d4d4d8',
        padding: '4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: on ? 'flex-end' : 'flex-start',
        transition: 'background 0.3s ease',
      }}
    >
      <motion.div
        layout
        transition={boingSpring}
        style={{
          width: '26px',
          height: '26px',
          borderRadius: '50%',
          background: '#fff',
          boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
        }}
      />
    </div>
  )
}

// ---------- Accordion ----------
function Accordion() {
  const [open, setOpen] = useState(false)
  const itens = ['Capibara API', 'Categorias de CEP', 'Documentação', 'Suporte técnico']
  return (
    <div style={{ width: '100%' }}>
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        transition={softSpring}
        style={{
          width: '100%',
          padding: '14px 20px',
          borderRadius: '14px',
          border: '2px solid #f97316',
          background: 'rgba(255,255,255,0.7)',
          color: '#18181b',
          fontWeight: 600,
          fontSize: '15px',
          fontFamily: 'inherit',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        Ver categorias
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={softSpring}
          style={{ display: 'inline-block', fontSize: '18px' }}
        >
          ▾
        </motion.span>
      </motion.button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <motion.ul
              variants={{
                open: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
                closed: {},
              }}
              initial="closed"
              animate="open"
              style={{ listStyle: 'none', padding: '12px 0 0 0', margin: 0 }}
            >
              {itens.map((item) => (
                <motion.li
                  key={item}
                  variants={{
                    open: { opacity: 1, y: 0 },
                    closed: { opacity: 0, y: 20 },
                  }}
                  transition={boingSpring}
                  style={{
                    padding: '10px 16px',
                    margin: '6px 0',
                    borderRadius: '10px',
                    background: 'rgba(249,115,22,0.12)',
                    color: '#3f3f46',
                    fontWeight: 500,
                  }}
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ---------- Alert / Notification ----------
function Alerta() {
  const [visivel, setVisivel] = useState(true)
  return (
    <div style={{ minHeight: '80px' }}>
      <AnimatePresence>
        {visivel && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, x: 200 }}
            transition={boingSpring}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '16px 20px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
              color: '#fff',
              fontWeight: 600,
              boxShadow: '0 10px 24px rgba(220,38,38,0.35)',
            }}
          >
            <span style={{ fontSize: '20px' }}>⚠️</span>
            <span style={{ flex: 1 }}>Algo deu errado! Verifique sua conexão.</span>
            <motion.button
              onClick={() => setVisivel(false)}
              whileHover={{ scale: 1.2, rotate: 90 }}
              whileTap={{ scale: 0.8 }}
              transition={boingSpring}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: '#fff',
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 700,
                fontFamily: 'inherit',
              }}
            >
              ✕
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      {!visivel && (
        <Botao variant="secondary" size="small" onClick={() => setVisivel(true)}>
          Mostrar alerta
        </Botao>
      )}
    </div>
  )
}

// ---------- Bouncing capybara ----------
function CapivaraPulando() {
  return (
    <div style={{ height: '140px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', gap: '0' }}>
      <motion.div
        animate={{ y: [0, -60, 0] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          overflow: 'hidden',
          border: '3px solid #f97316',
          boxShadow: '0 10px 28px rgba(249,115,22,0.45)',
          flexShrink: 0,
        }}
      >
        <img
          src={capivaraImg}
          alt="Capibara"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
        />
      </motion.div>
      <motion.div
        animate={{ scaleX: [1, 0.7, 1], opacity: [0.35, 0.15, 0.35] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          marginTop: '8px',
          width: '48px',
          height: '8px',
          borderRadius: '50%',
          background: 'rgba(249,115,22,0.4)',
        }}
      />
    </div>
  )
}

// ---------- Icon cascade ----------
function IconesCascata() {
  const icones = ['🦫', '🌿', '💧', '🌾', '🐾', '✨']
  return (
    <motion.div
      variants={{
        hidden: { transition: { staggerChildren: 0.12 } },
        show: { transition: { staggerChildren: 0.12 } },
      }}
      initial="hidden"
      animate="show"
      style={{ display: 'flex', gap: '18px', fontSize: '34px' }}
    >
      {icones.map((ic) => (
        <motion.span
          key={ic}
          variants={{
            hidden: { opacity: 0, y: 60, scale: 0 },
            show: { opacity: 1, y: 0, scale: 1 },
          }}
          transition={boingSpring}
          style={{ display: 'inline-block' }}
        >
          {ic}
        </motion.span>
      ))}
    </motion.div>
  )
}

// ---------- 3D tilt card wrapper ----------
function CardTilt({ children, className = '', float = false }) {
  const tilt = useTilt()
  return (
    <div
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className={`${float ? 'flutuar' : ''} ${className}`}
      style={{ transformStyle: 'preserve-3d', transition: 'transform 0.2s ease-out' }}
    >
      {children}
    </div>
  )
}

// ---------- Cards section (from reference) ----------
function CardPerfil() {
  return (
    <motion.div
      className="card-perfil glass"
      whileHover={{ scale: 1.03, y: -4 }}
      transition={softSpring}
    >
      <div className="card-perfil-foto">
        <img src={capivaraImg} alt="Capibara" />
      </div>
      <p className="card-perfil-nome">Capibara 🦫</p>
      <p className="card-perfil-sub">O maior roedor do mundo</p>
      <Botao variant="secondary" size="small">Perfil</Botao>
    </motion.div>
  )
}

function CardProblema() {
  return (
    <motion.div
      className="card-problema glass"
      whileHover={{ scale: 1.03, y: -4 }}
      transition={softSpring}
    >
      <motion.div
        className="card-problema-icone"
        animate={{ rotate: [0, -6, 6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        ⚠️
      </motion.div>
      <p className="card-problema-titulo">Problemas técnicos?</p>
      <p className="card-problema-sub">Nossa equipe está pronta para ajudar você.</p>
      <Botao variant="primary" size="small">Fale conosco</Botao>
    </motion.div>
  )
}

// ---------- Page ----------
const menuItens = ['Home', 'Categorias', 'Blog', 'Suporte']

function App() {
  return (
    <div className="pagina">
      {/* Header fixo */}
      <motion.header
        initial={{ y: -120, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={boingSpring}
        className="header"
      >
        <div className="logo">🦫 Capibara</div>
        <nav className="menu">
          {menuItens.map((item) => (
            <motion.a
              key={item}
              href="#"
              whileHover={{ y: -3, opacity: 0.75 }}
              transition={softSpring}
            >
              {item}
            </motion.a>
          ))}
        </nav>
        <motion.div
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.9 }}
          transition={boingSpring}
          className="avatar"
        >
          <img src={capivaraImg} alt="avatar" />
        </motion.div>
      </motion.header>

      <main className="conteudo">
        {/* Hero */}
        <CardTilt float>
          <motion.section
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...softSpring, delay: 0.25 }}
            className="hero glass"
          >
            <motion.div
              className="hero-avatar"
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ ...boingSpring, delay: 0.5 }}
            >
              <img src={capivaraImg} alt="Capibara" />
            </motion.div>
            <h1>Sistema de Design <span className="laranja">Capibara 🦫</span></h1>
            <p>Microinterações animadas com molas elásticas. Toque, clique e sinta o boing.</p>
            <div className="hero-botoes">
              <Botao variant="primary" size="large">Começar agora</Botao>
              <Botao variant="secondary" size="large">Ver demonstração</Botao>
            </div>
          </motion.section>
        </CardTilt>

        {/* Cards — Casos de uso */}
        <section className="bloco glass">
          <h2>Cards</h2>
          <p className="legenda">Casos de uso — perfil e ação</p>
          <div className="cards-row">
            <CardPerfil />
            <CardProblema />
          </div>
        </section>

        {/* Botões */}
        <CardTilt>
          <section className="bloco glass">
            <h2>Botões</h2>
            <p className="legenda">4 variantes · 3 tamanhos · spring com overshoot</p>
            <div className="botoes-grid">
              <div className="coluna">
                <Botao variant="primary" size="small">Primário</Botao>
                <Botao variant="secondary" size="small">Secundário</Botao>
                <Botao variant="ghost" size="small">Ghost</Botao>
                <Botao variant="danger" size="small">Danger</Botao>
              </div>
              <div className="coluna">
                <Botao variant="primary" size="medium">Primário</Botao>
                <Botao variant="secondary" size="medium">Secundário</Botao>
                <Botao variant="ghost" size="medium">Ghost</Botao>
                <Botao variant="danger" size="medium">Danger</Botao>
              </div>
              <div className="coluna">
                <Botao variant="primary" size="large">Primário</Botao>
                <Botao variant="secondary" size="large">Secundário</Botao>
                <Botao variant="ghost" size="large">Ghost</Botao>
                <Botao variant="danger" size="large">Danger</Botao>
              </div>
            </div>
          </section>
        </CardTilt>

        {/* Toggle + Slider */}
        <CardTilt>
          <section className="bloco glass duplo">
            <div className="metade">
              <h2>Toggle</h2>
              <p className="legenda">Animação de layout</p>
              <Toggle />
            </div>
            <div className="divisor-v" />
            <div className="metade">
              <h2>Slider</h2>
              <p className="legenda">Input range laranja</p>
              <input type="range" className="slider" min="0" max="100" defaultValue="60" />
            </div>
          </section>
        </CardTilt>

        {/* Accordion */}
        <CardTilt>
          <section className="bloco glass">
            <h2>Dropdown / Accordion</h2>
            <p className="legenda">Altura animada de 0 até auto + itens em cascata</p>
            <Accordion />
          </section>
        </CardTilt>

        {/* Alerta */}
        <CardTilt>
          <section className="bloco glass">
            <h2>Alerta / Notificação</h2>
            <p className="legenda">Entrada e saída animadas com AnimatePresence</p>
            <Alerta />
          </section>
        </CardTilt>

        {/* Capibara pulando */}
        <CardTilt>
          <section className="bloco glass">
            <h2>Bônus: capibara pulando 🦫</h2>
            <p className="legenda">Loop infinito com keyframes + sombra animada</p>
            <CapivaraPulando />
          </section>
        </CardTilt>

        {/* Ícones cascata */}
        <CardTilt>
          <section className="bloco glass">
            <h2>Bônus: ícones em cascata</h2>
            <p className="legenda">Entrada com stagger e spring de baixo damping</p>
            <IconesCascata />
          </section>
        </CardTilt>
      </main>

      <footer className="rodape">
        <p>🦫 Capibara — demonstração de design system animado</p>
      </footer>
    </div>
  )
}

export default App
