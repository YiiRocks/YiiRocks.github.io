---
layout: default
---
{% assign pkg = page %}
<div class="container py-5">
{% if pkg %}
    <div class="d-flex align-items-center gap-4 mb-4">
        <span class="d-flex align-items-center justify-content-center flex-shrink-0 rounded-4" style="background:{{ pkg.tint }}; width:56px; height:56px;"><img src="{{ pkg.logo | relative_url }}" alt="{{ pkg.name }}" width="32" height="32"></span>
        <div>
            <h1 class="h2 fw-bold">{{ pkg.name }}</h1>
            <div class="fw-semibold text-primary-emphasis small">{{ pkg.tagline }}</div>
        </div>
    </div>
{% endif %}

{% if pkg.sections %}
    <div class="row gy-4">
        <div class="col-md-3">
{% include doc_sidebar.md pkgId=page.pkgId %}
        </div>
        <div class="col-md-9">
            <h2 class="h3 fw-bolder mb-2" id="section-overview">Overview</h2>
            {{ content }}

            {% include features_grid.md features=pkg.features %}

            {% include doc_support.md pkgId=page.pkgId %}
        </div>
    </div>
{% else %}
    {{ content }}

{% include features_grid.md features=pkg.features %}

{% if pkg.options %}
    <h5 class="text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Options</h5>
    {% include options_table.md options=pkg.options %}
{% endif %}

{% if pkg.inheritedFrom %}
{% assign inherited_matches = site.packages | where: "pkgId", pkg.inheritedFrom | where_exp: "item", "item.section == nil" %}
{% assign inherited_pkg = inherited_matches.first %}
    <h5 class="text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Inherited from <a href="{{ inherited_pkg.docsUrl }}" class="text-decoration-none">{{ inherited_pkg.name }}</a></h5>
    {% include options_table.md options=inherited_pkg.options %}
{% endif %}

{% if pkg.exampleHeading %}
    <h5 class="text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">{{ pkg.exampleHeading }}</h5>
    <div class="d-grid mb-4">
{% for ex in pkg.examples %}
        <div class="small lh-base">{% highlight php %}
{{ ex }}
{% endhighlight %}</div>
{% endfor %}
    </div>
{% endif %}

    {% include doc_support.md pkgId=page.pkgId %}
{% endif %}
</div>
