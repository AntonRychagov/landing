/**
 * Design Tokens Configuration
 * 
 * This file stores design tokens extracted from design references.
 * Update this file when analyzing new design references to maintain consistency.
 * 
 * Last reference URL: https://cayenneblackedition.com/porsche-co/?ref=onepagelove
 * Design Reference: Porsche Cayenne Black Edition - Premium luxury automotive design
 * Style: Elegant, minimal, dark theme with sophisticated typography and generous spacing
 */

export interface TypographyTokens {
  fontFamily: {
    primary: string;
    secondary?: string;
    monospace?: string;
  };
  fontSize: {
    h1: string;
    h2: string;
    h3: string;
    h4: string;
    h5: string;
    h6: string;
    body: string;
    small: string;
    caption?: string;
  };
  fontWeight: {
    light: number;
    regular: number;
    medium: number;
    semibold: number;
    bold: number;
  };
  lineHeight: {
    tight: string;
    normal: string;
    relaxed: string;
  };
  letterSpacing: {
    tight: string;
    normal: string;
    wide: string;
  };
}

export interface ColorTokens {
  primary: {
    main: string;
    light?: string;
    dark?: string;
    contrast?: string;
  };
  secondary: {
    main: string;
    light?: string;
    dark?: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
    inverse?: string;
  };
  background: {
    primary: string;
    secondary: string;
    overlay?: string;
    accent?: string;
  };
  border: {
    default: string;
    light: string;
    dark: string;
  };
  status?: {
    success?: string;
    warning?: string;
    error?: string;
    info?: string;
  };
}

export interface SpacingTokens {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
  section: string; // Spacing between major sections
}

export interface BorderTokens {
  radius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  width: {
    thin: string;
    medium: string;
    thick: string;
  };
}

export interface ShadowTokens {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  inner?: string;
}

export interface DesignTokens {
  typography: TypographyTokens;
  colors: ColorTokens;
  spacing: SpacingTokens;
  borders: BorderTokens;
  shadows: ShadowTokens;
}

