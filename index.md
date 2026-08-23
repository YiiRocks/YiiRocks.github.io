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

<div class="hero">
<div class="container pt-4 px-4">
    <div class="d-inline-flex align-items-center gap-2 mb-4 py-1 px-3 rounded-pill fw-semibold small bg-body-secondary">
        <span class="hero-badge-dot rounded-circle bg-success" style="width:.5rem;height:.5rem;"></span>
        {{ project_count }} open-source projects, actively maintained
    </div>
    <h1 class="display-5 fw-bold mb-4">The missing pieces for your <span class="accent">Yii&nbsp;3</span> projects.</h1>
    <p class="fs-5 text-body-secondary mb-4">Small, focused libraries that drop straight into your Yii apps.</p>
</div>
</div>

<div class="container pt-4">
<div id="packages">
{% for doc in site.packages %}
{% unless doc.listed == false or doc.section %}
            <div class="card" id="{{ doc.pkgId }}">
                <div class="card-body">
                <div class="d-flex align-items-start justify-content-between flex-wrap gap-3">
                    <div class="d-flex align-items-center gap-3">
                        <span class="d-flex align-items-center justify-content-center flex-shrink-0 rounded-3" style="background:{{ doc.tint }}; width:48px; height:48px;"><img src="{{ doc.logo | relative_url }}" alt="{{ doc.name }}" width="26" height="26"></span>
                        <div>
                            <h3 class="h5 mb-0">{{ doc.name }}</h3>
                            <div class="fw-semibold text-primary-emphasis">{{ doc.tagline }}</div>
                        </div>
                    </div>
                    <div class="d-flex gap-2 flex-wrap justify-content-end flex-grow-1">
{% if doc.features or doc.usage %}
                        <button type="button" class="btn btn-tint btn-sm small fw-semibold dropdown-toggle" aria-expanded="false" aria-controls="{{ doc.pkgId }}-details" title="Show summary">Summary</button>
{% endif %}
                        <a href="https://github.com/YiiRocks/{{ doc.repo }}" target="_blank" rel="noopener" class="btn btn-tint-blue btn-sm small fw-semibold">GitHub &rarr;</a>
                        <a href="https://packagist.org/packages/{{ doc.package }}" target="_blank" rel="noopener" class="btn btn-tint-blue btn-sm small fw-semibold">Packagist &rarr;</a>
{% if doc.docsUrl %}
                        <a href="{{ doc.docsUrl }}" class="btn btn-gradient btn-sm small fw-semibold">Documentation &rarr;</a>
{% endif %}
                    </div>
                </div>

                <p class="m-0 mt-3 fs-6 lh-base">{{ doc.description }}</p>

{% if doc.features or doc.usage %}
                <div class="mt-3" id="{{ doc.pkgId }}-details" hidden>
{% if doc.features %}
                    <div class="row row-cols-1 row-cols-md-2 g-3">
{% for feat in doc.features %}
                        <div class="col">
                        <div class="card card-body p-3">
                            <div class="d-flex align-items-center gap-2 mb-1">
{% if feat.icon %}
                                <img src="{{ feat.icon | relative_url }}" alt="{{ feat.label }}" class="opacity-75 flex-shrink-0" width="24" height="24">
{% endif %}
                                <div class="fw-bold">{{ feat.label }}</div>
                            </div>
                            <div class="small lh-base text-body-secondary">{{ feat.detail }}</div>
                        </div>
                        </div>
{% endfor %}
                    </div>
{% endif %}

{% if doc.usage %}
                    <div class="mb-3 small lh-base">
{% highlight php %}
{{ doc.usage }}
{% endhighlight %}
</div>
{% endif %}
                </div>
{% endif %}

                <div class="d-flex align-items-center gap-3 flex-wrap mt-3">
                        <button type="button" class="btn btn-copy d-flex justify-content-between align-items-center gap-2 fw-medium text-start text-nowrap overflow-hidden font-monospace">composer require {{ doc.package }}</button>
                </div>
                </div>
            </div>
{% endunless %}
{% endfor %}
</div>
</div>
