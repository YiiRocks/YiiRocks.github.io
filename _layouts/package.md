---
layout: default
---
{% assign pkg = site.data.projects[page.pkgId] %}
<div class="doc-page">
{% if pkg %}
    <div class="doc-header d-flex align-items-center gap-4">
        <span class="doc-header__icon d-flex align-items-center justify-content-center flex-shrink-0" style="background:{{ pkg.tint }};"><img src="{{ pkg.logo | relative_url }}" alt="{{ pkg.name }}" class="pkg-img"></span>
        <div>
            <h1 class="doc-header__name">{{ pkg.name }}</h1>
            <div class="doc-header__sub fw-semibold">{{ pkg.tagline }}</div>
        </div>
    </div>
{% endif %}

{% if pkg.sections %}
    <div class="doc-layout">
{% include doc_sidebar.md pkgId=page.pkgId %}
        <div class="doc-body">
            <h2 class="h3 fw-bolder mb-2" id="section-overview">Overview</h2>
            {{ content }}
            {% include doc_support.md pkgId=page.pkgId %}
        </div>
    </div>
{% else %}
    {{ content }}

{% if pkg.options %}
    <h2 class="doc-h">Options</h2>
    {% include options_table.md options=pkg.options %}
{% endif %}

{% if pkg.inheritedFrom %}
{% assign inherited_pkg = site.data.projects[pkg.inheritedFrom] %}
    <h2 class="doc-h">Inherited from <a href="{{ inherited_pkg.docsUrl }}">{{ inherited_pkg.name }}</a></h2>
    {% include options_table.md options=inherited_pkg.options %}
{% endif %}

{% if pkg.exampleHeading %}
    <h2 class="doc-h">{{ pkg.exampleHeading }}</h2>
    <div class="examples">
{% for ex in pkg.examples %}
        <div class="doc-example">{% highlight php %}
{{ ex }}
{% endhighlight %}</div>
{% endfor %}
    </div>
{% endif %}

    {% include doc_support.md pkgId=page.pkgId %}
{% endif %}
</div>
