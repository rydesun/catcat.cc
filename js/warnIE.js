function checkIsIE() {
    var ua = window.navigator.userAgent;
    return ua.indexOf('MSIE ') > 0 || ua.indexOf('Trident') > 0;
}

if (checkIsIE()) {
    var box = document.createElement('div');
    box.setAttribute('class', 'warn');
    box.innerHTML = [
        '<p>呃呃呃……网页似乎出问题了。</p>',
        '<p>正在使用IE浏览器？IE是网页的噩梦，是混乱的祸根。</p>',
        '<p>提升浏览体验，推荐使用 <a href="https://www.mozilla.org/zh-CN/firefox/new/" rel="noopener nofollow noreferrer" style="color: pink">Firefox浏览器</a> 或者',
        '<a href="https://www.google.cn/intl/zh-CN/chrome/" rel="noopener nofollow noreferrer" style="color: pink">Chrome浏览器</a></p>',
    ].join('\n');
    var body = document.getElementsByTagName('body')[0];
    var content = document.getElementsByClassName('base-body')[0];
    body.insertBefore(box, content);
}
