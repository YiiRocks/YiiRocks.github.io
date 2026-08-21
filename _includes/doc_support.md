{% assign pkg_matches = site.packages | where: "pkgId", include.pkgId | where_exp: "item", "item.section == nil" %}
{% assign pkg = pkg_matches.first %}
{% if pkg %}
    <h2 class="doc-h" id="support">Support</h2>
    <div class="mb-4 d-flex align-items-center gap-3 flex-wrap">
        <button type="button" class="copy-btn copy--sm">composer require {{ pkg.package }}</button>
        <a href="https://github.com/YiiRocks/{{ pkg.repo }}/issues" target="_blank" rel="noopener" class="docs-entry__link docs-entry__link--docs">Create an issue &rarr;</a>
    </div>
{% endif %}
