---
layout: package-section
pkgId: voyti
section: events
title: "Voyti - Events & Listeners"
---

<p>Voyti dispatches events at key points in the user lifecycle, allowing your application to react, log, or extend behaviour. Attach your own listeners through the Yii3 event dispatcher configuration.</p>

<h4 class="doc-h">Events with default listeners</h4>

<div class="opt-grid mb-3">
    <div class="opt-row">
        <div class="opt-name">
            <div class="opt-label">YiiRocks\Voyti\Event\Auth\AfterLoginEvent</div>
        </div>
        <div class="opt-desc"><strong>Trigger:</strong> User logs in<br><strong>Default:</strong> Triggers password expiration check and session tracking</div>
    </div>
    <div class="opt-row">
        <div class="opt-name">
            <div class="opt-label">YiiRocks\Voyti\Event\Auth\AfterRegisterEvent</div>
        </div>
        <div class="opt-desc"><strong>Trigger:</strong> New user registration<br><strong>Default:</strong> Sends admin notification email</div>
    </div>
</div>

<h4>Additional events (no default listeners)</h4>
<p>Dispatched by the library, but nothing consumes them by default -
        attach your own listener via the event dispatcher configuration if you
        need to react to them.</p>

<div class="opt-grid mb-3">
    <div class="opt-row">
        <div class="opt-name">
            <div class="opt-label">YiiRocks\Voyti\Event\User\UserEvent</div>
        </div>
        <div class="opt-desc">Carries a <code>getType()</code> discriminator: <code>CREATE</code>, <code>BLOCK</code>, <code>UNBLOCK</code>, <code>CONFIRM</code>, <code>SWITCH_IDENTITY</code>, <code>RESTORE_IDENTITY</code>, <code>PASSWORD_RESET</code>, or <code>DELETE</code></div>
    </div>
    <div class="opt-row">
        <div class="opt-name">
            <div class="opt-label">YiiRocks\Voyti\Event\User\UserProfileEvent</div>
        </div>
        <div class="opt-desc">Dispatched when a user updates their profile</div>
    </div>
    <div class="opt-row">
        <div class="opt-name">
            <div class="opt-label">YiiRocks\Voyti\Event\User\ResetPasswordEvent</div>
        </div>
        <div class="opt-desc">Password reset flow</div>
    </div>
    <div class="opt-row">
        <div class="opt-name">
            <div class="opt-label">YiiRocks\Voyti\Event\Session\SessionEvent</div>
        </div>
        <div class="opt-desc">Dispatched with type <code>SESSION_CREATED</code> on login, and with type <code>SESSION_TERMINATED</code> whenever a user's sessions are terminated (account deletion or being blocked). The <code>SESSION_UPDATED</code> type is defined but not currently dispatched.</div>
    </div>
</div>

<h4 class="doc-h">Example: Listening to Events</h4>

<p>Attach listeners through the Yii3 event dispatcher configuration. Here's an example that logs when a user updates their profile:</p>

<div class="doc-example mb-3">
{% highlight php %}
use Psr\EventDispatcher\EventDispatcherInterface;
use YiiRocks\Voyti\Event\User\UserProfileEvent;

return [
    EventDispatcherInterface::class => static function() {
        $dispatcher = new EventDispatcher();
        
        $dispatcher->attach(UserProfileEvent::class, static function(UserProfileEvent $event) {
            // Log profile changes
            $user = $event->getUser();
            echo "User {$user->getUsername()} updated their profile\n";
        });
        
        return $dispatcher;
    }
];
{% endhighlight %}
</div>

<p>This listener fires automatically whenever a user updates their profile. You can listen to any event the same way—attach a callable that receives the event object.</p>
