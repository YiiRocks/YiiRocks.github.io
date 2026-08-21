{% assign options = include.options %}
<div class="opt-grid">
{% for opt in options %}
<div class="opt-row">
<div class="opt-name">
<div class="opt-label">{{ opt.name }}{% if opt.type %}<span class="opt-type fw-normal"> {{ opt.type }}</span>{% endif %}</div>
{% if opt.default %}
<div class="opt-default">{{ opt.default }}</div>
{% endif %}
</div>
<div class="opt-desc">{{ opt.desc }}</div>
</div>
{% endfor %}
</div>
