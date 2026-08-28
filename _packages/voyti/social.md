---
layout: package-section
pkgId: voyti
section: social
title: "Voyti - Social Authentication"
option_groups:
  config:
    - name: enableSocialAuthRegistration
      type: bool
      default: "<code>true</code>"
      desc: "Whether a guest signing in via a configured provider can be logged in or auto-registered. When disabled, social sign-in attempts fail regardless of provider configuration."
    - name: allowMultipleAccountsPerProvider
      type: bool
      default: "<code>false</code>"
      desc: "Whether a single user may link more than one account from the same provider."
routes:
  - { name: "voyti/session-auth", method: "GET", path: "auth/{authclient}", purpose: "OAuth2 callback - the provider redirects here after authorization" }
  - { name: "voyti/registration-connect", method: "GET", path: "connect/{code}", purpose: "Registration connect screen - link the pending social identity to an existing account or register a new one" }
  - { name: "voyti/user-social-auth", method: "GET", path: "settings/social/", purpose: "Social authentication settings page - list connected accounts and connect more. Login required" }
  - { name: "voyti/user-social-auth-delete", method: "POST", path: "settings/social/disconnect/{id}", purpose: "Disconnect a linked social account. Login required" }
---

<p markdown="1">Social/OAuth2 login ships as a separate package, `yiirocks/voyti-social-auth`. It builds on
[yiisoft/yii-auth-client](https://github.com/yiisoft/yii-auth-client), which handles all OAuth2
protocol logic - Voyti adds the callback routing, account linking, and registration flow, plus the
`user_social_account` table.</p>

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Installation</h3>
{% include install_block.md package="yiirocks/voyti-social-auth" repo="voyti-social-auth" %}
<div>
<p markdown="1">
            Run your migration command to create the `user_social_account` table after installation:
</p>
            <button type="button" data-clipboard class="btn btn-outline-primary fw-medium text-start text-nowrap overflow-hidden font-monospace mb-3">./yii migrate:up</button>
</div>

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Configuration</h3>
<div class="mb-3 small lh-base">
{% highlight php %}
// config/params.php
return [
    'yiirocks/voyti' => [
        'social-auth' => [
            'allowMultipleAccountsPerProvider' => true,
        ],
    ],
];
{% endhighlight %}
</div>
{% include options_table.md options=page.option_groups.config %}

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Provider configuration</h3>

<p class="mb-3" markdown="1">Configure providers via a `clients` map under the `yiisoft/yii-auth-client` params key. The package
automatically sets each client's OAuth2 return URL to match its config key.</p>

<p class="mb-3" markdown="1">To customize OAuth2 request parameters, add an `authParams` key to your client config.</p>
<div class="mb-3 small lh-base">
{% highlight php %}
// config/params.php
return [
    'yiisoft/yii-auth-client' => [
        'clients' => [
            'github' => [
                'class' => \Yiisoft\Yii\AuthClient\Client\GitHub::class,
                'clientId' => $_ENV['GITHUB_CLIENT_ID'],
                'clientSecret' => $_ENV['GITHUB_CLIENT_SECRET'],
            ],
            'google' => [
                'class' => \Yiisoft\Yii\AuthClient\Client\Google::class,
                'clientId' => $_ENV['GOOGLE_CLIENT_ID'],
                'clientSecret' => $_ENV['GOOGLE_CLIENT_SECRET'],
                'authParams' => [
                    'prompt' => 'select_account',  // Request account-selection screen (optional)
                ],
            ],
        ],
    ],
];
{% endhighlight %}
</div>
<p class="mb-3" markdown="1">Your config key becomes the callback URL:
`https://your-domain.tld/<prefix>/auth/<key>`. Provider developer consoles require an
exact match, so finalize your keys before registering the OAuth app.</p>

<p markdown="1">See the
[yii-auth-client Quick Start](https://github.com/yiisoft/yii-auth-client/blob/master/docs/guide/en/quick-start.md)
for per-client options (custom scope, extra auth-URL parameters, etc.). Refer to your provider's
OAuth2 documentation for available `authParams`.</p>

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Routes</h3>
{% include route_table.md routes=page.routes %}

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Supported providers</h3>

<p class="mb-3" markdown="1">yii-auth-client ships ten branded provider classes, each with its own
`Yiisoft\Yii\AuthClient\Client\*` class (plus a generic `Client\OpenIdConnect` for self-hosted
OIDC). Defaults (scope, endpoints) come from the vendor client's DI configuration.</p>
<div class="table-responsive">
            <table class="table table-sm table-striped">
                <thead class="fw-bold text-uppercase text-nowrap">
                    <tr>
                        <th>Vendor class</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td><code>Client\Discord</code></td><td>Requests <code>identify email</code> scopes by default - <code>identify</code> provides basic user info, <code>email</code> provides email access.</td></tr>
                    <tr><td><code>Client\Facebook</code></td><td>The vendor client's default requested fields don't include email; same as GitHub, the package leaves it null rather than issuing a secondary Graph API call.</td></tr>
                    <tr><td><code>Client\GitHub</code></td><td>If <code>/user</code> doesn't include an email (private-email accounts), <code>email</code> is left null - the user supplies it during registration.</td></tr>
                    <tr><td><code>Client\Google</code></td><td>Standard <code>id</code>/<code>email</code>/<code>name</code> claims.</td></tr>
                    <tr><td><code>Client\LinkedIn</code></td><td>Identity comes from the OIDC-style <code>sub</code> claim rather than <code>id</code>.</td></tr>
                    <tr><td><code>Client\Microsoft</code></td><td>Hits the raw Microsoft Graph <code>/v1.0/me</code> endpoint (email under <code>mail</code>, name under <code>displayName</code>). Multi-tenant apps just add a <code>tenant</code> key to the <code>clients</code> entry - the client resolves its <code>authUrl</code>/<code>tokenUrl</code> placeholder against it internally.</td></tr>
                    <tr><td><code>Client\TikTok</code></td><td>Identity comes from <code>open_id</code> rather than <code>id</code>. Never returns email.</td></tr>
                    <tr><td><code>Client\VKontakte</code></td><td>Uses the newer VK ID endpoints (<code>id.vk.ru</code>) rather than the legacy <code>oauth.vk.com</code>/<code>api.vk.com</code> ones. The response has no username-like field at all - falls back to the email's local part.</td></tr>
                    <tr><td><code>Client\X</code></td><td>Response is unwrapped from its <code>data</code> envelope. Never returns email (X API v2 doesn't expose it without elevated access).</td></tr>
                    <tr><td><code>Client\Yandex</code></td><td>Email read from <code>default_email</code>.</td></tr>
                </tbody>
            </table>
</div>

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">How it works</h3>
<p class="mb-3">With providers configured:</p>

- The login page shows social login buttons for configured providers.
- The Social Authentication page lists every connected account and renders connect buttons for providers.
- New social identities redirect to the registration connect screen, where users can log in to an
  existing account or register a new one before the identity is linked.
- A successful sign-in for an already-connected account completes through the same login path
  password login uses, so `BeforeLoginEvent` (cancellable, e.g. for fraud checks) and
  `AfterLoginEvent` fire for social logins too, and remember-me is always applied.

Self-hosted OpenID Connect providers are not built-in. Use yii-auth-client's generic
	`Client\OpenIdConnect` class, configured the same way as other clients above.
