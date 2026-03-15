import SectionHeader from '@/components/ui/SectionHeader';
import ServiceCard from '@/components/ui/ServiceCard';
import { services } from '@/data/services';

export default function ServicesSection() {
  return (
    <section id="services" className="section-padding max-w-7xl mx-auto">
      <SectionHeader
        eyebrow="What I do"
        title="Services &amp; "
        highlight="Expertise"
        description="End-to-end creative and technical capabilities to bring your vision to life."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {services.map((service, i) => (
          <ServiceCard key={service.id} service={service} index={i} />
        ))}
      </div>
    </section>
  );
}
