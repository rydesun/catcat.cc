function switchColorscheme() {
  var theme = localStorage.getItem('colorscheme');
  var next = {
    'dark': 'darker',
    'darker': 'light',
    'light': 'dark',
    'auto': 'dark',
  }
  next_theme = next[theme] || next.auto
  setColorscheme(next_theme)
}

function setColorscheme(theme) {
  document.getElementById("colorscheme-swither").innerHTML = theme;
  localStorage.setItem('colorscheme', theme);
}
