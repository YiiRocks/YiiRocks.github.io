---
layout: package-section
pkgId: voyti
section: stateless-client
title: "Voyti - Stateless Client API"
option_groups:
  social:
    - name: redirectUrl
      type: string
      default: "<code>''</code>"
      desc: "SPA URL the OAuth2 popup redirects to after a social login attempt, with either <code>?code=...</code> (success) or <code>?error=...</code> in the query string. Required for the social-auth bridge to work; requests fail with <code>500</code> until it's set."
public_routes:
  - { name: "voyti/api-v1-auth-login", method: "POST", path: "v1/auth/login", purpose: "Credential login. Returns a bearer token, or a <code>challenge_required</code> body if 2FA is enabled for the account" }
  - { name: "voyti/api-v1-auth-register", method: "POST", path: "v1/auth/register", purpose: "Self-registration" }
  - { name: "voyti/api-v1-auth-register-confirm", method: "GET", path: "v1/auth/register/confirm/{id}/{code}", purpose: "Confirm an emailed registration code" }
  - { name: "voyti/api-v1-auth-register-resend", method: "POST", path: "v1/auth/register/resend", purpose: "Resend the confirmation email" }
  - { name: "voyti/api-v1-auth-password-reset-request", method: "POST", path: "v1/auth/password-reset/request", purpose: "Request a password-recovery email" }
  - { name: "voyti/api-v1-auth-password-reset-confirm", method: "POST", path: "v1/auth/password-reset/confirm", purpose: "Set a new password from an emailed recovery code" }
self_routes:
  - { name: "voyti/api-v1-auth-logout", method: "POST", path: "v1/auth/logout", purpose: "Revoke the calling bearer token" }
  - { name: "voyti/api-v1-auth-me-show", method: "GET", path: "v1/auth/me", purpose: "The current account's profile" }
  - { name: "voyti/api-v1-auth-me-update", method: "PATCH", path: "v1/auth/me", purpose: "Update username/password directly; an email change is routed through the confirmation flow instead of applied immediately" }
  - { name: "voyti/api-v1-auth-sessions-index", method: "GET", path: "v1/auth/sessions", purpose: "List the account's active bearer tokens" }
  - { name: "voyti/api-v1-auth-sessions-terminate", method: "DELETE", path: "v1/auth/sessions/{id}", purpose: "Revoke one bearer token by its stored hash" }
admin_routes:
  - { name: "voyti/api-v1-audit-log-index", method: "GET", path: "v1/audit-log", purpose: "Paginated, filterable audit-log listing" }
  - { name: "voyti/api-v1-rbac-index", method: "GET", path: "v1/rbac/{itemType}", purpose: "List roles or permissions" }
  - { name: "voyti/api-v1-rbac-create", method: "POST", path: "v1/rbac/{itemType}", purpose: "Create a role or permission" }
  - { name: "voyti/api-v1-rbac-update", method: "PATCH", path: "v1/rbac/{itemType}/{name}", purpose: "Update name/description/rule/children" }
  - { name: "voyti/api-v1-rbac-delete", method: "DELETE", path: "v1/rbac/{itemType}/{name}", purpose: "Delete a role or permission" }
two_factor_routes:
  - { name: "voyti/api-v1-auth-challenge-verify", method: "POST", path: "v1/auth/challenge/verify", purpose: "Verify the 2FA code (or backup code, or WebAuthn-style payload) and receive the real bearer token" }
two_factor_management_routes:
  - { name: "voyti/api-v1-2fa-status", method: "GET", path: "v1/2fa", purpose: "Whether 2FA is enabled, which method, available methods, and whether unused backup codes remain" }
  - { name: "voyti/api-v1-2fa-enable", method: "POST", path: "v1/2fa/enable", purpose: "Enable a code-based method; returns a fresh set of backup codes" }
  - { name: "voyti/api-v1-2fa-disable", method: "POST", path: "v1/2fa/disable", purpose: "Disable 2FA (re-authentication required)" }
  - { name: "voyti/api-v1-2fa-backup-codes-regenerate", method: "POST", path: "v1/2fa/backup-codes/regenerate", purpose: "Invalidate existing backup codes and issue a fresh set (re-authentication required)" }
two_factor_setup_routes:
  - { name: "voyti/api-v1-2fa-totp-setup", method: "GET", path: "v1/2fa/totp/setup", purpose: "QR code and secret, reusing the account's existing pending secret if one exists" }
  - { name: "voyti/api-v1-2fa-totp-renew", method: "POST", path: "v1/2fa/totp/renew", purpose: "Always issues a fresh QR code and secret" }
  - { name: "voyti/api-v1-2fa-email-send-code", method: "POST", path: "v1/2fa/email/send-code", purpose: "Emails a fresh verification code" }
two_factor_webauthn_routes:
  - { name: "voyti/api-v1-2fa-webauthn-register-start", method: "POST", path: "v1/2fa/webauthn/register/start", purpose: "Builds the `navigator.credentials.create()` options and stashes the ceremony challenge" }
  - { name: "voyti/api-v1-2fa-webauthn-register-finish", method: "POST", path: "v1/2fa/webauthn/register/finish", purpose: "Verifies the attestation response, enables 2FA, and returns fresh backup codes" }
gdpr_routes:
  - { name: "voyti/api-v1-gdpr-export", method: "GET", path: "v1/gdpr/export", purpose: "Data export as JSON" }
  - { name: "voyti/api-v1-gdpr-anonymize", method: "POST", path: "v1/gdpr/anonymize", purpose: "Password-confirmed anonymization; also revokes every bearer token for the account" }
