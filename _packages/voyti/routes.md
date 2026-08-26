---
layout: package-section
pkgId: voyti
section: routes
title: "Voyti - Available Routes"
routes:
  - { name: "voyti/session-login", method: "GET, POST", path: "login", purpose: "User login" }
  - { name: "voyti/session-logout", method: "POST", path: "logout", purpose: "User logout" }
  - { name: "voyti/registration-register", method: "GET, POST", path: "register", purpose: "New user registration" }
  - { name: "voyti/registration-confirm", method: "GET, POST", path: "confirm/{id}/{code}", purpose: "Email confirmation link" }
  - { name: "voyti/registration-resend", method: "GET, POST", path: "resend", purpose: "Resend confirmation email" }
  - { name: "voyti/password-reset-request", method: "GET, POST", path: "forgot", purpose: "Password recovery request" }
  - { name: "voyti/password-reset-confirm", method: "GET, POST", path: "recover/{id}/{code}", purpose: "Password reset" }
  - { name: "voyti/profile", method: "GET", path: "profile/{id}", purpose: "Public user profile" }
  - { name: "voyti/user", method: "GET", path: "settings/", purpose: "User dashboard" }
  - { name: "voyti/user-profile", method: "GET, POST", path: "settings/profile", purpose: "Profile settings" }
  - { name: "voyti/user-account", method: "GET, POST", path: "settings/account", purpose: "Account settings" }
  - { name: "voyti/user-account-confirm", method: "GET", path: "settings/account/confirm/{code}", purpose: "Confirm account changes" }
  - { name: "voyti/user-account-sessions", method: "GET", path: "settings/sessions/", purpose: "Self-service session/device list, current device highlighted" }
  - { name: "voyti/user-account-sessions-terminate", method: "POST", path: "settings/sessions/terminate/{sessionId}", purpose: "Terminate one of the current user's own sessions" }
  - name: "voyti/user-privacy"
    method: "GET"
    path: "settings/privacy/"
    purpose: 'Privacy settings hub. Registered when <code>allowAccountDelete</code> is <code>true</code> or the <code>privacyMenuItems</code> param is non-empty, which the optional <a href="/voyti/gdpr/"><code>yiirocks/voyti-gdpr</code></a> addon populates automatically'
  - { name: "voyti/user-privacy-delete", method: "GET, POST", path: "settings/privacy/delete", purpose: "Account deletion (hard delete). Registered when <code>allowAccountDelete</code> is <code>true</code>" }
  - { name: "voyti/admin", method: "GET", path: "admin/", purpose: "Admin dashboard" }
  - { name: "voyti/admin-users", method: "GET", path: "admin/users/", purpose: "Users" }
  - { name: "voyti/admin-users-create", method: "GET, POST", path: "admin/users/create", purpose: "Create user" }
  - { name: "voyti/admin-users-update", method: "GET, POST", path: "admin/users/update/{id}", purpose: "Update user" }
  - { name: "voyti/admin-users-update-profile", method: "GET, POST", path: "admin/users/update-profile/{id}", purpose: "Update user profile" }
  - { name: "voyti/admin-users-show", method: "GET", path: "admin/users/info/{id}", purpose: "User details" }
  - { name: "voyti/admin-users-confirm", method: "POST", path: "admin/users/confirm/{id}", purpose: "Confirm user" }
  - { name: "voyti/admin-users-delete", method: "POST", path: "admin/users/delete/{id}", purpose: "Delete user" }
  - { name: "voyti/admin-users-block", method: "POST", path: "admin/users/block/{id}", purpose: "Block user" }
  - { name: "voyti/admin-users-switch-identity", method: "POST", path: "admin/users/switch-identity/{id}", purpose: "Switch identity" }
  - { name: "voyti/admin-users-switch-identity-restore", method: "POST", path: "admin/users/switch-identity/restore", purpose: "Restore identity after impersonating" }
  - { name: "voyti/admin-users-password-reset", method: "POST", path: "admin/users/password-reset/{id}", purpose: "Send password reset" }
  - { name: "voyti/admin-users-force-password-change", method: "POST", path: "admin/users/force-password-change/{id}", purpose: "Force password change" }
  - { name: "voyti/admin-users-assignments", method: "GET, POST", path: "admin/users/assignments/{id}", purpose: "Manage RBAC assignments" }
  - { name: "voyti/admin-users-sessions", method: "GET", path: "admin/users/sessions/{id}", purpose: "Session management" }
  - { name: "voyti/admin-users-terminate-sessions", method: "POST", path: "admin/users/terminate-sessions/{id}", purpose: "Terminate sessions" }
  - { name: "voyti/admin-rbac-permissions", method: "GET", path: "admin/rbac/permissions/", purpose: "List permissions" }
  - { name: "voyti/admin-rbac-permissions-create", method: "GET, POST", path: "admin/rbac/permissions/create", purpose: "Create permission" }
  - { name: "voyti/admin-rbac-permissions-update", method: "GET, POST", path: "admin/rbac/permissions/update/{name}", purpose: "Update permission" }
  - { name: "voyti/admin-rbac-permissions-delete", method: "POST", path: "admin/rbac/permissions/delete/{name}", purpose: "Delete permission" }
  - { name: "voyti/admin-rbac-roles", method: "GET", path: "admin/rbac/roles/", purpose: "List roles" }
  - { name: "voyti/admin-rbac-roles-create", method: "GET, POST", path: "admin/rbac/roles/create", purpose: "Create role" }
  - { name: "voyti/admin-rbac-roles-update", method: "GET, POST", path: "admin/rbac/roles/update/{name}", purpose: "Update role" }
  - { name: "voyti/admin-rbac-roles-delete", method: "POST", path: "admin/rbac/roles/delete/{name}", purpose: "Delete role" }
  - { name: "voyti/admin-rbac-rules", method: "GET", path: "admin/rbac/rules/", purpose: "List rules" }
  - { name: "voyti/admin-rbac-rules-create", method: "GET, POST", path: "admin/rbac/rules/create", purpose: "Create rule" }
  - { name: "voyti/admin-rbac-rules-update", method: "GET, POST", path: "admin/rbac/rules/update/{name}", purpose: "Update rule" }
  - { name: "voyti/admin-rbac-rules-delete", method: "POST", path: "admin/rbac/rules/delete/{name}", purpose: "Delete rule" }
  - name: "voyti/admin-audit-log"
    method: "GET"
    path: "admin/audit-log/"
    purpose: 'Audit log of admin actions (RBAC and user management changes). Populated when <code>enableAuditLog</code> is <code>true</code>'
---

<p class="mb-3" markdown="1">The library does not provide a menu model or navigation contract. It only exposes named routes that
the host application can use in its own menu, sidebar, or access rules. See the
[Cookbook](/voyti/cookbook/) for a Bootstrap 5 nav menu example.</p>

<p class="mb-3" markdown="1">This table lists only core's own routes. Addon packages ([Social Auth](/voyti/social/),
[Two-Factor](/voyti/two-factor/), [REST API](/voyti/api/), [GDPR](/voyti/gdpr/)) register their own
routes when installed - see each addon's own page.</p>

{% include route_table.md routes=page.routes %}
