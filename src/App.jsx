import { useState, useEffect, useRef } from "react";

const NORMAL_FLAVOURS = [
  { name: "Chocolate", emoji: "🍫", color: "#5D3A1A" },
  { name: "Vanilla", emoji: "🍦", color: "#F5E6CA" },
  { name: "Strawberry", emoji: "🍓", color: "#E8485C" },
  { name: "Butterscotch", emoji: "🧈", color: "#D4A43A" },
  { name: "Mango", emoji: "🥭", color: "#FFB347" },
  { name: "Pista", emoji: "🌿", color: "#7CB342" },
  { name: "Kesar", emoji: "✨", color: "#FF9800" },
];

const PREMIUM_FLAVOURS = [
  { name: "Ferrero Rocher", emoji: "🌰", color: "#8B6914" },
  { name: "Belgian Chocolate", emoji: "🇧🇪", color: "#3E2723" },
  { name: "Cookies & Cream", emoji: "🍪", color: "#4E4039" },
  { name: "Blueberry Cheesecake", emoji: "🫐", color: "#5C6BC0" },
  { name: "Nutella Crunch", emoji: "🥜", color: "#6D4C2A" },
  { name: "Alphonso Mango", emoji: "👑", color: "#FF8F00" },
];

const TOP_COMBOS = [
  { f1: "Chocolate", f2: "Ferrero Rocher", votes: 847 },
  { f1: "Mango", f2: "Butterscotch", votes: 623 },
  { f1: "Vanilla", f2: "Cookies & Cream", votes: 591 },
  { f1: "Pista", f2: "Kesar", votes: 412 },
  { f1: "Belgian Choc", f2: "Nutella Crunch", votes: 389 },
];

const SERVE_OPTIONS = [
  { id: "cup", label: "Cup", icon: "🥤", desc: "Classic cup" },
  { id: "cone", label: "Cone", icon: "🍦", desc: "Waffle cone" },
  { id: "both", label: "Both", icon: "🍨", desc: "Cup + Cone" },
];

