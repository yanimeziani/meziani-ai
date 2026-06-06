import { MouseEvent, ReactNode, RefObject, useEffect, useRef, useState } from 'react';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import { Bot, BrainCircuit, Code2, ExternalLink, Layers3, MessageCircle, Rocket, ShieldCheck, Sparkles } from 'lucide-react';

const bg = '#0C0C0C';
const ink = '#D7E2EA';

const marqueeImages = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

const decorativeImages = {
  moon: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png',
  object: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png',
  lego: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png',
  group: 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png',
};

const projectImages = [
  [
    'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85',
    'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85',
    'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85',
  ],
  [
    'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85',
    'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85',
    'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85',
  ],
  [
    'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85',
    'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85',
    'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85',
  ],
];

const services = [
  {
    name: 'AI Product Architecture',
    description: 'I shape fuzzy operational problems into readable AI-native products: scope, user flows, data model, LLM boundaries, and production path.',
  },
  {
    name: 'Agentic Workflows',
    description: 'Spec-first build systems with Claude Code, Codex, MCP agents, prompts, reviews, and apply-run assets that make automation auditable.',
  },
  {
    name: 'Full-stack Delivery',
    description: 'Next.js, React, TypeScript, Python, Supabase/PostgreSQL, Docker, Rust, and LLM APIs — shipped from prototype to production.',
  },
  {
    name: 'SMB Automation',
    description: 'Founder-led operations, lead qualification, invoice recovery, CRM handoff, follow-up cadences, and calm process design for real businesses.',
  },
  {
    name: 'Solutions Engineering',
    description: 'Bilingual FR/EN customer discovery, requirements translation, technical strategy, demos, implementation support, and clear handoffs.',
  },
];

const projects = [
  {
    number: '01',
    name: 'Dragun',
    category: 'Invoice Recovery SaaS',
    href: 'mailto:mezianiyani0@gmail.com?subject=Dragun%20demo',
    description: 'Automated invoice-recovery for SMBs with 14-day SMS/email cadence, Stripe payment links, and overdue-account visibility.',
    images: projectImages[0],
  },
  {
    number: '02',
    name: 'Bedrock',
    category: 'Knowledge Work OS',
    href: 'https://opendian.github.io/bedrock/',
    description: 'A public system for AI-assisted building: notes, sources, prompts, and apply-run assets shaped into an operable self-hosted workflow.',
    images: projectImages[1],
  },
  {
    number: '03',
    name: 'Dongun',
    category: 'WebGL Creative System',
    href: 'https://yanimeziani.github.io/dongun/',
    description: 'A browser-native creative experiment in interface, sound, and generative play — proof of taste beyond standard SaaS screens.',
    images: projectImages[2],
  },
];

function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ContactButton() {
  return (
    <a
      href="mailto:mezianiyani0@gmail.com?subject=Let%27s%20build%20with%20AI"
      className="inline-flex rounded-full px-8 py-3 text-xs font-medium uppercase tracking-widest text-white outline outline-2 outline-offset-[-3px] outline-white transition duration-200 hover:scale-[1.02] sm:px-10 sm:py-3.5 sm:text-sm md:px-12 md:py-4 md:text-base"
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
      }}
    >
      Contact Me
    </a>
  );
}

function LiveProjectButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noreferrer' : undefined}
      className="inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] transition duration-200 hover:bg-[#D7E2EA]/10 sm:px-10 sm:py-3.5 sm:text-base"
    >
      Live Project <ExternalLink size={18} strokeWidth={1.8} />
    </a>
  );
}

function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
}: {
  children: ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0, active: false });

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = event.clientX;
    const y = event.clientY;
    const active = x > rect.left - padding && x < rect.right + padding && y > rect.top - padding && y < rect.bottom + padding;
    if (!active) {
      setPos({ x: 0, y: 0, active: false });
      return;
    }
    const dx = (x - (rect.left + rect.width / 2)) / strength;
    const dy = (y - (rect.top + rect.height / 2)) / strength;
    setPos({ x: dx, y: dy, active: true });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: 0, y: 0, active: false })}
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        transition: pos.active ? activeTransition : inactiveTransition,
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}

