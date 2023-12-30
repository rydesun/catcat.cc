import { ThemeManager } from "../core/themeManager";

declare let themeManager: ThemeManager;

type Theme = "light" | "dark";

declare let remark_config: {
  theme?: Theme;
};

declare let REMARK42: {
  changeTheme: (theme: Theme) => void;
};

export function themeAutoChange() {
  if (themeManager.checkCurrentThemeIsDark()) {
    remark_config.theme = "dark";
  }

  themeManager.addThemeChangingCallback((_, isDark) => {
    const theme = isDark ? "dark" : "light";
    remark_config.theme = theme;
    REMARK42.changeTheme(theme);
  });
}
