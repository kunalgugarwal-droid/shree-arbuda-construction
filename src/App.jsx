import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Contact from "./Contact";
import ServiceArea from "./ServiceArea";
import CustomCursor from "./components/CustomCursor";
import Architecture from "./pages/Architecture";
import Construction from "./pages/Construction";
import Hero from "./components/Hero";
import {
  completedProjects,
  underConstructionProjects,
} from "./data/projects";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Box,
  Building2,
  Compass,
  HardHat,
  Menu,
  Phone,
  Ruler,
  Star,
  X,
} from "lucide-react";

function InstagramIcon({ className = "h-4 w-4", ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className = "h-4 w-4", ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Architecture Design", href: "/architecture" },
  { label: "Construction Projects", href: "/construction" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
];

const spring = {
  type: "spring",
  stiffness: 100,
  damping: 20,
};

const sectionMotion = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0 },
};

const services = [
  {
    title: "Architectural Design",
    icon: Building2,
    description:
      "Context-led concepts, plans, elevations, and construction-ready design systems for residential and commercial properties.",
  },
  {
    title: "2D & 3D Mapping (Autodesk)",
    icon: Compass,
    description:
      "Precision 2D drafting, floor plans, structural elevations, and detailed 3D spatial mapping created using Autodesk for seamless construction.",
  },
  {
    title: "3D Rendering",
    icon: Box,
    description:
      "Photorealistic visualization, walkthroughs, and presentation imagery that help stakeholders see the project clearly.",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    text: "We define the brief, site constraints, ambitions, budget posture, and the emotional quality the space needs to hold.",
  },
  {
    number: "02",
    title: "Concept",
    text: "We translate strategy into massing, plans, sections, material direction, and a distinct architectural language.",
  },
  {
    number: "03",
    title: "Development",
    text: "We refine structure, details, consultants, approvals, and drawings so design intent survives real-world pressure.",
  },
  {
    number: "04",
    title: "Construction",
    text: "We support execution with clear documentation, site coordination, and decisions that protect quality through handover.",
  },
];

const metrics = [
  { value: 15, suffix: "+", label: "Years Experience" },
  { value: 5000, suffix: "+", label: "Projects Completed" },
  { value: 10, suffix: "+", label: "Industry Awards" },
  { value: 32, suffix: "M", label: "Sq. ft. Designed" },
];

const testimonials = [
  {
    quote:
      "Their team understood the site, the business case, and the feeling we wanted guests to remember. The final building feels inevitable.",
    name: "Aarav Mehta",
    type: "Boutique Hospitality",
  },
  {
    quote:
      "Every meeting brought clarity. They balanced ambition with budget discipline and gave our family a home with real permanence.",
    name: "Nisha Kapoor",
    type: "Private Residence",
  },
  {
    quote:
      "The design process was calm, intelligent, and exacting. Our commercial project now has a strong identity without feeling loud.",
    name: "Rohan Shah",
    type: "Mixed-Use Development",
  },
];

function Section({ id, className = "", children }) {
  return (
    <motion.section
      id={id}
      variants={sectionMotion}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.18 }}
      transition={spring}
      className={className}
    >
      {children}
    </motion.section>
  );
}

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

function CountUp({ value, suffix }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let frameId;
    const duration = 1400;
    const startedAt = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(value * eased));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const mobileMenuVariants = {
  hidden: { y: "-100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 50, damping: 14 },
  },
  exit: {
    y: "-100%",
    opacity: 0,
    transition: { type: "spring", stiffness: 60, damping: 16 },
  },
};

const mobileLinkVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 14, delay: 0.15 + i * 0.07 },
  }),
};

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  const closeMobile = () => setMobileOpen(false);
  const isActive = (href) => pathname === href;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <nav className="relative flex h-20 items-center justify-between bg-black/50 px-5 backdrop-blur-2xl border-b border-white/[0.06] sm:px-8 lg:px-12">
          {/* Logo — far left */}
          <Link
            to="/"
            className="relative z-50 flex items-center gap-3"
            aria-label="Shree Arbuda Construction home"
          >
            <span className="grid h-9 w-9 place-items-center rounded-sm border border-white bg-white text-xs font-black text-black tracking-tighter">
              SAC
            </span>
            <span className="text-sm font-semibold uppercase leading-none tracking-tighter">
              Shree Arbuda
              <span className="block font-medium text-neutral-400">
                Construction
              </span>
            </span>
          </Link>

          {/* Desktop center links */}
          <div className="pointer-events-none absolute inset-x-0 hidden items-center justify-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`pointer-events-auto text-[13px] font-semibold uppercase tracking-[0.14em] transition-colors duration-200 ${isActive(link.href)
                    ? "text-white"
                    : "text-neutral-400 hover:text-white"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA — far right */}
          <div className="relative z-50 hidden items-center gap-3 md:flex">
            <a
              href="https://www.instagram.com/jayesh__935?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-md border border-white/10 bg-neutral-900 text-neutral-300 transition-colors hover:border-white/30 hover:bg-neutral-800 hover:text-white"
              aria-label="Instagram Profile"
              title="Follow on Instagram"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
            <a
              href="https://www.facebook.com/100060652575422/"
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-md border border-white/10 bg-neutral-900 text-neutral-300 transition-colors hover:border-white/30 hover:bg-neutral-800 hover:text-white"
              aria-label="Facebook Profile"
              title="Follow on Facebook"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
            <motion.div whileHover={{ scale: 1.02 }}>
              <Link
                to="/contact"
                className="rounded-md bg-white px-5 py-2.5 text-sm font-bold text-black transition-all duration-200 hover:bg-neutral-200 hover:shadow-[0_0_15px_rgba(255,255,255,0.3)] cursor-pointer"
              >
                Get Started
              </Link>
            </motion.div>
          </div>

          {/* Mobile hamburger / close toggle */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="relative z-50 grid h-10 w-10 place-items-center md:hidden"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <AnimatePresence mode="wait" initial={false}>
              {mobileOpen ? (
                <motion.span
                  key="close"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6 text-white" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ opacity: 0, rotate: 90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: -90 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6 text-white" />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </nav>
      </header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 flex flex-col items-start justify-center gap-6 bg-black px-8 md:hidden"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.label}
                custom={i}
                variants={mobileLinkVariants}
                initial="hidden"
                animate="visible"
              >
                <Link
                  to={link.href}
                  onClick={closeMobile}
                  className={`text-5xl font-black leading-tight tracking-tighter transition-colors hover:text-neutral-400 sm:text-6xl ${isActive(link.href) ? "text-white" : "text-neutral-500"
                    }`}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}

            <motion.div
              custom={navLinks.length}
              variants={mobileLinkVariants}
              initial="hidden"
              animate="visible"
              className="mt-6 flex items-center gap-4"
            >
              <Link
                to="/contact"
                onClick={closeMobile}
                className="inline-block rounded-md bg-white px-8 py-4 text-base font-bold text-black transition-colors hover:bg-neutral-200"
              >
                Get Started
              </Link>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/jayesh__935?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-14 w-14 place-items-center rounded-md border border-neutral-800 bg-neutral-900 text-white transition-colors hover:border-neutral-600 hover:bg-neutral-800"
                  aria-label="Instagram Profile"
                >
                  <InstagramIcon className="h-6 w-6" />
                </a>
                <a
                  href="https://www.facebook.com/100060652575422/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-14 w-14 place-items-center rounded-md border border-neutral-800 bg-neutral-900 text-white transition-colors hover:border-neutral-600 hover:bg-neutral-800"
                  aria-label="Facebook Profile"
                >
                  <FacebookIcon className="h-6 w-6" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const Header = Navbar;


function PageHero({ eyebrow, title, description, image }) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="relative flex min-h-[62vh] items-end overflow-hidden bg-black px-4 pb-16 pt-36 sm:px-6 sm:pb-20 sm:pt-44 lg:px-8"
    >
      <img
        src={image}
        alt={title ? `${title} - ${eyebrow}` : "Shree Arbuda Construction Hero"}
        loading="eager"
        decoding="async"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover bg-neutral-900"
      />
      <div className="absolute inset-0 bg-black/65" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.08 }}
          className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-neutral-400"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.14 }}
          className="max-w-5xl text-5xl font-black leading-none tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...spring, delay: 0.2 }}
          className="mt-7 max-w-2xl text-lg leading-8 text-neutral-300"
        >
          {description}
        </motion.p>
      </div>
    </motion.section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 *  FEATURED PROJECTS — Homepage horizontal scroll-snapping slider
 *  Filters for "completed" status, sliced to exactly 6 items.
 *  Location text has been removed from the gradient overlay.
 * ──────────────────────────────────────────────────────────────────────────── */
