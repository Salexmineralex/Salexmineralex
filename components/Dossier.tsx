"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useMenuKeys } from "@/hooks/useMenuKeys";
import { backHrefFor } from "@/lib/navigation";

export type DossierItem = {
  id: string;
  title: string;
  meta: string;
  points: string[];
  tools?: string;
  href?: string;
  hrefLabel?: string;
};

export function Dossier({
  menuId,
  items,
}: {
  menuId: string;
  items: DossierItem[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState<number | null>(null);
  const { index, setIndex, itemRefs, navRef } = useMenuKeys(
    items.length,
    (current) => {
      setOpen((value) => (value === current ? null : current));
    },
    () => router.push(backHrefFor(pathname)),
    menuId,
  );

  return (
    <ul
      className="dossier"
      aria-label={menuId}
      ref={(node) => {
        navRef.current = node;
      }}
    >
      {items.map((item, itemIndex) => {
        const selected = itemIndex === index;
        const expanded = open === itemIndex;
        return (
          <li key={item.id} className={expanded ? "is-open" : undefined}>
            <button
              type="button"
              ref={(node) => {
                itemRefs.current[itemIndex] = node;
              }}
              className={selected ? "is-selected" : undefined}
              aria-expanded={expanded}
              onMouseEnter={() => setIndex(itemIndex)}
              onFocus={() => setIndex(itemIndex)}
              onClick={() =>
                setOpen((value) => (value === itemIndex ? null : itemIndex))
              }
            >
              <span className="glyph" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </span>
              <span>
                <span className="role">{item.title}</span>
                <span className="org">{item.meta}</span>
              </span>
            </button>
            <div className="drawer" aria-hidden={expanded ? undefined : true}>
              <div className="drawer-inner">
                {item.points.map((point) => (
                  <p key={point}>{point}</p>
                ))}
                {item.tools ? <p className="stack">{item.tools}</p> : null}
                {item.href ? (
                  <p>
                    <a
                      className="repo-link"
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.hrefLabel ?? "Link"}
                    </a>
                  </p>
                ) : null}
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
