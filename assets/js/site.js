(window.requestIdleCallback || function(f) { setTimeout(f, 0); })(function () { hljs.highlightAll(); });
document.addEventListener('click', function (e) {
    var link = e.target.closest('main a');
    if (link && link.host !== location.host) link.target = '_blank';
}, true);
document.addEventListener('click', function (e) {
    var el = e.target.closest('.copy-btn');
    if (!el) return;
    var orig = el.textContent;
    navigator.clipboard.writeText(orig).then(function () {
        el.textContent = 'Copied!';
        setTimeout(function () { el.textContent = orig; }, 1500);
    });
});
document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var el = e.target.closest('.copy-btn');
    if (el) { e.preventDefault(); el.click(); }
});
document.getElementById('themeToggle').addEventListener('click', function () {
    var theme = document.documentElement.dataset.bsTheme = document.documentElement.dataset.bsTheme === 'dark' ? 'light' : 'dark';
    localStorage.theme = theme;
});
var scrollTop = document.getElementById('scrollTop'), docSidebar = document.querySelector('.doc-sidebar');
var siteNav = document.querySelector('.site-nav'), navHeight = siteNav ? siteNav.offsetHeight : 60;
var onScroll = (function () {
    var lastRun = 0;
    return function () {
        var now = performance.now();
        if (now - lastRun < 60) return;
        lastRun = now;
        var scrollY = window.scrollY;
        scrollTop.classList.toggle('visible', scrollY > 300);
        if (docSidebar) {
            docSidebar.style.top = Math.max(navHeight, navHeight + 24 - scrollY) + 'px';
        }
        if (onScroll._updateDocSidebar) onScroll._updateDocSidebar();
    };
})();
scrollTop.addEventListener('click', function () {
    history.replaceState(null, '', window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
if ('IntersectionObserver' in window) {
    var animEls = document.querySelectorAll('.feature-card, .docs-entry');
    if (animEls.length) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
        animEls.forEach(function (el, i) {
            el.style.transitionDelay = (i % 4) * 60 + 'ms';
            io.observe(el);
        });
    }
}
var sidebarItems = document.querySelectorAll('.homepage-sidebar__item');
if (sidebarItems.length) {
    var sidebarMap = {}, activeItem = null;
    sidebarItems.forEach(function (item) { sidebarMap['#' + item.getAttribute('href').slice(1)] = item; });
    var navObs = new IntersectionObserver(function (observed) {
        observed.forEach(function (entry) {
            if (entry.isIntersecting) {
                var target = sidebarMap[entry.target.id];
                if (target && target !== activeItem) {
                    if (activeItem) activeItem.classList.remove('active');
                    target.classList.add('active');
                    activeItem = target;
                }
            }
        });
    }, { threshold: 0, rootMargin: '-20% 0px -70% 0px' });
    document.querySelectorAll('.docs-entry').forEach(function (el) { navObs.observe(el); });
}
var docSidebarLinks = document.querySelectorAll('.doc-sidebar a');
if (docSidebarLinks.length) {
    var sections = document.querySelectorAll('[id^="section-"]');
    var currentPath = window.location.pathname.replace(/\/$/, '');
    var linkMap = {}, activeDocLink = null;
    docSidebarLinks.forEach(function (link) {
        var href = link.getAttribute('href');
        linkMap[href] = link;
        if (href === currentPath || href === currentPath + '/') {
            link.classList.add('active');
            activeDocLink = link;
        }
    });
    if (sections.length) {
        onScroll._updateDocSidebar = function () {
            var closest = null, minDist = Infinity;
            sections.forEach(function (section) {
                var dist = Math.abs(section.getBoundingClientRect().top - navHeight);
                if (dist < minDist) { minDist = dist; closest = section; }
            });
            if (closest) {
                var target = linkMap['#' + closest.id];
                if (target && target !== activeDocLink) {
                    if (activeDocLink) activeDocLink.classList.remove('active');
                    target.classList.add('active');
                    activeDocLink = target;
                }
            }
        };
        onScroll._updateDocSidebar();
    }
}
window.addEventListener('scroll', onScroll, { passive: true });
var currentlyOpen = null;
document.addEventListener('click', function (e) {
    var btn = e.target.closest('.docs-entry__toggle');
    if (!btn) return;
    e.preventDefault();
    var entry = btn.closest('.docs-entry'), details = entry.querySelector('.docs-entry__details');
    var isExpanded = btn.getAttribute('aria-expanded') === 'true';
    if (!isExpanded && currentlyOpen && currentlyOpen !== btn) {
        currentlyOpen.setAttribute('aria-expanded', 'false');
        currentlyOpen.closest('.docs-entry').querySelector('.docs-entry__details').hidden = true;
    }
    btn.setAttribute('aria-expanded', !isExpanded);
    details.hidden = isExpanded;
    currentlyOpen = isExpanded ? null : btn;
});
