{% if include.features %}
{% assign level = include.level | default: 2 %}
{% unless include.heading == false %}
<h{{ level }} class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Features</h{{ level }}>
{% endunless %}
<div class="row row-cols-1 row-cols-md-2 g-3 mb-3">
{% for feat in include.features %}
<div class="col">
<div class="card card-body p-3 h-100">
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
