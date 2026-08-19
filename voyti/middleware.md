---
layout: package-section
pkgId: voyti
section: middleware
title: "Voyti - Middleware"
---

<p>The extension ships seven PSR-15 middleware classes for session handling and access control:</p>
<table class="table table-sm table-striped">
            <thead>
                <tr>
                    <th>Middleware</th>
                    <th>Description</th>
                    <th>Auto-registered?</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><code>AccessRuleMiddleware</code></td>
                    <td>Redirects guests to the login page (<code>voyti/session-login</code>); checks <code>administratorPermissionName</code> for admin access</td>
                    <td>Yes - on <code>admin/*</code> (users and RBAC management)</td>
                </tr>
                <tr>
                    <td><code>RequireLoginMiddleware</code></td>
                    <td>Redirects guests to the login page (<code>voyti/session-login</code>); unlike <code>AccessRuleMiddleware</code>, only requires an authenticated user, not an admin permission. Returns a JSON <code>401</code> instead when the request's <code>Accept</code> header includes <code>application/json</code></td>
                    <td>Yes - on <code>settings/*</code> (profile, account, social networks, sessions, privacy, two-factor)</td>
                </tr>
                <tr>
                    <td><code>RememberMeMiddleware</code></td>
                    <td>Logs a guest back in from the <code>autoLogin</code> remember-me cookie, then writes the cookie back onto the response - either the immediate reissue after a session rotation or the periodic sliding-expiration refresh. Must run after session middleware and before the enforcement middleware below, since those need <code>CurrentUser</code> already resolved</td>
                    <td>Yes</td>
                </tr>
                <tr>
                    <td><code>SessionRevocationEnforceMiddleware</code></td>
                    <td>Logs out and redirects to the login page (<code>voyti/session-login</code>) when the current session's <code>user_sessions</code> row is gone - i.e. it was terminated from the sessions list (self-service or admin) on another request. Without this, terminating a session only removed the row; the browser that owned it stayed logged in until its PHP session expired on its own. Otherwise touches the row's <code>updated_at</code> on every request, so the sessions list can show "last seen" activity per device.</td>
                    <td>Yes</td>
                </tr>
                <tr>
                    <td><code>PasswordAgeEnforceMiddleware</code></td>
                    <td>Redirects to the account settings page (<code>voyti/user-account</code>) when <code>maxPasswordAge</code> is exceeded</td>
                    <td>Yes, when <code>maxPasswordAge</code> is greater than <code>0</code></td>
                </tr>
                <tr>
                    <td><code>VoytiMiddleware</code></td>
                    <td>Convenience wrapper that runs <code>RememberMeMiddleware</code> first, then every middleware tagged <code>voyti.enforce-middleware</code> - core contributes <code>SessionRevocationEnforceMiddleware</code> and <code>PasswordAgeEnforceMiddleware</code>, and installed packages contribute their own</td>
                    <td>No, add it to the <code>Group</code> wrapping your app's own routes. Make sure to place it after <code>SessionMiddleware</code> so <code>CurrentUser</code> is resolvable. Each sub-middleware checks its own feature flag, so disabled features are no-ops. Keep it scoped to your own routes, not the <code>voyti-routes</code> group.</td>
                </tr>
            </tbody>
</table>

<h5 class="doc-h mt-2 mb-3 ps-3 border-start border-3">2FA</h5>
<table class="table table-sm table-striped">
            <thead>
                <tr>
                    <th>Middleware</th>
                    <th>Description</th>
                    <th>Auto-registered?</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><code>TwoFactorAuthenticationEnforceMiddleware</code></td>
                    <td>Enforces 2FA for users with <code>forcedPermissions</code> by redirecting to the settings page (<code>voyti/user-two-factor</code>) with an explanatory message. Two-factor and logout routes remain accessible during setup</td>
                    <td>Yes</td>
                </tr>
            </tbody>
</table>

<h4 class="doc-h" id="site-wide-enforcement">Site-wide enforcement</h4>
<p>
            The auto-registration above only covers routes <em>this extension
            defines</em>. Without <code>VoytiMiddleware</code> wrapping your
            routes, a user with an expired password, missing 2FA, or a revoked
            session can still browse your app's own dashboard, home page, or
            any other route outside this extension - and a visitor with
            a valid remember-me cookie won't be logged back in either.
</p>
