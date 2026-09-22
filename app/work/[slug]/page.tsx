import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FilmStrip } from "@/components/FilmStrip";
import { Scene } from "@/components/Scene";
import { getProject, projects } from "@/content/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  return { title: project?.name ?? "Work" };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <Scene kicker={project.type} title={project.name}>
      <p className="stack">
        {project.language} · {project.framework}
      </p>
      {project.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {project.live ? (
        <p>
          <a
            className="repo-link"
            href={project.live}
            target="_blank"
            rel="noreferrer"
          >
            Enter
          </a>
        </p>
      ) : null}
      {project.repository ? (
        <p>
          <a
            className="repo-link"
            href={project.repository}
            target="_blank"
            rel="noreferrer"
          >
            Repository
          </a>
        </p>
      ) : null}
      <FilmStrip images={project.images} alt={`${project.name} screenshot`} />
    </Scene>
  );
}
