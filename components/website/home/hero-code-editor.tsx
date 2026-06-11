"use client";

import { useEffect, useRef, useState } from "react";
import { Check, GitBranch } from "lucide-react";
import { prefersReducedMotion } from "@/lib/animations/gsap";

/**
 * Minimal editor window for the hero. Code types out character by
 * character with a humanised rhythm, monochrome syntax highlighting and
 * a single electric accent on the line that matters. Decorative only,
 * so the whole window is aria-hidden; reduced motion renders the
 * finished state immediately.
 */

type TokenKind = "kw" | "fn" | "pl" | "key" | "str" | "acc" | "pun" | "cm";

type Token = { text: string; kind: TokenKind };

const TOKEN_STYLES: Record<TokenKind, string> = {
  kw: "text-paper-faint",
  fn: "text-paper-dim",
  pl: "text-paper",
  key: "text-paper-dim",
  str: "text-paper",
  acc: "text-electric",
  pun: "text-paper-faint",
  cm: "text-paper-faint italic",
};

const CODE_LINES: Token[][] = [
  [
    { text: "const ", kind: "kw" },
    { text: "project", kind: "pl" },
    { text: " = ", kind: "pun" },
    { text: "await ", kind: "kw" },
    { text: "build", kind: "fn" },
    { text: "({", kind: "pun" },
  ],
  [
    { text: "  ", kind: "pun" },
    { text: "design", kind: "key" },
    { text: ": ", kind: "pun" },
    { text: '"minimal, modern"', kind: "str" },
    { text: ",", kind: "pun" },
  ],
  [
    { text: "  ", kind: "pun" },
    { text: "performance", kind: "key" },
    { text: ": ", kind: "pun" },
    { text: '"exceptionally fast"', kind: "str" },
    { text: ",", kind: "pun" },
  ],
  [
    { text: "  ", kind: "pun" },
    { text: "seo", kind: "key" },
    { text: ": ", kind: "pun" },
    { text: '"search-ready"', kind: "str" },
    { text: ",", kind: "pun" },
  ],
  [
    { text: "  ", kind: "pun" },
    { text: "delivery", kind: "key" },
    { text: ": ", kind: "pun" },
    { text: '"on time, every time"', kind: "str" },
    { text: ",", kind: "pun" },
  ],
  [
    { text: "  ", kind: "pun" },
    { text: "client", kind: "key" },
    { text: ": ", kind: "pun" },
    { text: '"satisfied"', kind: "acc" },
    { text: ",", kind: "pun" },
  ],
  [{ text: "});", kind: "pun" }],
  [],
  [{ text: "// shipped in weeks, not months", kind: "cm" }],
];

const LINE_LENGTHS = CODE_LINES.map((line) =>
  line.reduce((n, token) => n + token.text.length, 0)
);

const LINE_STARTS = LINE_LENGTHS.reduce<number[]>((starts, _, i) => {
  starts.push(i === 0 ? 0 : starts[i - 1] + LINE_LENGTHS[i - 1]);
  return starts;
}, []);

const TOTAL_CHARS =
  LINE_STARTS[LINE_STARTS.length - 1] + LINE_LENGTHS[LINE_LENGTHS.length - 1];

/** Offsets where a new line begins — typing pauses briefly there. */
const LINE_BREAKS = new Set(LINE_STARTS.slice(1));

function renderLine(tokens: Token[], visibleChars: number) {
  if (visibleChars <= 0) return null;
  const out: JSX.Element[] = [];
  let used = 0;
  for (let i = 0; i < tokens.length && used < visibleChars; i++) {
    const token = tokens[i];
    const take = Math.min(token.text.length, visibleChars - used);
    out.push(
      <span key={i} className={TOKEN_STYLES[token.kind]}>
        {token.text.slice(0, take)}
      </span>
    );
    used += take;
  }
  return out;
}

type HeroCodeEditorProps = {
  /** Seconds to wait after entering the viewport before typing begins. */
  startDelay?: number;
};

export function HeroCodeEditor({ startDelay = 1.4 }: HeroCodeEditorProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  const done = count >= TOTAL_CHARS;

  /* Begin once visible, after the hero entrance has settled. */
  useEffect(() => {
    if (prefersReducedMotion()) {
      setCount(TOTAL_CHARS);
      return;
    }

    let timer: ReturnType<typeof setTimeout>;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        timer = setTimeout(() => setStarted(true), startDelay * 1000);
        observer.disconnect();
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [startDelay]);

  /* Humanised typing: slight jitter per character, a beat at line ends. */
  useEffect(() => {
    if (!started || done) return;
    const delay = LINE_BREAKS.has(count) ? 150 : 18 + Math.random() * 26;
    const timer = setTimeout(() => setCount((c) => c + 1), delay);
    return () => clearTimeout(timer);
  }, [started, done, count]);

  /* Line the caret currently sits on. */
  let activeLine = CODE_LINES.length - 1;
  if (!done) {
    for (let i = 0; i < LINE_STARTS.length; i++) {
      if (count >= LINE_STARTS[i]) activeLine = i;
    }
  }

  return (
    <div
      ref={ref}
      aria-hidden
      className="overflow-hidden rounded-lg border border-ink-700 bg-ink-900/70 shadow-[0_32px_64px_-36px_rgb(0_0_0/0.5)] backdrop-blur-md"
    >
      {/* Window chrome */}
      <div className="flex items-center gap-3 border-b border-ink-700/60 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full border border-ink-600" />
          <span className="h-2.5 w-2.5 rounded-full border border-ink-600" />
          <span className="h-2.5 w-2.5 rounded-full border border-ink-600" />
        </div>
        <span className="font-mono text-[11px] tracking-wide text-paper-faint">
          project.ts
        </span>
      </div>

      {/* Code area */}
      <div className="flex font-mono text-xs leading-6">
        <div className="select-none border-r border-ink-700/60 px-3 py-4 text-right text-paper-faint/50">
          {CODE_LINES.map((_, i) => (
            <div
              key={i}
              className={`h-6 transition-opacity duration-300 ${
                count >= LINE_STARTS[i] ? "opacity-100" : "opacity-0"
              }`}
            >
              {i + 1}
            </div>
          ))}
        </div>

        <div className="flex-1 overflow-hidden px-4 py-4">
          {CODE_LINES.map((tokens, i) => {
            const visible = Math.min(
              Math.max(count - LINE_STARTS[i], 0),
              LINE_LENGTHS[i]
            );
            return (
              <div key={i} className="h-6 whitespace-pre">
                {renderLine(tokens, visible)}
                {i === activeLine && (
                  <span
                    className={`ml-px inline-block h-3.5 w-[7px] translate-y-[2px] bg-electric ${
                      !started || done ? "animate-caret-blink" : ""
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between border-t border-ink-700/60 px-4 py-2 font-mono text-[10px] tracking-wide text-paper-faint">
        <span className="inline-flex items-center gap-1.5">
          <GitBranch className="h-3 w-3" aria-hidden />
          main
        </span>
        <span className="inline-flex items-center gap-1.5">
          {done ? (
            <>
              <Check className="h-3 w-3 text-electric" aria-hidden />
              No problems found
            </>
          ) : (
            <>
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-paper-faint" />
              Building…
            </>
          )}
        </span>
      </div>
    </div>
  );
}
