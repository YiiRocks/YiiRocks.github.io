---
layout: package-section
pkgId: svg-inline
section: fontawesome
title: "SvgInline - Font Awesome Icons"
option_groups:
  config:
    - name: fallbackIcon
      type: string
      default: "<code>'@vendor/fortawesome/font-awesome/svgs/solid/question.svg'</code>"
      desc: "Default icon to use when the requested icon is unavailable."
    - name: fill
      type: string
      default: "<code>'currentColor'</code>"
      desc: "Default SVG fill color."
    - name: fixedWidth
      type: bool
      default: "<code>false</code>"
      desc: "Default fixed-width icon rendering."
    - name: fontAwesomeFolder
      type: string
      default: "<code>'@vendor/fortawesome/font-awesome/svgs'</code>"
      desc: "Path to the Font Awesome SVGs directory."
    - name: prefix
      type: string
      default: "<code>'svg-inline--fa'</code>"
      desc: "CSS class prefix for inline SVGs."
    - name: registerAssets
      type: bool
      default: "<code>true</code>"
      desc: "Register Yii assets for Font Awesome."
    - name: style
      type: string
      default: "<code>'solid'</code>"
      desc: "Default icon style variant."
  method_params:
    - name: fai
      type: "string [, string]"
      default: "Name required; style <code>'solid'</code>"
      desc: "Valid name and style (optional) of a Font Awesome Icon."
  fluent:
    - name: class
      type: string
      default: "<code>null</code>"
      desc: "Additional custom classes."
    - name: css
      type: array
      default: "<code>null</code>"
      desc: "Additional CSS attributes."
    - name: fill
      type: string
      default: "<code>'currentColor'</code>"
      desc: "Color of the icon."
    - name: fixedWidth
      type: bool
      default: "<code>false</code>"
      desc: "Set to true to have a fixed width icon."
    - name: height
      type: int
      default: "<code>null</code>"
      desc: "The height of the icon. If height is given without width, the latter will be calculated from the SVG size."
    - name: id
      type: string
      default: "<code>null</code>"
      desc: "Id for the SVG tag."
    - name: title
      type: string
      default: "<code>null</code>"
      desc: "Sets a title to the SVG output. Defaults to the icon name, capitalized."
    - name: width
      type: int
      default: "<code>null</code>"
      desc: "The width of the icon. If width is given without height, the latter will be calculated from the SVG size."
---

<p class="mb-3" markdown="1">Provides simple functions to add [Font Awesome Icons](https://fontawesome.com/icons) inline.
Depends on [SvgInline](/svg-inline/).</p>

<div class="mb-3 small lh-base">
{% highlight php %}
echo $svg->fai('hands-wash')->title('Wash your hands');
echo $svg->fai('github', 'brands')->title('GitHub');
{% endhighlight %}
</div>

<h5 class="text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Installation</h5>
{% include install_block.md package="yiirocks/svg-inline-fontawesome" repo="svg-inline-fontawesome" %}

<h5 class="text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Configuration</h5>
<p class="mb-3" markdown="1">Configure Font Awesome Icons behavior in `config/params.php` under the
`'yiirocks/svg-inline-fontawesome'` key:</p>
{% include options_table.md options=page.option_groups.config %}

<h5 class="text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Method Parameters</h5>
{% include options_table.md options=page.option_groups.method_params %}

<h5 class="text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Fluent API</h5>
<p class="mb-3" markdown="1">Additional options can be chained onto the `fai()` call:</p>
{% include options_table.md options=page.option_groups.fluent %}

