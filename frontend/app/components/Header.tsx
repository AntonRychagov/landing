'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  name: string;
}

export default function Header({ name }: HeaderProps): JSX.Element {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();

  // Initialize scroll state on mount and handle page restore
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check initial scroll position
    const checkScroll = (): void => {
      setIsScrolled(window.scrollY > 50);
    };

    // Check immediately
    checkScroll();

    // Handle page restore (back/forward navigation)
    const handlePageShow = (): void => {
      checkScroll();
    };

    // Simple scroll handler with passive listener
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('pageshow', handlePageShow);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('pageshow', handlePageShow);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    // Check scroll position when route changes (e.g., page restore)
    if (typeof window !== 'undefined') {
      setIsScrolled(window.scrollY > 50);
    }
  }, [pathname]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navItems = useMemo(
    () => [
      { href: '/', label: 'Главная', id: 'home' },
      { href: '/about', label: 'О себе', id: 'about' },
      { href: '/#portfolio', label: 'Портфолио', id: 'portfolio' },
    ],
    []
  );

  const isActive = useCallback(
    (href: string): boolean => {
      if (href === '/') {
        return pathname === '/';
      }
      if (href.startsWith('/#')) {
        if (typeof window !== 'undefined') {
          return pathname === '/' && window.location.hash === href.replace('/', '');
        }
        return false;
      }
      return pathname.startsWith(href);
    },
    [pathname]
  );

  const toggleMobileMenu = useCallback((): void => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>): void => {
      if (e.target === e.currentTarget) {
        setIsMobileMenuOpen(false);
      }
    },
    []
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
          isScrolled
            ? 'bg-background-primary/95 backdrop-blur-sm border-b border-border-default shadow-lg'
            : 'bg-transparent'
        }`}
        role="banner"
      >
        <nav className="section-container py-4" style={{ paddingTop: 'max(env(safe-area-inset-top, 0px), 1rem)', paddingBottom: '1rem' }}>
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="text-display-3 font-bold text-text-primary hover:text-text-secondary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 rounded"
              aria-label="На главную"
            >
              {name}
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'text-text-primary'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <button
              onClick={toggleMobileMenu}
              className="md:hidden w-10 h-10 flex items-center justify-center text-text-primary hover:text-text-secondary transition-colors rounded focus-visible:outline-2 focus-visible:outline-offset-2"
              aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Мобильное меню"
        className={`md:hidden fixed inset-0 z-[70] transition-opacity duration-300 ease-out ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-background-primary/80 backdrop-blur-sm"
          onClick={handleBackdropClick}
          aria-hidden="true"
        />

        {/* Sidebar Panel */}
        <aside
          className={`absolute top-0 right-0 h-full w-[min(320px,85vw)] max-w-full bg-background-primary border-l border-border-default shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-border-default">
            <span className="text-display-3 font-bold text-text-primary">{name}</span>
            <button
              onClick={toggleMobileMenu}
              className="w-10 h-10 flex items-center justify-center text-text-secondary hover:text-text-primary hover:bg-background-accent rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary"
              aria-label="Закрыть меню"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Nav Links */}
          <nav
            className="flex-1 overflow-y-auto px-6 py-6"
            aria-label="Навигация"
          >
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={toggleMobileMenu}
                    className={`block py-3 px-4 text-base font-medium rounded-lg transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-primary ${
                      isActive(item.href)
                        ? 'text-text-primary bg-background-accent'
                        : 'text-text-secondary hover:text-text-primary hover:bg-background-accent/50'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>
    </>
  );
}
