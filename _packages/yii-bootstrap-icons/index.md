---
permalink: "/yii-bootstrap-icons/"
layout: "package"
pkgId: "yii-bootstrap-icons"
name: "Yii / Bootstrap / Icons"
tagline: "Bootstrap Icons asset bundle"
tint: "#eafff2"
logo: "/assets/icons/bootstrap.svg"
package: "yiirocks/yii-bootstrap-icons"
repo: "yii-bootstrap-icons"
branch: "main"
workflow: "build.yml"
docsUrl: "/yii-bootstrap-icons/"
title: "Yii / Bootstrap / Icons"
description: "Provides the asset bundle to use Bootstrap Icons in your project. All valid icons can be found on the Bootstrap Icons page."
usage: |-
  $assetManager->register(
      \YiiRocks\Yii\Bootstrap\Icons\Assets\BootstrapIconsAsset::class,
  );

  echo '<i class="bi-alarm"></i>';
  echo Html::i()->class('bi-alarm');
---

Provides the asset bundle to use Bootstrap Icons in your project. All valid icons can be found on the [Bootstrap Icons page](https://icons.getbootstrap.com/).

<h2 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Usage</h2>

Register the asset bundle in your application configuration:

<div class="mb-3 small lh-base">
{% highlight php %}
$assetManager->register(
    \YiiRocks\Yii\Bootstrap\Icons\Assets\BootstrapIconsAsset::class,
);
{% endhighlight %}
</div>

Then use Bootstrap Icons in your views:

<div class="mb-3 small lh-base">
{% highlight html %}
<i class="bi-alarm"></i>
{% endhighlight %}
</div>

Or via HTML helper:

<div class="mb-3 small lh-base">
{% highlight php %}
echo Html::i()->class('bi-alarm');
{% endhighlight %}
</div>
