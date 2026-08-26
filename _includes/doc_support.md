{% assign pkg_matches = site.packages | where: "pkgId", include.pkgId | where_exp: "item", "item.section == nil" %}
{% assign pkg = pkg_matches.first %}
{% if pkg %}
    <h5 class="text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label" id="support">Support</h5>
    <div class="mb-4 d-flex align-items-center gap-2 flex-wrap">
        <button type="button" data-clipboard class="btn btn-outline-primary fw-medium text-start text-nowrap overflow-hidden font-monospace">composer require {{ pkg.package }}</button>
        <a href="https://github.com/YiiRocks/{{ pkg.repo }}/issues" rel="noopener" class="btn btn-primary btn-arrow btn-sm small fw-semibold">Create an issue</a>
    </div>
{% endif %}
