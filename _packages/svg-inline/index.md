---
permalink: "/svg-inline/"
layout: "package"
pkgId: "svg-inline"
name: "SvgInline"
tagline: "Inline SVG file manipulation"
tint: "#e0f2fe"
logo: "/assets/icons/svg.svg"
package: "yiirocks/svg-inline"
branch: "master"
repo: "svg-inline"
workflow: "build.yml"
docsUrl: "/svg-inline/"
featured: true
title: "SvgInline"
description: "Add SVG files inline to your Yii Framework 3 applications. Extensible with Bootstrap Icons and Font Awesome Icons."
sections: 
  - slug: "bootstrap"
    title: "Bootstrap Icons"
  - slug: "fontawesome"
    title: "Font Awesome Icons"
features: 
  - label: "Bootstrap Icons"
    detail: "Open-source Bootstrap Icons with clean, consistent aesthetics"
    icon: "/assets/icons/bootstrap.svg"
  - label: "Font Awesome Icons"
    detail: "Font Awesome's vast library with thousands of icons and multiple style options"
    icon: "/assets/icons/fontawesome.svg"
  - label: "Attribute manipulation"
    detail: "Set ID, classes, fill color, and custom CSS styles on SVG elements"
  - label: "Flexible sizing"
    detail: "Width/height with automatic aspect ratio calculation when only one dimension is specified"
  - label: "Multiple size units"
    detail: "Support for px, em, ex, pt, pc, in, cm, mm - automatically converts to pixels"
  - label: "Fallback icons"
    detail: "Automatically falls back to a default icon if the requested file cannot be found"
  - label: "Immutable fluent API"
    detail: "Method chaining with built-in cloning to prevent unintended mutations"
usage: "$svg->file('@vendor/path/icon.svg');"
---

<p class="doc-description">Provides simple functions for your Yii Framework 3 applications to add SVG files inline and manipulate their properties. It can be extended with Bootstrap Icons and Font Awesome Icons.</p>

<div class="doc-example mb-3">
{% highlight php %}
echo $svg->file('@vendor/path/icon.svg')->height(42)->title('Yii Rocks');
{% endhighlight %}
</div>

<h2 class="doc-h">Configuration</h2>
<p>Configure SVG inline behavior in <code>config/params.php</code> under the <code>'yiirocks/svg-inline'</code> key:</p>
<div class="opt-grid mb-4">
    <div class="opt-row">
<div class="opt-name">
            <div class="opt-label">fallbackIcon<span class="opt-type fw-normal"> string</span></div>
            <div class="opt-default"><code>'@vendor/yiirocks/svg-inline/src/fallbackIcon.svg'</code></div>
</div>
<div class="opt-desc">Path to a default SVG file to use when a requested icon is unavailable.</div>
    </div>
    <div class="opt-row">
<div class="opt-name">
            <div class="opt-label">fill<span class="opt-type fw-normal"> string</span></div>
            <div class="opt-default"><code>'currentColor'</code></div>
</div>
<div class="opt-desc">Default SVG fill color.</div>
    </div>
    <div class="opt-row">
<div class="opt-name">
            <div class="opt-label">iconSets<span class="opt-type fw-normal"> array</span></div>
            <div class="opt-default"><code>[]</code></div>
</div>
<div class="opt-desc">Array mapping icon set names to their handler classes. Populated automatically when icon set packages (like svg-inline-bootstrap) are installed.</div>
    </div>
</div>

<h2 class="doc-h">Method Parameters</h2>
<div class="opt-grid mb-4">
    <div class="opt-row">
<div class="opt-name">
            <div class="opt-label">file<span class="opt-type fw-normal"> string</span></div>
            <div class="opt-default">Required</div>
</div>
<div class="opt-desc">Valid path to a custom file.</div>
    </div>
</div>

<h2 class="doc-h">Fluent API</h2>
<p>Additional options can be chained onto the <code>file()</code> call:</p>
<div class="opt-grid">
    <div class="opt-row">
<div class="opt-name">
            <div class="opt-label">class<span class="opt-type fw-normal"> string</span></div>
            <div class="opt-default"><code>null</code></div>
</div>
<div class="opt-desc">Additional custom classes.</div>
    </div>
    <div class="opt-row">
<div class="opt-name">
            <div class="opt-label">css<span class="opt-type fw-normal"> array</span></div>
            <div class="opt-default"><code>null</code></div>
</div>
<div class="opt-desc">Additional CSS attributes.</div>
    </div>
    <div class="opt-row">
<div class="opt-name">
            <div class="opt-label">fill<span class="opt-type fw-normal"> string</span></div>
            <div class="opt-default"><code>'currentColor'</code></div>
</div>
<div class="opt-desc">Color of the icon.</div>
    </div>
    <div class="opt-row">
<div class="opt-name">
            <div class="opt-label">height<span class="opt-type fw-normal"> int</span></div>
            <div class="opt-default"><code>null</code></div>
</div>
<div class="opt-desc">The height of the icon. If height is given without width, the latter will be calculated from the SVG size.</div>
    </div>
    <div class="opt-row">
<div class="opt-name">
            <div class="opt-label">id<span class="opt-type fw-normal"> string</span></div>
            <div class="opt-default"><code>null</code></div>
</div>
<div class="opt-desc">Id for the SVG tag.</div>
    </div>
    <div class="opt-row">
<div class="opt-name">
            <div class="opt-label">title<span class="opt-type fw-normal"> string</span></div>
            <div class="opt-default"><code>null</code></div>
</div>
<div class="opt-desc">Sets a title to the SVG output. Defaults to the filename (without extension), capitalized.</div>
    </div>
    <div class="opt-row">
<div class="opt-name">
            <div class="opt-label">width<span class="opt-type fw-normal"> int</span></div>
            <div class="opt-default"><code>null</code></div>
</div>
<div class="opt-desc">The width of the icon. If width is given without height, the latter will be calculated from the SVG size.</div>
    </div>
</div>
