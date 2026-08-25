---
permalink: "/yii2-fontawesome-inline/"
layout: package
pkgId: yii2-fontawesome-inline
name: yii2-fontawesome-inline
tagline: Font Awesome icons for Yii 2, no JavaScript
tint: "#e0e7ff"
logo: "/assets/icons/fontawesome.svg"
package: thoulah/yii2-fontawesome-inline
repo: yii2-fontawesome-inline
branch: master
workflow: analysis.yml
listed: false
title: yii2-fontawesome-inline
description: Add Font Awesome Icons inline to your Yii Framework 2.0 applications.
option_groups:
  main:
    - name: bootstrap
      type: string
      default: "<code>'bootstrap4'</code>"
      desc: "Bootstrap namespace to use – Currently the only supported option"
    - name: fill
      type: string
      default: "<code>'currentColor'</code>"
      desc: "Color of the icon. Set to empty string to disable this attribute"
    - name: fixedWidth
      type: bool
      default: "<code>false</code>"
      desc: "Set to <code>true</code> to have fixed width icons"
    - name: style
      type: string
      default: "<code>'solid'</code>"
      desc: "See <a href=\"https://fontawesome.com/how-to-use/on-the-web/referencing-icons/basic-use\">Referencing Icons</a>. Usable for Font Awesome Pro"
    - name: fallbackIcon
      type: string
      default: "<code>'@vendor/fortawesome/font-awesome/svgs/solid/question-circle.svg'</code>"
      desc: "Backup icon in case requested icon cannot be found"
    - name: fontAwesomeFolder
      type: string
      default: "<code>'@vendor/fortawesome/font-awesome/svgs'</code>"
      desc: "Path to your Font Awesome installation. Usable for Font Awesome Pro"
    - name: prefix
      type: string
      default: "<code>'svg-inline--fa'</code>"
      desc: "CSS class basename, requires custom CSS if changed"
    - name: registerAssets
      type: bool
      default: "<code>true</code>"
      desc: "Whether or not to register the Font Awesome assets"
  activeform:
    - name: ActiveFormFixedWidth
      type: bool
      default: "<code>true</code>"
      desc: "Set to <code>false</code> to have variable width icons. Overrules <code>fixedWidth</code>"
    - name: append
      type: bool
      default: "<code>false</code>"
      desc: "Whether to prepend or append the <code>input-group</code>"
    - name: groupSize
      type: string
      default: "<code>'md'</code>"
      desc: "Set to <code>sm</code> for small or <code>lg</code> for large"
---

<blockquote class="text-muted text-center mb-5">
<div class="display-5 fw-normal">inline</div>
<div class="fs-4 fst-italic text-body-secondary">/ˈɪnlʌɪn/</div>
<div class="fst-italic small fw-semibold">adjective</div>

<p class="lead fst-italic mt-3 mb-0">
included as part of the main text on a page, rather than in a separate section
</p>
</blockquote>

This extension provides simple functions for [Yii framework 2.0](http://www.yiiframework.com/)
applications to add [Font Awesome](https://fontawesome.com/) [Icons](https://fontawesome.com/icons)
inline <strong><em>without the use of JavaScript</em></strong>.

<h3 class="fw-bolder mb-2">Options</h3>
{% include options_table.md options=page.option_groups.main %}

<h3 class="fw-bolder mb-2">ActiveForm Specific Global Options</h3>
{% include options_table.md options=page.option_groups.activeform %}

<h3 class="fw-bolder mb-2">Usage as a Class</h3>
<div class="mb-3 small lh-base">
{% highlight php %}
$icon = new \thoulah\fontawesome\Icon();
echo $icon->show('at');
echo $icon->show('github', ['style' => 'brands', 'fill' => '#003865']);
echo $icon->show('font-awesome', ['class' => 'yourClass', 'style' => 'brands']);
{% endhighlight %}
</div>

<h3 class="fw-bolder mb-2">Usage as a Widget</h3>
<div class="mb-3 small lh-base">
{% highlight php %}
use thoulah\fontawesome\IconWidget4 as IconWidget;
echo IconWidget::widget(['name' => 'at']);
echo IconWidget::widget(['name' => 'github', 'options' => ['style' => 'brands', 'fill' => '#003865']]);

echo IconWidget::widget([
'name' => 'font-awesome',
'options' => [
'class' => 'yourClass',
'style' => 'brands'
],
]);
{% endhighlight %}
</div>

<h3 class="fw-bolder mb-2">Usage as a Component</h3>
This is the preferred method if you need to override any of the default options throughout your
application.

Add the component to your Yii config file:
<div class="mb-3 small lh-base">
{% highlight php %}
'components' => [
'fontawesome' => [
'class' => thoulah\fontawesome\IconComponent::class,
//      'fontAwesomeFolder' => '@npm/fontawesome-pro/svgs',
//      'style' => 'regular',
]
]
{% endhighlight %}
</div>
Now you can globally insert an icon:
<div class="mb-3 small lh-base">
{% highlight php %}
echo Yii::$app->fontawesome->name('at');
echo Yii::$app->fontawesome->name('github', 'brands')->fill->('#003865');
echo Yii::$app->fontawesome->name('font-awesome', 'brands')->class('yourClass');
{% endhighlight %}
</div>

<h3 class="fw-bolder mb-2">Usage from ActiveForm (automatic)</h3>
<div class="mb-3 small lh-base">
{% highlight php %}
use thoulah\fontawesome\bootstrap4\ActiveForm;

$form = ActiveForm::begin();

echo $form->field($model, 'field1', [
'icon' => 'user',
]);

echo $form->field($model, 'field2', [
'icon' => [
'name' => 'github',
'style' => 'brands',
],
]);

echo $form->field($model, 'field3', [
'icon' => [
'name' => 'github',
'style' => 'brands',
'append' => true,
],
]);

ActiveForm::end();
{% endhighlight %}
</div>

<h3 class="fw-bolder mb-2">Usage from ActiveForm (manual)</h3>
For `$icon` you can use any earlier described usage method.
<div class="mb-3 small lh-base">
{% highlight php %}
$form = ActiveForm::begin();

echo $form->field($model, 'field', [
'inputTemplate' => $icon->activeFieldAddon('font-awesome', ['style' => 'brands']),
]);

ActiveForm::end();
{% endhighlight %}
</div>
