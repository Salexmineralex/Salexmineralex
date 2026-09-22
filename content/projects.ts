import data from "./projects.json";

export type Project = {
  slug: string;
  name: string;
  type: string;
  language: string;
  framework: string;
  paragraphs: string[];
  images: string[];
  live?: string;
  repository?: string;
};

export const projects = data as Project[];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
