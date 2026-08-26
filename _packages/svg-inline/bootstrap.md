---
layout: package-section
pkgId: svg-inline
section: bootstrap
title: "SvgInline - Bootstrap Icons"
option_groups:
  config:
    - name: bootstrapIconsFolder
      type: string
      default: "<code>'@vendor/twbs/bootstrap-icons/icons'</code>"
      desc: "Path to the Bootstrap Icons directory."
    - name: fallbackIcon
      type: string
      default: "<code>'@vendor/twbs/bootstrap-icons/icons/question.svg'</code>"
      desc: "Default icon to use when the requested icon is unavailable."
    - name: fill
      type: string
      default: "<code>'currentColor'</code>"
      desc: "Default SVG fill color."
    - name: fixedWidth
      type: bool
      default: "<code>false</code>"
      desc: "Default fixed-width icon rendering."
    - name: prefix
      type: string
      default: "<code>'bi'</code>"
      desc: "CSS class prefix for inline SVGs."
  method_params:
    - name: bootstrap
      type: string
      default: "Required"
      desc: "Valid name of a Bootstrap Icon."
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

<p class="mb-3" markdown="1">Provides simple functions to add [Bootstrap Icons](https://icons.getbootstrap.com/) inline.
Depends on [SvgInline](/svg-inline/).</p>

<div class="mb-3 small lh-base">
{% highlight php %}
echo $svg->bootstrap('alarm')->title('Wake Up');
{% endhighlight %}
</div>

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Installation</h3>
{% include install_block.md package="yiirocks/svg-inline-bootstrap" repo="svg-inline-bootstrap" %}

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Configuration</h3>
<p class="mb-3" markdown="1">Configure Bootstrap Icons behavior in `config/params.php` under the
`'yiirocks/svg-inline-bootstrap'` key:</p>
{% include options_table.md options=page.option_groups.config %}

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Method Parameters</h3>
{% include options_table.md options=page.option_groups.method_params %}

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Fluent API</h3>
<p class="mb-3" markdown="1">Additional options can be chained onto the `bootstrap()` call:</p>
{% include options_table.md options=page.option_groups.fluent %}

