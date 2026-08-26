---
layout: package-section
pkgId: recaptcha
section: config
title: "reCAPTCHA - Configuration"
option_groups:
  general:
    - name: siteKeyV2
      type: string
      default: "<code>$_ENV['RECAPTCHA_SITE_KEY_V2']</code> or <code>''</code>"
      desc: "Public site key for <code>RecaptchaV2Field</code>, used as the fallback when a field doesn't call <code>withSiteKey()</code>."
    - name: secretV2
      type: string
      default: "<code>$_ENV['RECAPTCHA_SECRET_V2']</code> or <code>''</code>"
      desc: "Secret key used to verify v2 tokens server-side, unless a rule overrides it with its own <code>secret</code>."
    - name: siteKeyV3
      type: string
      default: "<code>$_ENV['RECAPTCHA_SITE_KEY_V3']</code> or <code>''</code>"
      desc: "Public site key for <code>RecaptchaV3Field</code>, used as the fallback when a field doesn't call <code>withSiteKey()</code>."
    - name: secretV3
      type: string
      default: "<code>$_ENV['RECAPTCHA_SECRET_V3']</code> or <code>''</code>"
      desc: "Secret key used to verify v3 tokens server-side, unless a rule overrides it with its own <code>secret</code>."
    - name: verifyUrl
      type: string
      default: "<code>'https://www.google.com/recaptcha/api/siteverify'</code>"
      desc: "Google's siteverify endpoint used by <code>RecaptchaClient</code>."
    - name: sendRemoteIp
      type: bool
      default: "<code>false</code>"
      desc: "Include the visitor's IP address in verification requests, unless a rule overrides it with its own <code>sendRemoteIp</code>."
    - name: themeV2
      type: RecaptchaV2Theme
      default: "<code>RecaptchaV2Theme::Light</code>"
      desc: "App-wide default theme for every <code>RecaptchaV2Field</code> (<code>Light</code> or <code>Dark</code>), unless a field overrides it with <code>->withTheme()</code>."
    - name: sizeV2
      type: RecaptchaV2Size
      default: "<code>RecaptchaV2Size::Normal</code>"
      desc: "App-wide default size for every <code>RecaptchaV2Field</code> (<code>Normal</code>, <code>Compact</code>, or <code>Invisible</code>), unless a field overrides it with <code>->withSize()</code>."
    - name: typeV2
      type: RecaptchaV2Type
      default: "<code>RecaptchaV2Type::Image</code>"
      desc: "App-wide default challenge type for every <code>RecaptchaV2Field</code> (<code>Image</code> or <code>Audio</code>), unless a field overrides it with <code>->withType()</code>."
    - name: badgeV3
      type: RecaptchaV3Badge
      default: "<code>RecaptchaV3Badge::BottomRight</code>"
      desc: "App-wide default badge for every <code>RecaptchaV3Field</code> (<code>BottomRight</code>, <code>BottomLeft</code>, or <code>Hidden</code>), unless a field overrides it with <code>->withBadge()</code>."
  container:
    - name: container.useContainer
      type: bool
      default: "<code>true</code>"
      desc: "Enable/disable the wrapper element."
    - name: container.tag
      type: string
      default: "<code>'div'</code>"
      desc: "Wrapper tag."
    - name: container.attributes
      type: array
      default: "<code>['class' => 'mb-3']</code>"
      desc: "Wrapper HTML attributes."
---

<p class="mb-3" markdown="1">Set your site keys and secret keys via environment variables or directly in `config/params.php`:</p>
<div class="mb-3 small lh-base">
{% highlight php %}
'yiirocks/recaptcha' => [
    'siteKeyV3' => $_ENV['RECAPTCHA_SITE_KEY_V3'],
    'secretV3' => $_ENV['RECAPTCHA_SECRET_V3'],
    'sendRemoteIp' => true,
    'themeV2' => RecaptchaV2Theme::Dark,
    'badgeV3' => RecaptchaV3Badge::Hidden,
    'container' => [
        'useContainer' => false,
    ],
],
{% endhighlight %}
</div>

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">General</h3>
{% include options_table.md options=page.option_groups.general %}

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Container Defaults</h3>
<p class="mb-3" markdown="1">Applied to every field's wrapper unless overridden per-field via `->useContainer()`,
`->containerTag()`, or `->containerAttributes()` - see [v2](/recaptcha/v2/) and
[v3](/recaptcha/v3/).</p>
{% include options_table.md options=page.option_groups.container %}
