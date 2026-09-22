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
    function onKey(event: KeyboardEvent) {
      if (event.repeat || isTypingTarget(event.target)) return;

      if (event.key === "Escape" && onBackRef.current) {
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

      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        const direction = event.key === "ArrowDown" ? 1 : -1;
        const next = (indexRef.current + direction + count) % count;
        setIndex(next);
        itemRefs.current[next]?.focus({ preventScroll: true });
      } else if (event.key === "Enter") {
        event.preventDefault();
        onActivateRef.current(indexRef.current);
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count]);

  return { index, setIndex, itemRefs, navRef };
}

export function useEscapeBack(onBack: () => void) {
  const onBackRef = useRef(onBack);
  onBackRef.current = onBack;

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key !== "Escape" || isTypingTarget(event.target)) return;
      event.preventDefault();
      onBackRef.current();
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
}
