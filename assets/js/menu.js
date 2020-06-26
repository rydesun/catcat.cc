function toggleExpand() {
  let book = document.getElementById("book");
  if (book.classList.contains('toc-expanded')) {
    book.classList.remove('toc-expanded');
  } else {
    book.classList.add('toc-expanded');
  }
}

function toggleSide() {
let book = document.getElementById("book");
  if (book.classList.contains('left-side')) {
    book.classList.remove('left-side');
  } else {
    book.classList.add('left-side');
  }
}

function toggleFixTop() {
  let menu = document.getElementById("menu");
  if (menu.classList.contains('fix-top')) {
    menu.classList.remove('fix-top');
  } else {
    menu.classList.add('fix-top');
  }
}

function scrollToTop() {
  window.scrollTo(0, 0);
}

var scrollToTopTimeout;

function showScrollToTop() {
  let button = document.getElementById("scroll");
  button.classList.add('scrolling');
  if (scrollToTopTimeout) {
    clearTimeout(scrollToTopTimeout);
  }
  scrollToTopTimeout = setTimeout(function() {
    button.classList.remove('scrolling');
  }, 2000);
}

var positionY = 0;
var ticking = false;
window.addEventListener('scroll', function(e) {
  let offsetY = window.scrollY - positionY;
  positionY = window.scrollY;
  if (window. innerWidth > 900) {
    return;
  }
  if (offsetY > -100) {
    return;
  }
  if (!ticking) {
    window.requestAnimationFrame(function() {
      showScrollToTop();
      ticking = false;
    });
  }
  ticking = true;
});
