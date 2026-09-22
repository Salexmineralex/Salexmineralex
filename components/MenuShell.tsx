"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { backHrefFor, normalizePath } from "@/lib/navigation";

function Timecode() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSeconds((current) => current + 1);
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const hh = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const mm = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return <time dateTime={`PT${seconds}S`}>{`${hh}:${mm}:${ss}`}</time>;
}

export function MenuShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const path = normalizePath(pathname);
  const atHome = path === "/";
  const back = backHrefFor(pathname);
  const hint = atHome
    ? "Arrows move · Enter open"
    : path === "/experience" || path === "/hackathons"
      ? "Enter details · Esc back"
      : "Esc back";
  const [crt, setCrt] = useState(true);
  const [white, setWhite] = useState(false);

  useLayoutEffect(() => {
    setCrt(!document.documentElement.classList.contains("crt-off"));
    setWhite(document.documentElement.classList.contains("white"));
  }, []);

  function toggleCrt() {
    const next = !document.documentElement.classList.contains("crt-off");
    document.documentElement.classList.toggle("crt-off", next);
    try {
      localStorage.setItem("ast-crt", next ? "off" : "on");
    } catch {
      /* private mode */
    }
    setCrt(!next);
  }

  function toggleWhite() {
    const next = !document.documentElement.classList.contains("white");
    document.documentElement.classList.toggle("white", next);
    const theme = document.querySelector('meta[name="theme-color"]');
    if (theme) theme.setAttribute("content", next ? "#f4f1ea" : "#0a0a0a");
    try {
      localStorage.setItem("ast-white", next ? "on" : "off");
    } catch {
      /* private mode */
    }
    setWhite(next);
  }

  return (
    <div className="bezel">
      <div className="frame">
        <header className="topbar">
          <span>
            AST-01
            <span className="top-name"> · Alejandro Sánchez Torres</span>
          </span>
          <span className="top-tools">
            <button
              type="button"
              className="crt-toggle"
              aria-pressed={white}
              onClick={toggleWhite}
            >
              White
            </button>
            <button
              type="button"
              className="crt-toggle"
              aria-pressed={crt}
              onClick={toggleCrt}
            >
              CRT
            </button>
            <Timecode />
          </span>
        </header>
        <main className="stage">
          <div className="stage-inner">{children}</div>
        </main>
        <div className="crt" aria-hidden="true">
          <div className="crt-scan" />
          <div className="crt-rgb" />
          <div className="crt-noise" />
          <div className="crt-tear" />
          <div className="crt-tear crt-tear-b" />
          <div className="crt-flash" />
          <div className="crt-sweep" />
          <div className="crt-vignette" />
        </div>
        <footer className="footer">
          <span>{hint}</span>
          {atHome ? <span>Tres Cantos</span> : <Link href={back}>Back</Link>}
        </footer>
      </div>
    </div>
  );
}
