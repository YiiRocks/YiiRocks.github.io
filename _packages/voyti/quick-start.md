---
layout: package-section
pkgId: voyti
section: quick-start
title: "Voyti - Quick Start"
---

<ol>
            <li>
                <h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Verify prerequisites</h3>
<ul class="mb-3">
<li>PHP 8.3 or higher with <code>ext-intl</code></li>
<li>A connected database in your host application via <a href="https://github.com/yiisoft/db">Yii Database</a></li>
</ul>
            </li>
            <li>
                <h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Install</h3>
<p class="mb-3" markdown="1">
            Voyti's core is view-agnostic; you need a views implementation package to render any pages.
            `voyti-views-bootstrap5` is the reference implementation using Bootstrap 5. You can
            substitute an alternative views package if you prefer a different UI framework, as long as it
            announces its `views` directory through the `viewsPackagePaths` param.
</p>
<button type="button" data-clipboard class="btn btn-outline-primary fw-medium text-start text-nowrap overflow-hidden font-monospace mw-100 mb-3">composer require yiirocks/voyti yiirocks/voyti-views-bootstrap5</button>
<p class="mb-3">Optional packages to extend functionality:</p>
<div class="row row-cols-1 row-cols-md-2 g-3 mb-3">
            <div class="col">
            <div class="card card-body p-3 h-100 d-flex flex-column">
                <div class="fw-bold mb-1">Bot Protection</div>
                <div class="small lh-base mb-2 flex-grow-1">Google reCAPTCHA v2/v3 for registration and login forms</div>
                <button type="button" data-clipboard class="btn btn-outline-primary fw-medium text-start text-nowrap overflow-hidden font-monospace w-100 mt-auto">composer require yiirocks/recaptcha</button>
            </div>
            </div>
            <div class="col">
            <div class="card card-body p-3 h-100 d-flex flex-column">
                <div class="fw-bold mb-1">Brute-force Protection</div>
                <div class="small lh-base mb-2 flex-grow-1">Exponential backoff delays for failed login and registration attempts, tracked per IP address</div>
                <button type="button" data-clipboard class="btn btn-outline-primary fw-medium text-start text-nowrap overflow-hidden font-monospace w-100 mt-auto">composer require yiirocks/voyti-lockout</button>
            </div>
            </div>
            <div class="col">
            <div class="card card-body p-3 h-100 d-flex flex-column">
                <div class="fw-bold mb-1">GDPR Data Handling</div>
                <div class="small lh-base mb-2 flex-grow-1">Export user data and anonymize accounts for compliance with data protection regulations</div>
                <button type="button" data-clipboard class="btn btn-outline-primary fw-medium text-start text-nowrap overflow-hidden font-monospace w-100 mt-auto">composer require yiirocks/voyti-gdpr</button>
            </div>
            </div>
            <div class="col">
            <div class="card card-body p-3 h-100 d-flex flex-column">
                <div class="fw-bold mb-1">REST API</div>
                <div class="small lh-base mb-2 flex-grow-1">JSON user CRUD endpoints with bearer-token authentication and API key lifecycle management</div>
                <button type="button" data-clipboard class="btn btn-outline-primary fw-medium text-start text-nowrap overflow-hidden font-monospace w-100 mt-auto">composer require yiirocks/voyti-api</button>
            </div>
            </div>
            <div class="col">
            <div class="card card-body p-3 h-100 d-flex flex-column">
                <div class="fw-bold mb-1">Social Authentication</div>
                <div class="small lh-base mb-2 flex-grow-1">OAuth2 login via Google, GitHub, Facebook, and more</div>
                <button type="button" data-clipboard class="btn btn-outline-primary fw-medium text-start text-nowrap overflow-hidden font-monospace w-100 mt-auto">composer require yiirocks/voyti-social-auth</button>
            </div>
            </div>
            <div class="col">
            <div class="card card-body p-3 h-100 d-flex flex-column">
                <div class="fw-bold mb-1">Toast Notifications</div>
                <div class="small lh-base mb-2 flex-grow-1">Renders voyti's flash messages as Bootstrap 5 toasts</div>
                <button type="button" data-clipboard class="btn btn-outline-primary fw-medium text-start text-nowrap overflow-hidden font-monospace w-100 mt-auto">composer require yiirocks/toast-bootstrap5</button>
            </div>
            </div>
            <div class="col">
            <div class="card card-body p-3 h-100 d-flex flex-column">
                <div class="fw-bold mb-1">Two-Factor Authentication</div>
                <div class="small lh-base mb-2 flex-grow-1">Email codes and/or TOTP (authenticator app) and/or WebAuthn/passkeys for stronger account security</div>
                <div class="mt-auto">
                <button type="button" data-clipboard class="btn btn-outline-primary fw-medium text-start text-nowrap overflow-hidden font-monospace w-100 mb-2">composer require yiirocks/voyti-2fa-email</button>
                <button type="button" data-clipboard class="btn btn-outline-primary fw-medium text-start text-nowrap overflow-hidden font-monospace w-100 mb-2">composer require yiirocks/voyti-2fa-totp</button>
                <button type="button" data-clipboard class="btn btn-outline-primary fw-medium text-start text-nowrap overflow-hidden font-monospace w-100">composer require yiirocks/voyti-2fa-webauthn</button>
                </div>
            </div>
            </div>
