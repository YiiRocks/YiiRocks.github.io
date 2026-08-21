---
layout: default
---
{% assign pkg_matches = site.packages | where: "pkgId", page.pkgId | where_exp: "item", "item.section == nil" %}
{% assign pkg = pkg_matches.first %}
{% assign current_index = -1 %}
{% for s in pkg.sections %}
{% if s.slug == page.section %}
{% assign current_index = forloop.index0 %}
{% assign current_title = s.title %}
{% endif %}
{% endfor %}
<div class="doc-page">
    <div class="doc-header d-flex align-items-center gap-4">
        <a href="{{ pkg.docsUrl }}" class="doc-header__icon d-flex align-items-center justify-content-center flex-shrink-0" style="background:{{ pkg.tint }};"><img src="{{ pkg.logo | relative_url }}" alt="{{ pkg.name }}" class="pkg-img"></a>
        <div>
            <a href="{{ pkg.docsUrl }}" class="link-body-emphasis link-underline-opacity-0"><h1 class="doc-header__name">{{ pkg.name }}</h1></a>
            <div class="doc-header__sub fw-semibold">{{ pkg.tagline }}</div>
        </div>
    </div>

    <div class="doc-layout">
{% include doc_sidebar.md pkgId=page.pkgId section=page.section %}
        <div class="doc-body">
            <h2 class="h3 fw-bolder mb-2" id="section-{{ page.section }}">{{ current_title }}</h2>
            {{ content }}

            <div class="doc-pager d-flex justify-content-between gap-4">
{% if current_index > 0 %}
{% assign prev_index = current_index | minus: 1 %}
{% assign prev = pkg.sections[prev_index] %}
                <a href="{{ pkg.docsUrl }}{{ prev.slug }}/">&larr; {{ prev.title }}</a>
{% else %}
                <span></span>
{% endif %}
{% assign next_index = current_index | plus: 1 %}
{% if next_index < pkg.sections.size %}
{% assign next = pkg.sections[next_index] %}
                <a href="{{ pkg.docsUrl }}{{ next.slug }}/" class="doc-pager__next">{{ next.title }} &rarr;</a>
{% endif %}
            </div>
        </div>
    </div>
</div>
