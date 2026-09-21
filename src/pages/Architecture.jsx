import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Ruler, X } from "lucide-react";

// ── Dynamic gallery: eagerly load every image from the root /design folder ──
const designModules = import.meta.glob(
  "/design/**/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}",
  { eager: true, query: "?url", import: "default" }
);

const designImages = Object.entries(designModules).map(([path, url], i) => {
  return { url, label: `Design #${i + 1}` };
});

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
            alt={image.title || "Architecture design expanded view"}
            className="max-w-full max-h-screen object-contain shadow-2xl bg-neutral-950"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ── WhatsApp helper ─────────────────────────────────────────────────────────
const ARCHITECTURE_WA_NUMBER = "916375683147";

function buildArchitectureWhatsAppUrl({ name, phone }) {
  const message = [
    `*Architecture & 2D/3D Design Inquiry*`,
    ``,
    `Name: ${name}`,
    `Phone: ${phone}`,
    ``,
    `Please share layout details and any reference images.`,
  ].join("\n");

  return `https://wa.me/${ARCHITECTURE_WA_NUMBER}?text=${encodeURIComponent(message)}`;
}

// ── Page Component ──────────────────────────────────────────────────────────
export default function Architecture() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = buildArchitectureWhatsAppUrl(form);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="relative flex min-h-[62vh] items-end overflow-hidden bg-black px-4 pb-16 pt-36 sm:px-6 sm:pb-20 sm:pt-44 lg:px-8"
      >
        {/* Gradient background instead of a single hero image */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-neutral-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_0%,rgba(120,119,198,0.15),transparent_50%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.08 }}
            className="mb-5 text-sm font-semibold uppercase tracking-[0.24em] text-neutral-400"
          >
            Architecture & Design
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.14 }}
            className="max-w-5xl text-5xl font-black leading-none tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl"
          >
            2D & 3D Architectural Design
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...spring, delay: 0.2 }}
            className="mt-7 max-w-2xl text-lg leading-8 text-neutral-300"
          >
            Floor plans, 3D elevations, and interior visualizations crafted with
            precision using Autodesk tools. Every design begins with your vision
            and site constraints.
          </motion.p>
        </div>
      </motion.section>

      {/* ── Gallery ───────────────────────────────────────────────────── */}
      <section className="bg-black px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <div className="relative mb-12 max-w-4xl">
              <div className="absolute left-0 top-1/2 -z-10 h-32 w-64 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.08),transparent_70%)] blur-2xl" />
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-neutral-500">
                Design Portfolio
              </p>
              <h2 className="text-5xl font-black leading-none tracking-tighter text-white sm:text-6xl md:text-7xl">
                Recent architectural designs
              </h2>
            </div>
          </Reveal>

          {designImages.length === 0 ? (
            <Reveal>
              <p className="text-lg text-neutral-500">
                No design images found. Add images to the{" "}
                <code className="rounded bg-neutral-800 px-2 py-0.5 text-sm text-neutral-300">
                  /design
                </code>{" "}
                folder to populate this gallery.
              </p>
            </Reveal>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {designImages.map((img, index) => (
                <Reveal key={img.url} delay={index * 0.04}>
                  <motion.article
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedImage(img)}
                    className="group h-full cursor-pointer overflow-hidden rounded-xl border border-neutral-800/80 bg-neutral-900 transition-all duration-300 hover:border-neutral-700 backdrop-blur-sm"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-neutral-900 relative">
                      <img
                        src={img.url}
                        alt={`Architecture design project ${index + 1}`}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105 bg-neutral-900"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-500" />
                    </div>
                    <div className="flex items-center justify-between px-5 py-4">
                      <p className="text-sm font-semibold tracking-tight text-neutral-300">
                        {img.label}
                      </p>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-400/80">
                        Design
                      </p>
                    </div>
                  </motion.article>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Inquiry Form ──────────────────────────────────────────────── */}
      <section className="bg-black px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <div className="relative mb-12 text-center">
              <div className="absolute left-1/2 top-1/2 -z-10 h-32 w-64 -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.1),transparent_70%)] blur-2xl" />
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.24em] text-neutral-500">
                Inquire Now
              </p>
              <h2 className="text-4xl font-black leading-none tracking-tighter text-white sm:text-5xl md:text-6xl">
                Start your design project
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-neutral-400">
                Fill out the form below and we'll connect you directly with our
                Architecture & Design team via WhatsApp.
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
                  htmlFor="arch-name"
                  className="mb-2 block text-sm font-semibold uppercase tracking-[0.14em] text-neutral-400"
                >
                  Full Name
                </label>
                <input
                  id="arch-name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Rajesh Patel"
                  className="w-full rounded-lg border border-neutral-800 bg-black px-4 py-3 text-white placeholder-neutral-600 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="arch-phone"
                  className="mb-2 block text-sm font-semibold uppercase tracking-[0.14em] text-neutral-400"
                >
                  Phone Number
                </label>
                <input
                  id="arch-phone"
                  name="phone"
                  type="tel"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full rounded-lg border border-neutral-800 bg-black px-4 py-3 text-white placeholder-neutral-600 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                />
              </div>


              {/* Submit */}
              <motion.div whileHover={{ scale: 1.02 }}>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-3 rounded-lg bg-white px-8 py-4 text-base font-black text-black transition-all duration-200 hover:bg-neutral-200 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                >
                  Send via WhatsApp
                  <ArrowUpRight className="h-5 w-5" strokeWidth={2} />
                </button>
              </motion.div>

              <p className="text-center text-xs text-neutral-600">
                Connects directly to{" "}
                <span className="text-neutral-400">+91 63756 83147</span>{" "}
                (Architecture Dept.)
              </p>
            </form>
          </Reveal>
        </div>
      </section>

      <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
    </>
  );
}
