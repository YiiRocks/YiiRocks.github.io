{% assign options = include.options %}
<div class="list-group mb-4">
{% for opt in options %}
<div class="list-group-item">
<div class="row">
<div class="col-md-4">
<div class="fw-semibold font-monospace text-break">{{ opt.name }}{% if opt.type %}<span class="fw-normal text-body-tertiary"> {{ opt.type }}</span>{% endif %}</div>
{% if opt.default %}
<div class="font-monospace small text-body-tertiary">{{ opt.default }}</div>
{% endif %}
</div>
<div class="col-md-8">{{ opt.desc }}</div>
</div>
</div>
{% endfor %}
</div>