</div>

            </li>
            <li>
                <h3 id="cookie-secret" class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Set the cookie secret</h3>
<div class="alert alert-danger" role="alert">
            Voyti encrypts the remember-me cookie using <code>yiisoft/cookies</code>'
            secret key. Leaving it unset throws a <code>LogicException</code>.
            Generate a strong, random string and set it in <code>config/params.php</code>.
</div>

<div class="mb-3 small lh-base">
{% highlight php %}
return [
    'yiisoft/cookies' => [
        'secretKey' => $_ENV['COOKIES_SECRET'],
    ],
];
{% endhighlight %}
</div>

<p class="mb-3" markdown="1">Here's a random value for `secretKey`, in case you need one:</p>
<div class="d-flex gap-2 mb-3">
<button type="button" data-clipboard data-secret-value class="btn btn-outline-primary fw-medium text-start text-nowrap overflow-hidden font-monospace">Enable JavaScript to generate a random value</button>
<button type="button" data-secret-renew class="btn btn-secondary flex-shrink-0 p-0 d-flex align-items-center justify-content-center" style="width: 44px;" aria-label="Generate a new secret key" title="Generate a new secret key"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"/><path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192"/></svg></button>
</div>

            </li>
            <li>
                <h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Run migrations</h3>

<p class="mb-3" markdown="1">Voyti provides its migration path through `config/params-console.php` using the standard
`yiisoft/db-migration` configuration keys. With `yiisoft/db-migration` enabled in your console app,
run:</p>

<button type="button" data-clipboard class="btn btn-outline-primary fw-medium text-start text-nowrap overflow-hidden font-monospace mb-3">./yii migrate:up</button>

<p class="mb-3" markdown="1">Voyti's migration creates 6 user-related tables (user, user_profile, user_token, user_sessions,
user_password_history, user_audit_log) and seeds default roles and permissions into the RBAC
tables created by `yiisoft/rbac-db`.</p>

<p class="mb-3" markdown="1">The same migration also seeds a default admin account: username `admin`, email
`admin@example.com`, and a random password printed to the console. <strong class="text-danger">Change
this password immediately after first login.</strong></p>

<p class="mb-3" markdown="1">The account is assigned the `administrator` role, which is granted the
`administratorPermissionName` permission needed to reach the admin dashboard.</p>

            </li>
            <li>
                <h3 id="register-routes" class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Register routes</h3>

<p class="mb-3">Routes are <strong>not</strong> auto-registered - you must add them to your router configuration.</p>

<p class="mb-3" markdown="1">Pull the `voyti-routes` config group into your router definition. The example below
mounts them under a `/user/` prefix as their own group, alongside your app's own routes:</p>

<div class="mb-3 small lh-base">
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

<p class="mb-3" markdown="1">`voyti-routes` already wraps itself with its own required middleware (see `config/routes.php`), so
the group above doesn't repeat any of it, and adding `VoytiMiddleware` to your own group only
extends that same coverage to your app's pages.</p>

            </li>
            <li>
                <h3 id="configure-the-form-theme" class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Configure the form theme</h3>
<div class="alert alert-warning" role="alert">
            This step is optional but highly recommended. Without it, forms and buttons will render without any styling.
</div>

<p class="mb-3" markdown="1">Voyti's forms (login, registration, profile, etc.) and button-styled links render through
`yiisoft/form`'s `ThemeContainer`.</p>

<p class="mb-3" markdown="1">Set a theme in `config/params.php`. `yiisoft/form` ships ready-made Bootstrap 5 configs you can use
as-is:</p>

<div class="mb-3 small lh-base">
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

<p class="mb-3" markdown="1">Swap in `ThemePath::BOOTSTRAP5_HORIZONTAL` for a horizontal label/input layout, or write your
own array of `Theme::__construct()` options if you're not using Bootstrap.</p>

<p class="mb-3" markdown="1">`enrichFromValidationRules` and `validationRulesEnricher` translate the `yiisoft/validator` rules
on your form models (`Required`, `Length`, `Regex`, etc.) into matching HTML5 input attributes
(`required`, `minlength`/`maxlength`, `pattern`, and so on), giving you client-side validation
automatically.</p>

<div class="mb-3">
            <img src="/assets/images/voyti/quick-start-form-theme-comparison.png" alt="Before and after comparison - form styling without and with Bootstrap 5 theme" class="img-fluid rounded" loading="lazy" decoding="async">
</div>

            </li>
            <li>
                <h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Done</h3>

<p markdown="1">DI bindings, event listeners, and console commands are auto-registered via the
[Yii3 config plugin](https://github.com/yiisoft/config). No manual wiring needed.</p>

            </li>
</ol>
