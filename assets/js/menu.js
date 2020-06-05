function toggleExpand() {
  let list = document.getElementById("toc");
  if (list.classList.contains('expanded')) {
    list.classList.remove('expanded');
  } else {
    list.classList.add('expanded');
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
