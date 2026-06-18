import { useState, useEffect, useRef } from "react";

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

const NAV = ["About", "Education", "Skills", "Achievements", "Activities", "Contact"];

const SKILLS = [
  { name: "C", pct: 70, cat: "Languages" },
  { name: "MySQL", pct: 68, cat: "Databases" },
  { name: "Git & GitHub", pct: 80, cat: "Tools" },
  { name: "Figma", pct: 70, cat: "Tools" },
  { name: "VS Code", pct: 90, cat: "Tools" },
  { name: "Canva", pct: 92, cat: "Design" },
];

const CANVA_WORKS = [
  { title: "Social Media Post Design", icon: "📱", color: "#6366F1" },
  { title: "Poster Design", icon: "🎨", color: "#22D3EE" },
  { title: "Flyer Design", icon: "📄", color: "#34D399" },
  { title: "Banner Design", icon: "🖼️", color: "#F59E0B" },
  { title: "Logo Concept", icon: "✏️", color: "#EC4899" },
  { title: "YouTube Thumbnail", icon: "▶️", color: "#EF4444" },
  { title: "Presentation Design", icon: "📊", color: "#8B5CF6" },
  { title: "Certificate Design", icon: "🏆", color: "#F97316" },
  { title: "Invitation Card Design", icon: "💌", color: "#06B6D4" },
];


const ACHIEVEMENTS = [
  { title: "HSC — GPA 3.92 / 5.00", detail: "Kazi Mohammad Shafiqul Islam University College · 2023", icon: "🏅" },
  { title: "Enrolled in DIU — Software Engineering", detail: "Daffodil International University · 2025", icon: "🎓" },
  { title: "Active Club Member across 3 Clubs", detail: "SE Club · SQAT Club · Data Science Club", icon: "🤝" },
  { title: "Graphic Design & Creative Work", detail: "Poster, banner & brand identity design for club events", icon: "🎨" },
];

const ACTIVITIES = [
  { name: "Software Engineering Club", role: "Executive Member & Creative Designer", desc: "Organise workshops, seminars, and coding events to develop technical and professional skills among SE students.", icon: "⚙️" },
  { name: "SQAT Club", role: "Deputy Creative Designer", desc: "Lead creative design and content initiatives; support quality assurance awareness campaigns across the department.", icon: "🎨" },
  { name: "Data Science Club", role: "Member", desc: "Participate in data science bootcamps, collaborative projects, and knowledge-sharing sessions on ML and analytics.", icon: "📊" },
];

