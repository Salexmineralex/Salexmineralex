import type { Metadata } from "next";
import { DvdMenu } from "@/components/DvdMenu";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work",
};

export default function WorkPage() {
  return (
    <DvdMenu
      kicker="Titles"
      menuId="work"
      backHref="/"
      items={projects.map((project) => ({
        label: project.name,
        href: `/work/${project.slug}`,
        meta: project.type,
      }))}
    />
  );
}
