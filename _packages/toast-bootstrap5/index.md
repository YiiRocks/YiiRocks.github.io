---
permalink: "/toast-bootstrap5/"
layout: "package"
pkgId: "toast-bootstrap5"
name: "Toast Bootstrap5"
tagline: "Bootstrap 5 toast notifications from flash messages"
tint: "#fff1e0"
logo: "/assets/icons/toast.svg"
package: "yiirocks/toast-bootstrap5"
branch: "main"
repo: "toast-bootstrap5"
workflow: "build.yml"
docsUrl: "/toast-bootstrap5/"
title: "Toast Bootstrap5"
description: "Renders Bootstrap 5 toast notifications from your Yii Framework 3 application's session flash messages. Queue a message from a controller, render $toast in your layout. No manual partials, no bundled JS asset."
features: 
  - label: "Flash-backed queue"
    detail: "Queue success/error/warning/info messages onto the session flash; multiple messages of the same type stack as separate toasts"
  - label: "Zero-config rendering"
    detail: "$toast is injected into every web view via the config-plugin, and its render() returns empty when no messages are pending"
  - label: "Per-type styling"
    detail: "Each type maps to a Bootstrap 5 text-bg-* color with the correct alert role/aria-live and close-button contrast"
  - label: "Configurable auto-dismiss"
    detail: "Per-type delay in milliseconds, or null to require manual dismissal - the default for error, so it isn't lost to a timer"
  - label: "Optional icons"
    detail: "Bootstrap Icon per type via the optional yiirocks/svg-inline-bootstrap sibling, rendering silently without one when it isn't installed"
  - label: "Bootstrap's own JS"
    detail: "Registers a small show-script through the view (at end of body, after Bootstrap's bundle regardless of load order) that calls bootstrap.Toast's own API - the only JS this package ships"
usage: |
  use YiiRocks\ToastBootstrap5\ToastType;
  
  // queue from a controller (inject FlashToastInterface)
  $this->toast->add(ToastType::SUCCESS, 'Changes saved.');
  
  // render once in your layout, passing the current view
  echo $toast->render($this);
options: 
  - name: "delay"
    type: "array"
    default: "<code>['success' =&gt; 4000, 'error' =&gt; null, 'warning' =&gt; 6000, 'info' =&gt; 4000]</code>"
    desc: "Milliseconds before a toast auto-hides, keyed by type; null leaves it up until dismissed manually, the default for error."
  - name: "icons"
    type: "array"
    default: "<code>['success' =&gt; 'check-circle-fill', 'error' =&gt; 'exclamation-octagon-fill', 'warning' =&gt; 'exclamation-triangle-fill', 'info' =&gt; 'info-circle-fill']</code>"
    desc: "Bootstrap Icon name keyed by type (requires yiirocks/svg-inline-bootstrap; renders without an icon if it is not installed); null disables that type's icon."
  - name: "position"
    type: "string"
    default: "<code>'top-0 end-0'</code>"
    desc: "Space-separated Bootstrap position utility classes for the toast container."
exampleHeading: "Example"
examples: 
  - "use YiiRocks\\ToastBootstrap5\\ToastType;\n\n$this->toast->add(ToastType::ERROR, 'Something went wrong.');"
---

<p class="doc-desc">Renders Bootstrap 5 toast notifications from your Yii Framework 3 application's session flash messages. Queue a message from a controller with <code>FlashToastInterface</code>, render it in your layout with <code>$toast->render($this)</code>. No manual partials, no bundled JS asset. Requires Bootstrap 5's JS bundle to be loaded on the page for the dismiss and auto-hide behavior.</p>

<h2 class="doc-h">Types</h2>
<p>The first argument to <code>add()</code> is a <code>ToastType</code> case. Each maps to a Bootstrap 5 <code>text-bg-*</code> color and an ARIA live-region role. Urgent types interrupt with <code>role="alert"</code>, the rest announce politely with <code>role="status"</code>.</p>
<div class="opt-grid">
    <div class="opt-row">
        <div class="opt-name">
            <div class="opt-label">ToastType::SUCCESS</div>
            <div class="opt-default"><code>text-bg-success</code></div>
        </div>
        <div class="opt-desc">Polite status message (<code>role="status"</code>).</div>
    </div>
    <div class="opt-row">
        <div class="opt-name">
            <div class="opt-label">ToastType::ERROR</div>
            <div class="opt-default"><code>text-bg-danger</code></div>
        </div>
        <div class="opt-desc">Urgent alert (<code>role="alert"</code>); stays up until dismissed by default, so it isn't lost to a timer.</div>
    </div>
    <div class="opt-row">
        <div class="opt-name">
            <div class="opt-label">ToastType::WARNING</div>
            <div class="opt-default"><code>text-bg-warning</code></div>
        </div>
        <div class="opt-desc">Urgent alert (<code>role="alert"</code>).</div>
    </div>
    <div class="opt-row">
        <div class="opt-name">
            <div class="opt-label">ToastType::INFO</div>
            <div class="opt-default"><code>text-bg-info</code></div>
        </div>
        <div class="opt-desc">Polite status message (<code>role="status"</code>).</div>
    </div>
</div>
