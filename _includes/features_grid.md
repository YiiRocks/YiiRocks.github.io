{% if include.features %}
<h2 class="doc-h">Features</h2>
<div class="features-grid mb-4">
{% for feat in include.features %}
<div class="feature-card">
<div class="fw-bold mb-1">{{ feat.label }}</div>
<div class="feature-card__text">{{ feat.detail }}</div>
</div>
{% endfor %}
</div>
{% endif %}
