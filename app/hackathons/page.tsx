import type { Metadata } from "next";
import { Dossier } from "@/components/Dossier";
import { Scene } from "@/components/Scene";
import { hackathons } from "@/content/hackathons";

export const metadata: Metadata = {
  title: "Hackathons",
};

export default function HackathonsPage() {
  return (
    <Scene kicker="Competitions" title="Hackathons" captureKeys={false}>
      <Dossier
        menuId="hackathons"
        items={hackathons.map((entry) => ({
          id: entry.id,
          title: entry.title,
          meta: entry.meta,
          points: entry.points,
          href: entry.href,
          hrefLabel: entry.hrefLabel,
        }))}
      />
    </Scene>
  );
}
