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
<div class="container py-5">
    <div class="d-flex align-items-center gap-4 mb-4">
        <a href="{{ pkg.docsUrl }}" class="d-flex align-items-center justify-content-center flex-shrink-0 rounded-4" style="background:{{ pkg.tint }}; width:56px; height:56px;"><img src="{{ pkg.logo | relative_url }}" alt="{{ pkg.name }}" width="32" height="32"></a>
        <div>
            <a href="{{ pkg.docsUrl }}" class="link-body-emphasis link-underline-opacity-0"><h1 class="h2 fw-bold">{{ pkg.name }}</h1></a>
            <div class="fw-semibold text-primary-emphasis small">{{ pkg.tagline }}</div>
        </div>
    </div>

    <div class="row gy-4">
        <div class="col-md-3">
{% include doc_sidebar.md pkgId=page.pkgId section=page.section %}
        </div>
        <div class="col-md-9">
            <h2 class="h3 fw-bolder mb-2" id="section-{{ page.section }}">{{ current_title }}</h2>
            {{ content }}

            <div class="d-flex justify-content-between gap-4 mt-4 pt-4 border-top">
{% if current_index > 0 %}
{% assign prev_index = current_index | minus: 1 %}
{% assign prev = pkg.sections[prev_index] %}
                <a href="{{ pkg.docsUrl }}{{ prev.slug }}/" class="fw-semibold text-decoration-none">&larr; {{ prev.title }}</a>
{% else %}
                <span></span>
{% endif %}
{% assign next_index = current_index | plus: 1 %}
{% if next_index < pkg.sections.size %}
{% assign next = pkg.sections[next_index] %}
                <a href="{{ pkg.docsUrl }}{{ next.slug }}/" class="fw-semibold text-decoration-none">{{ next.title }} &rarr;</a>
{% endif %}
            </div>
        </div>
    </div>
</div>
