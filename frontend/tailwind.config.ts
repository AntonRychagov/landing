import type { Config } from 'tailwindcss';
import { designTokens } from './design-tokens';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Typography from Porsche Black Edition design
      fontFamily: {
        primary: designTokens.typography.fontFamily.primary.split(',').map(f => f.trim()),
        secondary: designTokens.typography.fontFamily.secondary?.split(',').map(f => f.trim()) || [],
      },
      fontSize: {
        'display-1': designTokens.typography.fontSize.h1,
        'display-2': designTokens.typography.fontSize.h2,
        'display-3': designTokens.typography.fontSize.h3,
      },
      fontWeight: {
        light: String(designTokens.typography.fontWeight.light),
        regular: String(designTokens.typography.fontWeight.regular),
        medium: String(designTokens.typography.fontWeight.medium),
        semibold: String(designTokens.typography.fontWeight.semibold),
        bold: String(designTokens.typography.fontWeight.bold),
      },
      lineHeight: {
        ...designTokens.typography.lineHeight,
      },
      letterSpacing: {
        ...designTokens.typography.letterSpacing,
      },
      // Colors from Porsche Black Edition theme
      colors: {
        primary: {
          DEFAULT: designTokens.colors.primary.main,
          light: designTokens.colors.primary.light || designTokens.colors.primary.main,
          dark: designTokens.colors.primary.dark || designTokens.colors.primary.main,
          contrast: designTokens.colors.primary.contrast || '#ffffff',
        },
        text: {
          primary: designTokens.colors.text.primary,
          secondary: designTokens.colors.text.secondary,
          muted: designTokens.colors.text.muted,
          inverse: designTokens.colors.text.inverse || '#000000',
        },
        background: {
          primary: designTokens.colors.background.primary,
          secondary: designTokens.colors.background.secondary,
          accent: designTokens.colors.background.accent || designTokens.colors.background.secondary,
          overlay: designTokens.colors.background.overlay || 'rgba(0, 0, 0, 0.8)',
        },
        border: {
          DEFAULT: designTokens.colors.border.default,
          light: designTokens.colors.border.light,
          dark: designTokens.colors.border.dark,
        },
      },
      // Spacing from Porsche design system
      spacing: {
        ...designTokens.spacing,
      },
      // Border radius (rounded corners)
      borderRadius: {
        sm: designTokens.borders.radius.sm,
        md: designTokens.borders.radius.md,
        lg: designTokens.borders.radius.lg,
        xl: designTokens.borders.radius.xl || designTokens.borders.radius.lg,
        full: designTokens.borders.radius.full,
      },
      // Shadows for depth
      boxShadow: {
        sm: designTokens.shadows.sm,
        md: designTokens.shadows.md,
        lg: designTokens.shadows.lg,
        xl: designTokens.shadows.xl,
        inner: designTokens.shadows.inner || 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
};
export default config;
