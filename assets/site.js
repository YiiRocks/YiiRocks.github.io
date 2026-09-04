function copyToClipboard(el) {
    var orig = el.dataset.clipboardOriginal || el.textContent;
    el.dataset.clipboardOriginal = orig;
    var version = (el.clipboardVersion || 0) + 1;
    el.clipboardVersion = version;
    clearTimeout(el.clipboardResetTimer);
    navigator.clipboard.writeText(orig).then(function () {
        if (el.clipboardVersion !== version) return;
        el.textContent = 'Copied!';
        el.clipboardResetTimer = setTimeout(function () { el.textContent = orig; }, 1500);
    });
}

function randomSecret() {
    var bytes = new Uint8Array(24);
    crypto.getRandomValues(bytes);
    var binary = Array.from(bytes, function (b) { return String.fromCharCode(b); }).join('');
    return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

document.querySelectorAll('[data-secret-value]').forEach(function (el) {
    el.textContent = randomSecret();
});

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
    details.classList.toggle('show', !isExpanded);
    currentlyOpen = isExpanded ? null : btn;
}

document.querySelectorAll('main a').forEach(function (link) {
    if (link.host !== location.host) link.target = '_blank';
});

document.addEventListener('click', function (e) {
    var copyEl = e.target.closest('[data-clipboard]');
    if (copyEl) { copyToClipboard(copyEl); return; }

    var renewBtn = e.target.closest('[data-secret-renew]');
    if (renewBtn) {
        var valueEl = renewBtn.previousElementSibling;
        if (valueEl) {
            valueEl.clipboardVersion = (valueEl.clipboardVersion || 0) + 1;
            clearTimeout(valueEl.clipboardResetTimer);
            valueEl.textContent = randomSecret();
            delete valueEl.dataset.clipboardOriginal;
        }
        return;
    }

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

function openTargetDetails() {
    if (!location.hash) return;
    var target = document.getElementById(location.hash.slice(1));
    var details = target && target.closest('details');
    if (details && !details.open) details.open = true;
}
openTargetDetails();
window.addEventListener('hashchange', openTargetDetails);
