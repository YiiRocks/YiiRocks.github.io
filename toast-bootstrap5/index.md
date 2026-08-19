---
layout: package
pkgId: toast-bootstrap5
title: Toast Bootstrap5
description: Renders Bootstrap 5 toast notifications from your Yii Framework 3 application's session flash messages. Queue a message from a controller, render $toast in your layout. No manual partials, no bundled JS asset.
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
