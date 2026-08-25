function copyToClipboard(el) {
    var orig = el.textContent;
    navigator.clipboard.writeText(orig).then(function () {
        el.textContent = 'Copied!';
        setTimeout(function () { el.textContent = orig; }, 1500);
    });
}

var currentlyOpen = null;
function toggleDetails(btn) {
    var details = document.getElementById(btn.getAttribute('aria-controls'));
    if (!details) return;
    var isExpanded = btn.getAttribute('aria-expanded') === 'true';
    if (!isExpanded && currentlyOpen && currentlyOpen !== btn) {
        currentlyOpen.setAttribute('aria-expanded', 'false');
        var openDetails = document.getElementById(currentlyOpen.getAttribute('aria-controls'));
        if (openDetails) openDetails.hidden = true;
    }
    btn.setAttribute('aria-expanded', !isExpanded);
    details.hidden = isExpanded;
    currentlyOpen = isExpanded ? null : btn;
}

document.querySelectorAll('main a').forEach(function (link) {
    if (link.host !== location.host) link.target = '_blank';
});

document.addEventListener('click', function (e) {
    var copyEl = e.target.closest('[data-clipboard]');
    if (copyEl) { copyToClipboard(copyEl); return; }

    var toggleBtn = e.target.closest('[aria-controls]');
    if (toggleBtn) { e.preventDefault(); toggleDetails(toggleBtn); }
}, true);

document.getElementById('themeToggle').addEventListener('click', function () {
    var theme = document.documentElement.dataset.bsTheme = document.documentElement.dataset.bsTheme === 'dark' ? 'light' : 'dark';
    localStorage.theme = theme;
});

var scrollTop = document.getElementById('scrollTop');
var scrollTicking = false;
function onScroll() {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(function () {
        scrollTop.classList.toggle('visible', window.scrollY > 300);
        scrollTicking = false;
    });
}
scrollTop.addEventListener('click', function () {
    history.replaceState(null, '', window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', onScroll, { passive: true });

document.querySelectorAll('[aria-controls][aria-expanded="false"]').forEach(function (btn) {
    var details = document.getElementById(btn.getAttribute('aria-controls'));
    if (details) details.hidden = true;
});
