---
layout: package-section
pkgId: voyti
section: cookbook
title: "Voyti - Cookbook"
description: "Practical Voyti recipes: building a nav menu from routes, styling required-field indicators, rendering flash messages as toasts, showing the impersonation banner, and attaching a listener to a Voyti event."
excerpt_separator: ""
---

{% capture content %}
Voyti does not provide a menu model or navigation contract, it only exposes named routes that the
host application wires into its own menu, sidebar, or access rules. For example, a
[`yiisoft/yii-bootstrap5`](https://github.com/yiisoft/yii-bootstrap5) nav built from those routes
might look like:
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
`voyti/session-logout` only accepts `POST`, so it can't be a plain
`NavLink`. Render it as its own small form instead, styled to match the nav:
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
`$csrf` here is the `Csrf` value object that
[`Yiisoft\Yii\View\Renderer\CsrfViewInjection`](https://github.com/yiisoft/yii-view-renderer)
makes available to views when it's registered as a common parameter injection.
{% endcapture %}
{% include collapsible_card.md group="cookbook" heading="h3" id="building-a-nav-menu-from-voytis-routes" title="Building a nav menu from Voyti's routes" content=content %}

{% capture content %}
First, enable `enrichFromValidationRules` in your field theme config (see
[Quick Start](/voyti/quick-start/)) so that validation rules are translated to HTML5 attributes like
`required`. Then add this to your stylesheet:
<div class="mb-0 small lh-base">
{% highlight css %}
div:has([required]) > label::after {
    content: '\a0*';
    color: red;
}
{% endhighlight %}
</div>
{% endcapture %}
{% include collapsible_card.md group="cookbook" heading="h3" id="styling-required-field-indicators-with-css" title="Styling required field indicators with CSS" content=content %}

{% capture content %}
Voyti reports action outcomes - login, logout, password recovery, a saved profile - as session
flash messages, and its own pages render them for you: as Bootstrap 5 toasts when the optional
[toast-bootstrap5](/voyti/quick-start/) package is installed, or plain alerts otherwise.
To surface them on your own pages too - such as the home page, where
[`voyti/session-logout`](/voyti/routes/) redirects after logout - render the toast container in
your layout:
<div class="mb-0 small lh-base">
{% highlight php %}
<?= $toast->render($this) ?>
{% endhighlight %}
</div>
{% endcapture %}
{% include collapsible_card.md group="cookbook" heading="h3" id="rendering-flash-messages-as-bootstrap-toasts" title="Rendering flash messages as Bootstrap toasts" content=content %}

{% capture content %}
When an admin uses [`voyti/admin-users-switch-identity`](/voyti/routes/) to temporarily assume
another user's identity, drop in `YiiRocks\Voyti\Widget\SwitchIdentity` anywhere in your layout to
show the "you're logged in as this user" banner with a restore button:
<div class="mb-3 small lh-base">
{% highlight php %}
if (!str_starts_with($this->currentRoute->getName() ?? '', 'voyti/')) {
    echo YiiRocks\Voyti\Widget\SwitchIdentity::widget();
}
{% endhighlight %}
</div>
Its dependencies resolve through the DI container, so this needs no wiring beyond having Voyti
installed, and it renders an empty string when nobody is impersonating anyone.
{% endcapture %}
{% include collapsible_card.md group="cookbook" heading="h3" id="showing-the-impersonation-banner-in-your-own-layout" title="Showing the impersonation banner in your own layout" content=content %}

{% capture content %}
Attach listeners through the Yii3 event dispatcher configuration:

For events with discriminator types like `UserEvent`, check the type to handle specific
actions. You can attach multiple listeners to the same event, and each receives the event object
plus any other DI dependencies.
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
{% endcapture %}
{% include collapsible_card.md group="cookbook" heading="h3" id="attaching-a-listener-to-a-voyti-event" title="Attaching a listener to a Voyti event" content=content %}
