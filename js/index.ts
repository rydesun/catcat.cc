import { colorSchemeManager, ColorSchemeManager } from './colorschemeSwitcher';
import { detectDark, DetectDark } from './lib';

function switchColorscheme() {
    const current_theme = colorSchemeManager.getCurrent();
    const next_theme = colorSchemeManager.getNext(current_theme);
    if (colorSchemeManager.symCheck(next_theme)) {
        colorSchemeManager.cleanStore();
        colorSchemeManager.cleanHTML();
    } else {
        colorSchemeManager.setStore(next_theme);
        colorSchemeManager.setHTML(next_theme);
    }
    colorSchemeManager.display(next_theme);
}

function main() {
    const current_theme = colorSchemeManager.getCurrent();
    if (colorSchemeManager.symCheck(current_theme)) {
        colorSchemeManager.cleanStore();
    } else {
        colorSchemeManager.setHTML(current_theme);
    }
    colorSchemeManager.display(current_theme);
}

main();

declare global {
    interface Window {
        switchColorscheme: () => void;
        colorSchemeManager: ColorSchemeManager;
        detectDark: DetectDark;
    }
}

window.switchColorscheme = switchColorscheme;
window.colorSchemeManager = colorSchemeManager;
window.detectDark = detectDark;
