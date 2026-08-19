---
layout: package-section
pkgId: voyti
section: lockout
title: "Voyti - Lockout"
---

<p>
            Brute-force protection for the login and registration forms ships as a
            separate package, <code>yiirocks/voyti-lockout</code>. It listens to
            core's existing auth events to count failed attempts per IP address and
            blocks further attempts, even with correct credentials, once a
            configurable threshold is reached within a sliding window.
</p>

<h4 class="doc-h">Installation</h4>
<div class="mb-4 d-flex align-items-center gap-3 flex-wrap">
            <button type="button" class="copy-btn copy--sm">composer require yiirocks/voyti-lockout</button>
            <a href="https://github.com/YiiRocks/voyti-lockout/issues" target="_blank" rel="noopener" class="docs-entry__link docs-entry__link--docs">Create an issue &rarr;</a>
            <div class="d-flex gap-2 flex-wrap ms-auto">
                <a href="https://github.com/YiiRocks/voyti-lockout" target="_blank" rel="noopener" class="docs-entry__link docs-entry__link--github">GitHub &rarr;</a>
                <a href="https://packagist.org/packages/yiirocks/voyti-lockout" target="_blank" rel="noopener" class="docs-entry__link docs-entry__link--packagist">Packagist &rarr;</a>
            </div>
</div>
<p>
            No routes, migrations, or middleware to wire up. Once installed, its
            event listeners are picked up automatically through core's event
            dispatcher, the same way any other <code>config/events.php</code>
            listener is.
</p>

<h4 class="doc-h">Setup</h4>
<p>
            <strong>Required:</strong> Your application must have a PSR-16 <code>Psr\SimpleCache\CacheInterface</code>
            implementation configured and bound in your DI container. This package does not provide a
            cache implementation; it uses whatever your host app already has.
</p>
<p>
            If you don't have a cache configured yet, install one:
</p>
<div class="mb-4 d-flex align-items-center gap-3 flex-wrap">
            <button type="button" class="copy-btn copy--sm">composer require yiisoft/cache</button>
</div>
<p>
            Then bind it in your <code>config/di.php</code>:
</p>
<div class="doc-example mb-3">
{% highlight php %}
use Psr\SimpleCache\CacheInterface;
use Yiisoft\Cache\ArrayCache;

return [
    CacheInterface::class => new ArrayCache(),
];
{% endhighlight %}
</div>
<p>
            For production, replace <code>ArrayCache</code> with a persistent backend:
            <code>FileCache</code> (single server) or a Redis/Memcached client (multi-server).
</p>

<h4 class="doc-h">Storage</h4>
<p>
            Failed-attempt counts are tracked in a PSR-16 <code>Psr\SimpleCache\CacheInterface</code>,
            not a database table. The package binds no cache implementation of its
            own, it uses whatever <code>CacheInterface</code> the host app already
            has configured. For the lockout to hold across multiple app servers,
            that cache needs to be a shared backend (Redis, Memcached), not a
            per-process array cache.
</p>
<p>
            Each cache entry's key is a SHA-256 hash of the request's IP address
            (never the IP itself), scoped separately for login and registration so
            the two counters never collide. Its value is a plain attempt count, and
            its TTL is renewed to the full window on every failure, so the block is
            a sliding window anchored to the most recent attempt: an attacker who
            keeps failing stays blocked, and the entry only expires, clearing the
            block, once attempts actually stop for the configured duration.
</p>

<h4 class="doc-h">Configuration</h4>
<div class="doc-example mb-3">
{% highlight php %}
// config/params.php
return [
    'yiirocks/voyti' => [
        'lockout' => [
            'loginMaxAttempts' => 5,
            'loginWindowSeconds' => 900,
            'registrationMaxAttempts' => 10,
            'registrationWindowSeconds' => 60,
        ],
    ],
];
{% endhighlight %}
</div>
<div class="opt-grid mb-3">
            <div class="opt-row">
                <div class="opt-name">
                    <div class="opt-label">loginMaxAttempts<span class="opt-type"> int</span></div>
                    <div class="opt-default"><code>5</code></div>
                </div>
                <div class="opt-desc">Failed login attempts allowed from one IP within <code>loginWindowSeconds</code> before further attempts, including ones with the correct password, are blocked.</div>
            </div>
            <div class="opt-row">
                <div class="opt-name">
                    <div class="opt-label">loginWindowSeconds<span class="opt-type"> int</span></div>
                    <div class="opt-default"><code>900</code></div>
                </div>
                <div class="opt-desc">Sliding window, in seconds, over which login failures are counted per IP. Renewed on every new failure.</div>
            </div>
            <div class="opt-row">
                <div class="opt-name">
                    <div class="opt-label">registrationMaxAttempts<span class="opt-type"> int</span></div>
                    <div class="opt-default"><code>10</code></div>
                </div>
                <div class="opt-desc">Failed registration attempts allowed from one IP within <code>registrationWindowSeconds</code> before further attempts are blocked.</div>
            </div>
            <div class="opt-row">
                <div class="opt-name">
                    <div class="opt-label">registrationWindowSeconds<span class="opt-type"> int</span></div>
                    <div class="opt-default"><code>60</code></div>
                </div>
                <div class="opt-desc">Sliding window, in seconds, over which registration failures are counted per IP. Renewed on every new failure.</div>
            </div>
</div>
<p>
            The defaults follow OWASP's Authentication Cheat Sheet and NIST SP
            800-63B-4 guidance for login brute-force protection. Registration's
            defaults are looser since a mistyped email or a weak password is a
            common, legitimate reason to fail more than once in quick succession.
</p>

<h4 class="doc-h">How it works</h4>
<div class="table-responsive">
            <table class="table table-sm table-striped">
                <thead>
                    <tr>
                        <th>Listener</th>
                        <th>Core event</th>
                        <th>Behavior</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td><code>RecordFailedLoginAttemptListener</code></td><td><code>FailedLoginEvent</code></td><td>Records a failure against the request's IP.</td></tr>
                    <tr><td><code>BlockLockedOutLoginListener</code></td><td><code>BeforeLoginEvent</code></td><td>Blocks the login once the IP's recorded failures reach <code>loginMaxAttempts</code>, even if the password just entered is correct.</td></tr>
                    <tr><td><code>RecordFailedRegistrationAttemptListener</code></td><td><code>RegisterFormValidationFailedEvent</code></td><td>Records a failure against the request's IP.</td></tr>
                    <tr><td><code>BlockLockedOutRegistrationListener</code></td><td><code>BeforeRegisterEvent</code></td><td>Blocks the registration once the IP's recorded failures reach <code>registrationMaxAttempts</code>.</td></tr>
                </tbody>
            </table>
</div>
<p>
            Both blocking listeners throw core's <code>ActionPreventedException</code>,
            the same cancellation mechanism core itself uses for
            <code>BeforeLoginEvent</code> and <code>BeforeRegisterEvent</code>: the
            dispatching controller catches it and surfaces a translated error on the
            form instead of a raw exception.
</p>
<p>
            Counters are scoped by IP address rather than by account, on purpose.
            Scoping by account instead would let an attacker lock a legitimate user
            out of their own account just by deliberately failing that user's login
            from somewhere else, an easy denial-of-service that IP scoping avoids
            while still stopping a single attacker hammering one account or many.
</p>
<p>
            This is a threshold-triggered lockout, not a general-purpose rate
            limiter: only failures count toward the threshold, and once under it,
            a block is a hard deny rather than a throttled or smoothed-out request
            rate. Traffic to <code>/login</code> or <code>/register</code> that
            never fails is not limited at all by this package.
</p>
