"use client";

import { useEffect, useRef, useState } from "react";

export function BootInsert({ onDone }: { onDone: () => void }) {
  const [playing, setPlaying] = useState(false);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    let finished = false;

    function finish(remember: boolean) {
      if (finished) return;
      finished = true;
      if (remember) {
        try {
          sessionStorage.setItem("ast-boot", "1");
        } catch {
          /* private mode */
        }
      }
      onDoneRef.current();
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem("ast-boot") === "1";
    } catch {
      seen = false;
    }

    if (reduce || seen) {
      finish(false);
      return;
    }

    setPlaying(true);
    const timer = window.setTimeout(() => finish(true), 2200);

    function onKey(event: KeyboardEvent) {
      event.preventDefault();
      event.stopPropagation();
      finish(true);
    }

    window.addEventListener("keydown", onKey, true);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", onKey, true);
    };
  }, []);

  return (
    <div className={playing ? "boot is-playing" : "boot"} role="presentation">
      <div className="boot-bars" />
      <p className="boot-play">Play</p>
      <p className="boot-id">AST-01</p>
    </div>
  );
}
