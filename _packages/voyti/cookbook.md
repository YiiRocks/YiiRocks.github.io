---
layout: package-section
pkgId: voyti
section: cookbook
title: "Voyti - Cookbook"
description: "Practical Voyti recipes: building a nav menu from routes, styling required-field indicators, rendering flash messages as toasts, showing the impersonation banner, and attaching a listener to a voyti event."
excerpt_separator: ""
---

<details class="card mb-3">
<summary class="card-header d-flex justify-content-between align-items-center">
<h3 class="h5 mb-0 text-primary-emphasis">Building a nav menu from voyti's routes</h3>
</summary>
<div class="card-body">
<p class="mb-3" markdown="1">Voyti does not provide a menu model or navigation contract, it only exposes named routes that the
host application wires into its own menu, sidebar, or access rules. For example, a
[`yiisoft/yii-bootstrap5`](https://github.com/yiisoft/yii-bootstrap5) nav built from those routes
might look like:</p>
<div class="mb-3 small lh-base">
{% highlight php %}
use Yiisoft\Yii\Bootstrap5\Nav;
use Yiisoft\Yii\Bootstrap5\NavLink;

echo Nav::widget()->items(
    NavLink::to($this->translator->translate('voyti.view.login.title', category: 'voyti'), $this->url->generate('voyti/session-login'))
        ->visible($this->currentUser->isGuest()),
    NavLink::to('User', $this->url->generate('voyti/user'))
        ->active(str_starts_with($this->currentRoute->getName() ?? '', 'voyti/user'))
        ->visible(!$this->currentUser->isGuest()),
    NavLink::to('Admin', $this->url->generate('voyti/admin'))
        ->active(str_starts_with($this->currentRoute->getName() ?? '', 'voyti/admin'))
        ->visible($this->authHelper->isAdmin()),
);
{% endhighlight %}
</div>
<p class="mb-3" markdown="1">`voyti/session-logout` only accepts `POST`, so it can't be a plain
`NavLink`. Render it as its own small form instead, styled to match the nav:</p>
<div class="mb-3 small lh-base">
{% highlight php %}
use Yiisoft\Html\Html;

if (!$this->currentUser->isGuest()) {
    echo Html::li()->class('nav-item')->open();
    echo Html::form()->post($this->url->generate('voyti/session-logout'))->csrf($csrf)->open();
    echo Html::submitButton($this->translator->translate('voyti.menu.logout', category: 'voyti'))
        ->class('nav-link', 'btn', 'btn-link');
    echo Html::form()->close();
    echo Html::li()->close();
}
{% endhighlight %}
</div>
<p class="mb-0" markdown="1">`$csrf` here is the `Csrf` value object that
[`Yiisoft\Yii\View\Renderer\CsrfViewInjection`](https://github.com/yiisoft/yii-view-renderer) makes
available to views when it's registered as a common parameter injection.</p>
</div>
</details>

<details class="card mb-3">
<summary class="card-header d-flex justify-content-between align-items-center">
<h3 class="h5 mb-0 text-primary-emphasis">Styling required field indicators with CSS</h3>
</summary>
<div class="card-body">
<p class="mb-3" markdown="1">First, enable `enrichFromValidationRules` in your field theme config (see
[Quick Start](/voyti/quick-start/)) so that validation rules are translated to HTML5 attributes
like `required`. Then add this to your stylesheet:</p>
<div class="mb-0 small lh-base">
{% highlight css %}
div:has([required]) > label::after {
    content: '\a0*';
    color: red;
}
{% endhighlight %}
</div>
</div>
</details>

<details class="card mb-3">
<summary class="card-header d-flex justify-content-between align-items-center">
<h3 class="h5 mb-0 text-primary-emphasis">Rendering flash messages as Bootstrap toasts</h3>
</summary>
<div class="card-body">
<p class="mb-3" markdown="1">Voyti reports action outcomes - login, logout, password recovery, a saved profile - as session
flash messages, and its own pages render them for you: as Bootstrap 5 toasts when the optional
[toast-bootstrap5](/voyti/quick-start/) package is installed, or plain alerts otherwise.
To surface them on your own pages too - such as the home page, where
[`voyti/session-logout`](/voyti/routes/) redirects after logout - render the toast container in
your layout:</p>
<div class="mb-0 small lh-base">
{% highlight php %}
<?= $toast->render($this) ?>
{% endhighlight %}
</div>
</div>
</details>

<details class="card mb-3">
<summary class="card-header d-flex justify-content-between align-items-center">
<h3 class="h5 mb-0 text-primary-emphasis">Showing the impersonation banner in your own layout</h3>
</summary>
<div class="card-body">
<p class="mb-3" markdown="1">When an admin uses [`voyti/admin-users-switch-identity`](/voyti/routes/) to temporarily assume
another user's identity, drop in `YiiRocks\Voyti\Widget\SwitchIdentity` anywhere in your layout to
show the "you're logged in as this user" banner with a restore button:</p>
<div class="mb-3 small lh-base">
{% highlight php %}
if (!str_starts_with($this->currentRoute->getName() ?? '', 'voyti/')) {
    echo YiiRocks\Voyti\Widget\SwitchIdentity::widget();
}
{% endhighlight %}
</div>
<p class="mb-0">Its dependencies resolve through the DI container, so this needs no wiring beyond having voyti
installed, and it renders an empty string when nobody is impersonating anyone.</p>
</div>
</details>

<details class="card mb-3">
<summary class="card-header d-flex justify-content-between align-items-center">
<h3 id="attaching-a-listener-to-a-voyti-event" class="h5 mb-0 text-primary-emphasis">Attaching a listener to a voyti event</h3>
</summary>
<div class="card-body">
<p class="mb-3">Attach listeners through the Yii3 event dispatcher configuration:</p>
<p class="mb-3" markdown="1">For events with discriminator types like `UserEvent`, check the type to handle specific
actions. You can attach multiple listeners to the same event, and each receives the event object
plus any other DI dependencies.</p>
<div class="mb-0 small lh-base">
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
</div>
</details>