function FadeIn({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(32px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <span style={{ fontSize: "0.7rem", letterSpacing: "0.2em", fontWeight: 700, color: "#6366F1", textTransform: "uppercase" }}>
      {children}
    </span>
  );
}

function SectionHeading({ label, title }) {
  return (
    <div style={{ marginBottom: "3rem", textAlign: "center" }}>
      <SectionLabel>{label}</SectionLabel>
      <h2 style={{ marginTop: "0.5rem", fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>{title}</h2>
    </div>
  );
}

function SkillBar({ name, pct, delay, dark }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{ marginBottom: "1.1rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.3rem" }}>
        <span style={{ fontSize: "0.85rem", fontWeight: 600, color: dark ? "#CBD5E1" : "#334155" }}>{name}</span>
        <span style={{ fontSize: "0.75rem", color: "#6366F1", fontWeight: 700 }}>{pct}%</span>
      </div>
      <div style={{ height: "6px", borderRadius: "99px", background: dark ? "#1E293B" : "#E2E8F0", overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: "99px",
          background: "linear-gradient(90deg,#6366F1,#22D3EE)",
          width: visible ? `${pct}%` : "0%",
          transition: `width 1s ease ${delay}s`,
        }} />
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [active, setActive] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV.map(n => document.getElementById(n));
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }); },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach(s => s && obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const bg = dark ? "#0A0F1E" : "#F8FAFC";
  const card = dark ? "#111827" : "#FFFFFF";
  const border = dark ? "#1E293B" : "#E2E8F0";
  const text = dark ? "#F8FAFC" : "#0F172A";
  const muted = dark ? "#94A3B8" : "#64748B";

  const css = `
    :root { --text-primary: ${text}; }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: 'Inter', system-ui, sans-serif; background: ${bg}; color: ${text}; transition: background 0.3s, color 0.3s; }
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: ${bg}; }
    ::-webkit-scrollbar-thumb { background: #6366F1; border-radius: 4px; }
    a { text-decoration: none; color: inherit; }
    ::selection { background: #6366F133; }
  `;

  const navStyle = {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
    padding: "0 2rem",
    background: scrollY > 40 ? (dark ? "rgba(10,15,30,0.92)" : "rgba(248,250,252,0.92)") : "transparent",
    backdropFilter: scrollY > 40 ? "blur(16px)" : "none",
    borderBottom: scrollY > 40 ? `1px solid ${border}` : "none",
    transition: "all 0.3s",
    display: "flex", alignItems: "center", justifyContent: "space-between",
    height: "64px",
  };

  return (
    <>
      <style>{css}</style>

      {/* NAV */}
      <nav style={navStyle}>
        <span style={{ fontWeight: 900, fontSize: "1.1rem", letterSpacing: "-0.03em" }}>
          <span style={{ color: "#6366F1" }}>K</span>rita.dev
        </span>
        <div style={{ display: "flex", gap: "0.25rem", alignItems: "center" }} className="desktop-nav">
          {NAV.map(n => (
            <a key={n} href={`#${n}`} style={{
              padding: "0.4rem 0.75rem", borderRadius: "8px", fontSize: "0.82rem", fontWeight: 500,
              color: active === n ? "#6366F1" : muted,
              background: active === n ? (dark ? "#6366F115" : "#6366F110") : "transparent",
              transition: "all 0.2s",
            }}>{n}</a>
          ))}
          <button onClick={() => setDark(d => !d)} style={{
            marginLeft: "0.5rem", background: dark ? "#1E293B" : "#E2E8F0",
            border: "none", borderRadius: "8px", padding: "0.4rem 0.65rem",
            cursor: "pointer", fontSize: "1rem", color: text, transition: "all 0.2s",
          }}>{dark ? "☀️" : "🌙"}</button>
        </div>
        <button onClick={() => setMenuOpen(m => !m)}
          style={{ display: "none", background: "none", border: "none", cursor: "pointer", color: text, fontSize: "1.4rem" }}
          className="hamburger">{menuOpen ? "✕" : "☰"}</button>
      </nav>

      {menuOpen && (
        <div style={{
          position: "fixed", top: 64, left: 0, right: 0, zIndex: 99,
          background: dark ? "#0A0F1E" : "#F8FAFC",
          borderBottom: `1px solid ${border}`, padding: "1rem",
          display: "flex", flexDirection: "column", gap: "0.25rem",
        }}>
          {NAV.map(n => (
            <a key={n} href={`#${n}`} onClick={() => setMenuOpen(false)} style={{
              padding: "0.75rem 1rem", borderRadius: "8px", fontWeight: 600,
              color: active === n ? "#6366F1" : text,
              background: active === n ? (dark ? "#6366F115" : "#6366F110") : "transparent",
            }}>{n}</a>
          ))}
          <button onClick={() => { setDark(d => !d); setMenuOpen(false); }} style={{
            marginTop: "0.5rem", background: dark ? "#1E293B" : "#E2E8F0",
            border: "none", borderRadius: "8px", padding: "0.75rem", cursor: "pointer",
            fontSize: "0.9rem", color: text, fontWeight: 600,
          }}>{dark ? "☀️ Light Mode" : "🌙 Dark Mode"}</button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>

      {/* ── HERO ── */}
      <section id="About" style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        padding: "8rem 2rem 4rem", textAlign: "center", position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: "20%", left: "50%", transform: `translate(-50%,${scrollY * 0.15}px)`,
          width: "700px", height: "400px", pointerEvents: "none",
          background: "radial-gradient(ellipse at center, #6366F122 0%, #22D3EE0A 50%, transparent 75%)",
          filter: "blur(40px)",
        }} />
        <div style={{
          position: "absolute", bottom: "10%", right: "10%",
          width: "300px", height: "300px", pointerEvents: "none",
          background: "radial-gradient(circle, #34D39915 0%, transparent 70%)",
          filter: "blur(30px)",
        }} />

        <div style={{ position: "relative", maxWidth: "720px" }}>
          <div style={{
            width: "130px", height: "130px", borderRadius: "50%", margin: "0 auto 1.5rem",
            background: "linear-gradient(135deg,#6366F1,#22D3EE)",
            padding: "3px",
            boxShadow: "0 0 40px #6366F140",
            animation: "float 4s ease-in-out infinite",
          }}>
            <img src="data:image/jpeg;base64,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"
              alt="Khandakar Rita"
              style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", objectPosition: "top" }} />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <SectionLabel>Software Engineering Student · DIU</SectionLabel>
          </div>

          <h1 style={{
            fontSize: "clamp(2.8rem,8vw,5rem)", fontWeight: 900,
            letterSpacing: "-0.04em", lineHeight: 1.05,
            background: "linear-gradient(135deg,#F8FAFC 30%,#6366F1 65%,#22D3EE 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            marginBottom: "1.25rem",
          }}>
            Khandakar Rita
          </h1>

          <p style={{
            fontSize: "clamp(1rem,2.5vw,1.2rem)", color: muted,
            lineHeight: 1.75, maxWidth: "540px", margin: "0 auto 2.5rem",
          }}>
            2nd-year Software Engineering student at Daffodil International University, passionate about building clean software, creative design, and learning new technologies every day.
          </p>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="#Skills" style={{
              padding: "0.8rem 2rem", borderRadius: "12px", fontWeight: 700, fontSize: "0.9rem",
              background: "linear-gradient(135deg,#6366F1,#4F46E5)",
              color: "#FFF", boxShadow: "0 4px 24px #6366F140",
              transition: "transform 0.2s, box-shadow 0.2s", display: "inline-block",
            }}
              onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 32px #6366F160"; }}
              onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = "0 4px 24px #6366F140"; }}
            >View Skills</a>
            <a href="#Contact" style={{
              padding: "0.8rem 2rem", borderRadius: "12px", fontWeight: 700, fontSize: "0.9rem",
              border: `1.5px solid ${border}`, color: text,
              background: "transparent", transition: "border-color 0.2s, background 0.2s", display: "inline-block",
            }}
              onMouseEnter={e => { e.target.style.borderColor = "#6366F1"; e.target.style.background = dark ? "#6366F110" : "#6366F108"; }}
              onMouseLeave={e => { e.target.style.borderColor = border; e.target.style.background = "transparent"; }}
            >Get in Touch</a>
          </div>

          {/* Quick stats — no GPA/Projects per request */}
          <div style={{ display: "flex", gap: "2.5rem", justifyContent: "center", marginTop: "4rem", flexWrap: "wrap" }}>
            {[["2nd", "Year"], ["3", "Clubs"], ["9", "Designs"]].map(([v, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "1.8rem", fontWeight: 900, color: "#6366F1" }}>{v}</div>
                <div style={{ fontSize: "0.72rem", color: muted, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes float {
            0%,100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
        `}</style>
      </section>

      {/* ── EDUCATION ── */}
      <section id="Education" style={{ padding: "5rem 2rem", background: dark ? "#0D1422" : "#F1F5F9" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <FadeIn><SectionHeading label="Background" title="Education" /></FadeIn>

          {[
            {
              degree: "B.Sc. in Software Engineering",
              school: "Daffodil International University (DIU)",
              period: "2025 – Present  ·  2nd Year",
              badge: "Current",
              badgeColor: "#22D3EE",
              detail: "Studying core software engineering fundamentals including OOP, data structures, algorithms, web development, database systems, and software design patterns. Currently in 2nd Year.",
              icon: "🏛️",
            },
            {
              degree: "Higher Secondary Certificate (HSC) — Science",
              school: "Kazi Mohammad Shafiqul Islam University College",
              period: "2021 – 2023",
              badge: "GPA 3.92",
              badgeColor: "#6366F1",
              detail: "Completed HSC with a strong foundation in Physics, Chemistry, Mathematics, and Biology. Graduated with GPA 3.92 / 5.00.",
              icon: "🎓",
            },
          ].map((e, i) => (
            <FadeIn key={e.school} delay={i * 0.15}>
              <div style={{
                background: card, border: `1px solid ${border}`,
                borderRadius: "16px", padding: "1.75rem 2rem",
                marginBottom: "1.25rem", display: "flex", gap: "1.5rem",
                alignItems: "flex-start",
                transition: "box-shadow 0.25s, transform 0.25s",
              }}
                onMouseEnter={e2 => { e2.currentTarget.style.boxShadow = "0 8px 32px #6366F120"; e2.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e2 => { e2.currentTarget.style.boxShadow = "none"; e2.currentTarget.style.transform = ""; }}
              >
                <div style={{
                  width: "52px", height: "52px", borderRadius: "12px", flexShrink: 0,
                  background: "linear-gradient(135deg,#6366F120,#22D3EE20)",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.4rem",
                }}>{e.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.25rem" }}>
                    <h3 style={{ fontWeight: 800, fontSize: "1.05rem", color: text }}>{e.degree}</h3>
                    <span style={{
                      fontSize: "0.75rem", fontWeight: 700, padding: "0.25rem 0.75rem",
                      borderRadius: "99px", background: `${e.badgeColor}20`, color: e.badgeColor,
                    }}>{e.badge}</span>
                  </div>
                  <div style={{ color: "#6366F1", fontWeight: 600, fontSize: "0.88rem", marginBottom: "0.2rem" }}>{e.school}</div>
                  <div style={{ color: muted, fontSize: "0.78rem", marginBottom: "0.75rem" }}>{e.period}</div>
                  <p style={{ color: muted, fontSize: "0.85rem", lineHeight: 1.7 }}>{e.detail}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="Skills" style={{ padding: "5rem 2rem", background: bg }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <FadeIn><SectionHeading label="Toolbox" title="Skills & Technologies" /></FadeIn>

          {["Languages", "Databases", "Tools", "Design"].map((cat, ci) => (
            <FadeIn key={cat} delay={ci * 0.1}>
              <div style={{ marginBottom: "2.5rem" }}>
                <h3 style={{ fontSize: "0.75rem", fontWeight: 700, color: "#22D3EE", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1.25rem" }}>{cat}</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "0 3rem" }}>
                  {SKILLS.filter(s => s.cat === cat).map((s, i) => (
                    <SkillBar key={s.name} name={s.name} pct={s.pct} delay={i * 0.08} dark={dark} />
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}

          {/* Canva Design Works */}
          <FadeIn delay={0.3}>
            <div style={{ marginTop: "0.5rem" }}>
              <h3 style={{ fontSize: "0.75rem", fontWeight: 700, color: "#22D3EE", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "1.25rem" }}>Canva Design Works</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.7rem" }}>
                {CANVA_WORKS.map((w) => (
                  <span key={w.title} style={{
                    display: "inline-flex", alignItems: "center", gap: "0.4rem",
                    padding: "0.5rem 1rem", borderRadius: "99px",
                    border: `1.5px solid ${w.color}40`,
                    background: `${w.color}12`,
                    fontSize: "0.82rem", fontWeight: 600, color: w.color,
                    transition: "border-color 0.2s, background 0.2s, transform 0.2s",
                    cursor: "default",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = w.color; e.currentTarget.style.background = `${w.color}22`; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = `${w.color}40`; e.currentTarget.style.background = `${w.color}12`; e.currentTarget.style.transform = ""; }}
                  >
                    <span>{w.icon}</span>{w.title}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── ACHIEVEMENTS ── */}
      <section id="Achievements" style={{ padding: "5rem 2rem", background: dark ? "#0D1422" : "#F1F5F9" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <FadeIn><SectionHeading label="Honours" title="Achievements" /></FadeIn>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.9rem" }}>
            {ACHIEVEMENTS.map((a, i) => (
              <FadeIn key={a.title} delay={i * 0.08}>
                <div style={{
                  background: card, border: `1px solid ${border}`,
                  borderRadius: "14px", padding: "1.25rem 1.5rem",
                  display: "flex", alignItems: "center", gap: "1rem",
                  transition: "transform 0.2s, border-color 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateX(4px)"; e.currentTarget.style.borderColor = "#6366F150"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = border; }}
                >
                  <div style={{ fontSize: "1.4rem", flexShrink: 0 }}>{a.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.95rem", color: text }}>{a.title}</div>
                    <div style={{ fontSize: "0.8rem", color: muted, marginTop: "0.15rem" }}>{a.detail}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACTIVITIES ── */}
      <section id="Activities" style={{ padding: "5rem 2rem", background: bg }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <FadeIn><SectionHeading label="Beyond the Classroom" title="Extracurricular Activities" /></FadeIn>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "1.1rem" }}>
            {ACTIVITIES.map((a, i) => (
              <FadeIn key={a.name} delay={i * 0.1}>
                <div style={{
                  background: card, border: `1px solid ${border}`,
                  borderRadius: "16px", padding: "1.5rem 1.6rem",
                  transition: "transform 0.2s, box-shadow 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px #22D3EE15"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "0.75rem" }}>
                    <span style={{ fontSize: "1.5rem" }}>{a.icon}</span>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: "0.95rem", color: text }}>{a.name}</div>
                      <div style={{ fontSize: "0.75rem", color: "#22D3EE", fontWeight: 600 }}>{a.role}</div>
                    </div>
                  </div>
                  <p style={{ color: muted, fontSize: "0.85rem", lineHeight: 1.7 }}>{a.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="Contact" style={{ padding: "5rem 2rem 7rem", background: dark ? "#0D1422" : "#F1F5F9" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
          <FadeIn>
            <SectionLabel>Let's Connect</SectionLabel>
            <h2 style={{
              marginTop: "0.5rem", marginBottom: "1rem",
              fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 800, letterSpacing: "-0.02em", color: text,
            }}>Get in Touch</h2>
            <p style={{ color: muted, marginBottom: "2.5rem", fontSize: "1rem", lineHeight: 1.75 }}>
              Always happy to connect — whether it's about projects, opportunities, or just a tech chat. Feel free to reach out!
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
              {[
                { icon: "✉️", label: "Email", val: "kritaakter@gmail.com", href: "mailto:kritaakter@gmail.com" },
                { icon: "💼", label: "LinkedIn", val: "khandakar-rita-akter", href: "https://www.linkedin.com/in/khandakar-rita-akter-595ab339a" },
                { icon: "🐙", label: "GitHub", val: "kritaakter-ux", href: "https://github.com/kritaakter-ux" },
                { icon: "📍", label: "Location", val: "Dhaka, Bangladesh", href: null },
              ].map(c => (
                <div key={c.label} style={{
                  background: card, border: `1px solid ${border}`,
                  borderRadius: "14px", padding: "1.25rem",
                  textAlign: "left", display: "flex", gap: "0.85rem", alignItems: "center",
                  transition: "border-color 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#6366F150"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = border; }}
                >
                  <span style={{ fontSize: "1.3rem" }}>{c.icon}</span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: "0.72rem", color: muted, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}>{c.label}</div>
                    {c.href
                      ? <a href={c.href} target="_blank" rel="noreferrer" style={{ fontSize: "0.85rem", fontWeight: 600, color: "#6366F1", wordBreak: "break-all" }}>{c.val}</a>
                      : <div style={{ fontSize: "0.87rem", fontWeight: 600, color: text }}>{c.val}</div>
                    }
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <a href="mailto:kritaakter@gmail.com" style={{
              display: "inline-block", padding: "0.9rem 2.5rem",
              borderRadius: "12px", fontWeight: 700, fontSize: "0.95rem",
              background: "linear-gradient(135deg,#6366F1,#4F46E5)",
              color: "#FFF", boxShadow: "0 4px 24px #6366F145",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={e => { e.target.style.transform = "translateY(-2px)"; e.target.style.boxShadow = "0 8px 36px #6366F165"; }}
              onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = "0 4px 24px #6366F145"; }}
            >Say Hello 👋</a>
          </FadeIn>
        </div>
      </section>

      <footer style={{
        textAlign: "center", padding: "1.5rem", borderTop: `1px solid ${border}`,
        background: bg, fontSize: "0.78rem", color: muted,
      }}>
        Designed & built by Khandakar Rita · {new Date().getFullYear()}
      </footer>
    </>
  );
}