// Design tokens extracted from Porsche Cayenne Black Edition reference
// Style: Premium luxury automotive design - elegant, minimal, sophisticated
export const designTokens: DesignTokens = {
  typography: {
    fontFamily: {
      primary: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif', // Modern system fonts (Porsche uses custom fonts, fallback to system)
      secondary: 'Georgia, "Times New Roman", serif',
      monospace: '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, monospace',
    },
    fontSize: {
      h1: 'clamp(2.5rem, 5vw, 4rem)', // 40-64px - Large display headings for hero sections
      h2: 'clamp(2rem, 4vw, 3rem)', // 32-48px - Section headings
      h3: 'clamp(1.5rem, 3vw, 2.25rem)', // 24-36px - Subsection headings
      h4: 'clamp(1.25rem, 2.5vw, 1.75rem)', // 20-28px
      h5: 'clamp(1.125rem, 2vw, 1.5rem)', // 18-24px
      h6: 'clamp(1rem, 1.5vw, 1.25rem)', // 16-20px
      body: 'clamp(1rem, 1.2vw, 1.125rem)', // 16-18px - Body text
      small: '0.875rem', // 14px
      caption: '0.75rem', // 12px
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
    lineHeight: {
      tight: '1.2', // For large display headings
      normal: '1.5', // Standard body text
      relaxed: '1.75', // For readability in long paragraphs
    },
    letterSpacing: {
      tight: '-0.02em', // For large headings
      normal: '0',
      wide: '0.05em', // For uppercase text/accents
    },
  },
  colors: {
    primary: {
      main: '#000000', // Black - primary brand color for Black Edition
      light: '#1a1a1a', // Dark gray
      dark: '#000000', // Pure black
      contrast: '#ffffff', // White for contrast
    },
    secondary: {
      main: '#333333', // Dark gray secondary
      light: '#4a4a4a',
      dark: '#1a1a1a',
    },
    text: {
      primary: '#ffffff', // White text on dark background
      secondary: '#e5e5e5', // Light gray for secondary text
      muted: '#b3b3b3', // Muted gray
      inverse: '#000000', // Black text for light backgrounds
    },
    background: {
      primary: '#000000', // Black background - signature of Black Edition
      secondary: '#0a0a0a', // Very dark gray for sections
      overlay: 'rgba(0, 0, 0, 0.8)', // Dark overlay
      accent: '#1a1a1a', // Accent dark gray
    },
    border: {
      default: '#333333', // Subtle borders
      light: '#1a1a1a',
      dark: '#000000',
    },
    status: {
      success: '#28a745',
      warning: '#ffc107',
      error: '#dc3545',
      info: '#17a2b8',
    },
  },
  spacing: {
    xs: '0.5rem', // 8px
    sm: '1rem', // 16px
    md: '1.5rem', // 24px
    lg: '2rem', // 32px
    xl: '3rem', // 48px
    '2xl': '4rem', // 64px
    '3xl': '6rem', // 96px
    '4xl': '8rem', // 128px
    section: '6rem', // 96px - Generous spacing between major sections (premium feel)
  },
  borders: {
    radius: {
      sm: '0.375rem', // 6px - Small rounded corners
      md: '0.5rem', // 8px - Medium rounded corners
      lg: '1rem', // 16px - Large rounded corners
      xl: '1.5rem', // 24px - Extra large rounded corners
      full: '9999px', // For circular elements
    },
    width: {
      thin: '1px',
      medium: '2px',
      thick: '3px',
    },
  },
  shadows: {
    sm: '0 2px 4px rgba(0, 0, 0, 0.3)', // Subtle shadows for depth
    md: '0 4px 8px rgba(0, 0, 0, 0.4)',
    lg: '0 8px 16px rgba(0, 0, 0, 0.5)', // Deeper shadows for premium feel
    xl: '0 16px 32px rgba(0, 0, 0, 0.6)',
    inner: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)',
  },
};

// Export individual token categories for easier access
export const typography = designTokens.typography;
export const colors = designTokens.colors;
export const spacing = designTokens.spacing;
export const borders = designTokens.borders;
export const shadows = designTokens.shadows;

// Helper function to get CSS custom properties object
export function getDesignTokensCSS(): Record<string, string> {
  return {
    // Typography
    '--font-primary': designTokens.typography.fontFamily.primary,
    '--font-secondary': designTokens.typography.fontFamily.secondary || '',
    '--font-mono': designTokens.typography.fontFamily.monospace || '',
    
    // Font Sizes
    '--font-size-h1': designTokens.typography.fontSize.h1,
    '--font-size-h2': designTokens.typography.fontSize.h2,
    '--font-size-h3': designTokens.typography.fontSize.h3,
    '--font-size-body': designTokens.typography.fontSize.body,
    
    // Colors - Porsche Black Edition Theme
    '--color-primary': designTokens.colors.primary.main,
    '--color-primary-light': designTokens.colors.primary.light || '',
    '--color-primary-dark': designTokens.colors.primary.dark || '',
    '--color-text-primary': designTokens.colors.text.primary,
    '--color-text-secondary': designTokens.colors.text.secondary,
    '--color-text-muted': designTokens.colors.text.muted,
    '--color-background-primary': designTokens.colors.background.primary,
    '--color-background-secondary': designTokens.colors.background.secondary,
    '--color-background-accent': designTokens.colors.background.accent || '',
    
    // Spacing
    '--spacing-section': designTokens.spacing.section,
    '--spacing-xl': designTokens.spacing.xl,
    '--spacing-2xl': designTokens.spacing['2xl'],
    '--spacing-3xl': designTokens.spacing['3xl'],
    
    // Shadows
    '--shadow-md': designTokens.shadows.md,
    '--shadow-lg': designTokens.shadows.lg,
  };
}
