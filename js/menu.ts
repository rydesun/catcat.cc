declare global {
    interface Window {
        toggleExpand: () => void;
        scrollToTop: () => void;
    }
}

window.toggleExpand = toggleExpand;
window.scrollToTop = scrollToTop;

export function toggleExpand(): void {
    const book = document.getElementById('book');
    if (book.classList.contains('toc-expanded')) {
        book.classList.remove('toc-expanded');
        window.removeEventListener('scroll', activateToc);
    } else {
        activateToc();
        book.classList.add('toc-expanded');
        window.addEventListener('scroll', activateToc);
    }
}

export function scrollToTop(): void {
    window.scrollTo(0, 0);
}

let scrollToTopTimeout: NodeJS.Timeout;

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

const titles: NodeListOf<HTMLElement> = document.querySelectorAll(
    'h1, h2, h3, h4, h5, h6'
);
const toclist = document.getElementById('TableOfContents');
let currentTitleNode: HTMLLinkElement;
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

export function activateToc(): void {
    let currentTitle;
    for (const t of titles) {
        if (t.offsetTop - window.scrollY < 200) {
            currentTitle = t.id;
        }
    }
    if (!currentTitle) {
        currentTitle = titles[0].id;
    }
    const href = '#' + currentTitle;
    if (currentTitleNode && currentTitleNode.href !== href) {
        currentTitleNode.classList.remove('active');
    }
    currentTitleNode = toclist.querySelector('a[href="' + href + '"]');
    currentTitleNode?.classList.add('active');
}
