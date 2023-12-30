class BrowserTheme {
  private mediaQueryList: MediaQueryList;
  constructor() {
    this.mediaQueryList = matchMedia("(prefers-color-scheme: dark)");
  }

  trigger(cb: (isDark: boolean) => void): void {
    this.mediaQueryList.addEventListener("change", () => {
      cb(this.isDark());
    });
  }

  isDark(): boolean {
    return this.mediaQueryList.matches;
  }

  hasDarkReader(): boolean {
    return document.documentElement.hasAttribute("data-darkreader-mode");
  }
}

type ThemeChangingCallback = (theme: string, isDark: boolean) => void;

export class ThemeManager {
  private themeChangingCallbacks: ThemeChangingCallback[] = [];
  private browserTheme = new BrowserTheme();
  constructor(
    private lightThemes: string[],
    private darkThemes: string[],
    private domMarkBase: string,
    private domMarkVariant: string,
    private storage: Storage,
    private storageBase: string,
    private storageVariant: string,
  ) {
    // 重新加载页面后还原上次的用户设置
    const themeOpts = this.getForceThemeOpts();
    if (themeOpts !== null) {
      const { isDark, index } = themeOpts;
      this.setDomMarkBase(isDark);
      const theme = this.getThemeNameByIndex(index);
      this.setDomMarkVariant(theme);
    }

    // 监听浏览器偏好的变化
    this.browserTheme.trigger((browserIsDark: boolean) => {
      let forceTheme = this.getForceThemeOpts();
      // 当浏览器正在切换的主题与强制设置的主题的亮暗风格不同时，
      // 清除强制设置的值，重新让主题与浏览器保持同步
      if (forceTheme && browserIsDark !== forceTheme.isDark) {
        this.undoForceTheme();
      }

      forceTheme = this.getForceThemeOpts();
      if (forceTheme === null) {
        this.dispatch(browserIsDark ? "dark" : "light", browserIsDark);
      }
    });
  }

  setNextTheme(): void {
    if (this.browserTheme.hasDarkReader()) {
      console.info("检测到Dark Reader，禁用主题切换");
      return;
    }

    const themeOpts = this.getForceThemeOpts();
    let fromIndex: number;
    if (themeOpts === null) {
      // 如果浏览器主题是暗色，则序号从暗色用户主题开始，再切换到下一个
      fromIndex = this.browserTheme.isDark() ? this.lightThemes.length : 0;
    } else {
      fromIndex = themeOpts.index;
    }
    const { changeToDark, index: nextIndex } = this.getNextThemeOpts(fromIndex);

    // 当强制设置的主题与浏览器默认主题变得相同时，需要之后两者保持同步。
    // 也就是之后如果浏览器再次切换主题时，网站需要跟随浏览器的设置。
    // 所以先需要清除强制设置的值
    const browserIsDark = this.browserTheme.isDark();
    if (
      (changeToDark &&
        browserIsDark &&
        nextIndex === this.lightThemes.length) ||
      (!changeToDark && !browserIsDark && nextIndex === 0)
    ) {
      this.undoForceTheme();
    } else {
      this.forceTheme(changeToDark, nextIndex);
    }
    this.dispatch(this.getCurrentTheme(), this.checkCurrentThemeIsDark());
  }

  // 检查用户设置的值和浏览器偏好
  getCurrentTheme(): string {
    const themeOpts = this.getForceThemeOpts();
    if (themeOpts === null) {
      return this.browserTheme.isDark()
        ? this.darkThemes[0]
        : this.lightThemes[0];
    }
    return this.getThemeNameByIndex(themeOpts.index);
  }

  checkCurrentThemeIsDark(): boolean {
    const themeOpts = this.getForceThemeOpts();
    if (themeOpts === null) {
      return this.browserTheme.isDark();
    } else {
      return themeOpts.isDark;
    }
  }

  addThemeChangingCallback(cb: ThemeChangingCallback): void {
    this.themeChangingCallbacks.push(cb);
  }

  private getThemeNameByIndex(index: number): string {
    if (index >= this.lightThemes.length) {
      return this.darkThemes[index - this.lightThemes.length];
    } else {
      return this.lightThemes[index];
    }
  }

  private dispatch(theme: string, isDark: boolean): void {
    this.themeChangingCallbacks.forEach((cb) => {
      cb(theme, isDark);
    });
  }

  private getNextThemeOpts(index: number): {
    changeToDark: boolean;
    index: number;
  } {
    const maxIndex = this.lightThemes.length + this.darkThemes.length - 1;
    index += 1;
    let changeToDark: boolean;
    if (index > maxIndex) {
      index = 0;
      changeToDark = false;
    } else if (index >= this.lightThemes.length) {
      changeToDark = true;
    } else {
      changeToDark = false;
    }
    return { changeToDark, index };
  }

  private getForceThemeOpts(): { isDark: boolean; index: number } | null {
    const base: string | null = this.storage.getItem(this.storageBase);
    if (base === null) {
      return null;
    }
    const isDark = base === "dark";

    const index: string | null = this.storage.getItem(this.storageVariant);
    if (index === null) {
      return null;
    }

    return { isDark, index: parseInt(index) };
  }

  private forceTheme(isDark: boolean, themeIndex: number): void {
    this.storage.setItem(this.storageBase, isDark ? "dark" : "light");
    this.storage.setItem(this.storageVariant, themeIndex.toString());
    this.setDomMarkBase(isDark);
    this.setDomMarkVariant(this.getCurrentTheme());
  }

  private undoForceTheme(): void {
    this.storage.removeItem(this.storageBase);
    this.storage.removeItem(this.storageVariant);
    this.unsetDomMark();
  }

  private setDomMarkBase(isDark: boolean): void {
    const val = isDark ? "dark" : "light";
    document.documentElement.setAttribute(this.domMarkBase, val);
  }

  private setDomMarkVariant(theme: string): void {
    document.documentElement.setAttribute(this.domMarkVariant, theme);
  }

  private unsetDomMark(): void {
    document.documentElement.removeAttribute(this.domMarkBase);
    document.documentElement.removeAttribute(this.domMarkVariant);
  }
}
