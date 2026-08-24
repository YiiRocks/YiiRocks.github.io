{% assign class = include.class | default: "mb-3" %}
<div class="d-flex align-items-center gap-3 flex-wrap {{ class }}">
<button type="button" class="btn btn-copy d-flex justify-content-between align-items-center gap-2 fw-medium text-start text-nowrap overflow-hidden font-monospace">composer require {{ include.package }}</button>
<a href="https://github.com/YiiRocks/{{ include.repo }}/issues" target="_blank" rel="noopener" class="btn btn-gradient btn-arrow btn-sm small fw-semibold">Create an issue</a>
<div class="d-flex gap-2 flex-wrap ms-auto">
<a href="https://github.com/YiiRocks/{{ include.repo }}" target="_blank" rel="noopener" class="btn btn-tint-blue btn-arrow btn-sm small fw-semibold">GitHub</a>
<a href="https://packagist.org/packages/{{ include.package }}" target="_blank" rel="noopener" class="btn btn-tint-blue btn-arrow btn-sm small fw-semibold">Packagist</a>
</div>
</div>