function AnimatedChar({ char, index, total, progress }: { char: string; index: number; total: number; progress: MotionValue<number> }) {
  const start = index / total;
  const end = Math.min(1, start + 0.18);
  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  const value = char === ' ' ? '\u00A0' : char;
  return (
    <span className="char-wrap" aria-hidden="true">
      <span className="char-placeholder">{value}</span>
      <motion.span className="char-animated" style={{ opacity }}>
        {value}
      </motion.span>
    </span>
  );
}

function AnimatedText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] });
  const chars = Array.from(text);
  return (
    <p
      ref={ref}
      className="max-w-[560px] text-center text-[clamp(1rem,2vw,1.35rem)] font-medium leading-relaxed text-[#D7E2EA]"
      aria-label={text}
    >
      {chars.map((char, index) => (
        <AnimatedChar key={`${char}-${index}`} char={char} index={index} total={chars.length} progress={scrollYProgress} />
      ))}
    </p>
  );
}

function HeroSection() {
  return (
    <section className="relative flex h-screen flex-col overflow-x-clip bg-[#0C0C0C]">
      <FadeIn delay={0} y={-20}>
        <nav className="relative z-30 flex justify-between px-6 pt-6 text-sm font-medium uppercase tracking-wider text-[#D7E2EA] md:px-10 md:pt-8 md:text-lg lg:text-[1.4rem]">
          {['About', 'Price', 'Projects', 'Contact'].map((item) => (
            <a key={item} href={item === 'Contact' ? 'mailto:mezianiyani0@gmail.com' : `#${item.toLowerCase()}`} className="transition duration-200 hover:opacity-70">
              {item}
            </a>
          ))}
        </nav>
      </FadeIn>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#B600A8]/20 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[50vmin] w-[50vmin] rounded-full bg-[#BE4C00]/20 blur-[90px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(215,226,234,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(215,226,234,0.045)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_72%)]" />
      </div>

      <FadeIn delay={0.15} y={40} className="relative z-20 mt-6 overflow-hidden sm:mt-4 md:-mt-5">
        <h1 className="hero-heading w-full whitespace-nowrap text-[14vw] font-black uppercase leading-none tracking-tight sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]">
          Hi, i&apos;m yani
        </h1>
      </FadeIn>

      <FadeIn delay={0.6} y={30} className="absolute left-1/2 top-1/2 z-10 w-[280px] -translate-x-1/2 -translate-y-1/2 sm:bottom-0 sm:top-auto sm:w-[360px] sm:translate-y-0 md:w-[440px] lg:w-[520px]">
        <Magnet padding={150} strength={3} activeTransition="transform 0.3s ease-out" inactiveTransition="transform 0.6s ease-in-out">
          <div className="relative mx-auto aspect-[0.78] w-full">
            <div className="absolute inset-[9%] rounded-[42%] border border-[#D7E2EA]/20 bg-gradient-to-b from-[#D7E2EA]/10 to-transparent blur-[1px]" />
            <div className="absolute inset-x-[15%] bottom-[6%] top-[4%] rounded-full bg-[radial-gradient(circle_at_50%_20%,rgba(215,226,234,.28),transparent_28%),linear-gradient(180deg,rgba(182,0,168,.28),rgba(190,76,0,.18))] blur-2xl" />
            <img
              src="https://shrug-person-78902957.figma.site/_components/v2/d24c01ad3a56fc65e942a1f501eb73db42d7cf9a/Rectangle_40443.81459862.png"
              alt="Yani Meziani, AI product builder"
              className="relative z-10 h-full w-full -translate-x-12 object-contain drop-shadow-[0_40px_90px_rgba(182,0,168,.35)] sm:translate-x-0"
              draggable={false}
            />
            <div className="absolute bottom-[13%] left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/15 bg-black/45 px-4 py-2 text-xs font-medium uppercase tracking-widest text-white backdrop-blur-md">
              <Sparkles size={14} /> AI Native
            </div>
          </div>
        </Magnet>
      </FadeIn>

      <div className="relative z-30 mt-auto flex items-end justify-between px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <p className="max-w-[160px] text-[clamp(0.75rem,1.4vw,1.5rem)] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]">
            an ai product builder turning messy workflows into readable systems
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}

