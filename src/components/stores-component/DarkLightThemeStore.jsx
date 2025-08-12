import { create } from "zustand";

const useDarkMode = create((set) => ({
  isDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
  selectedTheme: "system",

  setIsDarkMode: (preferredTheme) => {
    const root = document.documentElement;
    root.setAttribute("theme", preferredTheme);
    set({ selectedTheme: preferredTheme });
    if (preferredTheme === "system") {
      const themeChange = window.matchMedia("(prefers-color-scheme: dark)");
      const handleThemeChange = () => {
        set({
          isDarkMode: window.matchMedia("(prefers-color-scheme: dark)").matches,
        });
        themeChange.matches
          ? root.setAttribute("theme", "dark")
          : root.setAttribute("theme", "light");
      };

      themeChange.addEventListener("change", handleThemeChange);
      handleThemeChange();
      return () => themeChange.removeEventListener("change", handleThemeChange);
    } else if (preferredTheme === "dark") {
      set({
        isDarkMode: true,
      });
    } else if (preferredTheme === "light") {
      set({
        isDarkMode: false,
      });
    }
  },
}));

export default useDarkMode;
