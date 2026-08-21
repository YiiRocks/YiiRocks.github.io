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

## Installation

```bash
composer require yiirocks/yii-bootstrap-icons
```

## Usage

Register the asset bundle in your application configuration:

```php
$assetManager->register(
    \YiiRocks\Yii\Bootstrap\Icons\Assets\BootstrapIconsAsset::class,
);
```

Then use Bootstrap Icons in your views:

```html
<i class="bi-alarm"></i>
```

Or via HTML helper:

```php
echo Html::i()->class('bi-alarm');
```
