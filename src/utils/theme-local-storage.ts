type ThemeLocalStorage = {
  isDark: boolean,
  setIsDark: (isDark: boolean) => void
};

export function themeLocalStorage(): ThemeLocalStorage {
  return {
    get isDark() {
      return localStorage && localStorage.getItem('visualgos_is_dark') !== "false"; // localStorage only works with strings
    },
    setIsDark(isDark: boolean) {
      localStorage && localStorage.setItem('visualgos_is_dark', `${isDark}`);
    }
  }
}
