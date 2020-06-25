class ColorSchemeManager {
  constructor(default_theme, dict_next_theme, html_mark, store, store_keyname, button_id) {
    this.default_theme = default_theme;
    this.dict_next_theme = dict_next_theme;
    this.store = store;
    this.store_keyname = store_keyname;
    this.html_mark = html_mark;
    this.button_id = button_id;
    detectDark.addListener((e) => {
      let isSystemDark = e.matches;
      if ((isSystemDark && (this.current_theme === 'dark'))
        || (!isSystemDark && (this.current_theme === 'light'))) {
        colorSchemeManager.cleanStore();
        colorSchemeManager.cleanHTML();
      }
      colorSchemeManager.display(isSystemDark && 'dark' || 'light');
    });
  }
  getCurrent() {
    let theme = this.store.getItem(this.store_keyname);
    this.current_theme = theme && theme || (detectDark.matches && 'dark' || this.default_theme);
    return this.current_theme;
  }
  getNext(theme) {
    return this.dict_next_theme[theme] || theme.default_theme;
  }

  setStore(theme) {
    this.store.setItem(this.store_keyname, theme);
    this.current_theme = theme;
  }
  cleanStore() {
    this.store.removeItem(this.store_keyname);
    this.current_theme = this.default_theme;
  }
  setHTML(theme) {
    document.documentElement.setAttribute(this.html_mark, theme);
  }
  cleanHTML() {
    document.documentElement.removeAttribute(this.html_mark);
  }
  checkDarkHTML() {
    let mark = document.documentElement.getAttribute(this.html_mark);
    return mark === 'dark';
  }
  symCheck(theme) {
    let isSystemDark = detectDark.matches;
    return (isSystemDark && theme === 'dark') || (!isSystemDark && theme === 'light')
  }

  display(theme) {
    var t = {'dark': 'Dark', 'light': 'Light'};
    document.getElementById(this.button_id).innerHTML = t[theme];
  }
}
  
colorSchemeManager = new ColorSchemeManager('light', {
  'light': 'dark',
  'dark': 'light',
}, 'data-user-color-scheme', localStorage, 'colorscheme', "colorscheme-switcher")

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