social_routes:
  - { name: "voyti/api-v1-auth-social-callback", method: "GET", path: "v1/auth/social/{authclient}", purpose: "Starts (and handles the provider's callback for) the OAuth2 popup flow" }
  - { name: "voyti/api-v1-auth-social-exchange", method: "POST", path: "v1/auth/social/exchange", purpose: "Trade the one-time code from the popup redirect for a real bearer token" }
---

A REST API for a browser-based single-page application, or SPA (or any other stateless client),
built on `voyti-api`'s bearer-token infrastructure: credential login/logout, self-registration,
password reset, own-profile and own-sessions management, plus admin RBAC and audit-log endpoints.

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Installation</h3>
{% include install_block.md package="yiirocks/voyti-api-stateless-client" repo="voyti-api-stateless-client" %}

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Authentication</h3>

`POST v1/auth/login` verifies a username/email + password and returns
`{"status": "ok", "token": "..."}` - a bearer token for the same
`Authorization: Bearer <token>` scheme `voyti-api` uses everywhere else. It replicates the exact
event sequence core's `SessionController::login()` dispatches
(`BeforeLoginEvent`/`FailedLoginEvent`/`AfterLoginEvent`), so [`voyti-lockout`](/voyti/lockout/) and
audit-log/session listeners work unmodified regardless of whether a login came from the HTML app or
this API. If the account has 2FA enabled, login instead returns a challenge - see below.

<p class="fw-semibold mb-2">Public</p>
{% include route_table.md routes=page.public_routes class="mb-3" %}
<p class="fw-semibold mb-2">Authenticated</p>
{% include route_table.md routes=page.self_routes %}

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Admin</h3>

Reuse the same admin-gated group `voyti-api-user`'s endpoints do
(`AccessRuleMiddleware` enforces `administratorPermissionName`). RBAC mirrors core's HTML admin
screen: `{itemType}` is `role` or `permission`. Per-user assignment management isn't included here
yet - it's a separate sub-resource, not a property of the item itself.

{% include route_table.md routes=page.admin_routes %}

<h3 id="two-factor-authentication" class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Two-factor authentication</h3>

When [`voyti-2fa`](/voyti/two-factor/) is installed, a login for an account with 2FA
enabled returns a challenge instead of a token:

<div class="mb-3 small lh-base">
{% highlight json %}
{ "status": "challenge_required", "challengeToken": "...", "method": "totp", "isCodeBased": true, "expiresIn": 300 }
{% endhighlight %}
</div>

Submit the code (or a backup code, or a WebAuthn-style `payload`/`domain` pair for
client-collected methods) along with the `challengeToken` to receive the real bearer token:

{% include route_table.md routes=page.two_factor_routes %}

Enrollment and management are also available - enabling/disabling a code-based method and
regenerating backup codes, mirroring the same re-authentication rule as the HTML settings page.
Enable returns a fresh set of backup codes directly in the response, since a JSON caller has no
follow-up reveal page to redirect to:

{% include route_table.md routes=page.two_factor_management_routes %}

A code-based method's own setup step must run first, or `enable` has nothing to verify a submitted
code against - mirroring each package's HTML setup screen. When
[`voyti-2fa-totp`](/voyti/two-factor/) is installed, `setup`/`renew` issue the QR code and secret;
`setup` reuses the account's existing secret, `renew` always issues a fresh one. When
[`voyti-2fa-email`](/voyti/two-factor/) is installed, `send-code` emails a fresh code (never
returned in the response - only the mailer sees it):

{% include route_table.md routes=page.two_factor_setup_routes %}

Registering a client-collected method (WebAuthn) isn't done through the generic action above - it
runs through its own dedicated ceremony. When [`voyti-2fa-webauthn`](/voyti/two-factor/) is
installed, the pending challenge normally kept in the session is instead persisted on the account's
own (not-yet-enabled) two-factor row between the two requests, since a bearer-token caller has no
session continuity across them:

{% include route_table.md routes=page.two_factor_webauthn_routes %}

<h3 id="gdpr" class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">GDPR</h3>

<p markdown="1">When [`voyti-gdpr`](/voyti/gdpr/) is installed, self-service data export and account
anonymization become available, delegating to that package's own `GdprExportService` and
`AnonymizeUserService`:</p>

{% include route_table.md routes=page.gdpr_routes %}

<h3 id="social-login" class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Social login</h3>

When [`voyti-social-auth`](/voyti/social/) is installed, a popup-based OAuth2 flow becomes
available. Unlike the HTML app's social login, this doesn't establish a session in the SPA itself -
the popup completes the provider round-trip, then redirects to `redirectUrl` with a short-lived,
single-use code rather than the bearer token directly, so the token never ends up in a URL or
browser history entry:

{% include route_table.md routes=page.social_routes %}

<div class="mb-3 small lh-base">
{% highlight php %}
// config/params.php
return [
    'yiirocks/voyti' => [
        'api' => [
            'social' => [
                'redirectUrl' => 'https://spa.example.com/oauth-callback',
            ],
        ],
    ],
];
{% endhighlight %}
</div>
{% include options_table.md options=page.option_groups.social %}

Only the guest-login path is supported: connecting a social account to an
already-authenticated user, and completing a "pending" account link that needs manual registration
first, both require request context this stateless popup callback doesn't have. Either case is
reported to the SPA as an `error` query parameter instead.
