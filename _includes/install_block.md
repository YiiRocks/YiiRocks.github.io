{% assign class = include.class %}
<div class="d-flex align-items-center gap-3 flex-wrap{% if class %} {{ class }}{% endif %}">
<button type="button" class="copy-btn copy--sm">composer require {{ include.package }}</button>
<a href="https://github.com/YiiRocks/{{ include.repo }}/issues" target="_blank" rel="noopener" class="docs-entry__link docs-entry__link--docs">Create an issue &rarr;</a>
<div class="d-flex gap-2 flex-wrap ms-auto">
<a href="https://github.com/YiiRocks/{{ include.repo }}" target="_blank" rel="noopener" class="docs-entry__link docs-entry__link--github">GitHub &rarr;</a>
<a href="https://packagist.org/packages/{{ include.package }}" target="_blank" rel="noopener" class="docs-entry__link docs-entry__link--packagist">Packagist &rarr;</a>
</div>
</div>
