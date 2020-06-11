var commmentLoaded = false

var remark_config = {
  host: "https://comments.srv.2cat.cc",
  site_id: '2cat.cc',
  components: ['embed'],
};

function loadRemark42() {
  commmentLoaded = true
  // set theme by color scheme
  if (colorSchemeManager.checkDarkHTML() || (detectDark.matches)) {
    remark_config.theme = 'dark';
  } else {
    remark_config.theme = 'light';
  }

  var d = document, s = d.createElement('script');
  s.src = `${remark_config.host}/web/embed.js`;
  s.defer = true;
  s.onload = () => {
    var hint = d.querySelector('#remark42 #load-hint');
    hint.remove();
  }
  (d.head || d.body).appendChild(s);
}

setTimeout(() => {
  var commentObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      loadRemark42();
      commentObserver.disconnect();
    }
  }, { threshold: [0] });
  commentObserver.observe(document.getElementById('remark42'));
  setTimeout(() => {
    if (!commmentLoaded) {
      loadRemark42();
      commentObserver.disconnect();
    }
  }, 500);
}, 1);

detectDark.addListener((e) => {
  var theme = e.matches ? 'dark' : 'light';
  window.REMARK42.changeTheme(theme);
});

var htmlObserver = new MutationObserver((mutations) => {
  for(let mutation of mutations) {
    if (mutation.type == "attributes") {
      let userColorScheme = document.documentElement.getAttribute('data-user-color-scheme')
      if (userColorScheme === 'light') {
        window.REMARK42.changeTheme('light');
      } else if (userColorScheme === 'dark') {
        window.REMARK42.changeTheme('dark');
      } else {
        if (detectDark.matches) {
          window.REMARK42.changeTheme('dark');
        } else {
          window.REMARK42.changeTheme('light');
        }
      }
    }
  }
})
htmlObserver.observe(document.documentElement, {
  attributes: true
})
