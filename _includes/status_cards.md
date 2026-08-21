{% for item in include.pkg_data %}
{% assign key = item[0] %}
{% assign pkg = item[1] %}
{% if include.filter_keys contains key %}
{% if pkg.docsUrl %}
        <a href="{{ pkg.docsUrl }}" class="status-card">
{% else %}
        <div class="status-card">
{% endif %}
{% if pkg.featured %}
            <div class="status-card__star"></div>
{% endif %}
            <div class="status-card__header">
                <div class="status-card__icon" style="background:{{ pkg.tint }};"><img src="{{ pkg.logo | relative_url }}" alt="{{ pkg.name }}"></div>
                <div class="status-card__info">
                    <h3 class="status-card__name">{{ pkg.name }}</h3>
                    <div class="status-card__pkg">{{ pkg.package }}</div>
                </div>
            </div>
            <div class="status-card__badges">
{% if pkg.travis %}
                <img src="https://img.shields.io/travis/com/YiiRocks/{{ pkg.repo }}/{{ pkg.branch }}?style=flat-square" alt="Travis" class="status-badge" loading="lazy" decoding="async">
{% else %}
                <img src="https://img.shields.io/packagist/v/{{ pkg.package }}?style=flat-square" alt="Packagist Version" class="status-badge" loading="lazy" decoding="async">
                <img src="https://img.shields.io/packagist/php-v/{{ pkg.package }}?style=flat-square" alt="PHP Version" class="status-badge" loading="lazy" decoding="async">
                <img src="https://img.shields.io/packagist/dt/{{ pkg.package }}?style=flat-square" alt="Downloads" class="status-badge" loading="lazy" decoding="async">
                <img src="https://img.shields.io/github/last-commit/YiiRocks/{{ pkg.repo }}?style=flat-square" alt="Last Commit" class="status-badge" loading="lazy" decoding="async">
                <img src="https://img.shields.io/github/actions/workflow/status/YiiRocks/{{ pkg.repo }}/{{ pkg.workflow }}?style=flat-square" alt="CI" class="status-badge" loading="lazy" decoding="async">
{% endif %}
            </div>
            <div class="status-card__meta">
                <img src="https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2FYiiRocks%2F{{ pkg.repo }}%2Fbadges%2Fcoverage.json" alt="Coverage" class="status-badge" loading="lazy" decoding="async">
{% unless pkg.hideMsi %}
                <img src="https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2FYiiRocks%2F{{ pkg.repo }}%2Fbadges%2Fmsi.json" alt="MSI" class="status-badge" loading="lazy" decoding="async">
{% endunless %}
                <img src="https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2FYiiRocks%2F{{ pkg.repo }}%2Fbadges%2Ftests.json" alt="Tests" class="status-badge" loading="lazy" decoding="async">
                <img src="https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2FYiiRocks%2F{{ pkg.repo }}%2Fbadges%2Fassertions.json" alt="Assertions" class="status-badge" loading="lazy" decoding="async">
            </div>
{% if pkg.docsUrl %}
        </a>
{% else %}
        </div>
{% endif %}
{% endif %}
{% endfor %}
