import {colorSchemeManager} from './colorschemeSwitcher';

function switchColorscheme() {
  let current_theme = colorSchemeManager.getCurrent();
  let next_theme = colorSchemeManager.getNext(current_theme);
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
  let current_theme = colorSchemeManager.getCurrent();
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
        switchColorscheme: Function;
    }
}

window.switchColorscheme = switchColorscheme;
