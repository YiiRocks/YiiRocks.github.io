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
description: "Add SVG files inline to your Yii3 applications. Extensible with Bootstrap Icons and Font Awesome Icons."
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
option_groups:
  config:
    - name: fallbackIcon
      type: string
      default: "<code>'@vendor/yiirocks/svg-inline/src/fallbackIcon.svg'</code>"
      desc: "Path to a default SVG file to use when a requested icon is unavailable."
    - name: fill
      type: string
      default: "<code>'currentColor'</code>"
      desc: "Default SVG fill color."
    - name: iconSets
      type: array
      default: "<code>[]</code>"
      desc: "Array mapping icon set names to their handler classes. Populated automatically when icon set packages (like svg-inline-bootstrap) are installed."
  method_params:
    - name: file
      type: string
      default: "Required"
      desc: "Valid path to a custom file."
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
      desc: "Sets a title to the SVG output. Defaults to the filename (without extension), capitalized."
    - name: width
      type: int
      default: "<code>null</code>"
      desc: "The width of the icon. If width is given without height, the latter will be calculated from the SVG size."
---

<p class="mb-3">Provides simple functions for your Yii3 applications to add SVG
files inline and manipulate their properties. It can be extended with Bootstrap Icons and Font
Awesome Icons.</p>

<div class="mb-3 small lh-base">
{% highlight php %}
echo $svg->file('@vendor/path/icon.svg')->height(42)->title('Yii Rocks');
{% endhighlight %}
</div>

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Configuration</h3>
<p class="mb-3" markdown="1">Configure SVG inline behavior in `config/params.php` under the `'yiirocks/svg-inline'` key:</p>
{% include options_table.md options=page.option_groups.config %}

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Method Parameters</h3>
{% include options_table.md options=page.option_groups.method_params %}

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Fluent API</h3>
<p class="mb-3" markdown="1">Additional options can be chained onto the `file()` call:</p>
{% include options_table.md options=page.option_groups.fluent %}
