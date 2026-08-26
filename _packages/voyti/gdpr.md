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
routes:
  - { name: "voyti/user-privacy-export", method: "GET", path: "settings/privacy/export", purpose: "Download personal data as a JSON attachment" }
  - { name: "voyti/user-privacy-anonymize", method: "GET, POST", path: "settings/privacy/anonymize", purpose: "Anonymize account (password-confirmed). Masks email/username, blocks login, rotates the auth key; the row itself is kept" }
---

<p markdown="1">Data export and account anonymization ship as a separate package, `yiirocks/voyti-gdpr`. Core only
ever collects mandatory personal-data-processing consent at signup and offers hard account
deletion. Export and anonymization are optional, and this package provides this. It reuses core's
`ConsentForm` for password re-confirmation, and core's `User`, `UserProfile`, and `UserSessions`
models to build the export. When [`yiirocks/voyti-social-auth`](/voyti/social/) is also installed,
connected social accounts are included in the export too.</p>

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Installation</h3>
{% include install_block.md package="yiirocks/voyti-gdpr" repo="voyti-gdpr" %}

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Configuration</h3>
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

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Routes</h3>
{% include route_table.md routes=page.routes %}

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Events</h3>

<p markdown="1">Anonymizing an account dispatches `GdprEvent` (carrying the now-anonymized `User`) after it's
saved. Nothing consumes it by default. Attach your own listener via the event dispatcher
configuration for things like admin notification or downstream data-retention cleanup.</p>
