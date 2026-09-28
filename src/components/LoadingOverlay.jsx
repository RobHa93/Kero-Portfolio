import { useEffect, useState } from "react";
import { safeStorage } from "../utils/storage.js";

const SESSION_KEY = "portfolio_loader_shown_v1";

const PHRASES = ["Willkommen!", "kevin    |    robin    |    webdeveloper"];
const MERGE_PHASE = PHRASES.length; // Phase nach der letzten Phrase: "Ke | Ro."

const FADE_MS   = 400;
const HOLD_MS   = 1000;
const PHRASE_MS = FADE_MS + HOLD_MS + FADE_MS; // 1800ms per phrase
const MERGE_MS  = 350;
const COVER_FADE_MS = 650;

const shouldShowLoader = () =>
  safeStorage.get(sessionStorage, SESSION_KEY) !== "1" &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function LoadingOverlay({ onDone }) {
  const [visible] = useState(shouldShowLoader);

  const [phase,        setPhase]        = useState(0);
  const [textOpacity,  setTextOpacity]  = useState(0);
  const [coverOpacity, setCoverOpacity] = useState(1);
  const [coverVisible, setCoverVisible] = useState(true);
  const [mergeIn,      setMergeIn]      = useState(false); // slide halves together
  const [dotIn,        setDotIn]        = useState(false);  // separator + dot pop in

  useEffect(() => {
    if (!visible) { onDone?.(); return; }

    document.body.style.overflow = "hidden";

    const timers = [];
    const schedule = (fn, ms) => timers.push(setTimeout(fn, ms));

    // ── Phrases ──────────────────────────────────────────
    schedule(() => setTextOpacity(1), 50);

    for (let i = 1; i < PHRASES.length; i++) {
      const base = i * PHRASE_MS;
      schedule(() => setTextOpacity(0), (i - 1) * PHRASE_MS + FADE_MS + HOLD_MS);
      schedule(() => setPhase(i),       base);
      schedule(() => setTextOpacity(1), base + 30);
    }

    // ── After the last phrase: switch to merge frame ─────
    const lastBase   = (PHRASES.length - 1) * PHRASE_MS;
    const lastFadeAt = lastBase + FADE_MS + HOLD_MS;   // last phrase starts fading out
    const mergeAt    = lastFadeAt + FADE_MS;           // switch while invisible

    schedule(() => setTextOpacity(0),      lastFadeAt);
    schedule(() => setPhase(MERGE_PHASE),  mergeAt);
    schedule(() => setMergeIn(true),       mergeAt + 40);  // slide Ke + Ro in
    schedule(() => setDotIn(true),         mergeAt + 380); // separator + dot appear

    // ── Hold logo, then crossfade to homepage ────────────
    const overlayFadeAt = mergeAt + 40 + MERGE_MS + HOLD_MS;

    schedule(() => {
      setCoverOpacity(0);
      safeStorage.set(sessionStorage, SESSION_KEY, "1");
      document.body.style.overflow = "";
      onDone?.();
    }, overlayFadeAt);

    schedule(() => setCoverVisible(false), overlayFadeAt + COVER_FADE_MS);

    return () => {
      timers.forEach(clearTimeout);
      document.body.style.overflow = "";
    };
  }, [visible, onDone]);

  if (!visible || !coverVisible) return null;

  const textCls = "text-base sm:text-2xl font-bold tracking-tight select-none";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-zinc-950"
      style={{ opacity: coverOpacity, transition: `opacity ${COVER_FADE_MS}ms ease-in-out` }}
      aria-hidden="true"
    >
      {phase < MERGE_PHASE ? (
        /* ── Plain phrase ──────────────────────────────── */
        <p
          className={`${textCls} text-white max-w-[90vw] px-4 text-center`}
          style={{ opacity: textOpacity, transition: `opacity ${FADE_MS}ms ease-in-out` }}
        >
          {PHRASES[phase].split("|").map((part, i, arr) => (
            <span key={i} className="whitespace-nowrap">
              <span className="px-1 sm:px-2">{part.trim()}</span>
              {i < arr.length - 1 && (
                <span className="px-1 sm:px-2 text-sky-400">|</span>
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
              transition: `transform ${MERGE_MS}ms ease-out, opacity 280ms ease-out`,
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
              transition: `transform ${MERGE_MS}ms ease-out, opacity 280ms ease-out`,
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
