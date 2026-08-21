---
layout: package-section
pkgId: recaptcha
section: config
title: "reCAPTCHA - Configuration"
---

<p>
            Set your site keys and secret keys via environment variables
            or directly in <code>config/params.php</code>:
</p>
<div class="doc-example mb-3">
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

<h4 class="doc-h">General</h4>
<div class="opt-grid mb-3">
            <div class="opt-row">
                <div class="opt-name">
                    <div class="opt-label">siteKeyV2<span class="opt-type"> string</span></div>
                    <div class="opt-default"><code>$_ENV['RECAPTCHA_SITE_KEY_V2']</code>, or <code>''</code> if unset</div>
                </div>
                <div class="opt-desc">Public site key for <code>RecaptchaV2Field</code>, used as the fallback when a field doesn't call <code>withSiteKey()</code>.</div>
            </div>
            <div class="opt-row">
                <div class="opt-name">
                    <div class="opt-label">secretV2<span class="opt-type"> string</span></div>
                    <div class="opt-default"><code>$_ENV['RECAPTCHA_SECRET_V2']</code>, or <code>''</code> if unset</div>
                </div>
                <div class="opt-desc">Secret key used to verify v2 tokens server-side, unless a rule overrides it with its own <code>secret</code>.</div>
            </div>
            <div class="opt-row">
                <div class="opt-name">
                    <div class="opt-label">siteKeyV3<span class="opt-type"> string</span></div>
                    <div class="opt-default"><code>$_ENV['RECAPTCHA_SITE_KEY_V3']</code>, or <code>''</code> if unset</div>
                </div>
                <div class="opt-desc">Public site key for <code>RecaptchaV3Field</code>, used as the fallback when a field doesn't call <code>withSiteKey()</code>.</div>
            </div>
            <div class="opt-row">
                <div class="opt-name">
                    <div class="opt-label">secretV3<span class="opt-type"> string</span></div>
                    <div class="opt-default"><code>$_ENV['RECAPTCHA_SECRET_V3']</code>, or <code>''</code> if unset</div>
                </div>
                <div class="opt-desc">Secret key used to verify v3 tokens server-side, unless a rule overrides it with its own <code>secret</code>.</div>
            </div>
            <div class="opt-row">
                <div class="opt-name">
                    <div class="opt-label">verifyUrl<span class="opt-type"> string</span></div>
                    <div class="opt-default"><code>'https://www.google.com/recaptcha/api/siteverify'</code></div>
                </div>
                <div class="opt-desc">Google's siteverify endpoint used by <code>RecaptchaClient</code>.</div>
            </div>
            <div class="opt-row">
                <div class="opt-name">
                    <div class="opt-label">sendRemoteIp<span class="opt-type"> bool</span></div>
                    <div class="opt-default"><code>false</code></div>
                </div>
                <div class="opt-desc">Include the visitor's IP address in verification requests, unless a rule overrides it with its own <code>sendRemoteIp</code>.</div>
            </div>
            <div class="opt-row">
                <div class="opt-name">
                    <div class="opt-label">themeV2<span class="opt-type"> RecaptchaV2Theme</span></div>
                    <div class="opt-default"><code>RecaptchaV2Theme::Light</code></div>
                </div>
                <div class="opt-desc">App-wide default theme for every <code>RecaptchaV2Field</code> (<code>Light</code> or <code>Dark</code>), unless a field overrides it with <code>-&gt;withTheme()</code>.</div>
            </div>
            <div class="opt-row">
                <div class="opt-name">
                    <div class="opt-label">sizeV2<span class="opt-type"> RecaptchaV2Size</span></div>
                    <div class="opt-default"><code>RecaptchaV2Size::Normal</code></div>
                </div>
                <div class="opt-desc">App-wide default size for every <code>RecaptchaV2Field</code> (<code>Normal</code>, <code>Compact</code>, or <code>Invisible</code>), unless a field overrides it with <code>-&gt;withSize()</code>.</div>
            </div>
            <div class="opt-row">
                <div class="opt-name">
                    <div class="opt-label">typeV2<span class="opt-type"> RecaptchaV2Type</span></div>
                    <div class="opt-default"><code>RecaptchaV2Type::Image</code></div>
                </div>
                <div class="opt-desc">App-wide default challenge type for every <code>RecaptchaV2Field</code> (<code>Image</code> or <code>Audio</code>), unless a field overrides it with <code>-&gt;withType()</code>.</div>
            </div>
            <div class="opt-row">
                <div class="opt-name">
                    <div class="opt-label">badgeV3<span class="opt-type"> RecaptchaV3Badge</span></div>
                    <div class="opt-default"><code>RecaptchaV3Badge::BottomRight</code></div>
                </div>
                <div class="opt-desc">App-wide default badge for every <code>RecaptchaV3Field</code> (<code>BottomRight</code>, <code>BottomLeft</code>, or <code>Hidden</code>), unless a field overrides it with <code>-&gt;withBadge()</code>.</div>
            </div>
</div>

<h4 class="doc-h">Container Defaults</h4>
<p>
            Applied to every field's wrapper unless overridden per-field via
            <code>-&gt;useContainer()</code>, <code>-&gt;containerTag()</code>, or
            <code>-&gt;containerAttributes()</code> - see <a href="/recaptcha/v2/">v2</a> and
            <a href="/recaptcha/v3/">v3</a>.
</p>
<div class="opt-grid mb-3">
            <div class="opt-row">
                <div class="opt-name">
                    <div class="opt-label">container.useContainer<span class="opt-type"> bool</span></div>
                    <div class="opt-default"><code>true</code></div>
                </div>
                <div class="opt-desc">Enable/disable the wrapper element.</div>
            </div>
            <div class="opt-row">
                <div class="opt-name">
                    <div class="opt-label">container.tag<span class="opt-type"> string</span></div>
                    <div class="opt-default"><code>'div'</code></div>
                </div>
                <div class="opt-desc">Wrapper tag.</div>
            </div>
            <div class="opt-row">
                <div class="opt-name">
                    <div class="opt-label">container.attributes<span class="opt-type"> array</span></div>
                    <div class="opt-default"><code>['class' => 'mb-3']</code></div>
                </div>
                <div class="opt-desc">Wrapper HTML attributes.</div>
            </div>
</div>
