---
layout: default
title: Build Status
description: Real-time build status and CI metrics for all Yii.Rocks packages including test coverage, mutation score, and download statistics.
preconnect:
  - https://img.shields.io

# Each group renders as one grid, in this order. `keys` may reference either
# a main package's pkgId (pulled from the _packages collection) or a key
# defined below under sub_packages (for packages with no doc page of their
# own). Add/reorder a card by editing the relevant `keys` list only.
groups:
  - title:
    keys:
      - recaptcha
      - toast-bootstrap5
      - yii-bootstrap-icons
  - title: Voyti
    keys:
      - voyti
      - voyti-api
      - voyti-api-rate-limiter
      - voyti-api-stateless-client
      - voyti-api-user
      - voyti-2fa
      - voyti-2fa-email
      - voyti-2fa-totp
      - voyti-2fa-webauthn
      - voyti-gdpr
      - voyti-lockout
      - voyti-social-auth
      - voyti-views-bootstrap5
  - title: SVG Inline
    keys:
      - svg-inline
      - svg-inline-bootstrap
      - svg-inline-fontawesome

# Metadata for sub-packages that don't have their own _packages/ doc page.
# New entry checklist: name, tint, logo, package, repo, branch, workflow,
# docsUrl. Add hideMsi: true only if the repo has no MSI badge.
sub_packages:
  voyti-api:
    name: API
    tint: "#ede9fe"
    logo: "/assets/icons/voyti-api.svg"
    package: yiirocks/voyti-api
    repo: voyti-api
    branch: main
    workflow: build.yml
    docsUrl: "/voyti/api/"
    unreleased: true
  voyti-api-rate-limiter:
    name: API / Rate Limiter
    tint: "#ffedd5"
    logo: "/assets/icons/voyti-api-rate-limiter.svg"
    package: yiirocks/voyti-api-rate-limiter
    repo: voyti-api-rate-limiter
    branch: main
    workflow: build.yml
    docsUrl: "/voyti/api/#rate-limiting"
    unreleased: true
  voyti-api-stateless-client:
    name: API / Stateless Client
    tint: "#fef9c3"
    logo: "/assets/icons/voyti-api-stateless-client.svg"
    package: yiirocks/voyti-api-stateless-client
    repo: voyti-api-stateless-client
    branch: main
    workflow: build.yml
    docsUrl: "/voyti/stateless-client/"
    unreleased: true
  voyti-api-user:
    name: API / User
    tint: "#e0e7ff"
    logo: "/assets/icons/voyti-api-user.svg"
    package: yiirocks/voyti-api-user
    repo: voyti-api-user
    branch: main
    workflow: build.yml
    docsUrl: "/voyti/api/"
    unreleased: true
  voyti-2fa:
    name: 2FA
    tint: "#fce7f3"
    logo: "/assets/icons/voyti-2fa.svg"
    package: yiirocks/voyti-2fa
    repo: voyti-2fa
    branch: main
    workflow: build.yml
    docsUrl: "/voyti/two-factor/"
  voyti-2fa-email:
    name: 2FA / Email
    tint: "#ffe4e6"
    logo: "/assets/icons/voyti-2fa-email.svg"
    package: yiirocks/voyti-2fa-email
    repo: voyti-2fa-email
    branch: main
    workflow: build.yml
    docsUrl: "/voyti/two-factor/"
  voyti-2fa-totp:
    name: 2FA / TOTP
    tint: "#fef3c7"
    logo: "/assets/icons/voyti-2fa-totp.svg"
    package: yiirocks/voyti-2fa-totp
    repo: voyti-2fa-totp
    branch: main
    workflow: build.yml
    docsUrl: "/voyti/two-factor/"
  voyti-2fa-webauthn:
    name: 2FA / WebAuthn
    tint: "#cffafe"
    logo: "/assets/icons/voyti-2fa-webauthn.svg"
    package: yiirocks/voyti-2fa-webauthn
    repo: voyti-2fa-webauthn
    branch: main
    workflow: build.yml
    docsUrl: "/voyti/two-factor/"
  voyti-gdpr:
    name: GDPR
    tint: "#d1fae5"
    logo: "/assets/icons/voyti-gdpr.svg"
    package: yiirocks/voyti-gdpr
    repo: voyti-gdpr
    branch: main
    workflow: build.yml
    docsUrl: "/voyti/gdpr/"
  voyti-lockout:
    name: Lockout
    tint: "#e0f7f4"
    logo: "/assets/icons/voyti-lockout.svg"
    package: yiirocks/voyti-lockout
    repo: voyti-lockout
    branch: main
    workflow: build.yml
    docsUrl: "/voyti/lockout/"
  voyti-social-auth:
    name: Social Auth
    tint: "#e0f7fa"
    logo: "/assets/icons/voyti-social-auth.svg"
    package: yiirocks/voyti-social-auth
    repo: voyti-social-auth
    branch: main
    workflow: build.yml
    docsUrl: "/voyti/social/"
    unreleased: true
  voyti-views-bootstrap5:
    name: Views / Bootstrap5
    tint: "#dbeafe"
    logo: "/assets/icons/bootstrap.svg"
    package: yiirocks/voyti-views-bootstrap5
    repo: voyti-views-bootstrap5
    branch: main
    workflow: build.yml
    docsUrl: "/voyti/"
    hideMsi: true
    unreleased: true
  svg-inline-bootstrap:
    name: Bootstrap
    tint: "#dbeafe"
    logo: "/assets/icons/bootstrap.svg"
    package: yiirocks/svg-inline-bootstrap
    repo: svg-inline-bootstrap
    branch: main
    workflow: build.yml
    docsUrl: "/svg-inline/bootstrap/"
  svg-inline-fontawesome:
    name: Font Awesome
    tint: "#e0e7ff"
    logo: "/assets/icons/fontawesome.svg"
    package: yiirocks/svg-inline-fontawesome
    repo: svg-inline-fontawesome
    branch: main
    workflow: build.yml
    docsUrl: "/svg-inline/fontawesome/"
