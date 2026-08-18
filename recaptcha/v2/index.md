---
layout: package-section
pkgId: recaptcha
section: v2
title: "reCAPTCHA - v2"
---

<h4>Field</h4>
<div class="doc-example mb-3">
{% highlight php %}
use YiiRocks\Recaptcha\RecaptchaV2Field;
use YiiRocks\Recaptcha\RecaptchaV2Theme;
use YiiRocks\Recaptcha\RecaptchaV2Size;
use YiiRocks\Recaptcha\RecaptchaV2Type;

echo RecaptchaV2Field::field($form, 'captcha')
    ->withTheme(RecaptchaV2Theme::Dark)
    ->withSize(RecaptchaV2Size::Compact)
    ->withType(RecaptchaV2Type::Audio)
    ->withId('my-captcha')
    ->withCallback('onSuccess')
    ->render();
{% endhighlight %}
</div>

<h4>Options</h4>
<div class="options-table mb-3">
            <div class="options-row">
                <div class="options-name-col">
                    <div class="options-name">withSiteKey<span class="options-type">(string)</span></div>
                    <div class="options-default"><code>from config</code></div>
                </div>
                <div class="options-desc">Explicit site key override. Optional - pulled from config by default.</div>
            </div>
            <div class="options-row">
                <div class="options-name-col">
                    <div class="options-name">withId<span class="options-type">(string)</span></div>
                    <div class="options-default"><code>'g-recaptcha-{uniqid}'</code></div>
                </div>
                <div class="options-desc">Widget element ID.</div>
            </div>
            <div class="options-row">
                <div class="options-name-col">
                    <div class="options-name">withTheme<span class="options-type">(RecaptchaV2Theme)</span></div>
                    <div class="options-default"><code>themeV2</code> param, else <code>Light</code></div>
                </div>
                <div class="options-desc"><code>Light</code> or <code>Dark</code>. Overrides the app-wide <a href="/recaptcha/config/"><code>themeV2</code></a> default for this field.</div>
            </div>
            <div class="options-row">
                <div class="options-name-col">
                    <div class="options-name">withType<span class="options-type">(RecaptchaV2Type)</span></div>
                    <div class="options-default"><code>typeV2</code> param, else <code>Image</code></div>
                </div>
                <div class="options-desc"><code>Image</code> or <code>Audio</code>. Overrides the app-wide <a href="/recaptcha/config/"><code>typeV2</code></a> default for this field.</div>
            </div>
            <div class="options-row">
                <div class="options-name-col">
                    <div class="options-name">withSize<span class="options-type">(RecaptchaV2Size)</span></div>
                    <div class="options-default"><code>sizeV2</code> param, else <code>Normal</code></div>
                </div>
                <div class="options-desc"><code>Normal</code>, <code>Compact</code>, or <code>Invisible</code>. Overrides the app-wide <a href="/recaptcha/config/"><code>sizeV2</code></a> default for this field.</div>
            </div>
            <div class="options-row">
                <div class="options-name-col">
                    <div class="options-name">withJsApiUrl<span class="options-type">(string)</span></div>
                    <div class="options-default">Google CDN</div>
                </div>
                <div class="options-desc">Custom JS API URL.</div>
            </div>
            <div class="options-row">
                <div class="options-name-col">
                    <div class="options-name">withCallback<span class="options-type">(string)</span></div>
                </div>
                <div class="options-desc">JavaScript callback function name on successful verification.</div>
            </div>
            <div class="options-row">
                <div class="options-name-col">
                    <div class="options-name">withExpiredCallback<span class="options-type">(string)</span></div>
                </div>
                <div class="options-desc">JavaScript callback function name when the CAPTCHA expires.</div>
            </div>
            <div class="options-row">
                <div class="options-name-col">
                    <div class="options-name">withErrorCallback<span class="options-type">(string)</span></div>
                </div>
                <div class="options-desc">JavaScript callback function name when an error occurs.</div>
            </div>
</div>

<h4 class="doc-section-heading">Inherited from InputField</h4>
<div class="options-table mb-3">
            <div class="options-row">
                <div class="options-name-col">
                    <div class="options-name">-&gt;name<span class="options-type">(string)</span></div>
                    <div class="options-default">auto-derived from form model as <code>FormName[attribute]</code></div>
                </div>
                <div class="options-desc">Override the hidden input name.</div>
            </div>
            <div class="options-row">
                <div class="options-name-col">
                    <div class="options-name">-&gt;inputId<span class="options-type">(?string)</span></div>
                    <div class="options-default">auto-generated unique ID</div>
                </div>
                <div class="options-desc">Override the hidden input ID.</div>
            </div>
</div>

<h4 class="doc-section-heading">Container (inherited from BaseField)</h4>
<div class="options-table mb-3">
            <div class="options-row">
                <div class="options-name-col">
                    <div class="options-name">-&gt;containerTag<span class="options-type">(string)</span></div>
                    <div class="options-default"><code>'div'</code></div>
                </div>
                <div class="options-desc">Wrapper tag.</div>
            </div>
            <div class="options-row">
                <div class="options-name-col">
                    <div class="options-name">-&gt;containerClass<span class="options-type">(string ...)</span></div>
                    <div class="options-default"><code>'mb-3'</code></div>
                </div>
                <div class="options-desc">Wrapper CSS class(es).</div>
            </div>
            <div class="options-row">
                <div class="options-name-col">
                    <div class="options-name">-&gt;useContainer<span class="options-type">(bool)</span></div>
                    <div class="options-default"><code>true</code></div>
                </div>
                <div class="options-desc">Enable/disable wrapper.</div>
            </div>
            <div class="options-row">
                <div class="options-name-col">
                    <div class="options-name">-&gt;containerAttributes<span class="options-type">(array)</span></div>
                </div>
                <div class="options-desc">Set all wrapper attributes.</div>
            </div>
            <div class="options-row">
                <div class="options-name-col">
                    <div class="options-name">-&gt;addContainerAttributes<span class="options-type">(array)</span></div>
                </div>
                <div class="options-desc">Merge additional wrapper attributes.</div>
            </div>
</div>

<h4>Validation</h4>
<p>Use the attribute on your form model property:</p>
<div class="doc-example mb-3">
{% highlight php %}
use YiiRocks\Recaptcha\RecaptchaV2Rule;

final class ContactForm
{
    #[RecaptchaV2Rule(sendRemoteIp: true)]
    public string $gRecaptchaResponse = '';
}
{% endhighlight %}
</div>

<h4 class="doc-section-heading">Rule parameters</h4>
<div class="options-table mb-3">
            <div class="options-row">
                <div class="options-name-col">
                    <div class="options-name">message</div>
                    <div class="options-default"><code>'The CAPTCHA verification failed.'</code></div>
                </div>
                <div class="options-desc">Error message (translatable).</div>
            </div>
            <div class="options-row">
                <div class="options-name-col">
                    <div class="options-name">secret</div>
                    <div class="options-default"><code>null</code></div>
                </div>
                <div class="options-desc">Custom secret (uses config default if <code>null</code>).</div>
            </div>
            <div class="options-row">
                <div class="options-name-col">
                    <div class="options-name">sendRemoteIp</div>
                    <div class="options-default"><code>false</code></div>
                </div>
                <div class="options-desc">Whether to include the user's IP in verification.</div>
            </div>
</div>
