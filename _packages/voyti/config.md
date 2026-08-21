---
layout: package-section
pkgId: voyti
section: config
title: "Voyti - Configuration"
option_groups:
  general:
    - name: appName
      type: string
      default: "<code>'Voyti'</code>"
      desc: "Application name - used as the <code>{app}</code> placeholder in mail subjects and as the TOTP issuer by the optional TOTP method package (<code>yiirocks/voyti-2fa-totp</code>)."
    - name: homeRoute
      type: string
      default: "<code>'home'</code>"
      desc: "Route to redirect to after a successful login (password, 2FA, or social) or logout. Must be a route registered by the host app - an unregistered route name throws a <code>LogicException</code> naming the misconfigured option, rather than a bare router exception."
  auth:
    - name: enableRegistration
      type: bool
      default: "<code>true</code>"
      desc: "Allow new user registration."
    - name: enableEmailConfirmation
      type: bool
      default: "<code>true</code>"
      desc: "Require email confirmation."
    - name: allowPasswordRecovery
      type: bool
      default: "<code>true</code>"
      desc: "Allow password recovery."
    - name: allowAdminPasswordRecovery
      type: bool
      default: "<code>false</code>"
      desc: "Allow admin-initiated password recovery."
    - name: allowAccountDelete
      type: bool
      default: "<code>false</code>"
      desc: "Allow users to delete their account. Gates the Privacy hub's delete-account link/route alongside <code>privacyMenuItems</code> below - GDPR data export and anonymization live in the separate <a href=\"/voyti/gdpr/\"><code>yiirocks/voyti-gdpr</code></a> package, with their own config."
    - name: emailChangeConfirmation
      type: EmailChangeConfirmation
      default: "<code>EmailChangeConfirmation::NEW</code>"
      desc: "<code>NONE</code> (change immediately), <code>NEW</code> (confirm new address only), or <code>BOTH</code> (confirm both old and new addresses)."
    - name: rememberLoginLifespan
      type: int
      default: "<code>2592000</code>"
      desc: "Remember-me cookie lifetime and idle auth timeout in seconds."
    - name: tokenConfirmationLifespan
      type: int
      default: "<code>86400</code>"
      desc: "Confirmation token validity."
    - name: tokenRecoveryLifespan
      type: int
      default: "<code>21600</code>"
      desc: "Recovery token validity."
    - name: enableSwitchIdentities
      type: bool
      default: "<code>true</code>"
      desc: "Allow admin to switch user identities."
    - name: mailAdminOnRegister
      type: "?string"
      default: "<code>null</code>"
      desc: "Email notified on new registration."
    - name: recaptchaVersion
      type: RecaptchaVersion
      default: "<code>RecaptchaVersion::V3</code>"
      desc: "<code>RecaptchaVersion::V2</code> or <code>RecaptchaVersion::V3</code>. Requires the optional <code>yiirocks/recaptcha</code> package plus a site key and secret configured for the selected version via that package's own <code>RecaptchaRegistry::configure()</code> - without it, forms silently render and validate without reCAPTCHA."
  session:
    - name: maxPasswordAge
      type: int
      default: "<code>0</code>"
      desc: "Max password age in days before a user is forced to set a new one. <code>0</code> disables password expiration entirely."
    - name: enablePasswordComplexity
      type: bool
      default: "<code>false</code>"
      desc: "Require passwords to contain an uppercase letter, a lowercase letter, a digit, and a special character."
    - name: passwordHistoryLimit
      type: int
      default: "<code>10</code>"
      desc: "Number of previous passwords remembered per user to prevent reuse. Only enforced when <code>maxPasswordAge</code> is greater than <code>0</code>."
    - name: administratorPermissionName
      type: string
      default: "<code>'voyti-admin'</code>"
      desc: "Permission name granting admin access."
    - name: profileVisibility
      type: ProfileVisibility
      default: "<code>ProfileVisibility::USERS</code>"
      desc: "Profile visibility: <code>OWNER</code> = owner only, <code>ADMIN</code> = owner + admins, <code>USERS</code> = any authenticated user, <code>PUBLIC</code> = public."
    - name: enableAuditLog
      type: bool
      default: "<code>true</code>"
      desc: "Record admin actions (RBAC and user management changes) to the <code>user_audit_log</code> table, viewable at <code>admin/audit-log/</code>."
  views_mail:
    - name: viewPath
      type: "?string"
      default: "<code>null</code>"
      desc: "Optional custom directory for web template overrides. When a template is not found here, falls back to the selected <code>webTheme</code>. Leave <code>null</code> to use only shipped templates."
    - name: mailPath
      type: string
      default: "<code>VoytiConfig::DEFAULT_MAIL_PATH</code>"
      desc: "Base path for mail templates. If a template is not found here, falls back to the default mail templates."
  admin_dashboard:
    - name: enableRecommendations
      type: bool
      default: "<code>true</code>"
      desc: "Show recommended sibling Voyti packages (REST API, GDPR, social auth, two-factor auth) in the admin dashboard when they are not already installed. Set to <code>false</code> to disable package recommendations entirely."
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
{% include options_table.md options=page.option_groups.general %}

<h4 class="doc-h">Authentication &amp; Registration</h4>
{% include options_table.md options=page.option_groups.auth %}

<h4 class="doc-h">Session &amp; Security</h4>
{% include options_table.md options=page.option_groups.session %}

<h4 class="doc-h">Views &amp; Mail</h4>
{% include options_table.md options=page.option_groups.views_mail %}

<h4 class="doc-h">Admin Dashboard</h4>
{% include options_table.md options=page.option_groups.admin_dashboard %}
