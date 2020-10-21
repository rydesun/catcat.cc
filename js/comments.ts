import { colorSchemeManager } from './colorschemeSwitcher';
import { detectDark } from './lib';

declare global {
    interface Window {
        remark_config: any;
        REMARK42: any;
    }
}

const remark_config = {
    host: 'https://comments.srv.catcat.cc',
    url: 'https://2cat.cc' + window.location.pathname,
    site_id: '2cat.cc',
    components: ['embed'],
    theme: '',
};

window.remark_config = remark_config;

function loadRemark42() {
    // set theme by color scheme
    remark_config.theme = colorSchemeManager.getCurrent();

    const d = document,
        s = d.createElement('script');
    s.src = `${remark_config.host}/web/embed.js`;
    s.defer = true;
    s.onload = () => {
        const hint = d.querySelector('#remark42 #load-hint');
        hint.remove();
    };
    (d.head || d.body).appendChild(s);
}

setTimeout(() => {
    const commentObserver = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
                loadRemark42();
                commentObserver.disconnect();
            }
        },
        { threshold: [0] }
    );
    commentObserver.observe(document.getElementById('remark42'));
}, 1);

detectDark.trigger((isDark) => {
    const theme = isDark ? 'dark' : 'light';
    window.REMARK42.changeTheme(theme);
});

const htmlObserver = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        if (mutation.type === 'attributes') {
            const userColorScheme = document.documentElement.getAttribute(
                'data-user-color-scheme'
            );
            if (userColorScheme === 'light') {
                window.REMARK42.changeTheme('light');
            } else if (userColorScheme === 'dark') {
                window.REMARK42.changeTheme('dark');
            } else {
                if (detectDark.isDark()) {
                    window.REMARK42.changeTheme('dark');
                } else {
                    window.REMARK42.changeTheme('light');
                }
            }
        }
    }
});
htmlObserver.observe(document.documentElement, {
    attributes: true,
});
