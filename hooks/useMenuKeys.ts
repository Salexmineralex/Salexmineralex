"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return (
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.isContentEditable
  );
}

function plainKey(event: KeyboardEvent) {
  return !event.metaKey && !event.ctrlKey && !event.altKey;
}

function isBackKey(event: KeyboardEvent) {
  return (
    event.key === "Escape" ||
    event.key === "Backspace" ||
    event.key === "ArrowLeft" ||
    (plainKey(event) && event.key === "h")
  );
}

function isDownKey(event: KeyboardEvent) {
  return event.key === "ArrowDown" || (plainKey(event) && event.key === "j");
}

function isUpKey(event: KeyboardEvent) {
  return event.key === "ArrowUp" || (plainKey(event) && event.key === "k");
}

function isOpenKey(event: KeyboardEvent) {
  return event.key === "Enter" || (plainKey(event) && (event.key === "l" || event.key === "ArrowRight"));
}

function storedIndex(menuId: string, count: number) {
  try {
    const value = Number(sessionStorage.getItem(`ast-menu:${menuId}`));
    if (Number.isInteger(value) && value >= 0 && value < count) return value;
  } catch {
    /* private mode */
  }
  return 0;
}

export function useMenuKeys(
  count: number,
  onActivate: (index: number) => void,
  onBack?: () => void,
  menuId?: string,
) {
  const [index, setIndexState] = useState(0);
  const indexRef = useRef(0);
  const itemRefs = useRef<Array<HTMLElement | null>>([]);
  const navRef = useRef<HTMLElement | null>(null);
  const onActivateRef = useRef(onActivate);
  const onBackRef = useRef(onBack);
  const menuIdRef = useRef(menuId);

  onActivateRef.current = onActivate;
  onBackRef.current = onBack;
  menuIdRef.current = menuId;

  function setIndex(next: number) {
    indexRef.current = next;
    setIndexState(next);
    const id = menuIdRef.current;
    if (!id) return;
    try {
      sessionStorage.setItem(`ast-menu:${id}`, String(next));
    } catch {
      /* private mode */
    }
  }

  useLayoutEffect(() => {
    const saved = menuId ? storedIndex(menuId, count) : 0;
    indexRef.current = saved;
    setIndexState(saved);
    itemRefs.current[saved]?.focus({ preventScroll: true });
  }, [count, menuId]);

  useEffect(() => {
    let pendingG = false;
    let gTimer = 0;

    function moveTo(next: number) {
      setIndex(next);
      itemRefs.current[next]?.focus({ preventScroll: true });
    }

    function onKey(event: KeyboardEvent) {
      if (event.repeat || isTypingTarget(event.target)) return;

      if (isBackKey(event) && onBackRef.current) {
        event.preventDefault();
        onBackRef.current();
        return;
      }

      const active = document.activeElement;
      const inMenu = !!navRef.current?.contains(active);
      const atRest =
        active === document.body ||
        active === document.documentElement ||
        active === null;
      if (!inMenu && !atRest) return;
      if (count === 0) return;

      if (plainKey(event) && event.key === "g") {
        event.preventDefault();
        if (pendingG) {
          pendingG = false;
          window.clearTimeout(gTimer);
          moveTo(0);
          return;
        }
        pendingG = true;
        gTimer = window.setTimeout(() => {
          pendingG = false;
        }, 450);
        return;
      }

      pendingG = false;
      window.clearTimeout(gTimer);

      if (plainKey(event) && event.key === "G") {
        event.preventDefault();
        moveTo(count - 1);
        return;
      }

      if (isDownKey(event) || isUpKey(event)) {
        event.preventDefault();
        const direction = isDownKey(event) ? 1 : -1;
        moveTo((indexRef.current + direction + count) % count);
      } else if (isOpenKey(event)) {
        event.preventDefault();
        onActivateRef.current(indexRef.current);
      }
    }

    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(gTimer);
      window.removeEventListener("keydown", onKey);
    };
  }, [count]);

  return { index, setIndex, itemRefs, navRef };
}

export function useEscapeBack(onBack: () => void) {
  const onBackRef = useRef(onBack);
  onBackRef.current = onBack;

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (!isBackKey(event) || isTypingTarget(event.target)) return;
      event.preventDefault();
      onBackRef.current();
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
}
