import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, MapPin, X } from "lucide-react";
import {
  completedProjects,
  underConstructionProjects,
} from "../data/projects";

// ── Animations ──────────────────────────────────────────────────────────────
const spring = { type: "spring", stiffness: 100, damping: 20 };

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ── Lightbox ────────────────────────────────────────────────────────────────
function Lightbox({ image, onClose }) {
  return (
    <AnimatePresence>
      {image && (
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
            src={image.url}
            alt={image.title || "Construction project expanded view"}
            className="max-w-full max-h-screen object-contain shadow-2xl bg-neutral-950"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── WhatsApp helper ─────────────────────────────────────────────────────────
const CONSTRUCTION_WA_NUMBER = "918529756391";

function buildConstructionWhatsAppUrl({ name, phone, location }) {
  const message = [
    `*Construction & On-Site Building Work Inquiry*`,
    ``,
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Construction Location: ${location}`,
    ``,
    `Please share property type & estimated timeline details.`,
  ].join("\n");

  return `https://wa.me/${CONSTRUCTION_WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

// ── Page Component ──────────────────────────────────────────────────────────
export default function Construction() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    location: "",
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = buildConstructionWhatsAppUrl(form);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  // Use the first completed project image for the hero, with a fallback
  const heroImage =
    completedProjects[0]?.image ||
    "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1800&q=85";

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="relative flex min-h-[62vh] items-end overflow-hidden bg-black px-4 pb-16 pt-36 sm:px-6 sm:pb-20 sm:pt-44 lg:px-8"
      >
        <img
          src={heroImage}
          alt="Shree Arbuda Construction — on-site projects"
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
            Construction
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.14 }}
            className="max-w-5xl text-5xl font-black leading-none tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl"
          >
            On-Site Construction Projects
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.2 }}
            className="mt-7 max-w-2xl text-lg leading-8 text-neutral-300"
          >
            From foundation to finishing — Havelis, Villas, Commercial spaces,
            and Turnkey solutions built with structural integrity and
            craftsmanship.
          </motion.p>
        </div>
      </motion.section>

      {/* ── Completed Projects ────────────────────────────────────────── */}
      <section className="bg-black px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="relative mb-12 grid gap-6 lg:grid-cols-[0.9fr_1fr] lg:items-end">
              <div className="absolute left-0 top-1/2 -z-10 h-32 w-64 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent_70%)] blur-2xl" />
              <div>
                <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-neutral-500">
                  Completed Works
                </p>
                <h2 className="text-5xl font-black leading-none tracking-tighter text-white sm:text-6xl md:text-7xl">
                  Built with precision and care
                </h2>
              </div>
              <p className="max-w-2xl text-lg leading-8 text-neutral-400 lg:ml-auto">
                A showcase of residential, commercial, and heritage
                construction projects delivered on time and built to last.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {completedProjects.map((project, index) => (
              <Reveal key={project.id} delay={index * 0.05}>
                <motion.article
                  whileHover={{ scale: 1.02 }}
                  onClick={() =>
                    setSelectedImage({
                      url: project.image,
                      title: project.title,
                    })
                  }
                  className="group h-full cursor-pointer overflow-hidden rounded-xl border border-neutral-800/80 bg-neutral-950/60 transition-all duration-300 hover:border-neutral-700 backdrop-blur-sm"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-neutral-900 relative">
                    <img
                      src={project.image}
                      alt={`${project.title} — construction project`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105 bg-neutral-900"
                    />
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
                </motion.article>
              </Reveal>
            ))}
          </div>

          {/* ── Under Construction ─────────────────────────────────────── */}
          {underConstructionProjects.length > 0 && (
            <>
              <Reveal>
                <div className="relative mb-12 mt-28 grid gap-6 lg:grid-cols-[0.9fr_1fr] lg:items-end">
                  <div className="absolute left-0 top-1/2 -z-10 h-32 w-64 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent_70%)] blur-2xl" />
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
                    <motion.article
                      whileHover={{ scale: 1.02 }}
                      onClick={() =>
                        setSelectedImage({
                          url: project.image,
                          title: project.title,
                        })
                      }
                      className="group h-full cursor-pointer overflow-hidden rounded-xl border border-neutral-800/80 bg-neutral-950/60 transition-all duration-300 hover:border-neutral-700 backdrop-blur-sm"
                    >
                      <div className="aspect-[4/3] overflow-hidden bg-neutral-900 relative">
                        <img
                          src={project.image}
                          alt={`${project.title} — under construction`}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105 bg-neutral-900"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />
                      </div>
                      <div className="p-6">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-400/80">
                          Under Construction
                        </p>
                      </div>
                    </motion.article>
                  </Reveal>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── Inquiry Form ──────────────────────────────────────────────── */}
      <section className="bg-black px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="relative mb-12 text-center">
              <div className="absolute left-1/2 top-1/2 -z-10 h-32 w-64 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(245,158,11,0.1),transparent_70%)] blur-2xl" />
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-neutral-500">
                Inquire Now
              </p>
              <h2 className="text-4xl font-black leading-none tracking-tighter text-white sm:text-5xl md:text-6xl">
                Start your construction project
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-neutral-400">
                Fill out the form below and we'll connect you directly with our
                Construction team via WhatsApp.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <form
              onSubmit={handleSubmit}
              className="space-y-6 rounded-xl border border-neutral-800 bg-neutral-950/60 p-8 sm:p-10"
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="con-name"
                  className="mb-2 block text-sm font-semibold uppercase tracking-[0.14em] text-neutral-400"
                >
                  Full Name
                </label>
                <input
                  id="con-name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Rajesh Patel"
                  className="w-full rounded-lg border border-neutral-800 bg-black px-4 py-3 text-white placeholder-neutral-600 outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="con-phone"
                  className="mb-2 block text-sm font-semibold uppercase tracking-[0.14em] text-neutral-400"
                >
                  Phone Number
                </label>
                <input
                  id="con-phone"
                  name="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full rounded-lg border border-neutral-800 bg-black px-4 py-3 text-white placeholder-neutral-600 outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                />
              </div>

              {/* Construction Location */}
              <div>
                <label
                  htmlFor="con-location"
                  className="mb-2 block text-sm font-semibold uppercase tracking-[0.14em] text-neutral-400"
                >
                  Construction Location
                </label>
                <div className="relative">
                  <MapPin className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-600" />
                  <input
                    id="con-location"
                    name="location"
                    type="text"
                    required
                    value={form.location}
                    onChange={handleChange}
                    placeholder="e.g. Udaipur, Rajasthan"
                    className="w-full rounded-lg border border-neutral-800 bg-black py-3 pl-11 pr-4 text-white placeholder-neutral-600 outline-none transition focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>


              {/* Submit */}
              <motion.div whileHover={{ scale: 1.02 }}>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-3 rounded-lg bg-white px-8 py-4 text-base font-black text-black transition-all duration-200 hover:bg-neutral-200 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]"
                >
                  Send via WhatsApp
                  <ArrowUpRight className="h-5 w-5" strokeWidth={2} />
                </button>
              </motion.div>

              <p className="text-center text-xs text-neutral-600">
                Connects directly to{" "}
                <span className="text-neutral-400">+91 85297 56391</span>{" "}
                (Construction Dept.)
              </p>
            </form>
          </Reveal>
        </div>
      </section>

      <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
    </>
  );
}
