import type { Metadata } from 'next';
import { portfolioData } from '../../../data/portfolio-data';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const project = portfolioData.projects.find((p) => p.id === params.id);

  if (!project) {
    return {
      title: 'Проект не найден',
    };
  }

  return {
    title: `${project.title} - ${portfolioData.personal.name}`,
    description: project.fullDescription || project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      images: [project.posterImage],
      type: 'website',
    },
  };
}

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element {
  return <>{children}</>;
}
