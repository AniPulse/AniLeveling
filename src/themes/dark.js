export const soloLevelingTheme = {
  colors: {
    primary: {
      50: '#f3f1ff',
      100: '#ebe5ff',
      200: '#d9ceff',
      300: '#bea6ff',
      400: '#9f75ff',
      500: '#843dff',
      600: '#7c3aed',
      700: '#6d28d9',
      800: '#5b21b6',
      900: '#4c1d95',
    },
    dark: {
      900: '#0a0a0a',
      800: '#1a1a1a',
      700: '#2a2a2a',
      600: '#3a3a3a',
      500: '#4a4a4a',
    },
    accent: {
      purple: '#7c3aed',
      blue: '#3b82f6',
      green: '#10b981',
      red: '#ef4444',
      yellow: '#f59e0b',
    }
  },
  gradients: {
    primary: 'from-black via-gray-900 to-black',
    card: 'from-gray-900 via-gray-800 to-gray-900',
    purple: 'from-purple-600 to-purple-800',
    accent: 'from-purple-500 via-blue-500 to-purple-600',
  },
  shadows: {
    glow: 'shadow-2xl shadow-purple-500/25',
    glowHover: 'shadow-2xl shadow-purple-500/50',
    card: 'shadow-xl shadow-black/50',
  },
  animations: {
    fadeIn: 'animate-fade-in',
    slideUp: 'animate-slide-up',
    pulse: 'animate-pulse',
    bounce: 'animate-bounce',
  }
};
