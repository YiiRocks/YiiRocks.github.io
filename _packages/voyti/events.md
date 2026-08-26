---
layout: package-section
pkgId: voyti
section: events
title: "Voyti - Events & Listeners"
---

<p markdown="1">Voyti dispatches events at key points in the user lifecycle, allowing your application to react,
log, or extend behaviour. Attach your own listeners through the Yii3 event dispatcher
configuration.</p>

<h5 class="text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Events with default listeners</h5>

<div class="table-responsive">
<table class="table table-sm table-striped">
    <thead class="fw-bold text-uppercase text-nowrap">
        <tr>
            <th>Event</th>
            <th>Trigger</th>
            <th>Default behavior</th>
        </tr>
    </thead>
    <tbody>
        <tr><td><code>YiiRocks\Voyti\Event\Auth\AfterLoginEvent</code></td><td>User logs in</td><td>Triggers password expiration check and session tracking</td></tr>
        <tr><td><code>YiiRocks\Voyti\Event\Auth\AfterRegisterEvent</code></td><td>New user registration</td><td>Sends admin notification email</td></tr>
    </tbody>
</table>
</div>

<h5 class="text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Additional events</h5>

<p class="mb-3" markdown="1">Dispatched by the library, but nothing consumes them by default - attach your own listener via the
event dispatcher configuration if you need to react to them.</p>

<div class="table-responsive">
<table class="table table-sm table-striped">
    <thead class="fw-bold text-uppercase text-nowrap">
        <tr>
            <th>Event</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr><td><code>YiiRocks\Voyti\Event\User\UserEvent</code></td><td>Carries a <code>getType()</code> discriminator: <code>CREATE</code>, <code>BLOCK</code>, <code>UNBLOCK</code>, <code>CONFIRM</code>, <code>SWITCH_IDENTITY</code>, <code>RESTORE_IDENTITY</code>, <code>PASSWORD_RESET</code>, or <code>DELETE</code></td></tr>
        <tr><td><code>YiiRocks\Voyti\Event\User\UserProfileEvent</code></td><td>Dispatched when a user updates their profile (cosmetic fields such as name, phone, avatar)</td></tr>
        <tr><td><code>YiiRocks\Voyti\Event\User\ResetPasswordEvent</code></td><td>Password reset flow</td></tr>
        <tr><td><code>YiiRocks\Voyti\Event\Session\SessionEvent</code></td><td>Dispatched with type <code>SESSION_CREATED</code> on login, and with type <code>SESSION_TERMINATED</code> whenever a user's sessions are terminated (account deletion, being blocked, admin revocation, or logout).</td></tr>
    </tbody>
</table>
</div>

<h5 class="text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Cancellable events</h5>

<p class="mb-3" markdown="1">A small set of events are dispatched <em>before</em> the action they precede takes effect. A
listener can throw `YiiRocks\Voyti\Exception\ActionPreventedException` to stop the action; the
dispatching service or controller catches it and turns it into a form error or failure result,
using the exception's `getErrorDetails()` (a list of field/attribute names) when present.</p>

<div class="table-responsive">
<table class="table table-sm table-striped">
    <thead class="fw-bold text-uppercase text-nowrap">
        <tr>
            <th>Event</th>
            <th>Timing and payload</th>
        </tr>
    </thead>
    <tbody>
        <tr><td><code>YiiRocks\Voyti\Event\Auth\BeforeLoginEvent</code></td><td>Fired after all login preconditions pass but before the session is established. Carries the about-to-log-in <code>User</code> and server params.</td></tr>
        <tr><td><code>YiiRocks\Voyti\Event\Auth\BeforeRegisterEvent</code></td><td>Fired after the validated form data is hydrated into a <code>User</code> but before it is persisted. Carries the validated form data and the hydrated (not yet saved) <code>User</code>.</td></tr>
        <tr><td><code>YiiRocks\Voyti\Event\User\BeforeAccountUpdateEvent</code></td><td>Fired before account-level fields (username, email, password) are saved. Carries the <code>User</code> and the list of field names about to change.</td></tr>
    </tbody>
</table>
</div>

<h5 class="text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Form and login-flow events</h5>

