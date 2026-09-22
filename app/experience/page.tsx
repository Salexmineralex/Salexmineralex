import type { Metadata } from "next";
import { Dossier } from "@/components/Dossier";
import { Scene } from "@/components/Scene";
import { experience } from "@/content/experience";

export const metadata: Metadata = {
  title: "Experience",
};

export default function ExperiencePage() {
  return (
    <Scene kicker="Experience" title="Roles" captureKeys={false}>
      <Dossier
        menuId="experience"
        items={experience.map((role) => ({
          id: role.id,
          title: role.title,
          meta: `${role.org} · ${role.dates}`,
          points: role.points,
          tools: role.tools,
        }))}
      />
    </Scene>
  );
}
