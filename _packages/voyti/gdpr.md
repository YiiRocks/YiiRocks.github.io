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

<h4 class="doc-h">Installation</h4>
{% include install_block.md package="yiirocks/voyti-gdpr" repo="voyti-gdpr" %}

<h4 class="doc-h">Configuration</h4>
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
{% include options_table.md options=page.option_groups.config %}

<h4 class="doc-h">Routes</h4>
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

<h4 class="doc-h">Events</h4>
<p>
            Anonymizing an account dispatches <code>GdprEvent</code> (carrying the now-anonymized
            <code>User</code>) after it's saved. Nothing consumes it by default. Attach your own
            listener via the event dispatcher configuration for things like admin notification or
            downstream data-retention cleanup.
</p>
