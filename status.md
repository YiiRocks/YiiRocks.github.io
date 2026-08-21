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
    name: Voyti / API
    tint: "#ede9fe"
    logo: "/assets/icons/voyti-api.svg"
    package: yiirocks/voyti-api
    repo: voyti-api
    branch: main
    workflow: build.yml
    docsUrl: "/voyti/api/"
  voyti-2fa:
    name: Voyti / 2FA
    tint: "#fce7f3"
    logo: "/assets/icons/voyti-2fa.svg"
    package: yiirocks/voyti-2fa
    repo: voyti-2fa
    branch: main
    workflow: build.yml
    docsUrl: "/voyti/two-factor/"
  voyti-2fa-email:
    name: Voyti / 2FA / Email
    tint: "#ffe4e6"
    logo: "/assets/icons/voyti-2fa-email.svg"
    package: yiirocks/voyti-2fa-email
    repo: voyti-2fa-email
    branch: main
    workflow: build.yml
    docsUrl: "/voyti/two-factor/"
  voyti-2fa-totp:
    name: Voyti / 2FA / TOTP
    tint: "#fef3c7"
    logo: "/assets/icons/voyti-2fa-totp.svg"
    package: yiirocks/voyti-2fa-totp
    repo: voyti-2fa-totp
    branch: main
    workflow: build.yml
    docsUrl: "/voyti/two-factor/"
  voyti-2fa-webauthn:
    name: Voyti / 2FA / WebAuthn
    tint: "#cffafe"
    logo: "/assets/icons/voyti-2fa-webauthn.svg"
    package: yiirocks/voyti-2fa-webauthn
    repo: voyti-2fa-webauthn
    branch: main
    workflow: build.yml
    docsUrl: "/voyti/two-factor/"
  voyti-gdpr:
    name: Voyti / GDPR
    tint: "#d1fae5"
    logo: "/assets/icons/voyti-gdpr.svg"
    package: yiirocks/voyti-gdpr
    repo: voyti-gdpr
    branch: main
    workflow: build.yml
    docsUrl: "/voyti/gdpr/"
  voyti-lockout:
    name: Voyti / Lockout
    tint: "#e0f7f4"
    logo: "/assets/icons/voyti-lockout.svg"
    package: yiirocks/voyti-lockout
    repo: voyti-lockout
    branch: main
    workflow: build.yml
    docsUrl: "/voyti/lockout/"
  voyti-social-auth:
    name: Voyti / Social Auth
    tint: "#e0f7fa"
    logo: "/assets/icons/voyti-social-auth.svg"
    package: yiirocks/voyti-social-auth
    repo: voyti-social-auth
    branch: main
    workflow: build.yml
    docsUrl: "/voyti/social/"
  voyti-views-bootstrap5:
    name: Voyti / Views / Bootstrap5
    tint: "#dbeafe"
    logo: "/assets/icons/bootstrap.svg"
    package: yiirocks/voyti-views-bootstrap5
    repo: voyti-views-bootstrap5
    branch: main
    workflow: build.yml
    docsUrl: "/voyti/"
    hideMsi: true
  svg-inline-bootstrap:
    name: SvgInline / Bootstrap
    tint: "#dbeafe"
    logo: "/assets/icons/bootstrap.svg"
    package: yiirocks/svg-inline-bootstrap
    repo: svg-inline-bootstrap
    branch: main
    workflow: build.yml
    docsUrl: "/svg-inline/bootstrap/"
  svg-inline-fontawesome:
    name: SvgInline / Font Awesome
    tint: "#e0e7ff"
    logo: "/assets/icons/fontawesome.svg"
    package: yiirocks/svg-inline-fontawesome
    repo: svg-inline-fontawesome
    branch: main
    workflow: build.yml
    docsUrl: "/svg-inline/fontawesome/"
---

<div class="doc-page">
    <h1 class="mb-4">Build Status</h1>

{% for group in page.groups %}
{% if group.title %}
    <h2 class="doc-h mb-4">{{ group.title }}</h2>
{% endif %}
    <div class="status-grid{% unless forloop.last %} mb-5{% endunless %}">
{% include status_cards.md collection=site.packages status_data=page.sub_packages filter_keys=group.keys %}
    </div>
{% endfor %}
</div>
