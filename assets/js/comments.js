var detectDark = window.matchMedia('(prefers-color-scheme: dark)')

var remark_config = {
  host: "https://comments.srv.2cat.cc",
  site_id: '2cat.cc',
  components: ['embed'],
};

function loadRemark42() {
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

// FIXME: May work after remark42 loaded completely
if (detectDark.matches) {
  window.REMARK42.changeTheme('dark');
}

detectDark.addEventListener("change", function(e) {
  var theme = e.matches ? 'dark' : 'light';
  window.REMARK42.changeTheme(theme);
});
