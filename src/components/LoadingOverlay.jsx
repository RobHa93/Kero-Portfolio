import { useEffect, useRef, useState } from "react";

const SESSION_KEY = "portfolio_loader_shown_v1";

const PHRASES = ["hallo!", "kevin    |    robin    |    webdeveloper"];

const FADE_MS   = 400;
const HOLD_MS   = 1000;
const PHRASE_MS = FADE_MS + HOLD_MS + FADE_MS; // 1800ms per phrase

export default function LoadingOverlay({ onDone }) {
  const [visible] = useState(() => sessionStorage.getItem(SESSION_KEY) !== "1");

  const [phase,        setPhase]        = useState(0);   // 0-2 = phrases, 3 = merge
  const [textOpacity,  setTextOpacity]  = useState(0);
  const [coverOpacity, setCoverOpacity] = useState(1);
  const [coverVisible, setCoverVisible] = useState(true);
  const [mergeIn,      setMergeIn]      = useState(false); // slide halves together
  const [dotIn,        setDotIn]        = useState(false);  // separator + dot pop in

  const timersRef = useRef([]);

  useEffect(() => {
    if (!visible) { onDone?.(); return; }

    document.body.style.overflow = "hidden";

    const push = (fn, ms) => {
      const id = setTimeout(fn, ms);
      timersRef.current.push(id);
    };

    // ── Phrases 0-2 (Hallo!, Kevin, Robin) ──────────────
    push(() => setTextOpacity(1), 50);

    for (let i = 1; i < PHRASES.length; i++) {
      const base = i * PHRASE_MS;
      push(() => setTextOpacity(0), (i - 1) * PHRASE_MS + FADE_MS + HOLD_MS);
      push(() => setPhase(i),       base);
      push(() => setTextOpacity(1), base + 30);
    }

    // ── After "Robin": switch to merge frame ─────────────
    const lastBase    = (PHRASES.length - 1) * PHRASE_MS;
    const robinFadeAt = lastBase + FADE_MS + HOLD_MS;   // Robin starts fading out

    push(() => setTextOpacity(0), robinFadeAt);          // fade Robin out
    push(() => setPhase(3),       robinFadeAt + FADE_MS); // switch while invisible
    push(() => setMergeIn(true),  robinFadeAt + FADE_MS + 40);  // slide Ke + Ro in
    push(() => setDotIn(true),    robinFadeAt + FADE_MS + 380); // separator + dot appear

    // ── Hold logo, then crossfade to homepage ────────────
    const overlayFadeAt = robinFadeAt + FADE_MS + 40 + 350 + HOLD_MS;

    push(() => {
      setCoverOpacity(0);
      sessionStorage.setItem(SESSION_KEY, "1");
      document.body.style.overflow = "";
      onDone?.();
    }, overlayFadeAt);

    push(() => setCoverVisible(false), overlayFadeAt + 650);

    return () => {
      timersRef.current.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!visible || !coverVisible) return null;

  const textCls = "text-2xl md:text-2xl font-bold tracking-tight select-none";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center w-screen h-screen overflow-hidden bg-zinc-950"
      style={{ opacity: coverOpacity, transition: "opacity 650ms ease-in-out" }}
    >
      {phase < 3 ? (
        /* ── Plain phrase ──────────────────────────────── */
        <p
          className={`${textCls} text-white flex items-center justify-between gap-10`}
          style={{ opacity: textOpacity, transition: `opacity ${FADE_MS}ms ease-in-out` }}
        >
          {PHRASES[phase].split("|").map((part, i, arr) => (
            <span key={i} className="flex items-center">
              <span className="px-2">{part.trim()}</span>
              {i < arr.length - 1 && (
                <span className="gap-10 px-2 text-2xl font-bold text-sky-400 md:text-2xl">|</span>
              )}
            </span>
          ))}
        </p>
      ) : (
        /* ── Ke | Ro. merge ────────────────────────────── */
        <div className="flex items-center select-none">
          {/* "Ke" slides in from the left */}
          <span
            className={`${textCls} text-white`}
            style={{
              transform:  mergeIn ? "translateX(0)"   : "translateX(-48px)",
              opacity:    mergeIn ? 1                  : 0,
              transition: "transform 350ms ease-out, opacity 280ms ease-out",
            }}
          >
            Ke
          </span>

          {/* separator bar */}
          <span
            className="self-stretch w-px mx-4 bg-white/30"
            style={{
              opacity:    dotIn ? 1 : 0,
              transition: "opacity 250ms ease-in",
            }}
          />

          {/* "Ro" slides in from the right */}
          <span
            className={`${textCls} text-white`}
            style={{
              transform:  mergeIn ? "translateX(0)"   : "translateX(48px)",
              opacity:    mergeIn ? 1                  : 0,
              transition: "transform 350ms ease-out, opacity 280ms ease-out",
            }}
          >
            Ro
          </span>

          {/* sky dot like in the navbar */}
          <span
            className={`${textCls} text-sky-400`}
            style={{
              opacity:    dotIn ? 1 : 0,
              transition: "opacity 250ms ease-in",
            }}
          >
            .
          </span>
        </div>
      )}
    </div>
  );
}
