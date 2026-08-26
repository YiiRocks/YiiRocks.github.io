---
layout: package-section
pkgId: voyti
section: lockout
title: "Voyti - Lockout"
option_groups:
  config:
    - name: loginMinRetentionSeconds
      type: int
      default: "<code>900</code>"
      desc: "Minimum time, in seconds, a login failure count is remembered for one IP, even when the currently required delay is smaller. Renewed on every new failure."
    - name: loginBaseDelaySeconds
      type: int
      default: "<code>1</code>"
      desc: "Wait enforced on the very first failed login attempt. Doubles on every further failure: 1s, 2s, 4s..."
    - name: loginMaxDelaySeconds
      type: int
      default: "<code>3600</code>"
      desc: "Ceiling on the login delay. There is no cap on the attempt count itself: an attacker who keeps failing just keeps hitting this capped wait."
    - name: registrationMinRetentionSeconds
      type: int
      default: "<code>60</code>"
      desc: "Minimum time, in seconds, a registration failure count is remembered for one IP. Renewed on every new failure."
    - name: registrationBaseDelaySeconds
      type: int
      default: "<code>1</code>"
      desc: "Wait enforced on the very first failed registration attempt. Doubles on every further failure."
    - name: registrationMaxDelaySeconds
      type: int
      default: "<code>600</code>"
      desc: "Ceiling on the registration delay, lower than login's since registration abuse is lower stakes than an account-takeover attempt."
---

<p markdown="1">Brute-force protection for the login and registration forms ships as a separate package. It listens
to core's existing auth events to count failed attempts per IP address and delays further attempts,
even ones with the correct credentials, with an exponentially growing wait that starts from the
very first failure.</p>

<h5 class="text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Prerequisite</h5>

<p markdown="1">Your application must have a PSR-16 `Psr\SimpleCache\CacheInterface` implementation configured and
bound in your DI container. Any PSR-16 compliant cache works. See
[yiisoft/cache](https://github.com/yiisoft/cache) documentation for one option and its available
backends.</p>

<h5 class="text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Installation</h5>
{% include install_block.md package="yiirocks/voyti-lockout" repo="voyti-lockout" %}

<h5 class="text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Storage</h5>

<p class="mb-3" markdown="1">Failed-attempt counts are tracked in the cache. Each cache entry's key is a SHA-256 hash of the
request's IP address, scoped separately for login and registration so the two counters never
collide. Its value is a plain attempt count.</p>

<p markdown="1">The cache entry's TTL is renewed on every failure to at least
`loginMinRetentionSeconds` / `registrationMinRetentionSeconds`, creating a
sliding window anchored to the most recent attempt: an attacker who keeps failing stays tracked,
and the entry only expires once attempts stop for that long. Once the currently required delay
grows past that minimum, the TTL instead tracks the delay itself, which can be much longer, so the
count can't reset while the caller is still required to wait.</p>

<h5 class="text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Configuration</h5>
<div class="mb-3 small lh-base">
{% highlight php %}
// config/params.php
return [
    'yiirocks/voyti' => [
        'lockout' => [
            'loginMinRetentionSeconds' => 600,
        ],
    ],
];
{% endhighlight %}
</div>
{% include options_table.md options=page.option_groups.config %}

<h5 class="text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">How it works</h5>
<div class="table-responsive">
    <table class="table table-sm table-striped">
        <thead class="fw-bold text-uppercase text-nowrap">
            <tr>
                <th>Listener</th>
                <th>Core event</th>
                <th>Behavior</th>
            </tr>
        </thead>
        <tbody>
            <tr><td><code>RecordFailedLoginAttemptListener</code></td><td><code>FailedLoginEvent</code></td><td>Records a failure against the request's IP.</td></tr>
            <tr><td><code>BlockLockedOutLoginListener</code></td><td><code>BeforeLoginEvent</code></td><td>Whenever the IP has any recorded failures, delays the login by the computed backoff, even if the password just entered is correct.</td></tr>
            <tr><td><code>RecordFailedRegistrationAttemptListener</code></td><td><code>RegisterFormValidationFailedEvent</code></td><td>Records a failure against the request's IP.</td></tr>
            <tr><td><code>BlockLockedOutRegistrationListener</code></td><td><code>BeforeRegisterEvent</code></td><td>Whenever the IP has any recorded failures, delays the registration by the computed backoff.</td></tr>
        </tbody>
    </table>
</div>

<p markdown="1">Both blocking listeners throw core's `ActionPreventedException`, the same cancellation mechanism
core itself uses for `BeforeLoginEvent` and `BeforeRegisterEvent`: the dispatching controller
catches it and surfaces a translated error on the form instead of a raw exception. The translated
message carries the computed wait, in seconds, so the UI can tell the user exactly how long to wait
before retrying.</p>

<h5>Design decisions</h5>

<p class="mb-3" markdown="1"><strong>IP-scoped, not account-scoped:</strong> Counters are scoped by IP address. Account scoping
would let an attacker lock a legitimate user out of their own account just by deliberately failing
that user's login from elsewhere, an easy denial-of-service. IP scoping avoids this while still
stopping a single attacker hammering one account or many.</p>

<p class="mb-3" markdown="1"><strong>Counts failures, not all traffic:</strong> This is a lockout, not a general-purpose rate
limiter. Only failed attempts increment the counter and trigger a delay. Traffic to
`/login` or `/register` that never fails is never delayed.</p>

<p class="mb-3" markdown="1"><strong>Progressive delay, not a hard deny:</strong> Every failure doubles the wait rather than
denying the attempt outright, starting from a barely noticeable second on the very first failure.
There is no attempt count that locks an IP out for good; the delay just keeps growing, capped at
`loginMaxDelaySeconds` / `registrationMaxDelaySeconds`. This follows OWASP's
and NIST's guidance against a lockout control that itself becomes a denial-of-service against the
legitimate user: a real attacker just waits out the capped delay indefinitely, while a locked-out
legitimate user is never permanently shut out.</p>

<p markdown="1"><strong>Minimum retention is not the delay:</strong> `loginMinRetentionSeconds` /
`registrationMinRetentionSeconds` don't gate how long you wait to retry. That's driven
entirely by `baseDelaySeconds` / `maxDelaySeconds`. They only set a floor on
how long a failed-attempt count is remembered when the currently required delay is smaller, so a
single mistyped password isn't instantly forgotten while an attacker who stops trying still cools
down eventually.</p>
