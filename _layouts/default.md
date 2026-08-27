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
                    <button type="button" class="btn btn-outline-secondary theme-toggle p-0 d-flex align-items-center justify-content-center" id="themeToggle" title="Toggle dark mode" aria-label="Toggle dark mode">
                        <svg class="dark-mode" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278z"/></svg>
                        <svg class="light-mode" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/></svg>
                    </button>
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
        <button type="button" class="btn btn-primary scroll-top position-fixed end-0 m-4 p-0 d-flex align-items-center justify-content-center" id="scrollTop" title="Scroll to top" aria-label="Scroll to top"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/></svg></button>
        <script src="/assets/site.js" defer></script>
    </body>
</html>
