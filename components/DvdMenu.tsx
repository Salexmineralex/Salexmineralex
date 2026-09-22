"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMenuKeys } from "@/hooks/useMenuKeys";

export type MenuItem = {
  label: string;
  href: string;
  meta?: string;
};

export function DvdMenu({
  kicker,
  items,
  backHref,
  menuId,
}: {
  kicker: string;
  items: MenuItem[];
  backHref?: string;
  menuId: string;
}) {
  const router = useRouter();
  const { index, setIndex, itemRefs, navRef } = useMenuKeys(
    items.length,
    (current) => {
      const item = items[current];
      if (!item) return;
      if (item.href.startsWith("/")) {
        router.push(item.href);
        return;
      }
      itemRefs.current[current]?.click();
    },
    backHref ? () => router.push(backHref) : undefined,
    menuId,
  );

  return (
    <nav className="menu-block" aria-label={kicker} ref={navRef}>
      <p className="kicker">{kicker}</p>
      <p className="sr-only">
        Use arrow keys to move, Enter to open, and Escape to go back.
      </p>
      <ul className="menu">
        {items.map((item, itemIndex) => {
          const selected = itemIndex === index;
          const className = selected ? "is-selected" : undefined;
          const meta = item.meta ?? String(itemIndex + 1).padStart(2, "0");
          const content = (
            <>
              <span className="tape-window" aria-hidden="true">
                <span className="reel" />
                <span className="reel" />
              </span>
              <span className="tape-face">
                <span className="menu-label">{item.label}</span>
                <span className="menu-meta">{meta}</span>
              </span>
            </>
          );

          if (item.href.startsWith("/")) {
            return (
              <li key={item.href}>
                <Link
                  ref={(node) => {
                    itemRefs.current[itemIndex] = node;
                  }}
                  href={item.href}
                  className={className}
                  aria-current={selected ? "true" : undefined}
                  data-selected={selected ? "true" : "false"}
                  onMouseEnter={() => setIndex(itemIndex)}
                  onFocus={() => setIndex(itemIndex)}
                >
                  {content}
                </Link>
              </li>
            );
          }

          const external = item.href.startsWith("http");
          return (
            <li key={item.href}>
              <a
                ref={(node) => {
                  itemRefs.current[itemIndex] = node;
                }}
                href={item.href}
                className={className}
                aria-current={selected ? "true" : undefined}
                data-selected={selected ? "true" : "false"}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                onMouseEnter={() => setIndex(itemIndex)}
                onFocus={() => setIndex(itemIndex)}
              >
                {content}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
