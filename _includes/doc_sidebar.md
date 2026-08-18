{% assign pkg = site.data.projects[include.pkgId] %}
{% assign addon_sections = "" | split: "" %}
{% assign core_sections = "" | split: "" %}
{% for s in pkg.sections %}
{% if s.group == "addon" %}
{% assign addon_sections = addon_sections | push: s %}
{% else %}
{% assign core_sections = core_sections | push: s %}
{% endif %}
{% endfor %}
        <nav class="doc-sidebar">
            <div class="doc-sidebar__heading fw-bold fs-sm text-body-secondary mb-2">On this page</div>
            <ul class="doc-sidebar__list">
                <li><a href="{{ pkg.docsUrl }}"{% unless include.section %} class="active"{% endunless %}>Overview</a></li>
{% for s in core_sections %}
                <li><a href="{{ pkg.docsUrl }}{{ s.slug }}/"{% if s.slug == include.section %} class="active"{% endif %}>{{ s.title }}</a></li>
{% endfor %}
            </ul>
{% if addon_sections.size > 0 %}
            <div class="doc-sidebar__heading fw-bold fs-sm text-body-secondary mb-2 mt-4">Addon Packages</div>
            <ul class="doc-sidebar__list">
{% for s in addon_sections %}
                <li><a href="{{ pkg.docsUrl }}{{ s.slug }}/"{% if s.slug == include.section %} class="active"{% endif %}>{{ s.title }}</a></li>
{% endfor %}
            </ul>
{% endif %}
        </nav>
