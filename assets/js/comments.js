var remark_config = {
  host: "https://comments.srv.2cat.cc",
  site_id: '2cat.cc',
  components: ['embed'],
};
(function(c) {
  for(var i = 0; i < c.length; i++){
    var d = document, s = d.createElement('script');
    s.src = remark_config.host + '/web/' +c[i] +'.js';
    s.defer = true;
    (d.head || d.body).appendChild(s);
  }
})(remark_config.components || ['embed']);
var remarkTheme ="";
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function(e) {
  if (e.matches) {
    remarkTheme = "dark"
    window.REMARK42.changeTheme('dark')
  } else {
    remarkTheme = "light"
    window.REMARK42.changeTheme('light')
  }
});