---

{% assign repo_count = 0 %}
{% for group in page.groups %}
{% for key in group.keys %}
{% assign doc = nil %}
{% assign status_pkg = nil %}
{%- for item in site.packages -%}
  {%- if item.pkgId == key and item.section == nil -%}
    {%- assign doc = item -%}
  {%- endif -%}
{%- endfor -%}
{%- if page.sub_packages[key] -%}
  {%- assign status_pkg = page.sub_packages[key] -%}
{%- endif -%}
{% if doc or status_pkg %}
{% assign repo_count = repo_count | plus: 1 %}
{% endif %}
{% endfor %}
{% endfor %}

<div class="container py-3">
    <div class="d-flex align-items-center justify-content-between flex-wrap gap-2 mb-3">
        <h1 class="mb-0">Build Status</h1>
        <div class="d-inline-flex align-items-center gap-2 py-1 px-3 rounded-pill fw-semibold small bg-body-secondary">
            <span class="hero-badge-dot rounded-circle bg-success" style="width:.5rem;height:.5rem;"></span>
            {{ repo_count }} repositories tracked
        </div>
    </div>

{% for group in page.groups %}
{% if group.title %}
    <h2 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">{{ group.title }}</h2>
{% endif %}
    <div class="row row-cols-1 row-cols-md-2 g-3{% unless forloop.last %} mb-3{% endunless %}">
{% for key in group.keys %}
{% assign doc = nil %}
{% assign status_pkg = nil %}

{%- for item in site.packages -%}
  {%- if item.pkgId == key and item.section == nil -%}
    {%- assign doc = item -%}
  {%- endif -%}
{%- endfor -%}

{%- if page.sub_packages[key] -%}
  {%- assign status_pkg = page.sub_packages[key] -%}
{%- endif -%}

{% if doc %}
  {%- assign pkg = doc -%}
{% elsif status_pkg %}
  {%- assign pkg = status_pkg -%}
{% else %}
  {%- continue -%}
{% endif %}

<div class="col">
{% if pkg.docsUrl %}<a href="{{ pkg.docsUrl }}" class="card h-100 text-decoration-none position-relative">{% else %}<div class="card h-100 text-decoration-none position-relative">{% endif %}
            <div class="card-body">
{% if pkg.featured %}<span class="status-star position-absolute">&#9733;</span>{% endif %}
            <div class="mb-3 d-flex align-items-center">
                <div class="d-flex align-items-center justify-content-center flex-shrink-0 rounded-3" style="background:{{ pkg.tint }}; width:48px; height:48px;"><img src="{{ pkg.logo | relative_url }}" alt="{{ pkg.name }}" width="30" height="30"></div>
                <div class="ms-3">
                    <h3 class="h4 fw-bold mb-0">{{ pkg.name }}</h3>
                    <div class="small text-truncate text-body-secondary font-monospace">{{ pkg.package }}</div>
                </div>
            </div>
            <div class="d-flex flex-wrap gap-2 mb-3">
{% if pkg.unreleased %}
                <img src="https://img.shields.io/badge/-unreleased-orange" alt="Unreleased"  loading="lazy" decoding="async">
{% else %}
                <img src="https://img.shields.io/packagist/v/{{ pkg.package }}" alt="Packagist Version"  loading="lazy" decoding="async">
                <img src="https://img.shields.io/packagist/php-v/{{ pkg.package }}" alt="PHP Version"  loading="lazy" decoding="async">
{% endif %}
                <img src="https://img.shields.io/packagist/dt/{{ pkg.package }}" alt="Downloads"  loading="lazy" decoding="async">
                <img src="https://img.shields.io/github/last-commit/YiiRocks/{{ pkg.repo }}" alt="Last Commit"  loading="lazy" decoding="async">
                <img src="https://img.shields.io/github/actions/workflow/status/YiiRocks/{{ pkg.repo }}/{{ pkg.workflow }}" alt="CI"  loading="lazy" decoding="async">
            </div>
            <div class="d-flex flex-wrap gap-2">
                <img src="https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2FYiiRocks%2F{{ pkg.repo }}%2Fbadges%2Fcoverage.json" alt="Coverage"  loading="lazy" decoding="async">
{% unless pkg.hideMsi %}
                <img src="https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2FYiiRocks%2F{{ pkg.repo }}%2Fbadges%2Fmsi.json" alt="MSI"  loading="lazy" decoding="async">
{% endunless %}
                <img src="https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2FYiiRocks%2F{{ pkg.repo }}%2Fbadges%2Ftests.json" alt="Tests"  loading="lazy" decoding="async">
                <img src="https://img.shields.io/endpoint?url=https%3A%2F%2Fraw.githubusercontent.com%2FYiiRocks%2F{{ pkg.repo }}%2Fbadges%2Fassertions.json" alt="Assertions"  loading="lazy" decoding="async">
            </div>
            </div>
{% if pkg.docsUrl %}</a>{% else %}</div>{% endif %}
</div>
{% endfor %}
    </div>
{% endfor %}
</div>