<p class="mb-3" markdown="1">Emitted around the login and registration forms, and on account-level changes, for analytics,
security monitoring, and paired-event flows.</p>

<div class="table-responsive">
<table class="table table-sm table-striped">
    <thead class="fw-bold text-uppercase text-nowrap">
        <tr>
            <th>Event</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr><td><code>YiiRocks\Voyti\Event\Auth\BeforeLoginFormValidationEvent</code></td><td>Fired once the login form is populated from the request but before it is validated. Carries the raw submitted form data and server params.</td></tr>
        <tr><td><code>YiiRocks\Voyti\Event\Auth\LoginFormValidationFailedEvent</code></td><td>Fired when the login form fails validation. Carries the form data, validation errors, and server params.</td></tr>
        <tr><td><code>YiiRocks\Voyti\Event\Auth\FailedLoginEvent</code></td><td>Fired whenever a login attempt fails, whether at form validation (<code>'validation_failed'</code>) or post-validation (<code>'user_not_found'</code>, <code>'invalid_password'</code>, <code>'account_blocked'</code>). Carries the submitted login identifier and server params. Useful for brute-force detection and security monitoring.</td></tr>
        <tr><td><code>YiiRocks\Voyti\Event\Auth\LogoutEvent</code></td><td>Fired when a user intentionally logs out. Carries the <code>User</code> and the terminated session id, letting listeners distinguish an intentional logout from passive session termination.</td></tr>
        <tr><td><code>YiiRocks\Voyti\Event\Auth\BeforeRegisterFormValidationEvent</code></td><td>Fired once the registration form is populated from the request but before it is validated. Carries the raw submitted form data and server params.</td></tr>
        <tr><td><code>YiiRocks\Voyti\Event\Auth\RegisterFormValidationFailedEvent</code></td><td>Fired when the registration form fails validation. Carries the form data, validation errors, and server params.</td></tr>
        <tr><td><code>YiiRocks\Voyti\Event\User\AfterAccountUpdateEvent</code></td><td>Fired after account-level fields (username, email, password) are saved. Carries the updated <code>User</code> and the list of field names that changed. Distinct from <code>UserProfileEvent</code>, which covers cosmetic profile fields.</td></tr>
    </tbody>
</table>
</div>

<h5 class="text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Example: A cancellable BEFORE event</h5>

<p class="mb-3" markdown="1">Throw `ActionPreventedException` from a listener to reject the action - here, rate-limiting
registrations by IP:</p>

<div class="mb-3 small lh-base">
{% highlight php %}
// config/events.php or config/events-web.php
use YiiRocks\Voyti\Event\Auth\BeforeRegisterEvent;
use YiiRocks\Voyti\Exception\ActionPreventedException;

return [
    BeforeRegisterEvent::class => [
        static function(BeforeRegisterEvent $event, RateLimiterInterface $rateLimiter) {
            if ($rateLimiter->isExceededForCurrentIp()) {
                throw new ActionPreventedException('Too many registrations from this address.');
            }
        }
    ],
];
{% endhighlight %}
</div>

<h5 class="text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Example: Listening to Events</h5>

<p class="mb-3" markdown="1">Attach listeners through the Yii3 event dispatcher configuration:</p>

<p class="mb-3" markdown="1">For events with discriminator types like `UserEvent`, check the type to handle specific
actions. You can attach multiple listeners to the same event, and each receives the event object
plus any other DI dependencies.</p>

<div class="mb-3 small lh-base">
{% highlight php %}
// config/events.php or config/events-web.php
use Psr\Log\LoggerInterface;
use YiiRocks\Voyti\Event\User\UserProfileEvent;
use YiiRocks\Voyti\Event\User\UserEvent;

return [
    UserEvent::class => [
        static function(UserEvent $event, LoggerInterface $logger) {
            if ($event->getType() === UserEvent::BLOCK) {
                $user = $event->getUser();
                $logger->warning("User blocked: {$user->getUsername()}");
            }
        }
    ],
    UserProfileEvent::class => [
        static function(UserProfileEvent $event, LoggerInterface $logger) {
            $user = $event->getUser();
            $logger->info("User profile updated: {$user->getUsername()}");
        }
    ],
];
{% endhighlight %}
</div>
