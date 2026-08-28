<!DOCTYPE html>
<html class="h-100" lang="en">
    <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        {% seo %}
        <meta name="color-scheme" content="light dark">
        <meta name="theme-color" content="#f8fafc" media="(prefers-color-scheme: light)">
        <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)">
        <link rel="icon" type="image/svg+xml" href="/assets/images/logo.svg">
        <link rel="alternate icon" href="/assets/images/favicon.ico">
        <link rel="apple-touch-icon" href="/assets/images/logo-180.png">
{% for url in page.preconnect %}
        <link rel="preconnect" href="{{ url }}" crossorigin>
{% endfor %}
        <link href="https://cdn.jsdelivr.net/npm/bootstrap/dist/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="/assets/site.css">
        <noscript><link rel="stylesheet" href="/assets/site-noscript.css"></noscript>
        <script>
            document.documentElement.dataset.bsTheme=localStorage.theme||(window.matchMedia?.("(prefers-color-scheme:light)")?.matches?"light":"dark");
        </script>
    </head>
    <body class="d-flex flex-column h-100">
        <nav class="navbar navbar-expand sticky-top bg-body border-bottom">
            <div class="container">
                {% if page.url != "/" %}<a href="/" class="navbar-brand d-flex align-items-center gap-2">{% else %}<span class="navbar-brand d-flex align-items-center gap-2">{% endif %}
                    <span class="nav-logo d-flex align-items-center justify-content-center flex-shrink-0"><img src="/assets/images/logo.svg" alt="Yii.Rocks" width="22" height="22"></span>
                    <span class="fw-bold">Yii<span class="accent">.Rocks</span></span>
                {% if page.url != "/" %}</a>{% else %}</span>{% endif %}
                <div class="d-flex align-items-center gap-4 flex-wrap fw-medium ms-auto">
                    <a href="/status/" class="nav-link">Build Status</a>
                    <a href="https://github.com/sponsors/YiiRocks" target="_blank" rel="noopener" class="nav-link">Funding</a>
                    <a href="https://github.com/YiiRocks/" target="_blank" rel="noopener" class="nav-link">GitHub</a>
                    <button type="button" class="btn btn-outline-secondary theme-toggle p-0 d-flex align-items-center justify-content-center" id="themeToggle" title="Toggle dark mode" aria-label="Toggle dark mode"></button>
                </div>
            </div>
        </nav>
        <main class="flex-shrink-0">
            {{ content }}
        </main>
        <footer class="mt-auto border-top py-3">
            <div class="container d-flex align-items-center justify-content-end gap-4">
                <span class="text-body-secondary fs-sm">Yii.Rocks - crafted by <a href="https://www.mr42.me/" target="_blank" rel="noopener" title="Visit Mr.42" class="link-body-emphasis link-underline-opacity-0 fs-sm">Mr. 42</a></span>
            </div>
        </footer>
        <button type="button" class="btn btn-primary scroll-top position-fixed end-0 m-4 p-0 d-flex align-items-center justify-content-center" id="scrollTop" title="Scroll to top" aria-label="Scroll to top"></button>
        <script src="/assets/site.js" defer></script>
    </body>
</html>
