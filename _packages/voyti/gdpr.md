---
layout: package-section
pkgId: voyti
section: gdpr
title: "Voyti - GDPR"
option_groups:
  config:
    - name: gdprExportProperties
      type: array
      default: "<code>['email', 'username', 'userProfile.public_email', 'userProfile.name', 'userProfile.gravatar_email', 'userProfile.location', 'userProfile.website', 'userProfile.bio', 'userProfile.birthday', 'userSessions', 'userSocialAccount']</code>"
      desc: "Properties included in the data export (JSON). Unrecognized names are silently omitted, not exported as <code>null</code>. <code>userSessions</code> exports each login's <code>ip</code>, <code>user_agent</code>, <code>created_at</code>, <code>updated_at</code>; <code>userSocialAccount</code> exports each linked account's <code>provider</code>, <code>username</code>, <code>email</code>, <code>created_at</code>, and <code>data</code> (the decoded provider profile payload)."
    - name: gdprAnonymizePrefix
      type: string
      default: "<code>'GDPR'</code>"
      desc: "Prefix used for the masked email/username on anonymization, followed by the user's numeric id (e.g. <code>GDPR42</code>, <code>GDPR42@example.com</code>)."
---

Data export and account anonymization ship as a separate package, `yiirocks/voyti-gdpr`. Core only
ever collects mandatory personal-data-processing consent at signup and offers hard account
deletion. Export and anonymization are optional, and this package provides this. It reuses core's
`ConsentForm` for password re-confirmation, and core's `User`, `UserProfile`, and `UserSessions`
models to build the export. When [`yiirocks/voyti-social-auth`](/voyti/social/) is also installed,
connected social accounts are included in the export too.

<h5 class="text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Installation</h5>
{% include install_block.md package="yiirocks/voyti-gdpr" repo="voyti-gdpr" %}

<h5 class="text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Configuration</h5>
<div class="mb-3 small lh-base">
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
{% include options_table.md options=page.option_groups.config %}

<h5 class="text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Routes</h5>
<div class="table-responsive">
            <table class="table table-sm table-striped">
                <thead class="fw-bold text-uppercase text-nowrap">
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

<h5 class="text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Events</h5>

Anonymizing an account dispatches `GdprEvent` (carrying the now-anonymized `User`) after it's
saved. Nothing consumes it by default. Attach your own listener via the event dispatcher
configuration for things like admin notification or downstream data-retention cleanup.
