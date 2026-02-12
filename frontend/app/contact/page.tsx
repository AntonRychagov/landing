import type { Metadata } from 'next';
import { portfolioData } from '../../data/portfolio-data';
import Footer from '../components/Footer';
import Contact from '../components/Contact';

export const metadata: Metadata = {
  title: `Контакты - ${portfolioData.personal.name}`,
  description: 'Свяжитесь со мной для обсуждения вашего проекта',
};

export default function ContactPage(): JSX.Element {
  return (
    <main className="min-h-screen bg-background-primary text-text-primary pt-20">
      {/* Hero Section */}
      <section className="py-section px-6 bg-background-secondary">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-display-1 font-bold mb-6">Связаться</h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto">
            Готовы обсудить ваш проект? Свяжитесь со мной любым удобным способом
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <Contact contact={portfolioData.contact} />

      {/* Additional Info */}
      <section className="py-section px-6 bg-background-secondary">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-display-2 font-bold mb-8 text-center">
            Часто задаваемые вопросы
          </h2>
          <div className="space-y-6">
            <div className="bg-background-primary border border-border-default p-6 rounded-lg">
              <h3 className="text-display-3 font-semibold mb-3">
                Как долго длится работа над проектом?
              </h3>
              <p className="text-text-secondary">
                Сроки зависят от масштаба проекта. Короткометражный фильм может занять от 2 до 6
                месяцев, полнометражный — от 6 месяцев до года. Все сроки обсуждаются
                индивидуально.
              </p>
            </div>
            <div className="bg-background-primary border border-border-default p-6 rounded-lg">
              <h3 className="text-display-3 font-semibold mb-3">
                В каких жанрах вы работаете?
              </h3>
              <p className="text-text-secondary">
                Работаю в различных жанрах: драма, комедия, триллер, документальное кино. Каждый
                проект уникален и требует индивидуального подхода.
              </p>
            </div>
            <div className="bg-background-primary border border-border-default p-6 rounded-lg">
              <h3 className="text-display-3 font-semibold mb-3">
                Можно ли посмотреть примеры работ?
              </h3>
              <p className="text-text-secondary">
                Конечно! Все мои проекты доступны в разделе{' '}
                <a href="/#portfolio" className="text-text-primary hover:text-text-secondary">
                  Портфолио
                </a>
                . Там вы найдете трейлеры, кадры и описания проектов.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer contact={portfolioData.contact} name={portfolioData.personal.name} />
    </main>
  );
}
