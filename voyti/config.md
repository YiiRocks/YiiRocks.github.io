---
layout: package-section
pkgId: voyti
section: config
title: "Voyti - Configuration"
---

<p>
    Override Voyti params in your app's <code>params.php</code>:
</p>

<div class="doc-example mb-3">
{% highlight php %}
use YiiRocks\Voyti\Enum\ProfileVisibility;

return [
    'yiirocks/voyti' => [
        'appName' => 'My Project',
        'profileVisibility' => ProfileVisibility::PUBLIC,
    ],
];
{% endhighlight %}
</div>

<h4 class="doc-h">General</h4>
<div class="opt-grid mb-3">
    <div class="opt-row">
<div class="opt-name">
            <div class="opt-label">appName<span class="opt-type"> string</span></div>
            <div class="opt-default"><code>'Voyti'</code></div>
</div>
<div class="opt-desc">Application name - used as the <code>{app}</code> placeholder in mail subjects and as the TOTP issuer by the optional TOTP method package (<code>yiirocks/voyti-2fa-totp</code>).</div>
    </div>
    <div class="opt-row">
<div class="opt-name">
            <div class="opt-label">homeRoute<span class="opt-type"> string</span></div>
            <div class="opt-default"><code>'home'</code></div>
</div>
<div class="opt-desc">Route to redirect to after a successful login (password, 2FA, or social) or logout. Must be a route registered by the host app - an unregistered route name throws a <code>LogicException</code> naming the misconfigured option, rather than a bare router exception.</div>
    </div>
</div>

<h4 class="doc-h">Authentication &amp; Registration</h4>
<div class="opt-grid mb-3">
    <div class="opt-row">
<div class="opt-name">
            <div class="opt-label">enableRegistration<span class="opt-type"> bool</span></div>
            <div class="opt-default"><code>true</code></div>
</div>
<div class="opt-desc">Allow new user registration.</div>
    </div>
    <div class="opt-row">
<div class="opt-name">
            <div class="opt-label">enableEmailConfirmation<span class="opt-type"> bool</span></div>
            <div class="opt-default"><code>true</code></div>
</div>
<div class="opt-desc">Require email confirmation.</div>
    </div>
    <div class="opt-row">
<div class="opt-name">
            <div class="opt-label">allowPasswordRecovery<span class="opt-type"> bool</span></div>
            <div class="opt-default"><code>true</code></div>
</div>
<div class="opt-desc">Allow password recovery.</div>
    </div>
    <div class="opt-row">
<div class="opt-name">
            <div class="opt-label">allowAdminPasswordRecovery<span class="opt-type"> bool</span></div>
            <div class="opt-default"><code>false</code></div>
</div>
<div class="opt-desc">Allow admin-initiated password recovery.</div>
    </div>
    <div class="opt-row">
<div class="opt-name">
            <div class="opt-label">allowAccountDelete<span class="opt-type"> bool</span></div>
            <div class="opt-default"><code>false</code></div>
</div>
<div class="opt-desc">Allow users to delete their account. Gates the Privacy hub's delete-account link/route alongside <code>privacyMenuItems</code> below - GDPR data export and anonymization live in the separate <a href="/voyti/gdpr/"><code>yiirocks/voyti-gdpr</code></a> package, with their own config.</div>
    </div>
    <div class="opt-row">
<div class="opt-name">
            <div class="opt-label">emailChangeConfirmation<span class="opt-type"> EmailChangeConfirmation</span></div>
            <div class="opt-default"><code>EmailChangeConfirmation::NEW</code></div>
</div>
<div class="opt-desc"><code>NONE</code> (change immediately), <code>NEW</code> (confirm new address only), or <code>BOTH</code> (confirm both old and new addresses).</div>
    </div>
    <div class="opt-row">
<div class="opt-name">
            <div class="opt-label">rememberLoginLifespan<span class="opt-type"> int</span></div>
            <div class="opt-default"><code>2592000</code></div>
</div>
<div class="opt-desc">Remember-me cookie lifetime and idle auth timeout in seconds.</div>
    </div>
    <div class="opt-row">
<div class="opt-name">
            <div class="opt-label">tokenConfirmationLifespan<span class="opt-type"> int</span></div>
            <div class="opt-default"><code>86400</code></div>
</div>
<div class="opt-desc">Confirmation token validity.</div>
    </div>
    <div class="opt-row">
<div class="opt-name">
            <div class="opt-label">tokenRecoveryLifespan<span class="opt-type"> int</span></div>
            <div class="opt-default"><code>21600</code></div>
</div>
<div class="opt-desc">Recovery token validity.</div>
    </div>
    <div class="opt-row">
<div class="opt-name">
            <div class="opt-label">enableSwitchIdentities<span class="opt-type"> bool</span></div>
            <div class="opt-default"><code>true</code></div>
