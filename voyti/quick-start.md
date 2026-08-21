---
layout: package-section
pkgId: voyti
section: quick-start
title: "Voyti - Quick Start"
---

<ol>
            <li>
                <h4>Verify prerequisites</h4>
<ul class="mb-2">
<li>PHP 8.3 or higher with <code>ext-intl</code></li>
<li>A connected database in your host application via <a href="https://github.com/yiisoft/db" target="_blank">Yii Database</a></li>
</ul>
            </li>
            <li>
                <h4>Install</h4>
<p class="mb-3">
            Voyti's core is view-agnostic; you need a views implementation package to render any pages.
            <code>yiirocks/voyti-views-bootstrap5</code> is the reference implementation using Bootstrap 5. You can
            substitute an alternative views package if you prefer a different UI framework, as long as it implements
            the <code>yiirocks/voyti-views</code> interface.
</p>
<button type="button" class="copy-btn copy--sm mb-3">composer require yiirocks/voyti yiirocks/voyti-views-bootstrap5</button>
<p class="mb-3">Optional packages to extend functionality:</p>
<div class="optional-grid mb-4">
            <div class="feature-card">
                <div class="fw-bold mb-1">Bot Protection</div>
                <div class="feature-card__text">Google reCAPTCHA v2/v3 for registration and login forms</div>
                <button type="button" class="copy-btn copy--sm w-100">composer require yiirocks/recaptcha</button>
            </div>
            <div class="feature-card">
                <div class="fw-bold mb-1">Brute-force Protection</div>
                <div class="feature-card__text">Exponential backoff delays for failed login and registration attempts, tracked per IP address</div>
                <button type="button" class="copy-btn copy--sm w-100">composer require yiirocks/voyti-lockout</button>
            </div>
            <div class="feature-card">
                <div class="fw-bold mb-1">GDPR Data Handling</div>
                <div class="feature-card__text">Export user data and anonymize accounts for compliance with data protection regulations</div>
                <button type="button" class="copy-btn copy--sm w-100">composer require yiirocks/voyti-gdpr</button>
            </div>
            <div class="feature-card">
                <div class="fw-bold mb-1">REST API</div>
                <div class="feature-card__text">JSON user CRUD endpoints with bearer-token authentication and API key lifecycle management</div>
                <button type="button" class="copy-btn copy--sm w-100">composer require yiirocks/voyti-api</button>
            </div>
            <div class="feature-card">
                <div class="fw-bold mb-1">Social Authentication</div>
                <div class="feature-card__text">OAuth2 login via Google, GitHub, Facebook, and more</div>
                <button type="button" class="copy-btn copy--sm w-100">composer require yiirocks/voyti-social-auth</button>
            </div>
            <div class="feature-card">
                <div class="fw-bold mb-1">Toast Notifications</div>
                <div class="feature-card__text">Renders voyti's flash messages as Bootstrap 5 toasts</div>
                <button type="button" class="copy-btn copy--sm w-100">composer require yiirocks/toast-bootstrap5</button>
            </div>
            <div class="feature-card">
                <div class="fw-bold mb-1">Two-Factor Authentication</div>
                <div class="feature-card__text">Email codes and/or TOTP (authenticator app) and/or WebAuthn/passkeys for stronger account security</div>
                <button type="button" class="copy-btn copy--sm w-100">composer require yiirocks/voyti-2fa-email</button>
                <button type="button" class="copy-btn copy--sm w-100">composer require yiirocks/voyti-2fa-totp</button>
                <button type="button" class="copy-btn copy--sm w-100">composer require yiirocks/voyti-2fa-webauthn</button>
            </div>
</div>

            </li>
            <li>
                <h4 id="cookie-secret">Set the cookie secret</h4>
<div class="alert alert-danger" role="alert">
            Voyti encrypts the remember-me cookie using <code>yiisoft/cookies</code>'
            secret key. Leaving it unset throws a <code>LogicException</code>.
            Generate a strong, random string and set it in <code>config/params.php</code>.
</div>

<div class="doc-example mb-3">
{% highlight php %}
return [
    'yiisoft/cookies' => [
        'secretKey' => $_ENV['COOKIES_SECRET'],
    ],
];
{% endhighlight %}
</div>

            </li>
            <li>
                <h4>Run migrations</h4>
<p>
            Voyti provides its migration path through
            <code>config/params-console.php</code> using the standard
            <code>yiisoft/db-migration</code> configuration keys. With
            <code>yiisoft/db-migration</code> enabled in your console app, run:
</p>
<button type="button" class="copy-btn copy--sm mb-3">./yii migrate:up</button>
<p>
            Voyti's migration creates 6 user-related tables (user, user_profile,
            user_token, user_sessions, user_password_history, user_audit_log) and
            seeds default roles and permissions into the RBAC tables created by
            <code>yiisoft/rbac-db</code>. Social authentication tables are provided by
            the optional <code>yiirocks/voyti-social-auth</code> package.
