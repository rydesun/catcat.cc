type DarkTrigger = (isDark: boolean) => void;

export class DetectDark {
  private matchMedia: MediaQueryList;
  constructor() {
    this.matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
  }
  isDark(): boolean {
    return this.matchMedia.matches;
  }
  trigger(cb: DarkTrigger) {
    this.matchMedia.addListener((e) => {
      let isDark = e.matches;
      cb(isDark);
    });
  }
}

const detectDark = new DetectDark();

export {detectDark};
