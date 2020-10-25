import { CommentsConfig } from 'remark42/config-types';
import { Theme } from 'remark42/types';

import { ColorSchemeManager } from './colorschemeSwitcher';
import { DetectDark } from './lib';

interface RemarkConfig extends CommentsConfig {
    components: [string];
}

declare global {
    interface Window {
        remark_config: RemarkConfig;
        REMARK42: {
            changeTheme?: (theme: Theme) => void;
        };
        colorSchemeManager: ColorSchemeManager;
        detectDark: DetectDark;
    }
}

const remark_config: RemarkConfig = {
    host: 'https://comments.srv.catcat.cc',
    url: 'https://2cat.cc' + window.location.pathname,
    site_id: '2cat.cc',
    components: ['embed'],
    theme: 'light',
    locale: 'zh',
};

window.remark_config = remark_config;

function loadRemark42() {
    // set theme by color scheme
    remark_config.theme = window.colorSchemeManager.getCompatibleCurrent();

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

let loaded = false;

function onceLoadRemark42() {
    if (loaded) {
        window.removeEventListener('load', onceLoadRemark42);
        commentObserver.disconnect();
        return;
    }
    loaded = true;
    loadRemark42();
}

window.addEventListener('load', onceLoadRemark42);

const commentObserver = new IntersectionObserver(
    (entries) => {
        if (entries[0].isIntersecting) {
            onceLoadRemark42();
        }
    },
    { threshold: [0] }
);

commentObserver.observe(document.getElementById('remark42'));

window.detectDark.trigger((isDark) => {
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
            } else if (userColorScheme === 'night') {
                window.REMARK42.changeTheme('dark');
            } else {
                if (window.detectDark.isDark()) {
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
