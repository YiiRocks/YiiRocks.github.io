hljs.initHighlightingOnLoad();
lozad().observe();
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
function updateThemeIcon() {
    themeToggle.textContent = document.documentElement.dataset.bsTheme === 'dark' ? '☀️' : '🌙';
}
updateThemeIcon();
themeToggle.addEventListener('click', function () {
    var next = document.documentElement.dataset.bsTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.bsTheme = next;
    localStorage.theme = next;
    updateThemeIcon();
});
var scrollTop = document.getElementById('scrollTop');
window.addEventListener('scroll', function () {
    scrollTop.classList.toggle('visible', window.scrollY > 300);
});
scrollTop.addEventListener('click', function () {
    history.replaceState(null, '', window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
