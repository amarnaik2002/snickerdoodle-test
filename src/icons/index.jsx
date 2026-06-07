export const Cup = ({ w = 56, h = 56, stroke = '#D4400A', sw = 1.8 }) => (
  <svg width={w} height={h} viewBox="0 0 56 56" fill="none"
    stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw}>
    <path d="M10 20h36l-5 28H15L10 20z"/>
    <path d="M46 28h6a5 5 0 0 1 0 10h-6"/>
    <ellipse cx="28" cy="48" rx="10" ry="3" opacity=".3"/>
    <path d="M17 14c0-6 7-6 7-0"/>
    <path d="M27 12c0-6 7-6 7 0"/>
  </svg>
)

export const Bean = ({ w = 32, h = 32, stroke = '#D4400A', sw = 1.8 }) => (
  <svg width={w} height={h} viewBox="0 0 36 36" fill="none"
    stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw}>
    <ellipse cx="18" cy="18" rx="10" ry="15" transform="rotate(-20 18 18)"/>
    <path d="M11 7c5 8 5 14 0 22" strokeWidth={sw * 0.8}/>
  </svg>
)

export const Croissant = ({ w = 72, h = 72, stroke = '#D4400A', sw = 1.8 }) => (
  <svg width={w} height={h} viewBox="0 0 72 72" fill="none"
    stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw}>
    <path d="M10 50C8 38 16 16 36 16s28 22 26 34c-5 14-15 18-26 18S15 64 10 50z"/>
    <path d="M20 32c3-9 19-9 22 0"/>
    <path d="M14 44c4-10 26-10 30 0"/>
    <path d="M13 55c4-8 28-8 32 0"/>
  </svg>
)

export const Latte = ({ w = 72, h = 72, stroke = '#D4400A', sw = 1.8 }) => (
  <svg width={w} height={h} viewBox="0 0 72 72" fill="none"
    stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw}>
    <rect x="12" y="24" width="46" height="36" rx="6"/>
    <path d="M58 34h8a5 5 0 0 1 0 10h-8"/>
    <ellipse cx="35" cy="36" rx="14" ry="5"/>
    <path d="M25 36c2-5 18-5 20 0"/>
    <path d="M18 16c0-8 9-8 9 0"/>
    <path d="M30 14c0-8 9-8 9 0"/>
  </svg>
)

export const ColdBrew = ({ w = 72, h = 72, stroke = '#D4400A', sw = 1.8 }) => (
  <svg width={w} height={h} viewBox="0 0 72 72" fill="none"
    stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth={sw}>
    <path d="M20 14h32L46 56H26L20 14z"/>
    <path d="M15 14h42"/>
    <path d="M36 8v6"/>
    <path d="M28 8h16"/>
    <path d="M25 30c3-5 15-5 18 0"/>
    <path d="M23 42c3-6 17-6 20 0"/>
    <line x1="30" y1="56" x2="30" y2="64"/>
    <line x1="42" y1="56" x2="42" y2="64"/>
    <line x1="24" y1="64" x2="48" y2="64"/>
  </svg>
)

export const MapPin = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
    stroke="#D4400A" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
)

export const Clock = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="#9E6B54" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
)

export const Arrow = ({ stroke = 'rgba(255,253,249,.7)' }) => (
  <svg width="80" height="56" viewBox="0 0 80 56" fill="none"
    stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5">
    <path d="M8 48 C18 36 40 18 66 12"/>
    <path d="M55 7 L66 12 L60 24"/>
  </svg>
)

export const Star = ({ stroke = 'rgba(255,253,249,.6)' }) => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none"
    stroke={stroke} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
    <path d="M18 3l3 10 10-3-7 7 7 8-10-3-3 10-3-10-10 3 7-8-7-7 10 3z"/>
  </svg>
)

export const IGIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
)

export const TTIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.77 0 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 0 0-6.13 6.33 6.34 6.34 0 0 0 12.67 0V8.69a8.17 8.17 0 0 0 4.77 1.52V6.75a4.85 4.85 0 0 1-1-.06z"/>
  </svg>
)

export const XIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.258 5.63zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)
