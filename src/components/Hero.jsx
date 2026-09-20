import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Phone, ArrowUpRight } from "lucide-react";
import desktopVideo from "../../intro video/lv_0_20260917114100.mp4";
import mobileVideo from "../../intro video mobile/WhatsApp Video 2026-09-18 at 7.17.42 PM.mp4";

const spring = {
  type: "spring",
  stiffness: 100,
  damping: 20,
};

function Reveal({ children, className = "", delay = 0, amount = 0.25 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Hero() {
  return (
    <motion.section
      id="home"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black px-4 py-32 text-center sm:px-6 lg:px-8"
    >
      {/* 1. Desktop Video (hidden on mobile, visible on md+) */}
      <video
        className="absolute inset-0 h-full w-full object-cover hidden md:block"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-label="Shree Arbuda Construction Desktop Showcase Video"
      >
        <source src={desktopVideo} type="video/mp4" />
        <source src="/intro video/lv_0_20260917114100.mp4" type="video/mp4" />
        <source src="/hero-video.mp4" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>

      {/* 2. Mobile Video (visible on mobile, hidden on md+) */}
      <video
        className="absolute inset-0 h-full w-full object-cover block md:hidden"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        aria-label="Shree Arbuda Construction Mobile Showcase Video"
      >
        <source src={mobileVideo} type="video/mp4" />
        <source src="/intro video mobile/WhatsApp Video 2026-09-18 at 7.17.42 PM.mp4" type="video/mp4" />
        <source src="/hero-video-mobile.mp4" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>

      {/* Multi-stop dark overlay gradients for crystal-clear readability across all devices */}
      <div className="absolute inset-0 bg-black/60 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none" />

      {/* Hero Text Content & Action Buttons */}
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center">
        <Reveal>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-1.5 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-300 sm:text-sm">
              ARCHITECTURE / 2D & 3D MAPPING / CONSTRUCTION
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="relative w-full max-w-full overflow-hidden">
          {/* Subtle gradient glow behind headline */}
          <div className="absolute left-1/2 top-1/2 -z-10 h-32 w-[120%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.1),transparent_50%)] blur-2xl md:h-48" />
          <h1 className="whitespace-nowrap text-2xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-[4.25rem] leading-none">
            SHREE ARBUDA CONSTRUCTION
          </h1>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mx-auto mt-5 max-w-3xl text-lg font-semibold text-neutral-100 sm:text-xl md:text-2xl">
            Premium Haweli, Villa, Houses & Commercial Construction Services.
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-neutral-300 sm:text-base md:text-lg">
            Designing and building high-end traditional hawelis, modern villas, and custom homes with precision 2D/3D mapping across Raniwara and surrounding areas.
          </p>
        </Reveal>

        <Reveal delay={0.22} className="mt-9">
          <div className="flex flex-row flex-wrap items-center justify-center gap-3 sm:gap-4">
            <motion.div whileHover={{ scale: 1.02 }}>
              <Link
                to="/contact"
                className="group flex min-w-36 items-center justify-center gap-1.5 rounded-md bg-white px-6 py-4 text-sm font-bold text-black transition-all duration-200 hover:bg-neutral-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] sm:min-w-40"
              >
                <span>Build With Us</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }}>
              <Link
                to="/services"
                className="min-w-36 rounded-md border border-white/80 bg-black/40 px-6 py-4 text-sm font-bold text-white backdrop-blur-sm transition-all duration-200 hover:border-white hover:bg-white hover:text-black hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] sm:min-w-40"
              >
                Our Services
              </Link>
            </motion.div>
          </div>
        </Reveal>

        {/* Department Contact Buttons */}
        <Reveal delay={0.28} className="mt-5 w-full max-w-xl">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <motion.a
              whileHover={{ scale: 1.02 }}
              href="tel:+916375683147"
              className="flex items-center gap-3.5 rounded-xl border border-neutral-800 bg-neutral-900/80 p-3.5 text-left backdrop-blur-md transition-all duration-200 hover:border-indigo-500/50 hover:bg-neutral-800/90 hover:shadow-[0_0_15px_rgba(99,102,241,0.15)]"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-indigo-500/15 text-indigo-400">
                <Phone className="h-4.5 w-4.5" />
              </div>
              <div>
                <p className="text-sm font-bold leading-snug text-white">
                  +91 63756 83147
                </p>
                <p className="mt-0.5 text-xs text-neutral-400">
                  Architecture & 3D Design
                </p>
              </div>
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.02 }}
              href="tel:+918529756391"
              className="flex items-center gap-3.5 rounded-xl border border-neutral-800 bg-neutral-900/80 p-3.5 text-left backdrop-blur-md transition-all duration-200 hover:border-amber-500/50 hover:bg-neutral-800/90 hover:shadow-[0_0_15px_rgba(245,158,11,0.15)]"
            >
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-amber-500/15 text-amber-400">
                <Phone className="h-4.5 w-4.5" />
              </div>
              <div>
                <p className="text-sm font-bold leading-snug text-white">
                  +91 85297 56391
                </p>
                <p className="mt-0.5 text-xs text-neutral-400">
                  Construction & On-Site Work
                </p>
              </div>
            </motion.a>
          </div>
        </Reveal>
      </div>
    </motion.section>
  );
}

export { Hero };
