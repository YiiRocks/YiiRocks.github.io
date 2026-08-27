{% assign pkg_matches = site.packages | where: "pkgId", include.pkgId | where_exp: "item", "item.section == nil" %}
{% assign pkg = pkg_matches.first %}
{% assign addon_sections = "" | split: "" %}
{% assign core_sections = "" | split: "" %}
{% for s in pkg.sections %}
{% if s.group == "addon" %}
{% assign addon_sections = addon_sections | push: s %}
{% else %}
{% assign core_sections = core_sections | push: s %}
{% endif %}
{% endfor %}
        <nav class="sidebar">
            <div class="d-flex flex-row flex-md-column gap-4 gap-md-0">
            <div class="flex-fill">
            <div class="fw-bold small text-body-secondary mb-2 text-uppercase ps-3">On this page</div>
            <ul class="nav nav-pills flex-column gap-1">
                <li class="nav-item"><a href="{{ pkg.docsUrl }}" class="nav-link{% unless include.section %} active fw-bold{% endunless %}">Overview</a></li>
{% for s in core_sections %}
                <li class="nav-item"><a href="{{ pkg.docsUrl }}{{ s.slug }}/" class="nav-link{% if s.slug == include.section %} active fw-bold{% endif %}">{{ s.title }}</a></li>
{% endfor %}
            </ul>
            </div>
{% if addon_sections.size > 0 %}
            <div class="flex-fill">
            <div class="fw-bold small text-body-secondary mb-2 mt-md-4 text-uppercase ps-3">Addon Packages</div>
            <ul class="nav nav-pills flex-column gap-1">
{% for s in addon_sections %}
                <li class="nav-item"><a href="{{ pkg.docsUrl }}{{ s.slug }}/" class="nav-link{% if s.slug == include.section %} active fw-bold{% endif %}">{{ s.title }}</a></li>
{% endfor %}
            </ul>
            </div>
{% endif %}
            </div>
        </nav>