</p>
<p>
            If the <code>user</code> table is empty after these migrations run, a
            default admin account is seeded automatically: username <code>admin</code>,
            email <code>admin@example.com</code>, and a random password printed to
            the console. <strong class="text-danger">Change this password
            immediately after first login.</strong>
</p>
<p>
            The account is assigned the <code>administrator</code> role, which is
            granted the <code>administratorPermissionName</code> permission needed to
            reach the admin dashboard. If the <code>user</code> table already has
            rows (e.g. re-running migrations on an existing database), seeding is
            skipped entirely.
</p>

            </li>
            <li>
                <h4 id="register-routes">Register routes</h4>
<p>
            Routes are <strong>not</strong> auto-registered - you must add them to
            your router configuration.
</p>
<p>
            Pull the <code>voyti-routes</code> config group into your router
            definition. The example below mounts them under a <code>/user/</code>
            prefix as their own group, alongside your app's own routes:
</p>
<div class="doc-example mb-3">
{% highlight php %}
use Yiisoft\Config\Config;
use Yiisoft\Definitions\DynamicReference;
use Yiisoft\Router\Group;
use Yiisoft\Router\RouteCollection;
use Yiisoft\Router\RouteCollectionInterface;
use Yiisoft\Router\RouteCollector;
use Yiisoft\Session\SessionMiddleware;
use YiiRocks\Voyti\Middleware\VoytiMiddleware;

/** @var Config $config */

return [
    RouteCollectionInterface::class => [
        'class' => RouteCollection::class,
        '__construct()' => [
            'collector' => DynamicReference::to(
                static fn() => (new RouteCollector())
                    ->addRoute(
                        Group::create('/')
                            ->middleware(
                                SessionMiddleware::class,                  # required for site-wide session support
                                VoytiMiddleware::class,                    # Site-wide enforcement
                            )
                            ->routes(...$config->get('routes')),           # Your routes
                        Group::create('/user/')                            # Voyti web URL prefix
                            ->routes(...$config->get('voyti-routes')),     # Voyti web routes
                    )
            ),
        ],
    ],
];
{% endhighlight %}
</div>
<p>
            <code>voyti-routes</code> already wraps itself with its own required
            middleware (see <code>config/routes.php</code>), so the group above
            doesn't repeat any of it, and adding <code>VoytiMiddleware</code> to
            your own group only extends that same coverage to your app's pages.
</p>

            </li>
            <li>
                <h4 id="configure-the-form-theme">Configure the form theme</h4>
<div class="alert alert-warning" role="alert">
            This step is optional but highly recommended. Without it, forms and buttons will render without any styling.
</div>
<p>
            Voyti's forms (login, registration, profile, etc.) and button-styled links render through
            <code>yiisoft/form</code>'s <code>ThemeContainer</code>.
</p>
<p>
            Set a theme in <code>config/params.php</code>. <code>yiisoft/form</code>
            ships ready-made Bootstrap 5 configs you can use as-is:
</p>
<div class="doc-example mb-3">
{% highlight php %}
use Yiisoft\Form\Theme\ThemePath;
use Yiisoft\FormModel\ValidationRulesEnricher;

return [
    'yiisoft/form' => [
        'themes' => [
            'default' => [
                ...require ThemePath::BOOTSTRAP5_VERTICAL,
                'enrichFromValidationRules' => true,
                'validationRulesEnricher' => new ValidationRulesEnricher(),
            ],
        ],
        'defaultTheme' => 'default',
    ],
];
{% endhighlight %}
</div>
<p>
            Swap in <code>ThemePath::BOOTSTRAP5_HORIZONTAL</code> for a horizontal
            label/input layout, or write your own array of
            <code>Theme::__construct()</code> options if you're not using Bootstrap.
</p>
<p>
            <code>enrichFromValidationRules</code> and
            <code>validationRulesEnricher</code> translate the
            <code>yiisoft/validator</code> rules on your form models
            (<code>Required</code>, <code>Length</code>, <code>Regex</code>, etc.)
            into matching HTML5 input attributes (<code>required</code>,
            <code>minlength</code>/<code>maxlength</code>, <code>pattern</code>, and
            so on), giving you client-side validation automatically.
</p>
<div class="mb-4">
            <img src="/assets/images/voyti/quick-start-form-theme-comparison.png" alt="Before and after comparison - form styling without and with Bootstrap 5 theme" class="img-fluid rounded" loading="lazy" decoding="async">
</div>

            </li>
            <li>
                <h4>Done</h4>
                <p>
                    DI bindings, event listeners, and console commands are auto-registered
                    via the <a href="https://github.com/yiisoft/config">Yii3 config
                    plugin</a>. No manual wiring needed.
                </p>
            </li>
</ol>
