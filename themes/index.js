export const themesLoader = {
  orange: {
    getTheme: async () => {
      return (await import('./theme.orange')).default;
    },
  },
  orangeDark: {
    getTheme: async () => {
      return (await import('./theme.orange-dark')).default;
    },
  },
  default: {
    getTheme: async () => {
      return (await import('./theme.default')).default;
    },
  },
  dark: {
    getTheme: async () => {
      return (await import('./theme.dark')).default;
    },
  },
  pink: {
    getTheme: async () => {
      return (await import('./theme.pink')).default;
    },
  },
  purple: {
    getTheme: async () => {
      return (await import('./theme.purple')).default;
    },
  },
};
