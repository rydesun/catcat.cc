var detectDark = window.matchMedia('(prefers-color-scheme: dark)')

var remark_config = {
  host: "https://comments.srv.2cat.cc",
  site_id: '2cat.cc',
  components: ['embed'],
};

function loadRemark42() {
  // set theme by color scheme
  if (detectDark.matches) {
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
}, 1);

detectDark.addEventListener("change", function(e) {
  var theme = e.matches ? 'dark' : 'light';
  window.REMARK42.changeTheme(theme);
});
