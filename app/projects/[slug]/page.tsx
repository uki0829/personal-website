import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/lib/project";
import ProjectDetailClient from "./ProjectDetailClient";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — Zhang Hefeng`,
    description: project.subtitle,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const currentIdx = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(currentIdx + 1) % projects.length];

  return <ProjectDetailClient project={project} nextProject={nextProject} />;
}
