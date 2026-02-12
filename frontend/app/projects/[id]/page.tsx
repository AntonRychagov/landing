import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { portfolioData } from '../../../data/portfolio-data';
import Footer from '../../components/Footer';

interface ProjectPageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams(): Promise<Array<{ id: string }>> {
  return portfolioData.projects.map((project) => ({
    id: project.id,
  }));
}

export default function ProjectPage({ params }: ProjectPageProps): JSX.Element {
  const project = portfolioData.projects.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  const roleLabels: Record<string, string> = {
    director: 'Режиссер',
    screenwriter: 'Сценарист',
    both: 'Режиссер, Сценарист',
  };

  return (
    <main className="min-h-screen bg-background-primary text-text-primary pt-20">
      {/* Back Button */}
      <div className="max-w-6xl mx-auto px-6 py-6">
        <Link
          href="/#portfolio"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M15 19l-7-7 7-7" />
          </svg>
          <span>Назад к портфолио</span>
        </Link>
      </div>

      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[400px] mb-12">
        <div className="relative w-full h-full">
          <Image
            src={project.posterImage}
            alt={project.title}
            fill
            className="object-cover"
            priority
            unoptimized={project.posterImage?.startsWith('http') || false}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background-primary via-background-primary/60 to-transparent" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 max-w-6xl mx-auto px-6 pb-12">
          <h1 className="text-display-1 font-bold mb-4">{project.title}</h1>
          <div className="flex flex-wrap gap-4 text-lg text-text-secondary">
            <span>{project.year}</span>
            <span>•</span>
            <span>{roleLabels[project.role]}</span>
            {project.genre && (
              <>
                <span>•</span>
                <span>{project.genre}</span>
              </>
            )}
            {project.duration && (
              <>
                <span>•</span>
                <span>{project.duration}</span>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 pb-section">
        {/* Description */}
        <div className="mb-12">
          <h2 className="text-display-2 font-bold mb-6">О проекте</h2>
          <p className="text-lg text-text-secondary leading-relaxed max-w-3xl">
            {project.fullDescription || project.description}
          </p>
        </div>

        {/* Video */}
        {project.videoUrl && (
          <div className="mb-12">
            <h2 className="text-display-2 font-bold mb-6">Видео</h2>
            <div className="relative aspect-video w-full max-w-4xl rounded-lg overflow-hidden">
              {project.videoType === 'youtube' && (
                <iframe
                  src={project.videoUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={project.title}
                />
              )}
              {project.videoType === 'vimeo' && (
                <iframe
                  src={project.videoUrl}
                  className="w-full h-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={project.title}
                />
              )}
            </div>
          </div>
        )}

        {/* Images Gallery */}
        {project.images && project.images.length > 0 && (
          <div className="mb-12">
            <h2 className="text-display-2 font-bold mb-6">Галерея</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.images.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-lg overflow-hidden"
                >
                  <Image
                    src={image}
                    alt={`${project.title} - изображение ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized={image?.startsWith('http') || false}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Awards and Nominations */}
        {(project.awards && project.awards.length > 0) ||
        (project.nominations && project.nominations.length > 0) ? (
          <div className="mb-12">
            <h2 className="text-display-2 font-bold mb-6">Награды и номинации</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {project.awards && project.awards.length > 0 && (
                <div className="bg-background-secondary border border-border-default p-6 rounded-lg">
                  <h3 className="text-display-3 font-semibold mb-4 text-text-primary">
                    Награды
                  </h3>
                  <ul className="space-y-2">
                    {project.awards.map((award, index) => (
                      <li key={index} className="text-text-secondary flex items-start">
                        <span className="mr-2 text-text-primary">•</span>
                        <span>{award}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {project.nominations && project.nominations.length > 0 && (
                <div className="bg-background-secondary border border-border-default p-6 rounded-lg">
                  <h3 className="text-display-3 font-semibold mb-4 text-text-primary">
                    Номинации
                  </h3>
                  <ul className="space-y-2">
                    {project.nominations.map((nomination, index) => (
                      <li key={index} className="text-text-secondary flex items-start">
                        <span className="mr-2 text-text-primary">•</span>
                        <span>{nomination}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : null}

        {/* Watch Link */}
        {project.watchUrl && (
          <div className="text-center">
            <a
              href={project.watchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-text-primary text-background-primary font-semibold hover:bg-text-secondary transition-colors rounded-lg"
            >
              Смотреть проект
            </a>
          </div>
        )}

        {/* Related Projects */}
        <div className="mt-16 pt-12 border-t border-border-default">
          <h2 className="text-display-2 font-bold mb-6">Другие проекты</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {portfolioData.projects
              .filter((p) => p.id !== project.id)
              .slice(0, 3)
              .map((relatedProject) => (
                <Link
                  key={relatedProject.id}
                  href={`/projects/${relatedProject.id}`}
                  className="group bg-background-secondary border border-border-default rounded-lg overflow-hidden hover:border-text-secondary transition-colors"
                >
                  <div className="relative aspect-[2/3] w-full">
                    <Image
                      src={relatedProject.posterImage}
                      alt={relatedProject.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      unoptimized={relatedProject.posterImage?.startsWith('http') || false}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-display-3 font-semibold mb-2">
                      {relatedProject.title}
                    </h3>
                    <p className="text-text-secondary text-sm">{relatedProject.year}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>

      <Footer
        contact={portfolioData.contact}
        name={portfolioData.personal.name}
      />
    </main>
  );
}
