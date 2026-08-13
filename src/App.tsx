import { useEffect, useState } from "react";
import {
  WHATSAPP,
  INSTAGRAM,
  Symbol,
  GlyphHeart,
  GlyphMoon,
  GlyphFlower,
  GlyphDrop,
  GlyphPetals,
  GlyphHand,
  GlyphEar,
  GlyphBrush,
  Reveal,
} from "./components/Brand";

/* =========================================================
   NAVEGAÇÃO
   ========================================================= */

const NAV = [
  { label: "Início", href: "#inicio" },
  { label: "Prazer, Carolina", href: "#carolina" },
  { label: "Arteterapia", href: "#arteterapia" },
  { label: "Para quem é", href: "#para-quem" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Atendimento", href: "#atendimento" },
];

/* =========================================================
   ONDA — DIVISÃO ENTRE SECTIONS
   No mobile, subpixel + overflow-hidden no scroll deixam
   uma linha reta de 1px antes da ondulação. O preenchimento
   do path ultrapassa o viewBox (invisível) e uma faixa de
   3px só no mobile cobre a junta, sem alterar o desktop
   nem o desenho da onda.
   ========================================================= */

const WAVE_TOP_D =
  "M0 -8 H1440 V25 C1320 50 1200 65 1080 45 C960 25 840 10 720 30 C600 50 480 65 360 40 C240 15 120 5 0 20 Z";

const WAVE_BOTTOM_D =
  "M0 78 H1440 V45 C1320 20 1200 5 1080 25 C960 45 840 60 720 40 C600 20 480 5 360 30 C240 55 120 65 0 50 Z";

function WaveEdge({
  fill,
  placement,
  children,
}: {
  fill: string;
  placement: "top" | "bottom";
  children?: React.ReactNode;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 z-20 w-full overflow-hidden leading-[0] ${
        placement === "top" ? "top-0" : "bottom-0"
      }`}
      style={{ height: "70px" }}
    >
      <div
        className={`absolute inset-x-0 z-10 h-[3px] md:hidden ${
          placement === "top" ? "top-0" : "bottom-0"
        }`}
        style={{ background: fill }}
        aria-hidden="true"
      />

      <svg
        viewBox="0 0 1440 70"
        preserveAspectRatio="none"
        className="relative block h-full w-full"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d={placement === "top" ? WAVE_TOP_D : WAVE_BOTTOM_D}
          fill={fill}
        />
      </svg>

      {children}
    </div>
  );
}

/* =========================================================
   ÍCONE DE FUNDO
   ========================================================= */

function BackgroundIcon({
  src,
  className = "",
  opacity = 0.12,
  rotate = 0,
}: {
  src: string;
  className?: string;
  opacity?: number;
  rotate?: number;
}) {
  return (
    <img
      src={src}
      aria-hidden="true"
      draggable={false}
      className={`pointer-events-none absolute select-none object-contain ${className}`}
      style={{
        opacity,
        transform: `translate(var(--tw-translate-x, 0), var(--tw-translate-y, 0)) rotate(${rotate}deg)`,
      }}
    />
  );
}

/* =========================================================
   LOGO
   ========================================================= */

function Logo({
  className = "",
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <img
      src="/images/logo.png"
      alt="Carolina Candida — Arteterapia"
      className={`h-auto w-auto object-contain ${className}`}
      style={{
        filter: light
          ? "brightness(0) saturate(100%) invert(86%) sepia(31%) saturate(500%) hue-rotate(338deg) brightness(104%)"
          : undefined,
      }}
    />
  );
}

/* =========================================================
   BOTÃO
   ========================================================= */

function Btn({
  href,
  children,
  variant = "solid",
  tone = "brown",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
  tone?: "brown" | "sun" | "petrol" | "paper";
}) {
  const map: Record<
    string,
    {
      bg: string;
      fg: string;
      bd: string;
    }
  > = {
    brown: {
      bg: "#852B09",
      fg: "#EFEAD5",
      bd: "#852B09",
    },
    sun: {
      bg: "#FED38A",
      fg: "#0B2428",
      bd: "#FED38A",
    },
    petrol: {
      bg: "#0B2428",
      fg: "#EFEAD5",
      bd: "#0B2428",
    },
    paper: {
      bg: "#EFEAD5",
      fg: "#0B2428",
      bd: "#EFEAD5",
    },
  };

  const c = map[tone];
  const solid = variant === "solid";

  return (
    <a
      href={href}
      target={href.startsWith("#") ? undefined : "_blank"}
      rel={href.startsWith("#") ? undefined : "noopener noreferrer"}
      className="font-omnes inline-flex items-center justify-center px-7 py-4 text-[0.68rem] font-semibold uppercase tracking-[0.2em] transition-all duration-500 hover:-translate-y-0.5 md:px-8 md:text-[0.72rem]"
      style={{
        background: solid ? c.bg : "transparent",
        color: solid ? c.fg : c.bd,
        border: `1px solid ${c.bd}`,
        borderRadius: "999px",
      }}
    >
      {children}
    </a>
  );
}

/* =========================================================
   HEADER
   ========================================================= */

function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 overflow-hidden transition-all duration-700"
      style={{
        background: solid
          ? "rgba(239,234,213,0.94)"
          : "rgba(133,43,9,0.10)",
        backdropFilter: solid ? "blur(10px)" : "blur(4px)",
        borderBottom: solid
          ? "1px solid rgba(133,43,9,0.12)"
          : "1px solid rgba(254,211,138,0.10)",
      }}
    >
      <BackgroundIcon
        src="/images/icone-2.png"
        opacity={solid ? 0.07 : 0.12}
        rotate={-8}
        className="-right-16 -top-16 h-[210px] w-[210px] md:-right-20 md:-top-24 md:h-[270px] md:w-[270px]"
      />

      <div className="relative z-10 mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-12 md:py-5">
        <a
          href="#inicio"
          aria-label="Carolina Candida Arteterapia — início"
          className="block"
        >
          <Logo
            light={!solid}
            className="max-h-11 max-w-[175px] md:max-h-12 md:max-w-[205px]"
          />
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.slice(1, 6).map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={`font-omnes text-[0.68rem] uppercase tracking-[0.2em] transition-colors ${
                solid
                  ? "text-[#0B2428]/75 hover:text-[#852B09]"
                  : "text-[#EFEAD5]/80 hover:text-[#FED38A]"
              }`}
            >
              {n.label}
            </a>
          ))}

          <Btn href={WHATSAPP} tone={solid ? "brown" : "sun"}>
            Agendar sessão
          </Btn>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          className="flex h-11 w-11 flex-col items-center justify-center gap-[6px] lg:hidden"
        >
          <span
            className={`block h-[1.5px] w-7 transition-transform duration-500 ${
              solid ? "bg-[#852B09]" : "bg-[#FED38A]"
            }`}
            style={{
              transform: open
                ? "translateY(7.5px) rotate(45deg)"
                : undefined,
            }}
          />

          <span
            className={`block h-[1.5px] w-7 transition-opacity duration-300 ${
              solid ? "bg-[#852B09]" : "bg-[#FED38A]"
            }`}
            style={{ opacity: open ? 0 : 1 }}
          />

          <span
            className={`block h-[1.5px] w-7 transition-transform duration-500 ${
              solid ? "bg-[#852B09]" : "bg-[#FED38A]"
            }`}
            style={{
              transform: open
                ? "translateY(-7.5px) rotate(-45deg)"
                : undefined,
            }}
          />
        </button>
      </div>

      <div
        className="relative z-10 overflow-hidden bg-[#852B09] transition-[max-height] duration-700 lg:hidden"
        style={{ maxHeight: open ? "600px" : "0px" }}
      >
        <nav className="flex flex-col gap-1 px-5 pb-9 pt-2">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="font-display border-b border-[#FED38A]/15 py-4 text-[1.35rem] text-[#FED38A]"
            >
              {n.label}
            </a>
          ))}

          <div className="pt-7">
            <Btn href={WHATSAPP} tone="sun">
              Agendar sessão
            </Btn>
          </div>
        </nav>
      </div>
    </header>
  );
}

/* =========================================================
   HERO
   ========================================================= */

function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-[#852B09] px-0 pb-20 pt-32 shadow-[0_3px_0_0_#852B09] md:pb-32 md:pt-44 md:shadow-none"
    >
      <div className="paper-grain pointer-events-none absolute inset-0 opacity-[0.60]" />

      <div className="pointer-events-none absolute -left-32 top-24 h-80 w-80 rounded-full bg-[#D5DE9B]/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[5%] top-[12%] h-72 w-72 rounded-full bg-[#FED38A]/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[5%] left-[35%] h-64 w-64 rounded-full bg-[#D5DE9B]/5 blur-3xl" />

      <div className="pointer-events-none absolute -right-24 top-24 h-80 w-80 rounded-full border border-[#FED38A]/10" />
      <div className="pointer-events-none absolute -left-12 bottom-16 h-40 w-40 rounded-full border border-[#D5DE9B]/15" />
      <div className="pointer-events-none absolute bottom-[14%] right-[17%] h-24 w-24 rounded-full border border-[#FED38A]/10" />
      <div className="pointer-events-none absolute right-[42%] top-24 hidden h-28 w-28 rotate-6 rounded-[40%_60%_55%_45%] bg-[#FED38A]/10 md:block" />

      <div className="relative mx-auto grid max-w-[1400px] grid-cols-1 gap-14 px-5 md:gap-16 md:px-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <Reveal>
            <p className="font-omnes mb-7 flex items-center gap-3 text-[0.64rem] uppercase tracking-[0.3em] text-[#D5DE9B]/80">
              <GlyphMoon className="h-4 w-4 text-[#FED38A]" />
            </p>
          </Reveal>

          <Reveal delay={120}>
            <h1
              className="font-display text-[#FED38A]"
              style={{
                fontSize: "clamp(2.55rem,7vw,5.2rem)",
                lineHeight: 0.98,
                fontWeight: 400,
              }}
            >
              NEM SEMPRE
              <br />
              O QUE A GENTE
              <br />

              <span className="relative inline-block">
                SENTE CABE
                <span className="absolute -right-10 -top-6 hidden md:block">
                  <GlyphDrop className="h-7 w-7 text-[#D5DE9B]" />
                </span>
              </span>

              <br />
              EM{" "}

              <span
                className="relative inline-block font-script text-[#EFEAD5]"
                style={{
                  fontSize: "1.08em",
                  transform: "rotate(-2deg)",
                }}
              >
                palavras.

                <span
                  className="absolute -bottom-4 left-[10%] h-5 w-[18px] rounded-[50%]"
                  style={{
                    background: "#EFEAD5",
                    filter: "blur(0.3px)",
                    transform: "rotate(3deg)",
                  }}
                />

                <span
                  className="absolute -bottom-2 left-[42%] h-3 w-[10px] rounded-full"
                  style={{
                    background: "#EFEAD5",
                    opacity: 0.9,
                  }}
                />

                <span
                  className="absolute -bottom-3 right-[12%] h-4 w-[13px] rounded-[50%]"
                  style={{
                    background: "#EFEAD5",
                    transform: "rotate(-4deg)",
                  }}
                />
              </span>
            </h1>
          </Reveal>

          <Reveal delay={260}>
            <p className="font-omnes mt-9 max-w-md text-[1rem] leading-relaxed text-[#EFEAD5]/80 md:mt-10 md:text-[1.05rem]">
              A arte pode ser o caminho quando o discurso não dá conta.
            </p>
          </Reveal>

          <Reveal delay={360}>
            <div className="mt-9 flex flex-wrap gap-3 md:mt-10 md:gap-4">
              <Btn href={WHATSAPP} tone="sun">
                Agendar sessão
              </Btn>

              <Btn href="#arteterapia" variant="outline" tone="paper">
                Conheça a arteterapia
              </Btn>
            </div>
          </Reveal>

          <Reveal delay={460}>
            <p className="font-omnes mt-12 max-w-xs border-t border-[#FED38A]/25 pt-5 text-[0.78rem] leading-relaxed text-[#EFEAD5]/65 md:mt-14">
              Entre a arte e o sentir, um espaço pra se reencontrar.
            </p>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <div className="relative mx-auto w-full max-w-[440px]">
            <div className="absolute -left-4 -top-4 h-full w-full rotate-1 rounded-[30px] border border-[#FED38A]/30 md:-left-5 md:-top-5 md:rounded-[34px]" />

            <div className="relative">
              <span className="tape -top-3 left-1/2 -translate-x-1/2 rotate-[-3deg]" />

              <img
                src="/images/hero.jpg"
                alt="Mãos pintando com pincel sobre papel em um ateliê de arteterapia"
                className="relative w-full rounded-[26px] object-cover md:rounded-[28px]"
                style={{
                  aspectRatio: "4/5",
                  filter: "grayscale(1) contrast(1.05)",
                }}
              />
            </div>

            <div className="absolute -bottom-7 -left-5 flex h-20 w-20 items-center justify-center rounded-full bg-[#0B2428] md:-bottom-10 md:-left-10 md:h-28 md:w-28">
              <Symbol
                className="h-10 w-auto md:h-14"
                color="#FED38A"
              />
            </div>

            <div className="absolute -right-3 bottom-12 hidden rounded-full bg-[#D5DE9B] px-5 py-3 md:block">
              <p className="font-script text-2xl leading-none text-[#852B09]">
                criar
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================
   SILÊNCIO
   ÚNICA SECTION COM ONDULAÇÃO (ENTRADA E SAÍDA)
   ========================================================= */

function Silencio() {
  return (
    <section
      id="silencio"
      className="relative overflow-hidden bg-[#0B2428] px-5 pb-28 pt-28 shadow-[0_3px_0_0_#0B2428] md:px-12 md:pb-44 md:pt-36 md:shadow-none"
    >
      {/* =====================================================
          ONDULAÇÃO SUPERIOR (ENTRADA)
          Onda na cor do Hero (#852B09) sobre a section Silêncio.
          O pontilhado/textura (paper-grain) é recortado seguindo
          a forma da onda, para que o fundo acompanhe a ondulação
          (mesmo padrão da parte de baixo / Sobre).
          ===================================================== */}
      <WaveEdge fill="#852B09" placement="top">
        {/* pontilhado acompanhando a onda (recortado no formato da onda) */}
        <div
          className="paper-grain absolute inset-0 opacity-60"
          style={{ clipPath: "url(#silencio-wave-grain)" }}
        />

        <svg
          width="0"
          height="0"
          className="absolute overflow-hidden"
          style={{ position: "absolute", width: 0, height: 0 }}
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <clipPath id="silencio-wave-grain" clipPathUnits="objectBoundingBox">
              <path d="M0 0 H1 V0.357143 C0.916667 0.714286 0.833333 0.928571 0.75 0.642857 C0.666667 0.357143 0.583333 0.142857 0.5 0.428571 C0.416667 0.714286 0.333333 0.928571 0.25 0.571429 C0.166667 0.214286 0.083333 0.071429 0 0.285714 Z" />
            </clipPath>
          </defs>
        </svg>
      </WaveEdge>

      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="paper-grain absolute inset-0" />
      </div>

      <div className="pointer-events-none absolute -right-20 top-28 h-64 w-64 rounded-full border border-[#FED38A]/10" />
      <div className="pointer-events-none absolute -left-16 bottom-16 h-48 w-48 rounded-full bg-[#D5DE9B]/5 blur-3xl" />
      <div className="pointer-events-none absolute right-[18%] top-[18%] h-24 w-24 rounded-full bg-[#FED38A]/[0.025] blur-2xl" />

      <div className="relative z-10 mx-auto max-w-[1100px] pt-8">
        <Reveal>
          <div className="mb-14 flex items-center gap-5 md:mb-16">
            <GlyphEar className="h-11 w-11 text-[#D5DE9B] md:h-12 md:w-12" />

            <span className="font-script text-2xl text-[#FED38A]/70 md:text-3xl">
              escutar também é ficar.
            </span>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <h2
            className="font-display max-w-5xl text-[#EFEAD5]"
            style={{
              fontSize: "clamp(2.3rem,6vw,5rem)",
              lineHeight: 1.02,
              fontWeight: 400,
              letterSpacing: "-0.025em",
            }}
          >
            O silêncio
            <br />
            também é parte
            <br />
            da{" "}
            <span
              className="font-script relative inline-block text-[#FED38A]"
              style={{
                fontSize: "1.18em",
                letterSpacing: "0",
                transform: "rotate(-2deg)",
              }}
            >
              escuta.
            </span>
          </h2>
        </Reveal>

        <Reveal delay={280}>
          <div className="mt-16 flex justify-end md:mt-20">
            <div className="relative max-w-2xl md:mr-12">
              <svg
                className="mb-8 h-5 w-full opacity-50"
                viewBox="0 0 600 20"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M2 10 C90 4 135 17 215 9 C300 1 350 18 430 9 C500 2 550 15 598 8"
                  fill="none"
                  stroke="#FED38A"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>

              <span className="font-display absolute -top-2 left-0 text-5xl text-[#D45C0E]/70">
                “
              </span>

              <p
                className="font-display text-[#EFEAD5]/90"
                style={{
                  fontSize: "clamp(1.4rem,3vw,2.15rem)",
                  lineHeight: 1.35,
                  fontWeight: 400,
                }}
              >
                Há coisas que só aparecem quando paramos de{" "}
                <span className="font-script text-[1.25em] text-[#D5DE9B]">
                  tentar explicá-las.
                </span>
              </p>

      <div className="mt-8 flex items-center gap-4">
        <span className="h-px w-10 bg-[#D45C0E]" />

        <span className="font-omnes text-[0.6rem] uppercase tracking-[0.3em] text-[#EFEAD5]/40">
          um espaço para sentir
        </span>
      </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================
   SOBRE — DIVISÃO RETA
   ========================================================= */

function Sobre() {
  return (
    <section
      id="carolina"
      className="relative overflow-hidden bg-[#EFEAD5] px-5 pb-32 pt-36 md:px-12 md:pb-44 md:pt-48"
    >
      {/* =====================================================
          ONDULAÇÃO SUPERIOR (ENTRADA)
          Onda na cor da section anterior Silêncio (#0B2428)
          sobre a section Sobre — assim o fundo/pontilhado
          acompanha a ondulação da divisão
          ===================================================== */}
      <WaveEdge fill="#0B2428" placement="top" />

      <div className="paper-grain pointer-events-none absolute inset-0 opacity-50" />

      {/* Pontilhado (icone-3) posicionado para acompanhar a ondulação da divisão no topo */}
      <BackgroundIcon
        src="/images/icone-3.png"
        opacity={0.10}
        rotate={-8}
        className="-right-24 top-[22%] h-[330px] w-[330px] md:-right-44 md:top-[16%] md:h-[520px] md:w-[520px]"
      />

      <div className="pointer-events-none absolute -left-20 top-28 h-48 w-48 rounded-full bg-[#D5DE9B]/30 blur-3xl" />

      <div className="pointer-events-none absolute right-[-80px] top-[35%] h-64 w-64 rounded-full border border-[#852B09]/10" />

      <div className="relative z-20 mx-auto grid max-w-[1300px] grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
        <Reveal>
          <div className="relative">
            <div className="absolute -right-8 -top-10 h-40 w-40 rounded-full bg-[#D5DE9B]/60" />

            <span className="tape -top-3 left-6 rotate-[4deg]" />

            <img
              src="/images/about.jpg"
              alt="Carolina desenhando em um caderno em seu ateliê"
              className="relative w-full rounded-[26px] object-cover md:rounded-[28px]"
              style={{
                aspectRatio: "3/4",
                filter: "grayscale(1)",
              }}
            />

            <div className="relative -mt-10 ml-auto mr-[-0.5rem] w-36 rounded-[24px] bg-[#852B09] p-5 text-[#FED38A] shadow-[0_18px_40px_rgba(133,43,9,0.18)] md:-mt-12 md:mr-[-1rem] md:w-40">
              <GlyphHeart className="h-8 w-8" />

              <p className="font-omnes mt-3 text-[0.6rem] uppercase leading-relaxed tracking-[0.18em]">
                arte como ponte das emoções
              </p>
            </div>
          </div>
        </Reveal>

        <div className="lg:pt-14">
          <Reveal>
            <p className="font-omnes mb-6 text-[0.62rem] uppercase tracking-[0.34em] text-[#D45C0E]">
              sobre
            </p>

            <h2
              className="font-display text-[#852B09]"
              style={{
                fontSize: "clamp(2.15rem,5.2vw,4rem)",
                lineHeight: 1,
                fontWeight: 400,
              }}
            >
              PRAZER,
              <br />
              CAROLINA
            </h2>
          </Reveal>

          <Reveal delay={140}>
            <p className="font-omnes mt-9 max-w-xl text-[1rem] leading-[1.9] text-[#0B2428]/85 md:mt-10 md:text-[1.02rem]">
              Meu trabalho nasce de uma convicção simples: nem tudo o que
              sentimos encontra palavra. Às vezes, o que precisa ser dito
              aparece primeiro como cor, gesto, textura ou traço — e é aí que
              a arte entra, não como resultado, mas como caminho.
            </p>
          </Reveal>

          <Reveal delay={220}>
            <p className="font-omnes mt-6 max-w-xl text-[1rem] leading-[1.9] text-[#0B2428]/85 md:text-[1.02rem]">
              Recebo cada pessoa com escuta e presença, criando propostas que
              respeitam o tempo e o momento de quem chega. Não existe caminho
              certo, nem obra a ser entregue: existe o processo, e o que ele
              revela.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <blockquote className="mt-10 border-l-2 border-[#D45C0E] pl-6 md:mt-12 md:pl-7">
              <p className="font-display text-[1.35rem] leading-snug text-[#0B2428] md:text-3xl">
                Entre a arte e o sentir, um espaço pra{" "}
                <span
                  className="font-script text-[#852B09]"
                  style={{ fontSize: "1.2em" }}
                >
                  se reencontrar.
                </span>
              </p>
            </blockquote>
          </Reveal>

          <Reveal delay={380}>
            <div className="mt-10 flex flex-wrap items-center gap-5 md:mt-12 md:gap-6">
              <Btn href={WHATSAPP}>Quero conversar</Btn>

              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="font-omnes text-[0.68rem] uppercase tracking-[0.24em] text-[#0B2428]/70 underline underline-offset-8 hover:text-[#852B09]"
              >
                @candida_arteterapia
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   ARTETERAPIA — DIVISÃO RETA
   ========================================================= */

function Arteterapia() {
  const materiais = [
    "pintura",
    "colagem",
    "escrita",
    "argila",
    "fotografia",
    "movimento",
  ];

  return (
    <section
      id="arteterapia"
      className="relative overflow-hidden bg-[#D5DE9B] px-5 py-24 md:px-12 md:py-40"
    >
      {/* Mobile: ícone centralizado atrás do texto. Desktop (md+): mantém a posição original (canto inferior esquerdo). */}
      <BackgroundIcon
        src="/images/icone-3.png"
        opacity={0.12}
        rotate={-6}
        className="left-1/2 top-16 h-[380px] w-[380px] -translate-x-1/2 md:left-auto md:top-auto md:-left-52 md:bottom-[-150px] md:translate-x-0 md:h-[620px] md:w-[620px]"
      />

      <div className="pointer-events-none absolute right-[-100px] top-[-120px] h-72 w-72 rounded-full border border-[#852B09]/10" />

      <div className="relative z-10 mx-auto max-w-[1300px]">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <Reveal>
              <p className="font-omnes mb-6 flex items-center gap-3 text-[0.62rem] uppercase tracking-[0.34em] text-[#0B2428]/60">
                <GlyphFlower className="h-5 w-5 text-[#852B09]" />
                arteterapia
              </p>

              <h2
                className="font-display text-[#852B09]"
                style={{
                  fontSize: "clamp(2rem,5vw,3.9rem)",
                  lineHeight: 1.02,
                  fontWeight: 400,
                }}
              >
                QUANDO A ARTE
                <br />
                ENCONTRA O SENTIR
              </h2>
            </Reveal>

            <Reveal delay={160}>
              <p className="font-omnes mt-9 max-w-xl text-[1rem] leading-[1.9] text-[#0B2428]/85 md:mt-10 md:text-[1.02rem]">
                A arteterapia é um método terapêutico que utiliza materiais
                expressivos — pintura, colagem, escrita, argila, fotografia e
                movimento — para acessar e compreender emoções que nem sempre
                cabem em palavras.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <p className="font-omnes mt-6 max-w-xl text-[1rem] leading-[1.9] text-[#0B2428]/85 md:text-[1.02rem]">
                É um convite para materializar aquilo que é invisível e
                encontrar novas formas de expressão através da criação. Aqui,
                o material não julga: ele acolhe.
              </p>
            </Reveal>
          </div>

          <Reveal delay={200}>
            <ul className="grid grid-cols-2 gap-3 md:gap-4">
              {materiais.map((m, i) => (
                <li
                  key={m}
                  className="flex min-h-[110px] flex-col justify-between rounded-[22px] p-5 shadow-[0_12px_30px_rgba(11,36,40,0.08)] md:min-h-[120px] md:rounded-[24px] md:p-5"
                  style={{
                    background: i % 3 === 1 ? "#EFEAD5" : "#D5DE9B",
                  }}
                >
                  <span className="font-omnes text-[0.56rem] uppercase tracking-[0.24em] text-[#0B2428]/45">
                    0{i + 1}
                  </span>

                  <span className="font-display text-lg text-[#852B09] md:text-2xl">
                    {m}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   TALENTO — DIVISÃO RETA
   ========================================================= */

function Talento() {
  return (
    <section className="relative overflow-hidden bg-[#EFEAD5] px-5 py-24 md:px-12 md:py-40">
      <div className="paper-grain pointer-events-none absolute inset-0 opacity-50" />

      <div className="relative mx-auto grid max-w-[1300px] grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-24">
        <Reveal>
          <div className="relative">
            <div className="absolute -bottom-6 -left-6 h-32 w-32 rounded-full bg-[#FED38A]" />

            <img
              src="/images/materials.jpg"
              alt="Pincéis, papéis rasgados, argila e lápis sobre a mesa do ateliê"
              className="relative w-full rounded-[26px] object-cover md:rounded-[28px]"
              style={{
                aspectRatio: "5/4",
                filter: "grayscale(1) contrast(1.06)",
              }}
            />

            <GlyphHand className="absolute -right-4 -top-7 h-14 w-14 text-[#852B09] md:-right-5 md:-top-8 md:h-16 md:w-16" />

            <GlyphBrush className="absolute -bottom-8 right-8 h-12 w-12 text-[#D45C0E] md:-bottom-9 md:right-10 md:h-14 md:w-14" />
          </div>
        </Reveal>

        <div>
          <Reveal delay={120}>
            <h2
              className="font-display text-[#0B2428]"
              style={{
                fontSize: "clamp(2rem,4.8vw,3.6rem)",
                lineHeight: 1.04,
                fontWeight: 400,
              }}
            >
              A arte não exige
              <br />
              talento —
              <br />
              apenas{" "}
              <span
                className="font-script text-[#852B09]"
                style={{ fontSize: "1.2em" }}
              >
                presença.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={220}>
            <p className="font-omnes mt-9 max-w-md text-[1rem] leading-[1.9] text-[#0B2428]/80 md:mt-10 md:text-[1.02rem]">
              Não é preciso saber desenhar, pintar ou escrever bem. O
              importante é permitir-se{" "}
              <span className="font-script text-[1.35em] text-[#D45C0E]">
                criar
              </span>{" "}
              — e observar o que aparece quando as mãos começam antes do
              pensamento.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PARA QUEM — DIVISÃO RETA
   ========================================================= */

function ParaQuem() {
  const [open, setOpen] = useState<number | null>(null);

  const items = [
    {
      icon: <GlyphHeart className="h-8 w-8" />,
      t: "Alívio emocional",
      d: "Pessoas em busca de alívio emocional diante de estresse, ansiedade ou exaustão.",
    },
    {
      icon: <GlyphBrush className="h-8 w-8" />,
      t: "Bloqueios criativos",
      d: "Quem sente bloqueios criativos ou dificuldade em expressar sentimentos.",
    },
    {
      icon: <GlyphPetals className="h-8 w-8" />,
      t: "Outro caminho",
      d: "Aqueles que já passaram por uma terapia tradicional e desejam experimentar um processo mais sensorial e simbólico.",
    },
    {
      icon: <GlyphDrop className="h-8 w-8" />,
      t: "Reconexão",
      d: "Quem deseja reconectar corpo, mente e expressão de forma gentil e profunda.",
    },
  ];

  return (
    <section
      id="para-quem"
      className="relative overflow-hidden bg-[#852B09] px-5 py-24 md:px-12 md:py-40"
    >
      <div className="paper-grain pointer-events-none absolute inset-0 opacity-[0.30]" />

      <div className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full border border-[#FED38A]/10" />

      <div className="pointer-events-none absolute -left-24 bottom-0 h-64 w-64 rounded-full bg-[#D5DE9B]/5 blur-3xl" />

      <div className="relative mx-auto max-w-[1100px]">
        <Reveal>
          <p className="font-omnes mb-6 text-[0.62rem] uppercase tracking-[0.34em] text-[#D5DE9B]/70">
            talvez seja para você
          </p>

          <h2
            className="font-display max-w-3xl text-[#FED38A]"
            style={{
              fontSize: "clamp(2rem,5vw,3.8rem)",
              lineHeight: 1.03,
              fontWeight: 400,
            }}
          >
            TALVEZ ESTE ESPAÇO
            <br />
            SEJA PARA{" "}
            <span className="font-script" style={{ fontSize: "1.15em" }}>
              você.
            </span>
          </h2>

          <p className="font-omnes mt-7 max-w-lg text-[0.98rem] leading-relaxed text-[#EFEAD5]/65">
            Não precisa se identificar com tudo. Abra apenas aquilo que fizer
            sentido para o seu momento.
          </p>
        </Reveal>

        <div className="mt-14 border-t border-[#EFEAD5]/15 md:mt-20">
          {items.map((it, i) => {
            const isOpen = open === i;

            return (
              <Reveal key={it.t} delay={i * 80}>
                <div className="border-b border-[#EFEAD5]/15">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center gap-5 py-6 text-left md:py-8"
                  >
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#D5DE9B]/30 text-[#D5DE9B] transition-all duration-500 group-hover:border-[#FED38A]/70 group-hover:text-[#FED38A] md:h-12 md:w-12"
                      style={{
                        transform: isOpen ? "rotate(8deg)" : undefined,
                      }}
                    >
                      {it.icon}
                    </span>

                    <span className="font-display flex-1 text-[1.3rem] text-[#EFEAD5] md:text-2xl">
                      {it.t}
                    </span>

                    <span
                      className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#FED38A]/40 text-[#FED38A] transition-transform duration-500"
                      style={{
                        transform: isOpen ? "rotate(45deg)" : undefined,
                      }}
                    >
                      <span className="absolute h-px w-3 bg-current" />
                      <span className="absolute h-3 w-px bg-current" />
                    </span>
                  </button>

                  <div
                    className="grid transition-[grid-template-rows,opacity] duration-500"
                    style={{
                      gridTemplateRows: isOpen ? "1fr" : "0fr",
                      opacity: isOpen ? 1 : 0,
                    }}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-7 pl-16 pr-8 md:pb-9 md:pl-[68px] md:pr-16">
                        <p className="font-omnes max-w-2xl text-[0.98rem] leading-[1.85] text-[#EFEAD5]/70 md:text-[1rem]">
                          {it.d}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={300}>
          <div className="mt-10 flex items-center gap-4">
            <span className="h-px w-10 bg-[#D45C0E]" />

            <p className="font-script text-2xl text-[#FED38A]">
              você não precisa saber por onde começar.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================
   COMO FUNCIONA — DIVISÃO RETA
   ========================================================= */

function ComoFunciona() {
  const etapas = [
    {
      n: "01",
      t: "Chegada",
      icon: <GlyphMoon className="h-7 w-7" />,
      d: "Um tempo para pousar, respirar e estar.",
    },
    {
      n: "02",
      t: "Escuta",
      icon: <GlyphEar className="h-7 w-7" />,
      d: "O que vem em palavras — e o que vem em silêncio.",
    },
    {
      n: "03",
      t: "Criação",
      icon: <GlyphBrush className="h-7 w-7" />,
      d: "Um convite criativo desenhado para o seu momento.",
    },
    {
      n: "04",
      t: "Expressão",
      icon: <GlyphHand className="h-7 w-7" />,
      d: "As mãos assumem, o material responde.",
    },
    {
      n: "05",
      t: "Reflexão",
      icon: <GlyphDrop className="h-7 w-7" />,
      d: "Olhar junto para aquilo que apareceu.",
    },
    {
      n: "06",
      t: "Processo",
      icon: <GlyphFlower className="h-7 w-7" />,
      d: "Cada pessoa segue no seu próprio ritmo.",
    },
  ];

  return (
    <section
      id="como-funciona"
      className="relative overflow-hidden bg-[#EFEAD5] px-5 py-24 md:px-12 md:py-40"
    >
      <div className="paper-grain pointer-events-none absolute inset-0 opacity-50" />

      <div className="relative mx-auto max-w-[1300px]">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <Reveal>
            <div>
              <p className="font-omnes mb-5 text-[0.62rem] uppercase tracking-[0.34em] text-[#D45C0E]">
                o processo
              </p>

              <h2
                className="font-display text-[#852B09]"
                style={{
                  fontSize: "clamp(2rem,5vw,3.8rem)",
                  lineHeight: 1.02,
                  fontWeight: 400,
                }}
              >
                COMO
                <br />
                FUNCIONA?
              </h2>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="lg:pt-12">
              <p className="font-omnes max-w-xl text-[1rem] leading-[1.9] text-[#0B2428]/85 md:text-[1.02rem]">
                Não existe uma fórmula pronta. Cada encontro acontece a
                partir da escuta, da presença e de uma proposta criativa
                construída para o momento de cada pessoa.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="relative mt-20 hidden lg:block">
          <div className="absolute left-[7%] right-[7%] top-[30px] h-px bg-[#852B09]/20" />

          <div className="relative grid grid-cols-6">
            {etapas.map((e, i) => (
              <Reveal key={e.n} delay={i * 100}>
                <div className="relative px-3 text-center">
                  <div className="relative mx-auto flex h-[60px] w-[60px] items-center justify-center rounded-full border border-[#852B09]/25 bg-[#EFEAD5] text-[#852B09] transition-all duration-500 hover:border-[#D45C0E] hover:bg-[#FED38A]">
                    {e.icon}

                    <span className="font-omnes absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#852B09] text-[0.65rem] text-[#FED38A]">
                      {e.n}
                    </span>
                  </div>

                  <h3 className="font-display mt-7 text-xl text-[#0B2428]">
                    {e.t}
                  </h3>

                  <p className="font-omnes mx-auto mt-3 max-w-[160px] text-[0.86rem] leading-[1.65] text-[#0B2428]/60">
                    {e.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="relative mt-14 lg:hidden">
          <div className="absolute bottom-8 left-[29px] top-8 w-px bg-[#852B09]/20" />

          <div className="relative space-y-9">
            {etapas.map((e, i) => (
              <Reveal key={e.n} delay={i * 80}>
                <div className="relative flex gap-5">
                  <div className="relative z-10 flex h-[58px] w-[58px] shrink-0 items-center justify-center rounded-full border border-[#852B09]/25 bg-[#EFEAD5] text-[#852B09]">
                    {e.icon}

                    <span className="font-omnes absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#852B09] text-[0.58rem] text-[#FED38A]">
                      {e.n}
                    </span>
                  </div>

                  <div className="pt-1">
                    <h3 className="font-display text-xl text-[#0B2428]">
                      {e.t}
                    </h3>

                    <p className="font-omnes mt-2 max-w-sm text-[0.9rem] leading-[1.7] text-[#0B2428]/60">
                      {e.d}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={300}>
          <p className="font-script mt-14 text-2xl text-[#852B09] md:mt-16">
            cada pessoa tem o seu próprio caminho.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================
   ATENDIMENTO — DIVISÃO RETA
   ========================================================= */

function Atendimento() {
  return (
    <section
      id="atendimento"
      className="relative overflow-hidden bg-[#0B2428] px-5 py-24 shadow-[0_3px_0_0_#0B2428] md:px-12 md:py-40 md:shadow-none"
    >
      <div className="pointer-events-none absolute -right-32 -top-20 h-96 w-96 rounded-full border border-[#FED38A]/10" />

      <div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#D5DE9B]/5 blur-3xl" />

      <div className="relative mx-auto max-w-[1200px]">
        <Reveal>
          <div className="max-w-3xl">
            <p className="font-omnes mb-6 text-[0.62rem] uppercase tracking-[0.34em] text-[#D5DE9B]">
              atendimento
            </p>

            <h2
              className="font-display text-[#EFEAD5]"
              style={{
                fontSize: "clamp(2rem,5vw,3.7rem)",
                lineHeight: 1.03,
                fontWeight: 400,
              }}
            >
              UM ESPAÇO PARA
              <br />
              ESTAR{" "}
              <span
                className="font-script text-[#FED38A]"
                style={{ fontSize: "1.15em" }}
              >
                presente.
              </span>
            </h2>

            <p className="font-omnes mt-7 max-w-xl text-[1rem] leading-[1.8] text-[#EFEAD5]/65 md:text-[1.05rem]">
              Escolha a forma que fizer mais sentido para você. O importante é
              encontrar um espaço seguro para chegar como você está.
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-5 md:mt-20 md:grid-cols-2">
          <Reveal delay={120}>
            <div className="group rounded-[28px] border border-[#EFEAD5]/10 bg-[#EFEAD5]/[0.035] p-7 transition-all duration-500 hover:border-[#FED38A]/25 hover:bg-[#EFEAD5]/[0.06] md:p-9">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D5DE9B]/30">
                  <GlyphPetals className="h-7 w-7 text-[#D5DE9B]" />
                </div>

                <span className="font-script text-3xl text-[#FED38A]/50">
                  01
                </span>
              </div>

              <h3 className="font-display mt-8 text-2xl text-[#EFEAD5]">
                Atendimento online
              </h3>

              <p className="font-omnes mt-4 max-w-md text-[0.95rem] leading-[1.8] text-[#EFEAD5]/60">
                Um espaço de escuta e criação, onde você estiver.
              </p>
            </div>
          </Reveal>

          <Reveal delay={220}>
            <div className="group rounded-[28px] border border-[#EFEAD5]/10 bg-[#EFEAD5]/[0.035] p-7 transition-all duration-500 hover:border-[#FED38A]/25 hover:bg-[#EFEAD5]/[0.06] md:p-9">
              <div className="flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D45C0E]/40">
                  <GlyphFlower className="h-7 w-7 text-[#D45C0E]" />
                </div>

                <span className="font-script text-3xl text-[#FED38A]/50">
                  02
                </span>
              </div>

              <h3 className="font-display mt-8 text-2xl text-[#EFEAD5]">
                Atendimento presencial
              </h3>

              <p className="font-omnes mt-4 max-w-md text-[0.95rem] leading-[1.8] text-[#EFEAD5]/60">
                Encontros presenciais em Porto Alegre, em um ambiente
                acolhedor e confidencial.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={300}>
          <div className="relative mt-5 overflow-hidden rounded-[30px] border border-[#FED38A]/15 bg-[#071b1e] md:mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="relative flex flex-col justify-between p-7 md:p-10">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="h-px w-8 bg-[#D45C0E]" />

                    <span className="font-omnes text-[0.6rem] uppercase tracking-[0.3em] text-[#D5DE9B]">
                      onde estamos
                    </span>
                  </div>

                  <h3 className="font-display mt-8 text-3xl leading-tight text-[#EFEAD5] md:text-4xl">
                    Porto Alegre
                    <br />
                    <span className="font-script text-[#FED38A]">RS</span>
                  </h3>

                  <p className="font-omnes mt-6 max-w-sm text-[0.95rem] leading-[1.8] text-[#EFEAD5]/55">
                    Um ambiente pensado para acolher, desacelerar e permitir
                    que o processo aconteça com calma.
                  </p>
                </div>

                <a
                  href="https://maps.app.goo.gl/iukMtk3qqdwuyQVc9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-omnes mt-9 inline-flex w-fit items-center gap-3 rounded-full border border-[#FED38A]/35 px-5 py-3 text-[0.62rem] uppercase tracking-[0.2em] text-[#FED38A] transition-all duration-300 hover:border-[#FED38A] hover:bg-[#FED38A] hover:text-[#0B2428]"
                >
                  Ver localização no Maps

                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 8H13M13 8L9 4M13 8L9 12"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>

              <div className="relative min-h-[280px] overflow-hidden bg-[#123338] md:min-h-[340px]">
                <div className="absolute inset-0 opacity-20">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(239,234,213,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(239,234,213,0.12) 1px, transparent 1px)",
                      backgroundSize: "45px 45px",
                    }}
                  />
                </div>

                <div className="absolute left-[18%] top-[28%] h-32 w-32 rounded-full border border-[#FED38A]/10 md:h-44 md:w-44" />

                <div className="absolute bottom-[18%] right-[12%] h-20 w-20 rounded-full border border-[#D5DE9B]/10 md:h-28 md:w-28" />

                <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#FED38A] shadow-[0_15px_40px_rgba(254,211,138,0.18)]">
                    <svg
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M20 10C20 15 12 21 12 21C12 21 4 15 4 10C4 5.58 7.58 2 12 2C16.42 2 20 5.58 20 10Z"
                        stroke="#0B2428"
                        strokeWidth="1.5"
                      />

                      <circle
                        cx="12"
                        cy="10"
                        r="2.5"
                        stroke="#0B2428"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>

                  <div className="font-omnes mt-4 rounded-full border border-[#EFEAD5]/15 bg-[#0B2428]/70 px-4 py-2 backdrop-blur-sm">
                    <span className="text-[0.58rem] uppercase tracking-[0.22em] text-[#EFEAD5]/70">
                      atendimento presencial
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={400}>
          <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <Btn href={WHATSAPP} tone="sun">
              Agendar sessão
            </Btn>

            <span className="font-omnes text-[0.65rem] uppercase tracking-[0.22em] text-[#EFEAD5]/35">
              online · presencial · Porto Alegre
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================
   MATERIAIS — O ATELIÊ COMO LINGUAGEM (COM ONDULAÇÃO ENTRADA/SAÍDA)
   ========================================================= */

function Materiais() {
  const blocos = [
    {
      t: "PINTURA",
      img: "/images/hero.jpg",
      bg: "#FED38A",
    },
    {
      t: "COLAGEM",
      img: "/images/collage.jpg",
      bg: "#D5DE9B",
    },
    {
      t: "ARGILA",
      img: "/images/clay.jpg",
      bg: "#D45C0E",
    },
  ];

  return (
    <section
      className="relative overflow-hidden bg-[#EFEAD5] px-5 pb-28 pt-36 shadow-[0_3px_0_0_#852B09] md:px-12 md:pb-40 md:pt-48 md:shadow-none"
    >
      <div className="paper-grain pointer-events-none absolute inset-0 opacity-50" />

      {/* =====================================================
          ONDULAÇÃO SUPERIOR (ENTRADA)
          Onda na cor da section anterior Atendimento (#0B2428)
          sobre a section Materiais
          ===================================================== */}
      <WaveEdge fill="#0B2428" placement="top" />

      <div className="relative z-10 mx-auto max-w-[1300px]">
        <Reveal>
          <p className="font-omnes text-[0.62rem] uppercase tracking-[0.34em] text-[#D45C0E]">
            materiais expressivos
          </p>

          <h2
            className="font-display mt-6 max-w-2xl text-[#852B09]"
            style={{
              fontSize: "clamp(1.9rem,4.6vw,3.4rem)",
              lineHeight: 1.05,
              fontWeight: 400,
            }}
          >
            O ATELIÊ COMO
            <br />
            LINGUAGEM
          </h2>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-9 md:mt-16 md:grid-cols-3 md:gap-10">
          {blocos.map((b, i) => (
            <Reveal key={b.t} delay={i * 130}>
              <div
                className="relative rounded-[30px]"
                style={{
                  marginTop: i === 1 ? "3rem" : 0,
                }}
              >
                <div
                  className="absolute inset-x-4 -bottom-4 h-full rounded-[34px]"
                  style={{
                    background: b.bg,
                    opacity: 0.65,
                  }}
                />

                <img
                  src={b.img}
                  alt={`Material expressivo: ${b.t.toLowerCase()}`}
                  className="relative w-full rounded-[26px] object-cover md:rounded-[28px]"
                  style={{
                    aspectRatio: "1/1",
                    filter: "grayscale(1)",
                  }}
                />

                <p className="font-omnes relative mt-5 text-[0.68rem] uppercase tracking-[0.28em] text-[#0B2428]">
                  {b.t}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* =====================================================
          ONDULAÇÃO INFERIOR (SAÍDA)
          Onda na cor da próxima section CTA Final (#852B09)
          sobre a section Materiais
          ===================================================== */}
      <WaveEdge fill="#852B09" placement="bottom" />
    </section>
  );
}

/* =========================================================
   CTA FINAL — DIVISÃO RETA
   ========================================================= */

function CTAFinal() {
  return (
    <section className="relative overflow-hidden bg-[#852B09] px-5 py-28 md:px-12 md:py-44">
      <div className="pointer-events-none absolute -left-32 top-10 h-72 w-72 rounded-full bg-[#D5DE9B]/5 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full border border-[#FED38A]/10" />

      <div className="pointer-events-none absolute left-[2%] top-[62%] hidden -translate-y-1/2 md:block lg:left-[6%] xl:left-[9%]">
        <BackgroundIcon
          src="/images/icone-2.png"
          opacity={0.10}
          rotate={-10}
          className="h-[105px] w-[105px] lg:h-[140px] lg:w-[140px] xl:h-[165px] xl:w-[165px]"
        />
      </div>

      <div className="relative mx-auto max-w-[1200px] text-center">
        <Reveal>
          <Logo
            light
            className="mx-auto max-h-20 max-w-[220px] md:max-h-24 md:max-w-[260px]"
          />
        </Reveal>

        <Reveal delay={140}>
          <h2
            className="font-display mx-auto mt-14 max-w-4xl text-[#EFEAD5] md:mt-16"
            style={{
              fontSize: "clamp(1.75rem,4.6vw,3.4rem)",
              lineHeight: 1.08,
              fontWeight: 400,
            }}
          >
            TALVEZ VOCÊ NÃO PRECISE ENCONTRAR TODAS AS PALAVRAS AGORA.
          </h2>
        </Reveal>

        <Reveal delay={240}>
          <p className="font-omnes mx-auto mt-7 max-w-md text-[1rem] leading-relaxed text-[#EFEAD5]/80 md:mt-8 md:text-[1.05rem]">
            Existe outro caminho para começar a se escutar.
          </p>
        </Reveal>

        <Reveal delay={320}>
          <p className="font-script mt-7 text-4xl text-[#FED38A] md:mt-8">
            Permita-se criar.
          </p>
        </Reveal>

        <Reveal delay={400}>
          <div className="mt-10 flex flex-col items-center gap-5 md:mt-12">
            <Btn href={WHATSAPP} tone="sun">
              Agendar sessão
            </Btn>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================
   FOOTER
   ========================================================= */

function Footer() {
  return (
    <footer className="bg-[#0B2428] px-5 pb-12 pt-20 md:px-12 md:pb-14 md:pt-24">
      <div className="mx-auto max-w-[1300px]">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.1fr_0.9fr_0.9fr] md:gap-14">
          <div>
            <Logo light className="max-h-12 max-w-[200px]" />

            <p className="font-display mt-7 max-w-xs text-xl leading-snug text-[#EFEAD5]/85">
              Um espaço para criar sentido, acolher e transformar.
            </p>
          </div>

          <nav aria-label="Navegação do rodapé">
            <p className="font-omnes mb-6 text-[0.6rem] uppercase tracking-[0.3em] text-[#D5DE9B]">
              Navegue
            </p>

            <ul className="space-y-3">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="font-omnes text-[#EFEAD5]/75 transition-colors hover:text-[#FED38A]"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-omnes mb-6 text-[0.6rem] uppercase tracking-[0.3em] text-[#D5DE9B]">
              Contato
            </p>

            <ul className="font-omnes space-y-3 text-[#EFEAD5]/75">
              <li>
                <a
                  href={WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FED38A]"
                >
                  WhatsApp (51) 99632-6048
                </a>
              </li>

              <li>
                <a
                  href={INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FED38A]"
                >
                  @candida_arteterapia
                </a>
              </li>

              <li>Porto Alegre · online e presencial</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex justify-center md:mt-20">
          <img
            src="/images/logo2.png"
            alt="Carolina Candida"
            className="h-auto w-[75px] object-contain opacity-80 md:w-[90px]"
          />
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-[#EFEAD5]/15 pt-7 md:mt-12 md:flex-row md:items-center md:pt-8">
          <p className="font-omnes text-[0.64rem] uppercase tracking-[0.24em] text-[#EFEAD5]/50">
            Carolina Candida · Arteterapia
          </p>

          <GlyphMoon className="h-5 w-8 text-[#FED38A]" />
        </div>
      </div>
    </footer>
  );
}

/* =========================================================
   WHATSAPP FLUTUANTE
   ========================================================= */

function FloatingWhats() {
  return (
    <a
      href={WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar no WhatsApp com Carolina Candida"
      className="fixed bottom-5 right-5 z-50 flex h-13 w-13 items-center justify-center rounded-full bg-[#852B09] shadow-[0_10px_35px_rgba(0,0,0,0.18)] transition-transform duration-500 hover:-translate-y-1 md:bottom-6 md:right-6 md:h-14 md:w-14"
    >
      <svg
        viewBox="0 0 24 24"
        className="h-6 w-6 md:h-7 md:w-7"
        fill="#FED38A"
        aria-hidden="true"
      >
        <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.9.5 3.68 1.38 5.22L2 22l5.07-1.53a9.8 9.8 0 0 0 4.97 1.34h.01c5.43 0 9.84-4.4 9.84-9.84S17.47 2 12.04 2Zm5.72 13.9c-.24.68-1.4 1.3-1.94 1.35-.5.05-.96.23-3.23-.67-2.72-1.07-4.45-3.83-4.58-4.01-.13-.18-1.1-1.46-1.1-2.79s.7-1.98.95-2.25c.25-.27.54-.34.72-.34l.52.01c.17 0 .4-.06.62.47.24.57.8 1.98.87 2.12.07.14.12.3.02.48-.1.18-.15.3-.29.46-.14.16-.3.36-.43.48-.14.14-.29.29-.12.57.17.28.74 1.22 1.59 1.98 1.09.97 2 1.27 2.29 1.41.29.14.45.12.62-.07.17-.2.71-.83.9-1.11.19-.28.38-.23.64-.14.26.1 1.66.79 1.94.93.29.14.48.21.55.33.07.12.07.68-.17 1.36Z" />
      </svg>
    </a>
  );
}

/* =========================================================
   ELEMENTOS GERAIS DE FUNDO
   ========================================================= */

function PeacefulElements() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute -left-24 top-[8%] h-72 w-72 rounded-full bg-[#D5DE9B]/30 blur-3xl" />

      <div className="absolute -right-28 top-[30%] h-80 w-80 rounded-full bg-[#FED38A]/35 blur-3xl" />

      <div className="absolute left-[35%] top-[58%] h-64 w-64 rounded-full bg-[#852B09]/10 blur-3xl" />

      <div className="absolute -right-20 bottom-[8%] h-72 w-72 rounded-full bg-[#D5DE9B]/25 blur-3xl" />

      <div className="absolute left-[7%] top-[18%] h-24 w-24 rounded-full border border-[#852B09]/10" />

      <div className="absolute right-[9%] top-[47%] h-32 w-32 rounded-full border border-[#0B2428]/10" />

      <div className="absolute bottom-[18%] left-[14%] h-16 w-16 rounded-full border border-[#852B09]/10" />

      <svg
        className="absolute right-[12%] top-[13%] h-28 w-28 text-[#852B09]/10"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M50 8C50 8 67 25 67 43C67 57 57 68 50 74C43 68 33 57 33 43C33 25 50 8 50 8Z"
          stroke="currentColor"
          strokeWidth="1.2"
        />

        <path
          d="M50 16V82"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>

      <svg
        className="absolute bottom-[9%] left-[5%] h-32 w-32 text-[#0B2428]/10"
        viewBox="0 0 100 100"
        fill="none"
      >
        <circle
          cx="50"
          cy="50"
          r="35"
          stroke="currentColor"
          strokeWidth="1"
        />

        <circle
          cx="50"
          cy="50"
          r="20"
          stroke="currentColor"
          strokeWidth="1"
        />

        <path
          d="M50 15V85M15 50H85"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>

      <div className="absolute left-[48%] top-[11%] flex gap-3 opacity-30">
        <span className="h-2 w-2 rounded-full bg-[#852B09]" />
        <span className="mt-3 h-1.5 w-1.5 rounded-full bg-[#0B2428]" />
        <span className="h-2 w-2 rounded-full bg-[#D5DE9B]" />
      </div>
    </div>
  );
}

/* =========================================================
   APP
   ========================================================= */

export default function App() {
  return (
    <div className="font-omnes relative min-h-screen overflow-hidden bg-[#EFEAD5]">
      <PeacefulElements />

      <div className="relative z-10">
        <Header />

        <main>
          <h1 className="sr-only">
            Carolina Candida | Arteterapia
          </h1>

          <Hero />

          <Silencio />

          <Sobre />
          <Arteterapia />
          <Talento />
          <ParaQuem />
          <ComoFunciona />
          <Atendimento />
          <Materiais />
          <CTAFinal />
        </main>

        <Footer />
        <FloatingWhats />
      </div>
    </div>
  );
}