function Lightbox({ image, onClose }) {
  const imageUrl = typeof image === "object" ? image?.url : image;
  const imageTitle = typeof image === "object" ? image?.title : null;

  return (
    <AnimatePresence>
      {imageUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-[110] text-white hover:text-neutral-300 transition-colors"
            aria-label="Close"
          >
            <X className="h-8 w-8" />
          </button>
          <motion.img
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            src={imageUrl}
            alt={imageTitle ? `${imageTitle} architecture project expanded view` : "Expanded architecture project view"}
            loading="eager"
            decoding="async"
            className="max-w-full max-h-screen object-contain shadow-2xl bg-neutral-950"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FeaturedProjects() {
  const scrollContainerRef = useRef(null);
  const sectionRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // Mouse Drag to Scroll states
  const isMouseDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const hasDraggedRef = useRef(false);

  const [isDraggingState, setIsDraggingState] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // Exactly 6 completed projects for the homepage slider
  const sliderProjects = completedProjects.slice(0, 6);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth * 0.8;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleMouseDown = (e) => {
    if (!scrollContainerRef.current) return;
    isMouseDownRef.current = true;
    hasDraggedRef.current = false;
    setIsDraggingState(false);
    startXRef.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeftRef.current = scrollContainerRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isMouseDownRef.current = false;
    setIsDraggingState(false);
    setIsHovered(false);
  };

  const handleMouseUp = () => {
    isMouseDownRef.current = false;
    setIsDraggingState(false);
  };

  const handleMouseMove = (e) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      setCursorPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }

    if (!isMouseDownRef.current || !scrollContainerRef.current) return;

    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.6;
    if (Math.abs(walk) > 5) {
      hasDraggedRef.current = true;
      setIsDraggingState(true);
    }
    scrollContainerRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleCardClick = (image, title) => {
    if (hasDraggedRef.current) return;
    setSelectedImage({ url: image, title });
  };

  return (
    <Section id="projects" className="bg-black py-24 sm:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <Reveal>
          <div className="max-w-4xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-neutral-500">
              Portfolio
            </p>
            <h2 className="text-5xl font-black leading-none tracking-tighter text-white sm:text-6xl md:text-7xl">
              Our Featured Projects
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scroll("left")}
              className="grid h-12 w-12 place-items-center rounded-full border border-neutral-800 bg-neutral-950/60 hover:border-neutral-500 text-white transition-colors"
              aria-label="Scroll left"
            >
              <ArrowLeft className="h-5 w-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05, borderColor: "rgba(255,255,255,0.4)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scroll("right")}
              className="grid h-12 w-12 place-items-center rounded-full border border-neutral-800 bg-neutral-950/60 hover:border-neutral-500 text-white transition-colors"
              aria-label="Scroll right"
            >
              <ArrowRight className="h-5 w-5" />
            </motion.button>
          </div>
        </Reveal>
      </div>

      <div
        ref={sectionRef}
        className="relative group/slider select-none cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {/* Floating Custom Cursor Indicator */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{
                opacity: 1,
                scale: isDraggingState ? 0.9 : 1,
              }}
              exit={{ opacity: 0, scale: 0.4 }}
              transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.5 }}
              style={{
                position: "absolute",
                left: `${cursorPos.x}px`,
                top: `${cursorPos.y}px`,
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
                zIndex: 40,
              }}
              className="hidden md:flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-extrabold uppercase tracking-widest text-black shadow-[0_10px_30px_rgba(0,0,0,0.8)] border border-neutral-200/50 backdrop-blur-md"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>{isDraggingState ? "SLIDING" : "DRAG TO SLIDE"}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </motion.div>
          )}
        </AnimatePresence>

        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          className={`flex w-full gap-6 overflow-x-auto no-scrollbar pb-10 pl-4 sm:pl-6 lg:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] scroll-pl-4 sm:scroll-pl-6 lg:scroll-pl-[max(2rem,calc((100vw-80rem)/2+2rem))] ${isDraggingState ? "snap-none cursor-grabbing" : "snap-x snap-mandatory cursor-grab"
            }`}
        >
          {sliderProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                type: "spring",
                stiffness: 60,
                damping: 14,
                delay: index * 0.05,
              }}
              onClick={() => handleCardClick(project.image, project.title)}
              className="w-[320px] sm:w-[420px] h-[450px] shrink-0 snap-start rounded-2xl overflow-hidden relative group cursor-grab active:cursor-grabbing select-none bg-neutral-900 shadow-xl border border-neutral-800/60"
            >
              <img
                src={project.image}
                alt={`${project.title} architecture project`}
                loading="lazy"
                decoding="async"
                draggable="false"
                className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-105 select-none pointer-events-none bg-neutral-900"
              />
              <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-black/95 via-black/50 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 inset-x-0 p-6 text-left z-10 pointer-events-none">
                <h3 className="text-lg sm:text-xl font-semibold leading-snug tracking-tight text-white line-clamp-2">
                  {project.title}
                </h3>
              </div>
            </motion.div>
          ))}
          <div className="w-12 sm:w-20 shrink-0 snap-align-none" />
        </div>
      </div>
      <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 *  PROJECT GALLERY — Used on the dedicated /projects page
 *  Two sections: "Selected Works" (completed) and "Under Construction".
 *  Location text has been removed from the hover overlay.
 * ──────────────────────────────────────────────────────────────────────────── */
function ProjectGallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <section className="bg-black px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* ── Selected Works (completed) ──────────────────────────────── */}
        <Reveal>
          <div className="mb-12 grid gap-6 lg:grid-cols-[0.9fr_1fr] lg:items-end">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-neutral-500">
                Selected Works
              </p>
              <h2 className="text-5xl font-black leading-none tracking-tighter text-white sm:text-6xl md:text-7xl">
                Built around place, light, and purpose
              </h2>
            </div>
            <p className="max-w-2xl text-lg leading-8 text-neutral-400 lg:ml-auto">
              A closer look at residential, cultural, commercial, and civic
              spaces shaped with careful planning and a strong architectural
              point of view.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {completedProjects.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.05}>
              <article
                onClick={() => setSelectedImage({ url: project.image, title: project.title })}
                className="group h-full overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950/60 transition hover:border-neutral-600 cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden bg-neutral-900 relative">
                  <img
                    src={project.image}
                    alt={`${project.title} architecture project`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105 bg-neutral-900"
                  />
                  {/* Hover overlay — no location text */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-black tracking-tighter text-white">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400/80">
                    Completed
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* ── Under Construction ──────────────────────────────────────── */}
        {underConstructionProjects.length > 0 && (
          <>
            <Reveal>
              <div className="mb-12 mt-28 grid gap-6 lg:grid-cols-[0.9fr_1fr] lg:items-end">
                <div>
                  <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-amber-500/80">
                    Under Construction
                  </p>
                  <h2 className="text-5xl font-black leading-none tracking-tighter text-white sm:text-6xl md:text-7xl">
                    Currently taking shape
                  </h2>
                </div>
                <p className="max-w-2xl text-lg leading-8 text-neutral-400 lg:ml-auto">
                  Active projects on site — moving from design documentation
                  into built reality with precision and care.
                </p>
              </div>
            </Reveal>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {underConstructionProjects.map((project, index) => (
                <Reveal key={project.id} delay={index * 0.05}>
                  <article
                    onClick={() => setSelectedImage({ url: project.image, title: project.title })}
                    className="group h-full overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950/60 transition hover:border-neutral-600 cursor-pointer"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-neutral-900 relative">
                      <img
                        src={project.image}
                        alt={`${project.title} architecture project`}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105 bg-neutral-900"
                      />
                      {/* Hover overlay — no location text */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />
                    </div>
                    <div className="p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400/80">
                        Under Construction
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </>
        )}
      </div>
      <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
    </section>
  );
}

function Services() {
  return (
    <Section id="services" className="bg-black px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="relative mb-12 grid gap-6 lg:grid-cols-[0.9fr_1fr] lg:items-end">
            <div className="absolute left-0 top-1/2 -z-10 h-32 w-64 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent_70%)] blur-2xl" />
            <h2 className="text-5xl font-black leading-none tracking-tighter text-white sm:text-6xl md:text-7xl">
              Services we provide
            </h2>
            <p className="max-w-2xl text-lg leading-8 text-neutral-400 lg:ml-auto">
              Clear design services for clients who need strong ideas, rigorous
              execution, and a built result that feels considered from every angle.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <Reveal key={service.title} delay={index * 0.06}>
                <motion.article 
                  whileHover={{ scale: 1.02 }}
                  className="h-full rounded-xl border border-neutral-800/80 bg-neutral-950/60 p-7 transition-all duration-300 hover:border-neutral-700 backdrop-blur-sm"
                >
                  <div className="mb-12 grid h-12 w-12 place-items-center rounded-md border border-neutral-800 bg-black">
                    <Icon className="h-6 w-6 text-white" strokeWidth={1.8} />
                  </div>
                  <h3 className="mb-4 text-2xl font-black tracking-tighter text-white">
                    {service.title}
                  </h3>
                  <p className="text-base leading-7 text-neutral-400">
                    {service.description}
                  </p>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </Section>
  );
}

function Process() {
  return (
    <Section id="process" className="bg-black px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="relative mb-14 max-w-5xl">
            <div className="absolute left-0 top-1/2 -z-10 h-32 w-64 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent_70%)] blur-2xl" />
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-neutral-500">
              Process
            </p>
            <h2 className="text-5xl font-black leading-none tracking-tighter text-white sm:text-6xl md:text-7xl">
              How we deliver every project
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-4">
          {processSteps.map((step, index) => (
            <Reveal key={step.title} delay={index * 0.06} amount={0.18}>
              <motion.article 
                whileHover={{ scale: 1.02 }}
                className="relative min-h-80 overflow-hidden rounded-xl border border-neutral-800/80 bg-neutral-950/60 p-7 transition-all duration-300 hover:border-neutral-700 backdrop-blur-sm"
              >
                <p className="absolute -right-3 top-1 text-8xl font-black leading-none tracking-tighter text-white/[0.06]">
                  {step.number}
                </p>
                <p className="mb-10 text-sm font-black tracking-[0.24em] text-neutral-500">
                  {step.number}
                </p>
                <h3 className="mb-5 text-3xl font-black tracking-tighter text-white">
                  {step.title}
                </h3>
                <p className="text-base leading-7 text-neutral-400">{step.text}</p>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

function AboutStory() {
  return (
    <Section className="bg-black px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Reveal>
          <div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-neutral-500">
              Studio Profile
            </p>
            <h2 className="text-5xl font-black leading-none tracking-tighter text-white sm:text-6xl md:text-7xl">
              We design places that feel calm, precise, and deeply grounded.
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="space-y-6 text-lg leading-8 text-neutral-400">
            <p>
              Shree Arbuda Construction is a design studio working across homes,
              hospitality, culture, and commercial environments. Our work begins
              with listening closely to the site, the client, and the long-term
              life of the building.
            </p>
            <p>
              We bring together architecture, 2D & 3D mapping (Autodesk), visualization, and
              delivery support so each project moves from early idea to built
              reality with clarity. The result is work that feels distinctive
              without becoming loud.
            </p>
            <div className="grid gap-5 pt-5 sm:grid-cols-3">
              <div className="border-l border-white/20 pl-5">
                <p className="text-3xl font-black tracking-tighter text-white">
                  01
                </p>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
                  Context First
                </p>
              </div>
              <div className="border-l border-white/20 pl-5">
                <p className="text-3xl font-black tracking-tighter text-white">
                  02
                </p>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
                  Detail Driven
                </p>
              </div>
              <div className="border-l border-white/20 pl-5">
                <p className="text-3xl font-black tracking-tighter text-white">
                  03
                </p>
                <p className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500">
                  Built To Last
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}

function Experience() {
  return (
    <Section
      id="experience"
      className="relative overflow-hidden bg-black px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
    >
      <div
        className="absolute inset-0 bg-cover bg-fixed bg-center opacity-35"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=1800&q=85)",
        }}
      />
      <div className="absolute inset-0 bg-black/75" />

      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <div className="mb-14 max-w-5xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-neutral-500">
              Experience
            </p>
            <h2 className="text-5xl font-black leading-none tracking-tighter text-white sm:text-6xl md:text-7xl">
              Building with experience you can measure
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric, index) => (
            <Reveal key={metric.label} delay={index * 0.06}>
              <div className="border-l border-white/20 py-3 pl-5">
                <p className="text-5xl font-black tracking-tighter text-white sm:text-6xl">
                  <CountUp value={metric.value} suffix={metric.suffix} />
                </p>
                <p className="mt-4 text-sm font-medium uppercase tracking-[0.16em] text-neutral-400">
                  {metric.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Testimonials() {
  return (
    <Section className="bg-black px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="relative mb-12 max-w-5xl">
            <div className="absolute left-0 top-1/2 -z-10 h-32 w-64 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent_70%)] blur-2xl" />
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-neutral-500">
              Testimonials
            </p>
            <h2 className="text-5xl font-black leading-none tracking-tighter text-white sm:text-6xl md:text-7xl">
              What Our Clients Say About Working With Us
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 0.06}>
              <motion.article 
                whileHover={{ scale: 1.02 }}
                className="relative h-full rounded-xl border border-neutral-800/80 bg-neutral-950/60 p-7 transition-all duration-300 hover:border-neutral-700 backdrop-blur-sm"
              >
                <span className="absolute right-6 top-4 text-7xl font-black leading-none text-white/[0.06]">
                  "
                </span>
                <div className="mb-7 flex gap-1">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className="h-4 w-4 fill-white text-white"
                      strokeWidth={1.5}
                    />
                  ))}
                </div>
                <p className="mb-10 text-lg leading-8 text-neutral-300">
                  {testimonial.quote}
                </p>
                <div>
                  <p className="font-bold text-white">{testimonial.name}</p>
                  <p className="mt-1 text-sm text-neutral-500">{testimonial.type}</p>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}

function CallToAction() {
  return (
    <Section
      id="cta"
      className="flex min-h-screen items-center bg-white px-4 py-24 text-black sm:px-6 lg:px-8"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-start gap-10">
        <Reveal>
          <p className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-black/50">
            Explore / Get In Touch
          </p>
          <h2 className="max-w-5xl text-6xl font-black leading-none tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl">
            Let's start your project.
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
            <motion.div whileHover={{ scale: 1.02 }}>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 rounded-md bg-black px-8 py-5 text-base font-black text-white transition-all duration-200 hover:bg-neutral-800 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                Get in Touch
                <ArrowUpRight className="h-5 w-5" strokeWidth={2} />
              </Link>
            </motion.div>
        </Reveal>
      </div>
    </Section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-neutral-900 bg-black px-4 py-7 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 text-sm text-neutral-400 md:flex-row md:items-center md:justify-between">
        <p>Copyright 2026 Shree Arbuda Construction. All rights reserved.</p>
        <div className="flex flex-wrap items-center gap-5">
          <a
            href="https://www.instagram.com/jayesh__935?utm_source=ig_web_button_share_sheet&stkn=ZDNlZDc0MzIxNw=="
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition hover:text-white"
          >
            <InstagramIcon className="h-4 w-4 text-neutral-400" />
            Instagram
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href="https://www.facebook.com/100060652575422/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 transition hover:text-white"
          >
            <FacebookIcon className="h-4 w-4 text-neutral-400" />
            Facebook
            <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href="tel:+919876543210"
            className="inline-flex items-center gap-2 transition hover:text-white"
          >
            <Phone className="h-4 w-4" />
            +91 98765 43210
          </a>
        </div>
      </div>
    </footer>
  );
}

function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <>
      <Hero />
      <FeaturedProjects />
      <ServiceArea />
      <Services />
      <Process />
      <Experience />
      <Testimonials />
      <CallToAction />
    </>
  );
}

function ProjectsPage() {
  // Use the first completed project image for the hero, with a fallback
  const heroImage = completedProjects[0]?.image ||
    "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1500&q=85";

  return (
    <>
      <PageHero
        eyebrow="Projects"
        title="Selected architectural work"
        description="Explore residential, hospitality, civic, and cultural projects shaped through strong concepts, clear planning, and careful detailing."
        image={heroImage}
      />
      <ProjectGallery />
      <CallToAction />
    </>
  );
}

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Architecture shaped by context and restraint"
        description="We are a studio for clients who want buildings and 2D/3D layouts that feel intelligent, enduring, and closely connected to their setting."
        image="https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&w=1800&q=85"
      />
      <AboutStory />
      <Experience />
      <Testimonials />
      <CallToAction />
    </>
  );
}

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Design services from concept to completion"
        description="From early site strategy to 2D & 3D mapping (Autodesk), visualization, and construction support, our services help projects move with confidence."
        image="https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1800&q=85"
      />
      <Services />
      <Process />
      <ServiceArea />
      <CallToAction />
    </>
  );
}

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <main className="min-h-screen bg-black text-white">
      <CustomCursor />
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/architecture" element={<Architecture />} />
        <Route path="/construction" element={<Construction />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </main>
  );
}
