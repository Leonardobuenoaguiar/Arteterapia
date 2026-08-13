import { useEffect, useRef, useState, type ReactNode } from "react";

export const WHATSAPP =
  "https://wa.me/5551996326048?text=" +
  encodeURIComponent(
    "Olá, Carolina! Gostaria de saber mais sobre a arteterapia e agendar uma sessão."
  );
export const INSTAGRAM = "https://www.instagram.com/candida_arteterapia/";

/* ---------- Símbolo oficial: oval + composição floral orgânica ---------- */
export function Symbol({ className = "", color = "currentColor" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 64 84" className={className} role="img" aria-label="Símbolo Carolina Candida" fill="none">
      <ellipse cx="32" cy="42" rx="28" ry="38" stroke={color} strokeWidth="2.6" />
      {/* lua crescente superior */}
      <path d="M23 25a9.5 9.5 0 0 0 18 0" stroke={color} strokeWidth="2.6" strokeLinecap="round" />
      {/* pétalas radiantes */}
      <g stroke={color} strokeWidth="2.4" strokeLinecap="round">
        <path d="M32 32v14" />
        <path d="M23 29l3.5 15" />
        <path d="M41 29l-3.5 15" />
        <path d="M15 36l9 10" />
        <path d="M49 36l-9 10" />
      </g>
      {/* gota central */}
      <path d="M32 34c3.4 4.6 5 7.4 5 9.8a5 5 0 0 1-10 0c0-2.4 1.6-5.2 5-9.8z" fill={color} />
      {/* folhas inferiores */}
      <path d="M32 52c-8 0-13 4.2-13 8.4S24 68 32 68s13-3.4 13-7.6S40 52 32 52z" stroke={color} strokeWidth="2.6" />
      <path d="M32 52v16" stroke={color} strokeWidth="2.2" />
    </svg>
  );
}

export function LogoHorizontal({ color = "#852B09", className = "" }: { color?: string; className?: string }) {
  return (
    <div className={"flex items-center gap-3 " + className} style={{ color }}>
      <Symbol className="h-11 w-auto shrink-0" />
      <span className="leading-none">
        <span
          className="block font-display"
          style={{ fontSize: "1.45rem", lineHeight: 1.02, letterSpacing: "-0.01em", fontWeight: 500 }}
        >
          Carolina Candida
        </span>
        <span
          className="block font-sans"
          style={{ fontSize: "0.6rem", letterSpacing: "0.42em", marginTop: "0.32rem", textTransform: "lowercase" }}
        >
          arteterapia
        </span>
      </span>
    </div>
  );
}

export function LogoVertical({ color = "#852B09", className = "" }: { color?: string; className?: string }) {
  return (
    <div className={"flex flex-col items-center " + className} style={{ color }}>
      <Symbol className="h-20 w-auto" />
      <span className="mt-4 font-display text-center" style={{ fontSize: "1.9rem", lineHeight: 1.05, fontWeight: 500 }}>
        Carolina
        <br />
        Candida
      </span>
      <span className="mt-3 font-sans" style={{ fontSize: "0.62rem", letterSpacing: "0.45em" }}>
        arteterapia
      </span>
    </div>
  );
}

/* ---------- Glifos derivados do símbolo ---------- */
type G = { className?: string; color?: string };

export function GlyphHeart({ className = "", color = "currentColor" }: G) {
  return (
    <svg viewBox="0 0 40 44" className={className} fill="none" aria-hidden="true">
      <path
        d="M20 14c2-5 8-6 11-2.5 3 3.5 1.5 9-4 13.5L20 31l-7-6c-5.5-4.5-7-10-4-13.5C12 8 18 9 20 14z"
        stroke={color}
        strokeWidth="2.4"
      />
      <path d="M20 32c2 3 3 4.4 3 5.8a3 3 0 0 1-6 0c0-1.4 1-2.8 3-5.8z" fill={color} />
    </svg>
  );
}
export function GlyphMoon({ className = "", color = "currentColor" }: G) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden="true">
      <path d="M8 14a13 13 0 0 0 24 0" stroke={color} strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}
export function GlyphFlower({ className = "", color = "currentColor" }: G) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden="true">
      <path d="M20 6c4 6 6 10 6 14a6 6 0 0 1-12 0c0-4 2-8 6-14z" stroke={color} strokeWidth="2.4" />
      <path d="M20 20v14M13 25l7 6M27 25l-7 6" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}
export function GlyphDrop({ className = "", color = "currentColor" }: G) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden="true">
      <path d="M20 8c4.5 6.4 6.6 10.2 6.6 13.4a6.6 6.6 0 0 1-13.2 0C13.4 18.2 15.5 14.4 20 8z" fill={color} />
      <g stroke={color} strokeWidth="2" strokeLinecap="round">
        <path d="M20 30v6M11 27l4 4M29 27l-4 4M5 22h5M35 22h-5" />
      </g>
    </svg>
  );
}
export function GlyphPetals({ className = "", color = "currentColor" }: G) {
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" aria-hidden="true">
      <g stroke={color} strokeWidth="2.4">
        <circle cx="14" cy="14" r="7" />
        <circle cx="26" cy="14" r="7" />
        <circle cx="14" cy="26" r="7" />
        <circle cx="26" cy="26" r="7" />
      </g>
    </svg>
  );
}
export function GlyphHand({ className = "", color = "currentColor" }: G) {
  return (
    <svg viewBox="0 0 40 44" className={className} fill="none" aria-hidden="true">
      <path
        d="M14 26V10a2.6 2.6 0 0 1 5.2 0v10M19.2 20V7.5a2.6 2.6 0 0 1 5.2 0V21M24.4 21v-8a2.6 2.6 0 0 1 5.2 0v15c0 6-4 10-10 10s-9-4-10.6-8L6 24.5c-.8-2 2.2-4 3.8-2l4.2 5"
        stroke={color}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
export function GlyphEar({ className = "", color = "currentColor" }: G) {
  return (
    <svg viewBox="0 0 40 44" className={className} fill="none" aria-hidden="true">
      <path
        d="M12 18a9 9 0 1 1 18 0c0 5-5 6-6.5 10-1 2.6-.6 6-4.5 6-3 0-4.5-2-4.5-4.5s2.5-3.5 4.5-5"
        stroke={color}
        strokeWidth="2.3"
        strokeLinecap="round"
      />
      <path d="M18 18a3.5 3.5 0 0 1 6 2.5" stroke={color} strokeWidth="2.1" strokeLinecap="round" />
    </svg>
  );
}
export function GlyphBrush({ className = "", color = "currentColor" }: G) {
  return (
    <svg viewBox="0 0 40 44" className={className} fill="none" aria-hidden="true">
      <path d="M20 4c3 6 4.6 9.4 4.6 12H15.4C15.4 13.4 17 10 20 4z" fill={color} />
      <path d="M15 16h10v6H15z" stroke={color} strokeWidth="2.2" />
      <path d="M17 22h6v16a3 3 0 0 1-6 0z" stroke={color} strokeWidth="2.2" />
    </svg>
  );
}

/* ---------- Reveal ---------- */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${seen ? "in" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
