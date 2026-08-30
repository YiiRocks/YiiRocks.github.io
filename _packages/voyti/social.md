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

Social/OAuth2 login ships as a separate package, `voyti-social-auth`. It builds on
[yiisoft/yii-auth-client](https://github.com/yiisoft/yii-auth-client), which handles all OAuth2
protocol logic - Voyti adds the callback routing, account linking, and registration flow, plus the
`user_social_account` table.

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

Configure providers via a `clients` map under the `yiisoft/yii-auth-client` params key. The package
automatically sets each client's OAuth2 return URL to match its config key.

To customize OAuth2 request parameters, add an `authParams` key to your client config.
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
Your config key becomes the callback URL: `https://your-domain.tld/<prefix>/auth/<key>`. Provider
developer consoles require an exact match, so finalize your keys before registering the OAuth app.

See the
[yii-auth-client Quick Start](https://github.com/yiisoft/yii-auth-client/blob/master/docs/guide/en/quick-start.md)
for per-client options (custom scope, extra auth-URL parameters, etc.). Refer to your provider's
OAuth2 documentation for available `authParams`.

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Routes</h3>
{% include route_table.md routes=page.routes %}

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Supported providers</h3>

yii-auth-client ships ten branded provider classes, each with its own
`Yiisoft\Yii\AuthClient\Client\*` class (plus a generic `Client\OpenIdConnect` for self-hosted
OIDC). Defaults (scope, endpoints) come from the vendor client's DI configuration.
<div class="table-responsive" markdown="1">
| Vendor class | Notes |
| ------------ | ----- |
| `Client\Discord` | Requests `identify email` scopes by default - `identify` provides basic user info, `email` provides email access. |
| `Client\Facebook` | The vendor client's default requested fields don't include email; same as GitHub, the package leaves it null rather than issuing a secondary Graph API call. |
| `Client\GitHub` | If `/user` doesn't include an email (private-email accounts), `email` is left null - the user supplies it during registration. |
| `Client\Google` | Standard `id`/`email`/`name` claims. |
| `Client\LinkedIn` | Identity comes from the OIDC-style `sub` claim rather than `id`. |
| `Client\Microsoft` | Hits the raw Microsoft Graph `/v1.0/me` endpoint (email under `mail`, name under `displayName`). Multi-tenant apps just add a `tenant` key to the `clients` entry - the client resolves its `authUrl`/`tokenUrl` placeholder against it internally. |
| `Client\TikTok` | Identity comes from `open_id` rather than `id`. Never returns email. |
| `Client\VKontakte` | Uses the newer VK ID endpoints (`id.vk.ru`) rather than the legacy `oauth.vk.com`/`api.vk.com` ones. The response has no username-like field at all - falls back to the email's local part. |
| `Client\X` | Response is unwrapped from its `data` envelope. Never returns email (X API v2 doesn't expose it without elevated access). |
| `Client\Yandex` | Email read from `default_email`. |
{: .table .table-sm .table-striped }
</div>

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">How it works</h3>
With providers configured:

- The login page shows social login buttons for configured providers.
- The Social Authentication page lists every connected account and renders connect buttons for providers.
- New social identities redirect to the registration connect screen, where users can log in to an
  existing account or register a new one before the identity is linked.
- A successful sign-in for an already-connected account completes through the same login path
  password login uses, so `BeforeLoginEvent` (cancellable, e.g. for fraud checks) and
  `AfterLoginEvent` fire for social logins too, and remember-me is always applied.

Self-hosted OpenID Connect providers are not built-in. Use yii-auth-client's generic
`Client\OpenIdConnect` class, configured the same way as other clients above.
