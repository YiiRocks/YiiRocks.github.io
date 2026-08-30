---
layout: package-section
pkgId: voyti
section: middleware
title: "Voyti - Middleware"
middleware_groups:
  core:
    - name: "AccessRuleMiddleware"
      desc: "Redirects guests to the login page (<code>voyti/session-login</code>); checks <code>administratorPermissionName</code> for admin access"
      auto: "Yes - on <code>admin/*</code> (users and RBAC management)"
    - name: "RequireLoginMiddleware"
      desc: "Redirects guests to the login page (<code>voyti/session-login</code>); unlike <code>AccessRuleMiddleware</code>, only requires an authenticated user, not an admin permission. Returns a JSON <code>401</code> instead when the request's <code>Accept</code> header includes <code>application/json</code>"
      auto: "Yes - on <code>settings/*</code> (profile, account, social authentication, sessions, privacy, two-factor authentication)"
    - name: "RememberMeMiddleware"
      desc: "Logs a guest back in from the <code>autoLogin</code> remember-me cookie, then writes the cookie back onto the response - either the immediate reissue after a session rotation or the periodic sliding-expiration refresh. Must run after session middleware and before the enforcement middleware below, since those need <code>CurrentUser</code> already resolved"
      auto: "Yes"
    - name: "SessionRevocationEnforceMiddleware"
      desc: "Logs out and redirects to the login page (<code>voyti/session-login</code>) when the current session's <code>user_sessions</code> row is gone - i.e. it was terminated from the sessions list (self-service or admin) on another request. Without this, terminating a session only removed the row; the browser that owned it stayed logged in until its PHP session expired on its own. Otherwise touches the row's <code>updated_at</code> on every request, so the sessions list can show \"last seen\" activity per device."
      auto: "Yes"
    - name: "PasswordAgeEnforceMiddleware"
      desc: "Redirects to the account settings page (<code>voyti/user-account</code>) when <code>maxPasswordAge</code> is exceeded"
      auto: "Yes, when <code>maxPasswordAge</code> is greater than <code>0</code>"
    - name: "VoytiMiddleware"
      desc: "Convenience wrapper that runs <code>RememberMeMiddleware</code> first, then every middleware tagged <code>voyti.enforce-middleware</code> - core contributes <code>SessionRevocationEnforceMiddleware</code> and <code>PasswordAgeEnforceMiddleware</code>, and installed packages contribute their own"
      auto: "No, add it to the <code>Group</code> wrapping your app's own routes. Make sure to place it after <code>SessionMiddleware</code> so <code>CurrentUser</code> is resolvable. Each sub-middleware checks its own feature flag, so disabled features are no-ops. Keep it scoped to your own routes, not the <code>voyti-routes</code> group."
  twofactor:
    - name: "TwoFactorAuthenticationEnforceMiddleware"
      desc: "Enforces 2FA for users with <code>forcedPermissions</code> by redirecting to the settings page (<code>voyti/user-two-factor</code>) with an explanatory message. Two-factor and logout routes remain accessible during setup"
      auto: "Yes"
  social:
    - name: "CaptureAuthActionRequestMiddleware"
      desc: "Stores the real incoming request so it survives past <code>yiisoft/yii-auth-client</code>'s <code>AuthAction</code>, which never forwards it to its success/cancel callbacks - needed so social login can complete through the same <code>LoginCompletionService::complete()</code> path password login uses"
      auto: 'Yes - wraps the whole <a href="/voyti/social/">social authentication</a> route group'
---

Core ships {{ page.middleware_groups.core | size }} PSR-15 middleware classes for session handling and access control; installed
sibling packages can contribute their own on top.

<p class="text-muted small" markdown="1">Namespace: `YiiRocks\Voyti\Middleware`</p>
{% include middleware_table.md middleware=page.middleware_groups.core %}

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">2FA</h3>
<p class="text-muted small" markdown="1">Namespace: `YiiRocks\Voyti\TwoFactor\Middleware`</p>
{% include middleware_table.md middleware=page.middleware_groups.twofactor %}

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Social Authentication</h3>
<p class="text-muted small" markdown="1">Namespace: `YiiRocks\Voyti\SocialAuth\Middleware`</p>
{% include middleware_table.md middleware=page.middleware_groups.social %}

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label" id="site-wide-enforcement">Site-wide enforcement</h3>

The auto-registration above only covers routes <em>this extension defines</em>. Without
`VoytiMiddleware` wrapping your routes, a user with an expired password, missing 2FA, or
a revoked session can still browse your app's own dashboard, home page, or any other route outside
this extension - and a visitor with a valid remember-me cookie won't be logged back in either.
