---
layout: package
pkgId: yii2-fontawesome-inline
title: yii2-fontawesome-inline
description: Add Font Awesome Icons inline to your Yii Framework 2.0 applications.
---

        <blockquote class="text-muted text-center mb-5">
            <div class="display-5 fw-normal">inline</div>
            <div class="fs-4 fst-italic text-body-secondary">/ˈɪnlʌɪn/</div>
            <div class="fst-italic small fw-semibold">adjective</div>

            <p class="lead fst-italic mt-3 mb-0">
                included as part of the main text on a page, rather than in a separate section
            </p>
        </blockquote>

        <p>
            This extension provides simple functions for <a href="http://www.yiiframework.com/">Yii
            framework 2.0</a> applications to add <a href="https://fontawesome.com/">Font
            Awesome</a> <a href="https://fontawesome.com/icons">Icons</a> inline
            <strong><em>without the use of JavaScript</em></strong>.
        </p>

        <h3 class="fw-bolder mb-2">Options</h3>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <code>bootstrap</code> <span class="font-monospace">( string = 'bootstrap4' )</span>
                Bootstrap namespace to use – Currently the only supported option
            </li>
            <li class="list-group-item">
                <code>fill</code> <span class="font-monospace">( string = 'currentColor' )</span>
                Color of the icon. Set to empty string to disable this attribute
            </li>
            <li class="list-group-item">
                <code>fixedWidth</code> <span class="font-monospace">( bool = false )</span>
                Set to <code>true</code> to have fixed width icons
            </li>
            <li class="list-group-item">
                <code>style</code> <span class="font-monospace">( string = 'solid' )</span>
                See <a href="https://fontawesome.com/how-to-use/on-the-web/referencing-icons/basic-use">Referencing
                Icons</a>. Usable for Font Awesome Pro
            </li>
            <li class="list-group-item">
                <code>fallbackIcon</code> <span class="font-monospace">( string = '@vendor/fortawesome/font-awesome/svgs/solid/question-circle.svg' )</span>
                Backup icon in case requested icon cannot be found
            </li>
            <li class="list-group-item">
                <code>fontAwesomeFolder</code> <span class="font-monospace">( string = '@vendor/fortawesome/font-awesome/svgs' )</span>
                Path to your Font Awesome installation. Usable for Font Awesome Pro
            </li>
            <li class="list-group-item">
                <code>prefix</code> <span class="font-monospace">( string = 'svg-inline--fa' )</span>
                CSS class basename, requires custom CSS if changed
            </li>
            <li class="list-group-item">
                <code>registerAssets</code> <span class="font-monospace">( bool = true )</span>
                Whether or not to register the Font Awesome assets
            </li>
        </ul>

        <h3 class="fw-bolder mb-2">ActiveForm Specific Global Options</h3>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">
                <code>ActiveFormFixedWidth</code> <span class="font-monospace">( bool = true )</span>
                Set to <code>false</code> to have variable width icons. Overrules <code>fixedWidth</code>
            </li>
            <li class="list-group-item">
                <code>append</code> <span class="font-monospace">( bool = false )</span>
                Whether to prepend or append the <code>input-group</code>
            </li>
            <li class="list-group-item">
                <code>groupSize</code> <span class="font-monospace">( string = 'md' )</span>
                Set to <code>sm</code> for small or <code>lg</code> for large
            </li>
        </ul>

        <h3 class="fw-bolder mb-2">Usage as a Class</h3>
        <div class="doc-example mb-3">
{% highlight php %}
$icon = new \thoulah\fontawesome\Icon();
echo $icon->show('at');
echo $icon->show('github', ['style' => 'brands', 'fill' => '#003865']);
echo $icon->show('font-awesome', ['class' => 'yourClass', 'style' => 'brands']);
{% endhighlight %}
</div>

        <h3 class="fw-bolder mb-2">Usage as a Widget</h3>
        <div class="doc-example mb-3">
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
        <p>
            This is the preferred method if you need to override any of the
            default options throughout your application.
        </p>
        Add the component to your Yii config file:
        <div class="doc-example mb-3">
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
        <div class="doc-example mb-3">
{% highlight php %}
echo Yii::$app->fontawesome->name('at');
echo Yii::$app->fontawesome->name('github', 'brands')->fill->('#003865');
echo Yii::$app->fontawesome->name('font-awesome', 'brands')->class('yourClass');
{% endhighlight %}
</div>

        <h3 class="fw-bolder mb-2">Usage from ActiveForm (automatic)</h3>
        <div class="doc-example mb-3">
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
        For <code>$icon</code> you can use any earlier described usage method.
        <div class="doc-example mb-3">
{% highlight php %}
$form = ActiveForm::begin();

echo $form->field($model, 'field', [
    'inputTemplate' => $icon->activeFieldAddon('font-awesome', ['style' => 'brands']),
]);

ActiveForm::end();
{% endhighlight %}
</div>
