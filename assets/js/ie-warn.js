function checkIsIE() {
  var ua = window.navigator.userAgent;
  return ua.indexOf("MSIE ") > 0 || ua.indexOf("Trident") > 0;
}

if (checkIsIE()) {
  var box = document.createElement('div');
  box.setAttribute('class', 'warn')
  box.innerHTML = [
  '<p>正在使用IE浏览器？IE是网页的噩梦，是混乱的祸根。</p>',
  '<p>提升网页体验，推荐立刻换用 <a href="https://www.mozilla.org/zh-CN/firefox/new/" rel="noopener nofollow noreferrer">Firefox浏览器</a> 或者',
  '<a href="https://www.google.com/intl/zh-CN/chrome/" rel="noopener nofollow noreferrer">Chrome浏览器</a></p>',
  ].join('\n');
  body = document.getElementsByTagName('body')[0]
  content = document.getElementsByClassName('base-body')[0]
  body.insertBefore(box, content)
}
