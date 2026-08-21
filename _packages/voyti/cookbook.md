---
layout: package-section
pkgId: voyti
section: cookbook
title: "Voyti - Cookbook"
description: "Practical Voyti recipes: building a nav menu from routes, styling required-field indicators, rendering flash messages as toasts, and showing the impersonation banner."
excerpt_separator: ""
---

<h4>Building a nav menu from voyti's routes</h4>
<p>
            Voyti does not provide a menu model or navigation contract (see
            <a href="/voyti/routes/">Routes</a>) - it only exposes named routes that the
            host application wires into its own menu, sidebar, or access rules. For example, a
            <a href="https://github.com/yiisoft/yii-bootstrap5"><code>yiisoft/yii-bootstrap5</code></a>
            nav built from those routes might look like:
</p>
<div class="doc-example mb-3">
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
        ->visible($this->authManager->userHasPermission($this->currentUser->getId(), 'voyti-admin')),
);
{% endhighlight %}
</div>
<p>
            <code>voyti/session-logout</code> only accepts <code>POST</code>, so it can't be a
            plain <code>NavLink</code>. Render it as its own small form instead, styled to match
            the nav:
</p>
<div class="doc-example mb-3">
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
<p>
            <code>$csrf</code> here is the <code>Csrf</code> value object that
            <a href="https://github.com/yiisoft/yii-view-renderer"><code>Yiisoft\Yii\View\Renderer\CsrfViewInjection</code></a>
            makes available to views when it's registered as a common parameter injection.
</p>

<h4>Styling required field indicators with CSS</h4>
<p>
            First, enable <code>enrichFromValidationRules</code> in your field theme config
            (see <a href="/voyti/quick-start/">Quick Start</a>) so that validation rules are
            translated to HTML5 attributes like <code>required</code>. Then add this to your stylesheet:
</p>
<div class="doc-example mb-3">
{% highlight css %}
div:has([required]) > label::after {
    content: '\a0*';
    color: red;
}
{% endhighlight %}
</div>

<h4>Rendering flash messages as Bootstrap toasts</h4>
<p>
            Voyti reports action outcomes - login, logout, password recovery, a saved profile -
            as session flash messages, and its own pages render them for you: as Bootstrap 5
            toasts when the optional <a href="/voyti/quick-start/">yiirocks/toast-bootstrap5</a>
            package is installed, or plain alerts otherwise. To surface them on your own pages too
            - such as the home page, where
            <a href="/voyti/routes/"><code>voyti/session-logout</code></a> redirects after logout
            - render the toast container in your layout:
</p>
<div class="doc-example mb-3">
{% highlight php %}
<?= $toast->render($this) ?>
{% endhighlight %}
</div>

<h4>Showing the impersonation banner in your own layout</h4>
<p>
            When an admin uses <a href="/voyti/routes/#admin"><code>voyti/admin-users-switch-identity</code></a>
            to temporarily assume another user's identity, drop in
            <code>YiiRocks\Voyti\Widget\SwitchIdentity</code> anywhere in your layout to show
            the "you're logged in as this user" banner with a restore button:
</p>
<div class="doc-example mb-3">
{% highlight php %}
if (!str_starts_with($this->currentRoute->getName() ?? '', 'voyti/')) {
    echo YiiRocks\Voyti\Widget\SwitchIdentity::widget();
}
{% endhighlight %}
</div>
<p>
            Its dependencies resolve through the DI container, so this needs no wiring beyond
            having voyti installed, and it renders an empty string when nobody is impersonating
            anyone.
</p>
