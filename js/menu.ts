declare global {
    interface Window {
        toggleExpand: Function;
        scrollToTop: Function;
    }
}

window.toggleExpand = toggleExpand;
window.scrollToTop = scrollToTop;

export function toggleExpand() {
    const book = document.getElementById('book');
    if (book.classList.contains('toc-expanded')) {
        book.classList.remove('toc-expanded');
    } else {
        book.classList.add('toc-expanded');
    }
}

export function scrollToTop() {
    window.scrollTo(0, 0);
}

let scrollToTopTimeout: number;

function showScrollToTop() {
    const button = document.getElementById('scroll');
    button.classList.add('scrolling');
    if (scrollToTopTimeout) {
        clearTimeout(scrollToTopTimeout);
    }
    scrollToTopTimeout = setTimeout(function () {
        button.classList.remove('scrolling');
    }, 2000);
}

let positionY = 0;
let ticking = false;

window.addEventListener('scroll', function () {
    const offsetY = window.scrollY - positionY;
    positionY = window.scrollY;
    if (window.innerWidth > 900) {
        return;
    }
    if (offsetY > -100) {
        return;
    }
    if (!ticking) {
        window.requestAnimationFrame(function () {
            showScrollToTop();
            ticking = false;
        });
    }
    ticking = true;
});
