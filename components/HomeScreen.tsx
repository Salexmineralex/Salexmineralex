"use client";

import { useCallback, useState } from "react";
import { BootInsert } from "@/components/BootInsert";
import { DvdMenu } from "@/components/DvdMenu";
import { cvUrl } from "@/content/contact";

const menu = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Experience", href: "/experience" },
  { label: "Hackathons", href: "/hackathons" },
  { label: "Contact", href: "/contact" },
  { label: "CV", href: cvUrl, meta: "PDF" },
];

export function HomeScreen() {
  const [ready, setReady] = useState(false);
  const finish = useCallback(() => setReady(true), []);

  if (!ready) return <BootInsert onDone={finish} />;

  return <DvdMenu kicker="Library" menuId="main" items={menu} />;
}