function MarqueeSection() {
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  const row1 = marqueeImages.slice(0, 11);
  const row2 = marqueeImages.slice(11);

  useEffect(() => {
    const handleScroll = () => {
      const sectionTop = ref.current?.offsetTop ?? 0;
      setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.3);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const renderRow = (images: string[], direction: 'right' | 'left') => (
    <div
      className="flex gap-3"
      style={{
        transform: direction === 'right' ? `translateX(${offset - 200}px)` : `translateX(${-1 * (offset - 200)}px)`,
        willChange: 'transform',
      }}
    >
      {[...images, ...images, ...images].map((src, index) => (
        <img key={`${src}-${index}`} src={src} alt="Motion portfolio preview" loading="lazy" className="h-[270px] w-[420px] shrink-0 rounded-2xl object-cover" />
      ))}
    </div>
  );

  return (
    <section ref={ref} className="overflow-hidden bg-[#0C0C0C] pt-24 pb-10 sm:pt-32 md:pt-40">
      <div className="flex flex-col gap-3">
        {renderRow(row1, 'right')}
        {renderRow(row2, 'left')}
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0C0C0C] px-5 py-20 sm:px-8 md:px-10">
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="pointer-events-none absolute top-[4%] left-[1%] w-[120px] opacity-80 sm:left-[2%] sm:w-[160px] md:left-[4%] md:w-[210px]">
        <img src={decorativeImages.moon} alt="" loading="lazy" />
      </FadeIn>
      <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="pointer-events-none absolute bottom-[8%] left-[3%] w-[100px] opacity-80 sm:left-[6%] sm:w-[140px] md:left-[10%] md:w-[180px]">
        <img src={decorativeImages.object} alt="" loading="lazy" />
      </FadeIn>
      <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="pointer-events-none absolute top-[4%] right-[1%] w-[120px] opacity-80 sm:right-[2%] sm:w-[160px] md:right-[4%] md:w-[210px]">
        <img src={decorativeImages.lego} alt="" loading="lazy" />
      </FadeIn>
      <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="pointer-events-none absolute right-[3%] bottom-[8%] w-[130px] opacity-80 sm:right-[6%] sm:w-[170px] md:right-[10%] md:w-[220px]">
        <img src={decorativeImages.group} alt="" loading="lazy" />
      </FadeIn>

      <div className="relative z-10 flex max-w-4xl flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight">About me</h2>
        </FadeIn>
        <AnimatedText text="I turn messy operational workflows into AI-native products people can read, debug, own, and use. I ship from customer discovery to product architecture, full-stack build, LLM integration, and automation — with the calm of frontline care and the bias for action of a founder." />
        <div className="pt-6 sm:pt-8 md:pt-10">
          <ContactButton />
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="price" className="rounded-t-[40px] bg-white px-5 py-20 text-[#0C0C0C] sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32">
      <FadeIn>
        <h2 className="mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28">Services</h2>
      </FadeIn>
      <div className="mx-auto max-w-5xl">
        {services.map((service, index) => (
          <FadeIn key={service.name} delay={index * 0.1}>
            <article className="grid grid-cols-[auto_1fr] gap-6 border-t border-[rgba(12,12,12,0.15)] py-8 last:border-b sm:gap-10 sm:py-10 md:gap-14 md:py-12">
              <div className="text-[clamp(3rem,10vw,140px)] font-black leading-none text-[#0C0C0C]">{String(index + 1).padStart(2, '0')}</div>
              <div className="flex flex-col justify-center gap-4">
                <h3 className="text-[clamp(1rem,2.2vw,2.1rem)] font-medium uppercase leading-none tracking-wide">{service.name}</h3>
                <p className="max-w-2xl text-[clamp(0.85rem,1.6vw,1.25rem)] font-light leading-relaxed opacity-60">{service.description}</p>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index, total }: { project: (typeof projects)[number]; index: number; total: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref as RefObject<HTMLElement>, offset: ['start end', 'end start'] });
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 0.9], [1, targetScale]);

  return (
    <div ref={ref} className="relative h-[85vh]">
      <motion.article
        className="sticky rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 shadow-[0_45px_120px_rgba(0,0,0,.55)] sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8"
        style={{ scale, top: `calc(6rem + ${index * 28}px)` }}
      >
        <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="grid gap-2 sm:grid-cols-[auto_1fr] sm:items-end sm:gap-x-8">
            <span className="text-[clamp(3rem,10vw,140px)] font-black leading-none text-[#D7E2EA]">{project.number}</span>
            <div className="pb-2">
              <p className="mb-2 flex items-center gap-2 text-sm font-light uppercase tracking-[0.35em] text-[#D7E2EA]/60">
                <Layers3 size={16} /> {project.category}
              </p>
              <h3 className="text-[clamp(2rem,5vw,5.8rem)] font-black uppercase leading-none tracking-tight text-[#D7E2EA]">{project.name}</h3>
              <p className="mt-3 max-w-2xl text-base font-light leading-relaxed text-[#D7E2EA]/65 md:text-lg">{project.description}</p>
            </div>
          </div>
          <LiveProjectButton href={project.href} />
        </div>
        <div className="grid gap-4 md:grid-cols-[40%_1fr]">
          <div className="grid gap-4">
            <img src={project.images[0]} alt={`${project.name} visual one`} loading="lazy" className="h-[clamp(130px,16vw,230px)] w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]" />
            <img src={project.images[1]} alt={`${project.name} visual two`} loading="lazy" className="h-[clamp(160px,22vw,340px)] w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]" />
          </div>
          <img src={project.images[2]} alt={`${project.name} visual three`} loading="lazy" className="h-[clamp(330px,42vw,590px)] w-full rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]" />
        </div>
      </motion.article>
    </div>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:py-32">
      <FadeIn>
        <h2 className="hero-heading mb-16 text-center text-[clamp(3rem,12vw,160px)] font-black uppercase leading-none tracking-tight sm:mb-20 md:mb-28">Project</h2>
      </FadeIn>
      <div className="mx-auto max-w-7xl">
        {projects.map((project, index) => (
          <ProjectCard key={project.name} project={project} index={index} total={projects.length} />
        ))}
      </div>
    </section>
  );
}

function ProofStrip() {
  const items = [
    { icon: BrainCircuit, label: 'Founder', value: 'Made Lucid' },
    { icon: Bot, label: 'Stack', value: 'Agents · LLMs · MCP' },
    { icon: Code2, label: 'Build', value: 'React · TS · Python' },
    { icon: ShieldCheck, label: 'Proof', value: 'Défi 48 Winner' },
  ];
  return (
    <section className="bg-[#0C0C0C] px-5 pb-16 sm:px-8 md:px-10">
      <div className="mx-auto grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => {
          const Icon = item.icon;
          return (
            <FadeIn key={item.label} delay={index * 0.08}>
              <div className="rounded-[28px] border border-white/10 bg-white/[0.035] p-5 text-[#D7E2EA] backdrop-blur">
                <Icon className="mb-8" size={26} strokeWidth={1.5} />
                <p className="text-xs font-light uppercase tracking-[0.35em] text-[#D7E2EA]/45">{item.label}</p>
                <p className="mt-2 text-2xl font-semibold uppercase leading-none tracking-tight">{item.value}</p>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="bg-[#0C0C0C] px-5 pb-10 pt-4 text-[#D7E2EA] sm:px-8 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 border-t border-white/10 pt-10 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="mb-4 flex items-center gap-2 text-sm font-light uppercase tracking-[0.35em] text-[#D7E2EA]/55"><MessageCircle size={16} /> Quebec · Remote · FR / EN</p>
          <h2 className="hero-heading max-w-4xl text-[clamp(3.4rem,12vw,13rem)] font-black uppercase leading-none tracking-tight">Let&apos;s build</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          <ContactButton />
          <a href="https://linkedin.com/in/yanimeziani" target="_blank" rel="noreferrer" className="inline-flex items-center rounded-full border-2 border-[#D7E2EA] px-8 py-3 text-xs font-medium uppercase tracking-widest text-[#D7E2EA] transition hover:bg-[#D7E2EA]/10 sm:px-10 sm:py-3.5 sm:text-sm md:text-base">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#0C0C0C] font-kanit">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <Footer />
    </main>
  );
}
