---
layout: package-section
pkgId: voyti
section: gdpr
title: "Voyti - GDPR"
---

<p>
            Data export and account anonymization ship as a separate package,
            <code>yiirocks/voyti-gdpr</code>. Core only ever collects mandatory
            personal-data-processing consent at signup and offers hard account
            deletion. Export and anonymization are optional, and this package
           provides this. It reuses core's <code>ConsentForm</code> for password
           re-confirmation, and core's <code>User</code>, <code>UserProfile</code>,
           and <code>UserSessions</code> models to build the export. When
           <a href="/voyti/social/"><code>yiirocks/voyti-social-auth</code></a>
           is also installed, connected social accounts are included in the
           export too.
</p>

<h4 class="doc-section-heading">Installation</h4>
<div class="mb-4 d-flex align-items-center gap-3 flex-wrap">
            <button type="button" class="copy-btn copy-btn--inline">composer require yiirocks/voyti-gdpr</button>
            <a href="https://github.com/YiiRocks/voyti-gdpr/issues" target="_blank" rel="noopener" class="docs-entry__link docs-entry__link--docs">Create an issue &rarr;</a>
            <div class="d-flex gap-2 flex-wrap ms-auto">
                <a href="https://github.com/YiiRocks/voyti-gdpr" target="_blank" rel="noopener" class="docs-entry__link docs-entry__link--github">GitHub &rarr;</a>
                <a href="https://packagist.org/packages/yiirocks/voyti-gdpr" target="_blank" rel="noopener" class="docs-entry__link docs-entry__link--packagist">Packagist &rarr;</a>
            </div>
</div>

<h4 class="doc-section-heading">Configuration</h4>
<div class="doc-example mb-3">
{% highlight php %}
// config/params.php
return [
    'yiirocks/voyti' => [
        'gdpr' => [
            'gdprAnonymizePrefix' => 'GDPR',
        ],
    ],
];
{% endhighlight %}
</div>
<div class="options-table mb-3">
            <div class="options-row">
                <div class="options-name-col">
                    <div class="options-name">gdprExportProperties<span class="options-type"> array</span></div>
                    <div class="options-default"><code>['email', 'username', 'userProfile.public_email', 'userProfile.name', 'userProfile.gravatar_email', 'userProfile.location', 'userProfile.website', 'userProfile.bio', 'userProfile.birthday', 'userSessions', 'userSocialAccount']</code></div>
                </div>
                <div class="options-desc">Properties included in the data export (JSON). Unrecognized names are silently omitted, not exported as <code>null</code>. <code>userSessions</code> exports each login's <code>ip</code>, <code>user_agent</code>, <code>created_at</code>, <code>updated_at</code>; <code>userSocialAccount</code> exports each linked account's <code>provider</code>, <code>username</code>, <code>email</code>, <code>created_at</code>, and <code>data</code> (the decoded provider profile payload).</div>
            </div>
            <div class="options-row">
                <div class="options-name-col">
                    <div class="options-name">gdprAnonymizePrefix<span class="options-type"> string</span></div>
                    <div class="options-default"><code>'GDPR'</code></div>
                </div>
                <div class="options-desc">Prefix used for the masked email/username on anonymization, followed by the user's numeric id (e.g. <code>GDPR42</code>, <code>GDPR42@example.com</code>).</div>
            </div>
</div>

<h4 class="doc-section-heading">Routes</h4>
<div class="table-responsive">
            <table class="table table-sm table-striped">
                <thead>
                    <tr>
                        <th>Route name</th>
                        <th>Method</th>
                        <th>Path</th>
                        <th>Purpose</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td><code>voyti/user-privacy-export</code></td><td><code>GET</code></td><td><code>settings/privacy/export</code></td><td>Download personal data as a JSON attachment</td></tr>
                    <tr><td><code>voyti/user-privacy-anonymize</code></td><td><code>GET, POST</code></td><td><code>settings/privacy/anonymize</code></td><td>Anonymize account (password-confirmed). Masks email/username, blocks login, rotates the auth key; the row itself is kept</td></tr>
                </tbody>
            </table>
</div>

<h4 class="doc-section-heading">Events</h4>
<p>
            Anonymizing an account dispatches <code>GdprEvent</code> (carrying the now-anonymized
            <code>User</code>) after it's saved. Nothing consumes it by default. Attach your own
            listener via the event dispatcher configuration for things like admin notification or
            downstream data-retention cleanup.
</p>
