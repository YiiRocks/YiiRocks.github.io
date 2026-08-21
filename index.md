---
layout: default
title: Yii.Rocks
description: Small, focused open-source libraries for Yii 3 projects. Explore our collection of actively maintained packages designed to extend and enhance your Yii applications.
---
{% assign project_count = 0 %}
{% for doc in site.packages %}
{% unless doc.listed == false or doc.section %}
{% assign project_count = project_count | plus: 1 %}
{% endunless %}
{% endfor %}

<div class="hero mb-3">
    <div class="hero__badge d-inline-flex align-items-center gap-2">
        <span class="hero__badge-dot"></span>
        {{ project_count }} open-source projects, actively maintained
    </div>
    <h1>The missing pieces for your <span class="accent">Yii&nbsp;3</span> projects.</h1>
    <p class="fw-semibold">Small, focused libraries that drop straight into your Yii apps.</p>
</div>

<div class="section" id="packages">
    <div class="home-grid">
        <nav class="home-nav" aria-label="Package navigation">
            <div class="home-nav__title fw-bold fs-sm text-body-secondary mb-2">Packages</div>
            <ul class="home-nav__list">
{% for doc in site.packages %}
{% unless doc.listed == false or doc.section %}
                <li>
                    <a href="#{{ doc.pkgId }}" class="home-nav__item">
                        <span class="home-nav__icon d-flex align-items-center justify-content-center flex-shrink-0" style="background:{{ doc.tint }};"><img src="{{ doc.logo | relative_url }}" alt="{{ doc.name }}" class="pkg-img"></span>
                        <span>{{ doc.name }}</span>
                    </a>
                </li>
{% endunless %}
{% endfor %}
            </ul>
        </nav>

        <div class="home-main">
{% for doc in site.packages %}
{% unless doc.listed == false or doc.section %}
            <div class="docs-entry" id="{{ doc.pkgId }}">
                <div class="d-flex align-items-start justify-content-between flex-wrap gap-3">
                    <div class="docs-entry__title d-flex align-items-center gap-3">
                        <span class="docs-entry__icon d-flex align-items-center justify-content-center flex-shrink-0" style="background:{{ doc.tint }};"><img src="{{ doc.logo | relative_url }}" alt="{{ doc.name }}" class="pkg-img"></span>
                        <div>
                            <h3>{{ doc.name }}</h3>
                            <div class="docs-entry__sub fw-semibold">{{ doc.tagline }}</div>
                        </div>
                    </div>
                    <div class="d-flex gap-2 flex-wrap">
{% if doc.features or doc.usage %}
                        <button type="button" class="docs-entry__toggle" aria-expanded="false" title="Show summary">Summary ▼</button>
{% endif %}
                        <a href="https://github.com/YiiRocks/{{ doc.repo }}" target="_blank" rel="noopener" class="docs-entry__link docs-entry__link--github">GitHub &rarr;</a>
                        <a href="https://packagist.org/packages/{{ doc.package }}" target="_blank" rel="noopener" class="docs-entry__link docs-entry__link--packagist">Packagist &rarr;</a>
{% if doc.docsUrl %}
                        <a href="{{ doc.docsUrl }}" class="docs-entry__link docs-entry__link--docs">Documentation &rarr;</a>
{% endif %}
                    </div>
                </div>

                <p class="docs-entry__text">{{ doc.description }}</p>

{% if doc.features or doc.usage %}
                <div class="docs-entry__details" hidden>
{% if doc.features %}
                    <div class="features-grid">
{% for feat in doc.features %}
                        <div class="feature-card">
                            <div class="d-flex align-items-center gap-2 mb-1">
{% if feat.icon %}
                                <img src="{{ feat.icon | relative_url }}" alt="{{ feat.label }}" class="feature-card__icon">
{% endif %}
                                <div class="fw-bold">{{ feat.label }}</div>
                            </div>
                            <div class="feature-card__text">{{ feat.detail }}</div>
                        </div>
{% endfor %}
                    </div>
{% endif %}

{% if doc.usage %}
                    <div class="doc-example mb-3">
{% highlight php %}
{{ doc.usage }}
{% endhighlight %}
</div>
{% endif %}
                </div>
{% endif %}

                <div class="d-flex align-items-center gap-3 flex-wrap">
                        <button type="button" class="copy-btn copy--sm">composer require {{ doc.package }}</button>
                </div>
            </div>
{% endunless %}
{% endfor %}
        </div>
    </div>
</div>
