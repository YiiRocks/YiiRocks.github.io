hljs.highlightAll();
for (var links=document.links, i=0, a; a=links[i]; i++) {
    if (a.host !== location.host) {
        a.target = '_blank';
    }
}
document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-clipboard]');
    if (!el) return;
    var text = el.getAttribute('data-clipboard');
    var orig = el.textContent;
    navigator.clipboard.writeText(text).then(function () {
        el.textContent = 'Copied!';
        setTimeout(function () { el.textContent = orig; }, 1500);
    });
});
document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var el = e.target.closest('[data-clipboard]');
    if (!el) return;
    e.preventDefault();
    el.click();
});
var themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', function () {
    var next = document.documentElement.dataset.bsTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.bsTheme = next;
    localStorage.theme = next;
});
var scrollTop = document.getElementById('scrollTop');
window.addEventListener('scroll', function () {
    scrollTop.classList.toggle('visible', window.scrollY > 300);
});
scrollTop.addEventListener('click', function () {
    history.replaceState(null, '', window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.feature-card, .docs-entry').forEach(function (el, i) {
        el.style.transitionDelay = (i % 4) * 60 + 'ms';
        observer.observe(el);
    });
}
var sidebarItems = document.querySelectorAll('.homepage-sidebar__item');
if (sidebarItems.length) {
    var entries = document.querySelectorAll('.docs-entry');
    var navObserver = new IntersectionObserver(function (observed) {
        observed.forEach(function (entry) {
            if (entry.isIntersecting) {
                var id = entry.target.getAttribute('id');
                sidebarItems.forEach(function (item) {
                    item.classList.toggle('active', item.getAttribute('href') === '#' + id);
                });
            }
        });
    }, { threshold: 0, rootMargin: '-20% 0px -70% 0px' });
    entries.forEach(function (el) { navObserver.observe(el); });
}
var docSidebarLinks = document.querySelectorAll('.doc-sidebar a');
if (docSidebarLinks.length) {
    var sections = document.querySelectorAll('[id^="section-"]');
    var sectionObserver = new IntersectionObserver(function (observed) {
        observed.forEach(function (entry) {
            var sectionId = entry.target.getAttribute('id');
            var linkHref = sectionId.replace('section-', '');
            docSidebarLinks.forEach(function (link) {
                var linkTarget = link.getAttribute('href');
                var isActive = linkTarget === '#' + sectionId ||
                              (linkTarget.endsWith('/' + linkHref + '/') || linkTarget.endsWith('#' + linkHref));
                link.classList.toggle('active', entry.isIntersecting && isActive);
            });
        });
    }, { threshold: 0.3, rootMargin: '0px 0px -70% 0px' });
    sections.forEach(function (el) { sectionObserver.observe(el); });
}
var toggleButtons = document.querySelectorAll('.docs-entry__toggle');
var currentlyOpen = null;
toggleButtons.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        var entry = btn.closest('.docs-entry');
        var details = entry.querySelector('.docs-entry__details');
        var isExpanded = btn.getAttribute('aria-expanded') === 'true';
        if (!isExpanded && currentlyOpen && currentlyOpen !== btn) {
            var prevEntry = currentlyOpen.closest('.docs-entry');
            var prevDetails = prevEntry.querySelector('.docs-entry__details');
            currentlyOpen.setAttribute('aria-expanded', 'false');
            prevDetails.hidden = true;
        }
        btn.setAttribute('aria-expanded', !isExpanded);
        details.hidden = isExpanded;
        currentlyOpen = isExpanded ? null : btn;
    });
});
