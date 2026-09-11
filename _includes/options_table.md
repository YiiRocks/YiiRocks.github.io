{% assign options = include.options %}
<div class="list-group mb-3">
{% for opt in options %}
<div class="list-group-item">
<div class="row">
<div class="col-md-5">
<div class="fw-semibold font-monospace text-break">{{ opt.name }}{% if opt.type %}<span class="fw-normal text-body-tertiary"> {{ opt.type }}</span>{% endif %}</div>
{% if opt.default %}
<div class="font-monospace small text-body-tertiary">{{ opt.default }}</div>
{% endif %}
</div>
<div class="col-md-7">{{ opt.desc }}</div>
</div>
{% if opt.options %}
<div class="list-group list-group-flush mt-2">
{% for subopt in opt.options %}
<div class="list-group-item px-0 bg-transparent{% if forloop.last %} pb-0{% endif %}">
<div class="row">
<div class="col-md-5 ps-5 border-start">
<div class="fw-semibold font-monospace text-break">{{ subopt.name }}{% if subopt.type %}<span class="fw-normal text-body-tertiary"> {{ subopt.type }}</span>{% endif %}</div>
{% if subopt.default %}
<div class="font-monospace small text-body-tertiary">{{ subopt.default }}</div>
{% endif %}
</div>
<div class="col-md-7">{{ subopt.desc }}</div>
</div>
</div>
{% endfor %}
</div>
{% endif %}
</div>
{% endfor %}
</div>