</div>
<div class="opt-desc">Allow admin to switch user identities.</div>
    </div>
    <div class="opt-row">
<div class="opt-name">
            <div class="opt-label">mailAdminOnRegister<span class="opt-type"> ?string</span></div>
            <div class="opt-default"><code>null</code></div>
</div>
<div class="opt-desc">Email notified on new registration.</div>
    </div>
    <div class="opt-row">
<div class="opt-name">
            <div class="opt-label">recaptchaVersion<span class="opt-type"> RecaptchaVersion</span></div>
            <div class="opt-default"><code>RecaptchaVersion::V3</code></div>
</div>
<div class="opt-desc"><code>RecaptchaVersion::V2</code> or <code>RecaptchaVersion::V3</code>. Requires the optional <code>yiirocks/recaptcha</code> package plus a site key and secret configured for the selected version via that package's own <code>RecaptchaRegistry::configure()</code> - without it, forms silently render and validate without reCAPTCHA.</div>
    </div>
</div>

<h4 class="doc-h">Session &amp; Security</h4>
<div class="opt-grid mb-3">
    <div class="opt-row">
<div class="opt-name">
            <div class="opt-label">maxPasswordAge<span class="opt-type"> int</span></div>
            <div class="opt-default"><code>0</code></div>
</div>
<div class="opt-desc">Max password age in days before a user is forced to set a new one. <code>0</code> disables password expiration entirely.</div>
    </div>
    <div class="opt-row">
<div class="opt-name">
            <div class="opt-label">enablePasswordComplexity<span class="opt-type"> bool</span></div>
            <div class="opt-default"><code>false</code></div>
</div>
<div class="opt-desc">Require passwords to contain an uppercase letter, a lowercase letter, a digit, and a special character.</div>
    </div>
    <div class="opt-row">
<div class="opt-name">
            <div class="opt-label">passwordHistoryLimit<span class="opt-type"> int</span></div>
            <div class="opt-default"><code>10</code></div>
</div>
<div class="opt-desc">Number of previous passwords remembered per user to prevent reuse. Only enforced when <code>maxPasswordAge</code> is greater than <code>0</code>.</div>
    </div>
    <div class="opt-row">
<div class="opt-name">
            <div class="opt-label">administratorPermissionName<span class="opt-type"> string</span></div>
            <div class="opt-default"><code>'voyti-admin'</code></div>
</div>
<div class="opt-desc">Permission name granting admin access.</div>
    </div>
    <div class="opt-row">
<div class="opt-name">
            <div class="opt-label">profileVisibility<span class="opt-type"> ProfileVisibility</span></div>
            <div class="opt-default"><code>ProfileVisibility::USERS</code></div>
</div>
<div class="opt-desc">Profile visibility: <code>OWNER</code> = owner only, <code>ADMIN</code> = owner + admins, <code>USERS</code> = any authenticated user, <code>PUBLIC</code> = public.</div>
    </div>
    <div class="opt-row">
<div class="opt-name">
            <div class="opt-label">enableAuditLog<span class="opt-type"> bool</span></div>
            <div class="opt-default"><code>true</code></div>
</div>
<div class="opt-desc">Record admin actions (RBAC and user management changes) to the <code>user_audit_log</code> table, viewable at <code>admin/audit-log/</code>.</div>
    </div>
</div>

<h4 class="doc-h">Views &amp; Mail</h4>
<div class="opt-grid mb-3">
    <div class="opt-row">
<div class="opt-name">
            <div class="opt-label">viewPath<span class="opt-type"> ?string</span></div>
            <div class="opt-default"><code>null</code></div>
</div>
<div class="opt-desc">Optional custom directory for web template overrides. When a template is not found here, falls back to the selected <code>webTheme</code>. Leave <code>null</code> to use only shipped templates.</div>
    </div>
    <div class="opt-row">
<div class="opt-name">
            <div class="opt-label">mailPath<span class="opt-type"> string</span></div>
            <div class="opt-default"><code>VoytiConfig::DEFAULT_MAIL_PATH</code></div>
</div>
<div class="opt-desc">Base path for mail templates. If a template is not found here, falls back to the default mail templates.</div>
    </div>
</div>

<h4 class="doc-h">Admin Dashboard</h4>
<div class="opt-grid mb-3">
    <div class="opt-row">
<div class="opt-name">
            <div class="opt-label">enableRecommendations<span class="opt-type"> bool</span></div>
            <div class="opt-default"><code>true</code></div>
</div>
<div class="opt-desc">Show recommended sibling Voyti packages (REST API, GDPR, social auth, two-factor auth) in the admin dashboard when they are not already installed. Set to <code>false</code> to disable package recommendations entirely.</div>
    </div>
</div>
