---
layout: default
title: Build Status
description: Real-time build status and CI metrics for all Yii.Rocks packages including test coverage, mutation score, and download statistics.
preconnect:
  - https://img.shields.io
---

<div class="doc-page">
    <h1 class="mb-4">Build Status</h1>

    {% assign pkg_data = site.data.projects %}
    {% assign general_keys = "recaptcha,toast-bootstrap5,yii-bootstrap-icons" | split: "," %}
    {% assign voyti_keys = "voyti,voyti-api,voyti-2fa,voyti-2fa-email,voyti-2fa-totp,voyti-2fa-webauthn,voyti-gdpr,voyti-lockout,voyti-social-auth,voyti-views-bootstrap5" | split: "," %}
    {% assign svginline_keys = "svg-inline,svg-inline-bootstrap,svg-inline-fontawesome" | split: "," %}

    <div class="status-grid mb-5">
{% include status_cards.md pkg_data=pkg_data filter_keys=general_keys %}
    </div>

    <h2 class="doc-h mb-4">Voyti</h2>
    <div class="status-grid mb-5">
{% include status_cards.md pkg_data=pkg_data filter_keys=voyti_keys %}
    </div>

    <h2 class="doc-h mb-4">SVG Inline</h2>
    <div class="status-grid">
{% include status_cards.md pkg_data=pkg_data filter_keys=svginline_keys %}
    </div>
</div>
