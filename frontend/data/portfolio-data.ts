/**
 * Portfolio data for landing page
 * 
 * This file contains example data structure.
 * Replace with actual data collected from Instagram profile.
 */

import type { PortfolioData } from './types';

export const portfolioData: PortfolioData = {
  personal: {
    name: 'Veli Eva',
    fullName: 'Veli Eva',
    profession: ['Сценарист','Режиссёр'],
    bio: 'Творческий профессионал в области кино и телевидения. Создаю истории, которые вдохновляют и заставляют задуматься.',
    aboutBio: 'Творческий профессионал в области кино и телевидения с многолетним опытом создания визуальных историй. Моя работа — это синтез глубокого понимания человеческой природы, мастерства повествования и визуального языка. Я верю, что каждая история имеет силу изменить восприятие мира, вдохновить на размышления и создать эмоциональную связь между экраном и зрителем. Через свои проекты я исследую сложные темы человеческих отношений, внутренних конфликтов и поиска смысла в современном мире.',
    education: [
      'Высшее образование в области кино и телевидения с углубленным изучением режиссуры и сценаристики',
      'Мастер-классы и интенсивные курсы у признанных мастеров киноиндустрии по режиссуре, сценаристике и визуальному повествованию',
      'Активный участник международных кинофестивалей и профессиональных форумов',
      'Постоянное развитие через изучение мирового кинематографа и современных тенденций в индустрии',
    ],
    philosophy: 'Каждый проект — это возможность рассказать уникальную историю, которая находит отклик в сердцах зрителей. Я убеждена, что настоящее кино рождается на стыке искренности, технического мастерства и глубокого понимания человеческой души. Моя философия творчества строится на принципе: не просто показать историю, а создать пространство для диалога, где зритель становится соавтором, переживая и осмысляя увиденное через призму собственного опыта. Я стремлюсь к тому, чтобы каждый кадр, каждое слово, каждый образ работали на создание целостного художественного высказывания, способного остаться с человеком надолго после финальных титров.',
    interests: ['Кино', 'Литература', 'Фотография', 'Путешествия', 'Театр'],
    profileImage: '/images/profile/portrait.png',
    profileImages: [
      'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&h=1080&fit=crop&q=80',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=1920&h=1080&fit=crop',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1920&h=1080&fit=crop',
    ],
    backgroundVideo: 'https://videos.pexels.com/video-files/3045163/3045163-hd_1920_1080_30fps.mp4',
    instagramUrl: 'https://www.instagram.com/veli_eva',
    followers: 12500,
  },
  projects: [
    {
      id: 'project-1',
      title: 'Тени прошлого',
      year: 2024,
      role: 'both',
      description: 'Драматическая история о поиске истины и прощении. Фильм исследует сложные отношения между поколениями и влияние прошлого на настоящее.',
      fullDescription: 'Драматическая история о поиске истины и прощении. Фильм исследует сложные отношения между поколениями и влияние прошлого на настоящее. Главный герой возвращается в родной город после многих лет отсутствия, чтобы разобраться с тайнами своего прошлого.',
      posterImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=1200&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1517604931442-7e0d8ed8c755?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&h=800&fit=crop',
      ],
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      videoType: 'youtube',
      genre: 'Драма',
      duration: '90 мин',
      watchUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    },
    {
      id: 'project-2',
      title: 'Город мечты',
      year: 2023,
      role: 'director',
      description: 'Комедийная драма о молодом человеке, который переезжает в большой город в поисках своей мечты. Фильм о дружбе, любви и преодолении препятствий.',
      fullDescription: 'Комедийная драма о молодом человеке, который переезжает в большой город в поисках своей мечты. Фильм о дружбе, любви и преодолении препятствий. История о том, как важно оставаться верным себе, даже когда все вокруг пытаются изменить тебя.',
      posterImage: 'https://images.unsplash.com/photo-1517604931442-7e0d8ed8c755?w=800&h=1200&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1517604931442-7e0d8ed8c755?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&h=800&fit=crop',
      ],
      videoUrl: 'https://player.vimeo.com/video/148751763',
      videoType: 'vimeo',
      genre: 'Комедия',
      duration: '60 мин',
    },
    {
      id: 'project-3',
      title: 'Ночные огни',
      year: 2023,
      role: 'screenwriter',
      description: 'Неонуарный триллер о детективе, расследующем серию загадочных преступлений в ночном городе.',
      fullDescription: 'Неонуарный триллер о детективе, расследующем серию загадочных преступлений в ночном городе. Фильм сочетает элементы классического нуара с современной эстетикой и напряженным сюжетом.',
      posterImage: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=1200&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1200&h=800&fit=crop',
      ],
      videoUrl: 'https://www.youtube.com/embed/jNQXAC9IVRw',
      videoType: 'youtube',
      genre: 'Триллер',
      duration: '105 мин',
    },
    {
      id: 'project-4',
      title: 'Времена года',
      year: 2022,
      role: 'both',
      description: 'Поэтическая драма, рассказывающая историю четырех сезонов жизни человека через призму природы и времени.',
      fullDescription: 'Поэтическая драма, рассказывающая историю четырех сезонов жизни человека через призму природы и времени. Фильм исследует циклы жизни, смерти и возрождения через метафоры природы.',
      posterImage: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=1200&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop',
      ],
      videoUrl: 'https://player.vimeo.com/video/1084537',
      videoType: 'vimeo',
      genre: 'Драма',
      duration: '75 мин',
    },
  ],
  contact: {
    email: 'contact@velieva.com',
    instagram: 'https://www.instagram.com/veli_eva',
    phone: '+7 (999) 123-45-67',
    otherSocials: [
      {
        platform: 'VK',
        url: 'https://vk.com/velieva',
      },
      {
        platform: 'Telegram',
        url: 'https://t.me/Veli_Eva',
      },
    ],
  },
};
