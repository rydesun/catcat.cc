import { Theme } from 'remark42/types';

import { detectDark, DetectDark } from './lib';

export class ColorSchemeManager {
    private currentTheme: string;
    private detectDark: DetectDark;
    constructor(
        private defaultTheme: string,
        private themeOrder: { [k: string]: string },
        private domMark: string,
        private storage: Storage,
        private storageKey: string,
        private ButtonID: string
    ) {
        this.detectDark = detectDark;

        this.detectDark.trigger((isDark: boolean) => {
            if (
                (isDark && this.currentTheme === 'dark') ||
                (!isDark && this.currentTheme === 'light')
            ) {
                this.cleanStore();
                this.cleanHTML();
            }
            this.display(this.getCurrent());
        });
    }

    getCurrent(): string {
        const theme = this.storage.getItem(this.storageKey);
        this.currentTheme =
            theme || (this.detectDark.isDark() && 'dark') || this.defaultTheme;
        return this.currentTheme;
    }
    getCompatibleCurrent(): Theme {
        const current = this.getCurrent();
        return current === 'light' ? 'light' : 'dark';
    }
    getNext(theme: string): string {
        return this.themeOrder[theme] || this.defaultTheme;
    }

    setStore(theme: string): void {
        this.storage.setItem(this.storageKey, theme);
        this.currentTheme = theme;
    }
    cleanStore(): void {
        this.storage.removeItem(this.storageKey);
        this.currentTheme = this.defaultTheme;
    }
    setHTML(theme: string): void {
        document.documentElement.setAttribute(this.domMark, theme);
    }
    cleanHTML(): void {
        document.documentElement.removeAttribute(this.domMark);
    }
    checkLightHTML(): boolean {
        const mark = document.documentElement.getAttribute(this.domMark);
        return mark === 'light';
    }
    checkDarkHTML(): boolean {
        const mark = document.documentElement.getAttribute(this.domMark);
        return mark === 'dark';
    }
    symCheck(theme: string): boolean {
        const isDark = this.detectDark.isDark();
        return (isDark && theme === 'dark') || (!isDark && theme === 'light');
    }
    display(theme: string): void {
        const t: { [k: string]: string } = {
            light: '明亮',
            dark: '暗灰',
            night: '永夜',
        };
        document.getElementById(this.ButtonID).innerHTML = t[theme];
    }
}

const colorSchemeManager = new ColorSchemeManager(
    'light',
    {
        light: 'dark',
        dark: 'night',
        night: 'light',
    },
    'data-user-color-scheme',
    localStorage,
    'colorscheme',
    'colorscheme-switcher'
);

export { colorSchemeManager };
