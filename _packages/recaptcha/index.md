---
permalink: "/recaptcha/"
layout: "package"
pkgId: "recaptcha"
name: "reCAPTCHA"
tagline: "Google reCAPTCHA v2 & v3 fields & validation"
tint: "#fff7e0"
logo: "/assets/icons/recaptcha.svg"
package: "yiirocks/recaptcha"
branch: "main"
repo: "recaptcha"
workflow: "build.yml"
docsUrl: "/recaptcha/"
title: "reCAPTCHA"
description: "Provides Google reCAPTCHA v2 and v3 field and server-side validation for your Yii 3 applications."
sections: 
  - slug: "config"
    title: "Configuration"
  - slug: "v2"
    title: "v2"
  - slug: "v3"
    title: "v3"
  - slug: "server"
    title: "Server-Side Verification"
features: 
  - label: "v2 challenge"
    detail: "Image or audio challenge field with Light/Dark themes, Normal/Compact/Invisible sizes, and JS success/expiry/error callbacks"
  - label: "v3 score-based"
    detail: "Invisible, score-based field with per-action validation and a configurable badge (bottom-right, bottom-left, or hidden with legal notice)"
  - label: "Server-side validation"
    detail: "PHP attributes - #[RecaptchaV2Rule] and #[RecaptchaV3Rule] - integrate directly into Yii3 form validation"
  - label: "Zero-config wiring"
    detail: "Site keys and secrets read from config or environment variables and auto-registered via the config-plugin, no manual client setup needed"
  - label: "PSR-18/17 based"
    detail: "Works with any PSR-18 HTTP client and PSR-17 request/stream factories already in your app"
  - label: "i18n"
    detail: "Translatable validation and legal-notice messages via yiisoft/translator"
usage: |
  echo RecaptchaV2Field::field($form, 'captcha')
      ->withSiteKey($siteKey);
  
  echo RecaptchaV3Field::field($form, 'captcha')
      ->withAction('login')
      ->withFormId('login-form');
---

<p>
            <a href="https://github.com/YiiRocks/recaptcha" class="text-nowrap">recaptcha</a>
            provides Google reCAPTCHA v2 and v3 field + server-side
            validation for your <a href="http://www.yiiframework.com/"
            class="text-nowrap">Yii Framework 3</a> applications.
</p>

{% if page.features %}
<h2 class="doc-h">Features</h2>
<div class="features-grid mb-4">
{% for feat in page.features %}
            <div class="feature-card">
                <div class="fw-bold mb-1">{{ feat.label }}</div>
                <div class="feature-card__text">{{ feat.detail }}</div>
            </div>
{% endfor %}
</div>
{% endif %}
