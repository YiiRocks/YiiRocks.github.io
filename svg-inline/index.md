---
layout: package
pkgId: svg-inline
title: SvgInline
description: Add SVG files inline to your Yii Framework 3 applications. Extensible with Bootstrap Icons and Font Awesome Icons.
---

<p class="doc-description">Provides simple functions for your Yii Framework 3 applications to add SVG files inline and manipulate their properties. It can be extended with Bootstrap Icons and Font Awesome Icons.</p>

<div class="doc-example mb-3">
{% highlight php %}
echo $svg->file('@vendor/path/icon.svg')->height(42)->title('Yii Rocks');
{% endhighlight %}
</div>

<h2 class="doc-section-heading">Configuration</h2>
<p>Configure SVG inline behavior in <code>config/params.php</code> under the <code>'yiirocks/svg-inline'</code> key:</p>
<div class="options-table mb-4">
    <div class="options-row">
<div class="options-name-col">
            <div class="options-name">fallbackIcon<span class="options-type fw-normal"> string</span></div>
            <div class="options-default"><code>'@vendor/yiirocks/svg-inline/src/fallbackIcon.svg'</code></div>
</div>
<div class="options-desc">Path to a default SVG file to use when a requested icon is unavailable.</div>
    </div>
    <div class="options-row">
<div class="options-name-col">
            <div class="options-name">fill<span class="options-type fw-normal"> string</span></div>
            <div class="options-default"><code>'currentColor'</code></div>
</div>
<div class="options-desc">Default SVG fill color.</div>
    </div>
    <div class="options-row">
<div class="options-name-col">
            <div class="options-name">iconSets<span class="options-type fw-normal"> array</span></div>
            <div class="options-default"><code>[]</code></div>
</div>
<div class="options-desc">Array mapping icon set names to their handler classes. Populated automatically when icon set packages (like svg-inline-bootstrap) are installed.</div>
    </div>
</div>

<h2 class="doc-section-heading">Method Parameters</h2>
<div class="options-table mb-4">
    <div class="options-row">
<div class="options-name-col">
            <div class="options-name">file<span class="options-type fw-normal"> string</span></div>
            <div class="options-default">Required</div>
</div>
<div class="options-desc">Valid path to a custom file.</div>
    </div>
</div>

<h2 class="doc-section-heading">Fluent API</h2>
<p>Additional options can be chained onto the <code>file()</code> call:</p>
<div class="options-table">
    <div class="options-row">
<div class="options-name-col">
            <div class="options-name">class<span class="options-type fw-normal"> string</span></div>
            <div class="options-default"><code>null</code></div>
</div>
<div class="options-desc">Additional custom classes.</div>
    </div>
    <div class="options-row">
<div class="options-name-col">
            <div class="options-name">css<span class="options-type fw-normal"> array</span></div>
            <div class="options-default"><code>null</code></div>
</div>
<div class="options-desc">Additional CSS attributes.</div>
    </div>
    <div class="options-row">
<div class="options-name-col">
            <div class="options-name">fill<span class="options-type fw-normal"> string</span></div>
            <div class="options-default"><code>'currentColor'</code></div>
</div>
<div class="options-desc">Color of the icon.</div>
    </div>
    <div class="options-row">
<div class="options-name-col">
            <div class="options-name">height<span class="options-type fw-normal"> int</span></div>
            <div class="options-default"><code>null</code></div>
</div>
<div class="options-desc">The height of the icon. If height is given without width, the latter will be calculated from the SVG size.</div>
    </div>
    <div class="options-row">
<div class="options-name-col">
            <div class="options-name">id<span class="options-type fw-normal"> string</span></div>
            <div class="options-default"><code>null</code></div>
</div>
<div class="options-desc">Id for the SVG tag.</div>
    </div>
    <div class="options-row">
<div class="options-name-col">
            <div class="options-name">title<span class="options-type fw-normal"> string</span></div>
            <div class="options-default"><code>null</code></div>
</div>
<div class="options-desc">Sets a title to the SVG output. Defaults to the filename (without extension), capitalized.</div>
    </div>
    <div class="options-row">
<div class="options-name-col">
            <div class="options-name">width<span class="options-type fw-normal"> int</span></div>
            <div class="options-default"><code>null</code></div>
</div>
<div class="options-desc">The width of the icon. If width is given without height, the latter will be calculated from the SVG size.</div>
    </div>
</div>
