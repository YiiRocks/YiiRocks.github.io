---
layout: package-section
pkgId: voyti
section: events
title: "Voyti - Events & Listeners"
---

<p>Voyti dispatches events at key points in the user lifecycle, allowing your application to react,
log, or extend behaviour. Attach your own listeners through the Yii3 event dispatcher
configuration.</p>

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Events with default listeners</h3>

<div class="table-responsive" markdown="1">
| Event | Trigger | Default behavior |
| --- | --- | --- |
| `YiiRocks\Voyti\Event\Auth\AfterLoginEvent` | User logs in | Triggers password expiration check and session tracking |
| `YiiRocks\Voyti\Event\Auth\AfterRegisterEvent` | New user registration | Sends admin notification email |
{: .table .table-sm .table-striped }
</div>

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Additional events</h3>

Dispatched by the library, but nothing consumes them by default - attach your own listener via the
event dispatcher configuration if you need to react to them.

<div class="table-responsive" markdown="1">
| Event | Description |
| --- | --- |
| `YiiRocks\Voyti\Event\User\UserEvent` | Carries a `getType()` discriminator: `CREATE`, `BLOCK`, `UNBLOCK`, `CONFIRM`, `SWITCH_IDENTITY`, `RESTORE_IDENTITY`, `PASSWORD_RESET`, or `DELETE` |
| `YiiRocks\Voyti\Event\User\UserProfileEvent` | Dispatched when a user updates their profile (cosmetic fields such as name, phone, avatar) |
| `YiiRocks\Voyti\Event\User\ResetPasswordEvent` | Password reset flow |
| `YiiRocks\Voyti\Event\Session\SessionEvent` | Dispatched with type `SESSION_CREATED` on login, and with type `SESSION_TERMINATED` whenever a user's sessions are terminated (account deletion, being blocked, admin revocation, or logout). |
{: .table .table-sm .table-striped }
</div>

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Cancellable events</h3>

A small set of events are dispatched <em>before</em> the action they precede takes effect. A
listener can throw `YiiRocks\Voyti\Exception\ActionPreventedException` to stop the action; the
dispatching service or controller catches it and turns it into a form error or failure result,
using the exception's `getErrorDetails()` (a list of field/attribute names) when present.

<div class="table-responsive" markdown="1">
| Event | Timing and payload |
| --- | --- |
| `YiiRocks\Voyti\Event\Auth\BeforeLoginEvent` | Fired after all login preconditions pass but before the session is established. Carries the about-to-log-in `User` and server params. |
| `YiiRocks\Voyti\Event\Auth\BeforeRegisterEvent` | Fired after the validated form data is hydrated into a `User` but before it is persisted. Carries the validated form data and the hydrated (not yet saved) `User`. |
| `YiiRocks\Voyti\Event\User\BeforeAccountUpdateEvent` | Fired before account-level fields (username, email, password) are saved. Carries the `User` and the list of field names about to change. |
{: .table .table-sm .table-striped }
</div>

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Form and login-flow events</h3>

Emitted around the login and registration forms, and on account-level changes, for analytics,
security monitoring, and paired-event flows.

<div class="table-responsive" markdown="1">
| Event | Description |
| --- | --- |
| `YiiRocks\Voyti\Event\Auth\BeforeLoginFormValidationEvent` | Fired once the login form is populated from the request but before it is validated. Carries the raw submitted form data and server params. |
| `YiiRocks\Voyti\Event\Auth\LoginFormValidationFailedEvent` | Fired when the login form fails validation. Carries the form data, validation errors, and server params. |
| `YiiRocks\Voyti\Event\Auth\FailedLoginEvent` | Fired whenever a login attempt fails, whether at form validation (`'validation_failed'`) or post-validation (`'user_not_found'`, `'invalid_password'`, `'account_blocked'`). Carries the submitted login identifier and server params. Useful for brute-force detection and security monitoring. |
| `YiiRocks\Voyti\Event\Auth\LogoutEvent` | Fired when a user intentionally logs out. Carries the `User` and the terminated session id, letting listeners distinguish an intentional logout from passive session termination. |
| `YiiRocks\Voyti\Event\Auth\BeforeRegisterFormValidationEvent` | Fired once the registration form is populated from the request but before it is validated. Carries the raw submitted form data and server params. |
| `YiiRocks\Voyti\Event\Auth\RegisterFormValidationFailedEvent` | Fired when the registration form fails validation. Carries the form data, validation errors, and server params. |
| `YiiRocks\Voyti\Event\User\AfterAccountUpdateEvent` | Fired after account-level fields (username, email, password) are saved. Carries the updated `User` and the list of field names that changed. Distinct from `UserProfileEvent`, which covers cosmetic profile fields. |
{: .table .table-sm .table-striped }
</div>
