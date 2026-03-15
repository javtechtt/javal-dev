'use client';

import SectionHeader from '@/components/ui/SectionHeader';
import ProjectCard from '@/components/ui/ProjectCard';
import GlowButton from '@/components/ui/GlowButton';
import { featuredProjects } from '@/data/projects';

export default function FeaturedProjects() {
  const scrollToGallery = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="featured" className="section-padding max-w-7xl mx-auto">
      <SectionHeader
        eyebrow="Selected Work"
        title="Featured "
        highlight="Projects"
        description="A curated selection of recent work — each project built with craft and intent."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
        {featuredProjects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} variant="featured" />
        ))}
      </div>

      <div className="flex justify-center">
        <GlowButton variant="secondary" size="md" icon onClick={scrollToGallery}>
          View all projects
        </GlowButton>
      </div>
    </section>
  );
}
