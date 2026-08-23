{% if include.features %}
<h5 class="text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Features</h5>
<div class="row row-cols-1 row-cols-md-2 g-3 mb-4 features-grid">
{% for feat in include.features %}
<div class="col">
<div class="card card-body p-3 h-100">
<div class="fw-bold mb-1">{{ feat.label }}</div>
<div class="small lh-base text-body-secondary">{{ feat.detail }}</div>
</div>
</div>
{% endfor %}
</div>
{% endif %}
