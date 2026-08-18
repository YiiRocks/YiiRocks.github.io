---
layout: package-section
pkgId: svg-inline
section: bootstrap
title: "SvgInline - Bootstrap Icons"
---

<p>
    Provides simple functions to add <a href="https://icons.getbootstrap.com/" target="_blank" rel="noopener">Bootstrap Icons</a> inline. Depends on <a href="/svg-inline/">SvgInline</a>.
</p>

<div class="doc-example mb-3">
{% highlight php %}
echo $svg->bootstrap('alarm')->title('Wake Up');
{% endhighlight %}
</div>

<h2 class="doc-section-heading">Installation</h2>
<div class="mb-4 d-flex align-items-center gap-3 flex-wrap">
    <button type="button" class="copy-btn copy-btn--inline">composer require yiirocks/svg-inline-bootstrap</button>
    <a href="https://github.com/YiiRocks/svg-inline-bootstrap/issues" target="_blank" rel="noopener" class="docs-entry__link docs-entry__link--docs">Create an issue &rarr;</a>
    <div class="d-flex gap-2 flex-wrap ms-auto">
<a href="https://github.com/YiiRocks/svg-inline-bootstrap" target="_blank" rel="noopener" class="docs-entry__link docs-entry__link--github">GitHub &rarr;</a>
<a href="https://packagist.org/packages/yiirocks/svg-inline-bootstrap" target="_blank" rel="noopener" class="docs-entry__link docs-entry__link--packagist">Packagist &rarr;</a>
    </div>
</div>

<h2 class="doc-section-heading">Configuration</h2>
<p>Configure Bootstrap Icons behavior in <code>config/params.php</code> under the <code>'yiirocks/svg-inline-bootstrap'</code> key:</p>
<div class="options-table mb-4">
    <div class="options-row">
<div class="options-name-col">
            <div class="options-name">bootstrapIconsFolder<span class="options-type fw-normal"> string</span></div>
            <div class="options-default"><code>'@vendor/twbs/bootstrap-icons/icons'</code></div>
</div>
<div class="options-desc">Path to the Bootstrap Icons directory.</div>
    </div>
    <div class="options-row">
<div class="options-name-col">
            <div class="options-name">fallbackIcon<span class="options-type fw-normal"> string</span></div>
            <div class="options-default"><code>'@vendor/twbs/bootstrap-icons/icons/question.svg'</code></div>
</div>
<div class="options-desc">Default icon to use when the requested icon is unavailable.</div>
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
            <div class="options-name">fixedWidth<span class="options-type fw-normal"> bool</span></div>
            <div class="options-default"><code>false</code></div>
</div>
<div class="options-desc">Default fixed-width icon rendering.</div>
    </div>
    <div class="options-row">
<div class="options-name-col">
            <div class="options-name">prefix<span class="options-type fw-normal"> string</span></div>
            <div class="options-default"><code>'bi'</code></div>
</div>
<div class="options-desc">CSS class prefix for inline SVGs.</div>
    </div>
</div>

<h2 class="doc-section-heading">Method Parameters</h2>
<div class="options-table mb-4">
    <div class="options-row">
<div class="options-name-col">
            <div class="options-name">bootstrap<span class="options-type fw-normal"> string</span></div>
            <div class="options-default">Required</div>
</div>
<div class="options-desc">Valid name of a Bootstrap Icon.</div>
    </div>
</div>

<h2 class="doc-section-heading">Fluent API</h2>
<p>Additional options can be chained onto the <code>bootstrap()</code> call:</p>
<div class="options-table mb-4">
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
            <div class="options-name">fixedWidth<span class="options-type fw-normal"> bool</span></div>
            <div class="options-default"><code>false</code></div>
</div>
<div class="options-desc">Set to true to have a fixed width icon.</div>
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
<div class="options-desc">Sets a title to the SVG output. Defaults to the icon name, capitalized.</div>
    </div>
    <div class="options-row">
<div class="options-name-col">
            <div class="options-name">width<span class="options-type fw-normal"> int</span></div>
            <div class="options-default"><code>null</code></div>
</div>
<div class="options-desc">The width of the icon. If width is given without height, the latter will be calculated from the SVG size.</div>
    </div>
</div>

