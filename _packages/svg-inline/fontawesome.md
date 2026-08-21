---
layout: package-section
pkgId: svg-inline
section: fontawesome
title: "SvgInline - Font Awesome Icons"
---

<p>
    Provides simple functions to add <a href="https://fontawesome.com/icons" target="_blank" rel="noopener">Font Awesome Icons</a> inline. Depends on <a href="/svg-inline/">SvgInline</a>.
</p>

<div class="doc-example mb-3">
{% highlight php %}
echo $svg->fai('hands-wash')->title('Wash your hands');
echo $svg->fai('github', 'brands')->title('GitHub');
{% endhighlight %}
</div>

<h2 class="doc-h">Installation</h2>
<div class="mb-4 d-flex align-items-center gap-3 flex-wrap">
    <button type="button" class="copy-btn copy--sm">composer require yiirocks/svg-inline-fontawesome</button>
    <a href="https://github.com/YiiRocks/svg-inline-fontawesome/issues" target="_blank" rel="noopener" class="docs-entry__link docs-entry__link--docs">Create an issue &rarr;</a>
    <div class="d-flex gap-2 flex-wrap ms-auto">
<a href="https://github.com/YiiRocks/svg-inline-fontawesome" target="_blank" rel="noopener" class="docs-entry__link docs-entry__link--github">GitHub &rarr;</a>
<a href="https://packagist.org/packages/yiirocks/svg-inline-fontawesome" target="_blank" rel="noopener" class="docs-entry__link docs-entry__link--packagist">Packagist &rarr;</a>
    </div>
</div>

<h2 class="doc-h">Configuration</h2>
<p>Configure Font Awesome Icons behavior in <code>config/params.php</code> under the <code>'yiirocks/svg-inline-fontawesome'</code> key:</p>
<div class="opt-grid mb-4">
    <div class="opt-row">
<div class="opt-name">
            <div class="opt-label">fallbackIcon<span class="opt-type fw-normal"> string</span></div>
            <div class="opt-default"><code>'@vendor/fortawesome/font-awesome/svgs/solid/question.svg'</code></div>
</div>
<div class="opt-desc">Default icon to use when the requested icon is unavailable.</div>
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
            <div class="opt-label">fixedWidth<span class="opt-type fw-normal"> bool</span></div>
            <div class="opt-default"><code>false</code></div>
</div>
<div class="opt-desc">Default fixed-width icon rendering.</div>
    </div>
    <div class="opt-row">
<div class="opt-name">
            <div class="opt-label">fontAwesomeFolder<span class="opt-type fw-normal"> string</span></div>
            <div class="opt-default"><code>'@vendor/fortawesome/font-awesome/svgs'</code></div>
</div>
<div class="opt-desc">Path to the Font Awesome SVGs directory.</div>
    </div>
    <div class="opt-row">
<div class="opt-name">
            <div class="opt-label">prefix<span class="opt-type fw-normal"> string</span></div>
            <div class="opt-default"><code>'svg-inline--fa'</code></div>
</div>
<div class="opt-desc">CSS class prefix for inline SVGs.</div>
    </div>
    <div class="opt-row">
<div class="opt-name">
            <div class="opt-label">registerAssets<span class="opt-type fw-normal"> bool</span></div>
            <div class="opt-default"><code>true</code></div>
</div>
<div class="opt-desc">Register Yii assets for Font Awesome.</div>
    </div>
    <div class="opt-row">
<div class="opt-name">
            <div class="opt-label">style<span class="opt-type fw-normal"> string</span></div>
            <div class="opt-default"><code>'solid'</code></div>
</div>
<div class="opt-desc">Default icon style variant.</div>
    </div>
</div>

<h2 class="doc-h">Method Parameters</h2>
<div class="opt-grid mb-4">
    <div class="opt-row">
<div class="opt-name">
            <div class="opt-label">fai<span class="opt-type fw-normal"> string [, string]</span></div>
            <div class="opt-default">Name required; style <code>'solid'</code></div>
</div>
<div class="opt-desc">Valid name and style (optional) of a Font Awesome Icon.</div>
    </div>
</div>

<h2 class="doc-h">Fluent API</h2>
<p>Additional options can be chained onto the <code>fai()</code> call:</p>
<div class="opt-grid mb-4">
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
            <div class="opt-label">fixedWidth<span class="opt-type fw-normal"> bool</span></div>
            <div class="opt-default"><code>false</code></div>
</div>
<div class="opt-desc">Set to true to have a fixed width icon.</div>
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
<div class="opt-desc">Sets a title to the SVG output. Defaults to the icon name, capitalized.</div>
    </div>
    <div class="opt-row">
<div class="opt-name">
            <div class="opt-label">width<span class="opt-type fw-normal"> int</span></div>
            <div class="opt-default"><code>null</code></div>
</div>
<div class="opt-desc">The width of the icon. If width is given without height, the latter will be calculated from the SVG size.</div>
    </div>
</div>

