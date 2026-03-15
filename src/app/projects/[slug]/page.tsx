import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getCaseStudy, caseStudies } from '@/data/caseStudies';
import { projects } from '@/data/projects';
import CaseStudyContent from '@/components/sections/CaseStudyContent';

export function generateStaticParams() {
  return caseStudies.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: `${study.title} — Case Study | javal.dev`,
    description: `${study.role} — ${study.projectType}`,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const project = projects.find((p) => p.slug === slug);
  return <CaseStudyContent study={study} project={project} />;
}