export default function MeridianOrder() {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState([]);
  const [serve, setServe] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [tokenNumber, setTokenNumber] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setAnimateIn(false);
    const t = setTimeout(() => setAnimateIn(true), 50);
    return () => clearTimeout(t);
  }, [step]);

  const isPremium = selected.some((f) =>
    PREMIUM_FLAVOURS.some((p) => p.name === f)
  );
  const price = isPremium ? 100 : selected.length > 0 ? 90 : 0;

  const toggleFlavour = (name) => {
    if (selected.includes(name)) {
      setSelected(selected.filter((f) => f !== name));
    } else if (selected.length < 2) {
      setSelected([...selected, name]);
    }
  };

  const handleSubmit = () => {
    const token = Math.floor(100 + Math.random() * 900);
    setTokenNumber(token);
    setSubmitted(true);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const reset = () => {
    setStep(0);
    setSelected([]);
    setServe(null);
    setSubmitted(false);
    setTokenNumber(null);
  };

  const canProceedFromFlavour = selected.length >= 1;
  const canProceedFromServe = serve !== null;

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(165deg, #1a0a00 0%, #2C1810 30%, #3E1F0E 60%, #1a0a00 100%)",
      fontFamily: "'Nunito', sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Playfair+Display:wght@700;800;900&display=swap" rel="stylesheet" />

      {/* Ambient glow */}
      <div style={{
        position: "fixed", top: "-30%", right: "-20%", width: "60vw", height: "60vw",
        borderRadius: "50%", background: "radial-gradient(circle, rgba(244,162,89,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "fixed", bottom: "-20%", left: "-15%", width: "50vw", height: "50vw",
        borderRadius: "50%", background: "radial-gradient(circle, rgba(212,87,59,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* Confetti */}
      {showConfetti && (
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 100 }}>
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} style={{
              position: "absolute",
              left: `${Math.random() * 100}%`,
              top: "-5%",
              width: `${6 + Math.random() * 8}px`,
              height: `${6 + Math.random() * 8}px`,
              borderRadius: Math.random() > 0.5 ? "50%" : "2px",
              background: ["#D4573B", "#F4A259", "#FF6B6B", "#4ECDC4", "#FFE66D", "#A8E6CF"][Math.floor(Math.random() * 6)],
              animation: `confettiFall ${2 + Math.random() * 2}s ease-in forwards`,
              animationDelay: `${Math.random() * 0.8}s`,
              opacity: 0.9,
            }} />
          ))}
        </div>
      )}

      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(${360 + Math.random() * 720}deg); opacity: 0; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes popIn {
          0% { transform: scale(0.8); opacity: 0; }
          60% { transform: scale(1.05); }
          100% { transform: scale(1); opacity: 1; }
        }
        * { box-sizing: border-box; -webkit-tap-highlight-color: transparent; }
      `}</style>

      <div ref={containerRef} style={{
        maxWidth: 480, margin: "0 auto", padding: "0 16px 100px",
        position: "relative", zIndex: 1,
      }}>

        {/* Header */}
        <div style={{
          textAlign: "center", padding: "28px 0 20px",
          animation: "slideUp 0.6s ease-out",
        }}>
          <div style={{
            fontSize: 14, fontWeight: 800, letterSpacing: 4,
            color: "#F4A259", textTransform: "uppercase", marginBottom: 4,
          }}>Meridian</div>
          <div style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 32, fontWeight: 900, color: "#FFF5EB",
            lineHeight: 1.1,
          }}>Ice Cream</div>
          <div style={{
            width: 40, height: 3, background: "linear-gradient(90deg, #D4573B, #F4A259)",
            borderRadius: 2, margin: "12px auto 0",
          }} />
        </div>

        {/* Progress bar */}
        {!submitted && (
          <div style={{
            display: "flex", gap: 6, padding: "0 8px", marginBottom: 24,
            animation: "slideUp 0.6s ease-out 0.1s both",
          }}>
            {[0, 1, 2].map((s) => (
              <div key={s} style={{
                flex: 1, height: 4, borderRadius: 2,
                background: s <= step
                  ? "linear-gradient(90deg, #D4573B, #F4A259)"
                  : "rgba(255,245,235,0.1)",
                transition: "all 0.5s ease",
              }} />
            ))}
          </div>
        )}

        {/* STEP 0: Flavour Selection */}
        {!submitted && step === 0 && (
          <div style={{
            opacity: animateIn ? 1 : 0,
            transform: animateIn ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.5s ease",
          }}>
            <div style={{ marginBottom: 20 }}>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 24, color: "#FFF5EB", margin: "0 0 6px",
              }}>Choose Your Flavours</h2>
              <p style={{ color: "rgba(255,245,235,0.5)", fontSize: 14, margin: 0 }}>
                Pick up to 2 flavours • Same flavour twice = double scoop
              </p>
            </div>

            {/* Selected preview */}
            <div style={{
              display: "flex", gap: 10, marginBottom: 20, minHeight: 56,
            }}>
              {[0, 1].map((i) => (
                <div key={i} style={{
                  flex: 1, height: 52, borderRadius: 14,
                  border: selected[i] ? "2px solid #F4A259" : "2px dashed rgba(255,245,235,0.15)",
                  background: selected[i] ? "rgba(244,162,89,0.1)" : "transparent",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  gap: 8, transition: "all 0.3s ease",
                  animation: selected[i] ? "popIn 0.3s ease-out" : "none",
                }}>
                  {selected[i] ? (
                    <>
                      <span style={{ fontSize: 18 }}>
                        {[...NORMAL_FLAVOURS, ...PREMIUM_FLAVOURS].find(f => f.name === selected[i])?.emoji}
                      </span>
                      <span style={{ color: "#FFF5EB", fontSize: 13, fontWeight: 700 }}>{selected[i]}</span>
                      <button onClick={(e) => { e.stopPropagation(); setSelected(selected.filter((_, idx) => idx !== i)); }}
                        style={{
                          background: "rgba(212,87,59,0.3)", border: "none", borderRadius: "50%",
                          width: 22, height: 22, color: "#FF8A80", fontSize: 12,
                          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                          marginLeft: 4,
                        }}>✕</button>
                    </>
                  ) : (
                    <span style={{ color: "rgba(255,245,235,0.25)", fontSize: 13 }}>
                      Scoop {i + 1}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Price indicator */}
            {selected.length > 0 && (
              <div style={{
                textAlign: "center", marginBottom: 16,
                animation: "popIn 0.3s ease-out",
              }}>
                <span style={{
                  display: "inline-block", padding: "6px 16px", borderRadius: 20,
                  background: isPremium
                    ? "linear-gradient(135deg, rgba(244,162,89,0.2), rgba(212,87,59,0.2))"
                    : "rgba(124,179,66,0.15)",
                  border: `1px solid ${isPremium ? "rgba(244,162,89,0.3)" : "rgba(124,179,66,0.3)"}`,
                  color: isPremium ? "#F4A259" : "#A5D6A7",
                  fontSize: 14, fontWeight: 800,
                }}>
                  {isPremium ? "★ Premium" : "● Normal"} • ₹{price}
                </span>
              </div>
            )}

            {/* Top Combos */}
            <div style={{
              background: "rgba(255,245,235,0.04)",
              borderRadius: 16, padding: "14px 16px", marginBottom: 20,
              border: "1px solid rgba(244,162,89,0.1)",
            }}>
              <div style={{
                fontSize: 12, fontWeight: 800, color: "#F4A259",
                letterSpacing: 2, textTransform: "uppercase", marginBottom: 10,
              }}>🔥 This Week's Top Combos</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {TOP_COMBOS.slice(0, 3).map((combo, i) => (
                  <button key={i} onClick={() => {
                    const flavours = [combo.f1, combo.f2].map(n =>
                      [...NORMAL_FLAVOURS, ...PREMIUM_FLAVOURS].find(f => f.name === n || f.name.startsWith(n))?.name
                    ).filter(Boolean);
                    if (flavours.length === 2) setSelected(flavours);
                  }}
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    background: "rgba(255,245,235,0.03)", borderRadius: 10,
                    padding: "8px 12px", border: "1px solid rgba(255,245,235,0.06)",
                    cursor: "pointer", transition: "all 0.2s",
                    textAlign: "left",
                  }}>
                    <span style={{
                      width: 22, height: 22, borderRadius: "50%",
                      background: "linear-gradient(135deg, #D4573B, #F4A259)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 11, fontWeight: 900, color: "#fff", flexShrink: 0,
                    }}>{i + 1}</span>
                    <span style={{ color: "#FFF5EB", fontSize: 13, fontWeight: 600, flex: 1 }}>
                      {combo.f1} + {combo.f2}
                    </span>
                    <span style={{ color: "rgba(255,245,235,0.3)", fontSize: 11 }}>
                      {combo.votes} orders
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Normal Flavours */}
            <div style={{ marginBottom: 16 }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 8, marginBottom: 10,
              }}>
                <span style={{
                  padding: "3px 10px", borderRadius: 6,
                  background: "rgba(124,179,66,0.15)", color: "#A5D6A7",
                  fontSize: 12, fontWeight: 800,
                }}>NORMAL • ₹90</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {NORMAL_FLAVOURS.map((f) => {
                  const isSelected = selected.includes(f.name);
                  const disabled = selected.length >= 2 && !isSelected;
                  return (
                    <button key={f.name} onClick={() => !disabled && toggleFlavour(f.name)}
                      style={{
                        display: "flex", alignItems: "center", gap: 10,
                        padding: "12px 14px", borderRadius: 14,
                        background: isSelected
                          ? `linear-gradient(135deg, ${f.color}33, ${f.color}11)`
                          : "rgba(255,245,235,0.03)",
                        border: isSelected
                          ? `2px solid ${f.color}88`
                          : "2px solid rgba(255,245,235,0.06)",
                        cursor: disabled ? "default" : "pointer",
                        opacity: disabled ? 0.4 : 1,
                        transition: "all 0.25s ease",
                        transform: isSelected ? "scale(1.02)" : "scale(1)",
                        textAlign: "left",
                      }}>
                      <span style={{ fontSize: 22 }}>{f.emoji}</span>
                      <span style={{
                        color: isSelected ? "#FFF5EB" : "rgba(255,245,235,0.7)",
                        fontSize: 14, fontWeight: isSelected ? 800 : 600,
                      }}>{f.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Premium Flavours */}
            <div style={{ marginBottom: 24 }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 8, marginBottom: 10,
              }}>
                <span style={{
                  padding: "3px 10px", borderRadius: 6,
                  background: "linear-gradient(135deg, rgba(244,162,89,0.2), rgba(212,87,59,0.15))",
                  color: "#F4A259", fontSize: 12, fontWeight: 800,
                }}>★ PREMIUM • ₹100</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {PREMIUM_FLAVOURS.map((f) => {
                  const isSelected = selected.includes(f.name);
                  const disabled = selected.length >= 2 && !isSelected;
                  return (
                    <button key={f.name} onClick={() => !disabled && toggleFlavour(f.name)}
                      style={{
                        display: "flex", alignItems: "center", gap: 10,
                        padding: "12px 14px", borderRadius: 14,
                        background: isSelected
                          ? `linear-gradient(135deg, ${f.color}33, ${f.color}11)`
                          : "rgba(255,245,235,0.03)",
                        border: isSelected
                          ? `2px solid #F4A25966`
                          : "2px solid rgba(255,245,235,0.06)",
                        cursor: disabled ? "default" : "pointer",
                        opacity: disabled ? 0.4 : 1,
                        transition: "all 0.25s ease",
                        transform: isSelected ? "scale(1.02)" : "scale(1)",
                        textAlign: "left",
                      }}>
                      <span style={{ fontSize: 22 }}>{f.emoji}</span>
                      <span style={{
                        color: isSelected ? "#FFF5EB" : "rgba(255,245,235,0.7)",
                        fontSize: 14, fontWeight: isSelected ? 800 : 600,
                      }}>{f.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 1: Serve */}
        {!submitted && step === 1 && (
          <div style={{
            opacity: animateIn ? 1 : 0,
            transform: animateIn ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.5s ease",
          }}>
            <div style={{ marginBottom: 24 }}>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 24, color: "#FFF5EB", margin: "0 0 6px",
              }}>How Would You Like It?</h2>
              <p style={{ color: "rgba(255,245,235,0.5)", fontSize: 14, margin: 0 }}>
                Choose your serving style
              </p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {SERVE_OPTIONS.map((opt) => {
                const isSelected = serve === opt.id;
                return (
                  <button key={opt.id} onClick={() => setServe(opt.id)}
                    style={{
                      display: "flex", alignItems: "center", gap: 16,
                      padding: "20px 20px", borderRadius: 18,
                      background: isSelected
                        ? "linear-gradient(135deg, rgba(212,87,59,0.15), rgba(244,162,89,0.1))"
                        : "rgba(255,245,235,0.03)",
                      border: isSelected
                        ? "2px solid rgba(244,162,89,0.4)"
                        : "2px solid rgba(255,245,235,0.06)",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      transform: isSelected ? "scale(1.02)" : "scale(1)",
                      textAlign: "left",
                    }}>
                    <span style={{
                      fontSize: 36,
                      animation: isSelected ? "float 2s ease-in-out infinite" : "none",
                    }}>{opt.icon}</span>
                    <div>
                      <div style={{
                        color: "#FFF5EB", fontSize: 18, fontWeight: 800,
                      }}>{opt.label}</div>
                      <div style={{
                        color: "rgba(255,245,235,0.4)", fontSize: 13,
                      }}>{opt.desc}</div>
                    </div>
                    {isSelected && (
                      <div style={{
                        marginLeft: "auto",
                        width: 28, height: 28, borderRadius: "50%",
                        background: "linear-gradient(135deg, #D4573B, #F4A259)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        animation: "popIn 0.3s ease-out",
                      }}>
                        <span style={{ color: "#fff", fontSize: 14, fontWeight: 900 }}>✓</span>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: Review */}
        {!submitted && step === 2 && (
          <div style={{
            opacity: animateIn ? 1 : 0,
            transform: animateIn ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.5s ease",
          }}>
            <div style={{ marginBottom: 24 }}>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 24, color: "#FFF5EB", margin: "0 0 6px",
              }}>Review Your Order</h2>
              <p style={{ color: "rgba(255,245,235,0.5)", fontSize: 14, margin: 0 }}>
                Confirm and get your token number
              </p>
            </div>

            <div style={{
              background: "rgba(255,245,235,0.04)",
              borderRadius: 20, padding: 24,
              border: "1px solid rgba(244,162,89,0.15)",
            }}>
              {/* Flavours */}
              <div style={{ marginBottom: 20 }}>
                <div style={{
                  fontSize: 11, fontWeight: 800, color: "rgba(255,245,235,0.35)",
                  letterSpacing: 2, textTransform: "uppercase", marginBottom: 10,
                }}>Flavours</div>
                {selected.map((f, i) => {
                  const flav = [...NORMAL_FLAVOURS, ...PREMIUM_FLAVOURS].find(fl => fl.name === f);
                  return (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "8px 0",
                      borderBottom: i < selected.length - 1 ? "1px solid rgba(255,245,235,0.05)" : "none",
                    }}>
                      <span style={{ fontSize: 22 }}>{flav?.emoji}</span>
                      <span style={{ color: "#FFF5EB", fontSize: 16, fontWeight: 700 }}>{f}</span>
                      <span style={{
                        marginLeft: "auto", fontSize: 11, fontWeight: 700,
                        color: PREMIUM_FLAVOURS.some(p => p.name === f) ? "#F4A259" : "#A5D6A7",
                        padding: "2px 8px", borderRadius: 6,
                        background: PREMIUM_FLAVOURS.some(p => p.name === f)
                          ? "rgba(244,162,89,0.15)" : "rgba(124,179,66,0.12)",
                      }}>
                        {PREMIUM_FLAVOURS.some(p => p.name === f) ? "PREMIUM" : "NORMAL"}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Serving */}
              <div style={{ marginBottom: 20 }}>
                <div style={{
                  fontSize: 11, fontWeight: 800, color: "rgba(255,245,235,0.35)",
                  letterSpacing: 2, textTransform: "uppercase", marginBottom: 8,
                }}>Serving</div>
                <div style={{ color: "#FFF5EB", fontSize: 16, fontWeight: 700 }}>
                  {SERVE_OPTIONS.find(s => s.id === serve)?.icon} {SERVE_OPTIONS.find(s => s.id === serve)?.label}
                </div>
              </div>

              {/* Scoops */}
              <div style={{ marginBottom: 20 }}>
                <div style={{
                  fontSize: 11, fontWeight: 800, color: "rgba(255,245,235,0.35)",
                  letterSpacing: 2, textTransform: "uppercase", marginBottom: 8,
                }}>Scoops</div>
                <div style={{ color: "#FFF5EB", fontSize: 16, fontWeight: 700 }}>
                  {selected.length} {selected.length === 1 ? "Scoop" : "Scoops"}
                  {selected.length === 2 && selected[0] === selected[1] && " (Double)"}
                </div>
              </div>

              {/* Divider */}
              <div style={{
                height: 1, background: "linear-gradient(90deg, transparent, rgba(244,162,89,0.3), transparent)",
                margin: "16px 0",
              }} />

              {/* Price */}
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
              }}>
                <span style={{ color: "rgba(255,245,235,0.5)", fontSize: 14, fontWeight: 600 }}>Total</span>
                <span style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 32, fontWeight: 900, color: "#F4A259",
                }}>₹{price}</span>
              </div>
            </div>
          </div>
        )}

        {/* SUBMITTED */}
        {submitted && (
          <div style={{
            textAlign: "center", paddingTop: 40,
            animation: "slideUp 0.6s ease-out",
          }}>
            <div style={{
              width: 100, height: 100, borderRadius: "50%",
              background: "linear-gradient(135deg, #D4573B, #F4A259)",
              margin: "0 auto 24px", display: "flex", alignItems: "center", justifyContent: "center",
              animation: "pulse 2s ease-in-out infinite",
              boxShadow: "0 0 60px rgba(244,162,89,0.3)",
            }}>
              <span style={{ fontSize: 44 }}>🍨</span>
            </div>

            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 28, color: "#FFF5EB", margin: "0 0 8px",
            }}>Order Placed!</h2>
            <p style={{ color: "rgba(255,245,235,0.5)", fontSize: 14, margin: "0 0 28px" }}>
              Show this token at the counter
            </p>

            <div style={{
              background: "rgba(255,245,235,0.04)",
              borderRadius: 24, padding: "32px 24px",
              border: "1px solid rgba(244,162,89,0.15)",
              marginBottom: 24,
            }}>
              <div style={{
                fontSize: 12, fontWeight: 800, color: "rgba(255,245,235,0.35)",
                letterSpacing: 3, textTransform: "uppercase", marginBottom: 8,
              }}>Your Token</div>
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 64, fontWeight: 900,
                background: "linear-gradient(135deg, #F4A259, #D4573B)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                lineHeight: 1.1,
              }}>#{tokenNumber}</div>

              <div style={{
                height: 1, background: "linear-gradient(90deg, transparent, rgba(244,162,89,0.2), transparent)",
                margin: "20px 0",
              }} />

              <div style={{ display: "flex", justifyContent: "center", gap: 24 }}>
                <div>
                  <div style={{ fontSize: 11, color: "rgba(255,245,235,0.35)", fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>FLAVOURS</div>
                  <div style={{ color: "#FFF5EB", fontSize: 14, fontWeight: 700 }}>
                    {selected.join(selected[0] === selected[1] ? " ×2" : " + ")}
                  </div>
                </div>
                <div style={{ width: 1, background: "rgba(255,245,235,0.1)" }} />
                <div>
                  <div style={{ fontSize: 11, color: "rgba(255,245,235,0.35)", fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>SERVE</div>
                  <div style={{ color: "#FFF5EB", fontSize: 14, fontWeight: 700 }}>
                    {SERVE_OPTIONS.find(s => s.id === serve)?.label}
                  </div>
                </div>
                <div style={{ width: 1, background: "rgba(255,245,235,0.1)" }} />
                <div>
                  <div style={{ fontSize: 11, color: "rgba(255,245,235,0.35)", fontWeight: 700, letterSpacing: 1, marginBottom: 4 }}>TOTAL</div>
                  <div style={{ color: "#F4A259", fontSize: 14, fontWeight: 800 }}>₹{price}</div>
                </div>
              </div>
            </div>

            <button onClick={reset} style={{
              background: "transparent",
              border: "2px solid rgba(255,245,235,0.15)",
              borderRadius: 14, padding: "14px 32px",
              color: "rgba(255,245,235,0.6)", fontSize: 15, fontWeight: 700,
              cursor: "pointer", transition: "all 0.2s",
            }}>
              New Order
            </button>
          </div>
        )}
      </div>

      {/* Bottom CTA Bar */}
      {!submitted && (
        <div style={{
          position: "fixed", bottom: 0, left: 0, right: 0,
          background: "linear-gradient(to top, #1a0a00 60%, transparent)",
          padding: "40px 16px 24px",
          display: "flex", justifyContent: "center", gap: 10,
          zIndex: 50,
        }}>
          {step > 0 && (
            <button onClick={() => setStep(step - 1)} style={{
              padding: "16px 24px", borderRadius: 16,
              background: "rgba(255,245,235,0.06)",
              border: "1px solid rgba(255,245,235,0.1)",
              color: "rgba(255,245,235,0.6)", fontSize: 16, fontWeight: 700,
              cursor: "pointer",
            }}>
              Back
            </button>
          )}
          {step < 2 && (
            <button
              onClick={() => {
                if (step === 0 && canProceedFromFlavour) setStep(1);
                if (step === 1 && canProceedFromServe) setStep(2);
              }}
              disabled={step === 0 ? !canProceedFromFlavour : !canProceedFromServe}
              style={{
                flex: 1, maxWidth: 320, padding: "16px 24px", borderRadius: 16,
                background: (step === 0 ? canProceedFromFlavour : canProceedFromServe)
                  ? "linear-gradient(135deg, #D4573B, #F4A259)"
                  : "rgba(255,245,235,0.06)",
                border: "none",
                color: (step === 0 ? canProceedFromFlavour : canProceedFromServe)
                  ? "#fff" : "rgba(255,245,235,0.25)",
                fontSize: 16, fontWeight: 800,
                cursor: (step === 0 ? canProceedFromFlavour : canProceedFromServe)
                  ? "pointer" : "default",
                transition: "all 0.3s ease",
                boxShadow: (step === 0 ? canProceedFromFlavour : canProceedFromServe)
                  ? "0 8px 32px rgba(212,87,59,0.3)" : "none",
              }}>
              Continue {step === 0 && price > 0 && `• ₹${price}`}
            </button>
          )}
          {step === 2 && (
            <button onClick={handleSubmit} style={{
              flex: 1, maxWidth: 320, padding: "16px 24px", borderRadius: 16,
              background: "linear-gradient(135deg, #D4573B, #F4A259)",
              border: "none", color: "#fff", fontSize: 16, fontWeight: 800,
              cursor: "pointer",
              boxShadow: "0 8px 32px rgba(212,87,59,0.4)",
              animation: "pulse 2s ease-in-out infinite",
            }}>
              Confirm Order • ₹{price}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
