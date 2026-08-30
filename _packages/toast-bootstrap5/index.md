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
description: "Renders Bootstrap 5 toast notifications from your Yii3 application's session flash messages. Queue a message from a controller, render $toast in your layout. No manual partials, no bundled JS asset."
features: 
  - label: "Flash-backed queue"
    detail: "Queue success/error/warning/info messages onto the session flash; multiple messages of the same type stack as separate toasts"
  - label: "Zero-config rendering"
    detail: "<code>$toast</code> is injected into every web view via the config-plugin, and its <code>render()</code> returns empty when no messages are pending"
  - label: "Per-type styling"
    detail: "Each type maps to a Bootstrap 5 text-bg-* color with the correct alert role/aria-live and close-button contrast"
  - label: "Configurable auto-dismiss"
    detail: "Per-type delay in milliseconds, or null to require manual dismissal (the default for error, so it isn't lost to a timer)"
  - label: "Optional icons"
    detail: "Bootstrap Icon per type via the optional yiirocks/svg-inline-bootstrap sibling, rendering silently without one when it isn't installed"
  - label: "Bootstrap's own JS"
    detail: "Registers a small show-script through the view (at end of body, after Bootstrap's bundle regardless of load order) that calls <code>bootstrap.Toast</code>'s own API, the only JS this package ships"
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

Renders Bootstrap 5 toast notifications from your Yii3 application's session flash messages. Queue
a message from a controller with `FlashToastInterface`, render it in your layout with
`$toast->render($this)`. No manual partials, no bundled JS asset. Requires Bootstrap 5's JS bundle
to be loaded on the page for the dismiss and auto-hide behavior.

<h2 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Types</h2>

The first argument to `add()` is a `ToastType` case. Each maps to a Bootstrap 5 `text-bg-*` color
and an ARIA live-region role. Urgent types interrupt with `role="alert"`, the rest announce
politely with `role="status"`.

<div class="list-group mb-3">
    <div class="list-group-item">
        <div class="row">
            <div class="col-md-4">
                <div class="fw-semibold font-monospace">ToastType::SUCCESS</div>
                <div class="font-monospace small text-muted"><code>text-bg-success</code></div>
            </div>
            <div class="col-md-8">Polite status message (<code>role="status"</code>).</div>
        </div>
    </div>
    <div class="list-group-item">
        <div class="row">
            <div class="col-md-4">
                <div class="fw-semibold font-monospace">ToastType::ERROR</div>
                <div class="font-monospace small text-muted"><code>text-bg-danger</code></div>
            </div>
            <div class="col-md-8">Urgent alert (<code>role="alert"</code>); stays up until dismissed by default, so it isn't lost to a timer.</div>
        </div>
    </div>
    <div class="list-group-item">
        <div class="row">
            <div class="col-md-4">
                <div class="fw-semibold font-monospace">ToastType::WARNING</div>
                <div class="font-monospace small text-muted"><code>text-bg-warning</code></div>
            </div>
            <div class="col-md-8">Urgent alert (<code>role="alert"</code>).</div>
        </div>
    </div>
    <div class="list-group-item">
        <div class="row">
            <div class="col-md-4">
                <div class="fw-semibold font-monospace">ToastType::INFO</div>
                <div class="font-monospace small text-muted"><code>text-bg-info</code></div>
            </div>
            <div class="col-md-8">Polite status message (<code>role="status"</code>).</div>
        </div>
    </div>
</div>
