"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEscapeBack } from "@/hooks/useMenuKeys";
import { backHrefFor } from "@/lib/navigation";

export function Scene({
  kicker,
  title,
  children,
  captureKeys = true,
}: {
  kicker: string;
  title: string;
  children: React.ReactNode;
  captureKeys?: boolean;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const back = backHrefFor(pathname);
  useEscapeBack(() => {
    if (!captureKeys) return;
    router.push(back);
  });

  return (
    <article className="scene">
      <p className="kicker">{kicker}</p>
      <h1>{title}</h1>
      <div className="scene-body">{children}</div>
    </article>
  );
}
