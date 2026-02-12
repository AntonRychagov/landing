# Промо-лендинг для сценариста и режиссера

## Структура проекта

```
frontend/
├── app/
│   ├── components/          # Компоненты секций лендинга
│   │   ├── Hero.tsx         # Главный экран
│   │   ├── About.tsx        # О себе
│   │   ├── Portfolio.tsx   # Портфолио проектов
│   │   ├── ProjectModal.tsx # Модальное окно проекта
│   │   ├── VideoGallery.tsx # Видео галерея
│   │   ├── Awards.tsx       # Награды
│   │   ├── Testimonials.tsx # Отзывы
│   │   ├── Contact.tsx      # Контакты
│   │   └── Footer.tsx       # Футер
│   ├── page.tsx             # Главная страница
│   └── layout.tsx           # Layout с метаданными
├── data/
│   ├── types.ts             # TypeScript типы
│   └── portfolio-data.ts    # Данные портфолио (ЗАПОЛНИТЬ!)
└── public/
    ├── images/
    │   ├── profile/         # Портретные фото
    │   ├── projects/        # Постеры проектов
    │   └── awards/          # Логотипы наград
    └── videos/              # Видео файлы (опционально)
```

## Инструкция по заполнению данных

### 1. Сбор данных с Instagram

Соберите следующую информацию с профиля `@veli_eva`:

#### Базовая информация:
- Имя и фамилия
- Описание профиля (bio)
- Аватар профиля
- Количество подписчиков
- Ссылки на другие соцсети

#### Контент:
- **Фотографии:**
  - Портретные фото (сохраните в `public/images/profile/`)
  - Фото со съемок
  - Кадры из фильмов
  - Награды/награждения
  - За кулисами

- **Видео:**
  - Трейлеры фильмов (YouTube/Vimeo ссылки)
  - За кулисами съемок
  - Интервью
  - Короткие видео о процессе работы

- **Проекты:**
  - Название проекта
  - Год выпуска
  - Роль (режиссер/сценарист)
  - Описание
  - Постер/обложка
  - Награды и номинации
  - Ссылки на просмотр

### 2. Заполнение `portfolio-data.ts`

Откройте файл `frontend/data/portfolio-data.ts` и заполните данные:

```typescript
export const portfolioData: PortfolioData = {
  personal: {
    name: 'Veli Eva', // Замените на реальное имя
    fullName: 'Полное имя',
    profession: ['Сценарист', 'Режиссер'],
    bio: 'Описание...',
    education: ['Образование 1', 'Образование 2'],
    philosophy: 'Философия творчества...',
    interests: ['Интерес 1', 'Интерес 2'],
    profileImage: '/images/profile/profile-main.jpg', // Путь к фото
    profileImages: [
      '/images/profile/profile-1.jpg',
      '/images/profile/profile-2.jpg',
    ],
    instagramUrl: 'https://www.instagram.com/veli_eva',
    followers: 0, // Количество подписчиков
  },
  projects: [
    {
      id: 'project-1',
      title: 'Название проекта',
      year: 2024,
      role: 'both', // 'director' | 'screenwriter' | 'both'
      description: 'Краткое описание',
      fullDescription: 'Подробное описание',
      posterImage: '/images/projects/project-1.jpg',
      images: ['/images/projects/project-1-1.jpg'],
      videoUrl: 'https://youtube.com/embed/...', // YouTube/Vimeo embed URL
      videoType: 'youtube', // 'youtube' | 'vimeo' | 'instagram' | 'local'
      awards: ['Награда 1'],
      nominations: ['Номинация 1'],
      genre: 'Драма',
      duration: '90 мин',
    },
    // Добавьте больше проектов...
  ],
  awards: [
    {
      id: 'award-1',
      title: 'Название награды',
      festival: 'Название фестиваля',
      year: 2024,
      category: 'Категория',
      projectId: 'project-1', // ID связанного проекта (опционально)
      logo: '/images/awards/festival-logo.jpg', // Логотип фестиваля (опционально)
      description: 'Описание награды',
    },
    // Добавьте больше наград...
  ],
  testimonials: [
    {
      id: 'testimonial-1',
      quote: 'Цитата отзыва...',
      author: 'Имя Фамилия',
      role: 'Роль',
      publication: 'Издание',
      logo: '/images/testimonials/publication-logo.jpg', // Опционально
    },
    // Добавьте больше отзывов...
  ],
  contact: {
    email: 'contact@example.com', // Замените на реальный email
    instagram: 'https://www.instagram.com/veli_eva',
    phone: '+7 (XXX) XXX-XX-XX', // Опционально
    otherSocials: [
      {
        platform: 'VK',
        url: 'https://vk.com/...',
      },
    ],
  },
};
```

### 3. Добавление изображений

1. Сохраните портретные фото в `public/images/profile/`
2. Сохраните постеры проектов в `public/images/projects/`
3. Сохраните логотипы наград в `public/images/awards/`
4. Обновите пути в `portfolio-data.ts`

### 4. Добавление видео

Для YouTube:
- Используйте формат: `https://www.youtube.com/embed/VIDEO_ID`
- Или просто `VIDEO_ID` (компонент автоматически преобразует)

Для Vimeo:
- Используйте формат: `https://player.vimeo.com/video/VIDEO_ID`
- Или просто `VIDEO_ID`

### 5. Запуск проекта

```bash
cd frontend
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000)

## Особенности

- ✅ Полностью типизированный TypeScript
- ✅ Адаптивный дизайн (мобильные устройства)
- ✅ Оптимизация изображений (Next.js Image)
- ✅ SEO оптимизация (мета-теги, Open Graph)
- ✅ Темная тема (Porsche Black Edition стиль)
- ✅ Плавные анимации и переходы
- ✅ Модальные окна для проектов
- ✅ Встроенные видео плееры

## Следующие шаги

1. Соберите все данные с Instagram профиля
2. Заполните `portfolio-data.ts` реальными данными
3. Добавьте изображения в соответствующие папки
4. Обновите контактную информацию
5. Протестируйте на разных устройствах
6. Настройте деплой (Vercel, Netlify и т.д.)

## Интеграция с Backend (опционально)

Для работы формы обратной связи можно интегрировать с backend API:

1. Создайте endpoint для отправки формы
2. Обновите `Contact.tsx` для отправки данных на API
3. Добавьте валидацию на сервере
