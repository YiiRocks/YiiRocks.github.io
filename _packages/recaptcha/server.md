---
layout: package-section
pkgId: recaptcha
section: server
title: "reCAPTCHA - Server-Side Verification"
description: "Manual server-side verification of reCAPTCHA v2 and v3 tokens using RecaptchaClient."
excerpt_separator: ""
---

<p>
            Use <code>RecaptchaClient</code> for manual verification:
</p>
<div class="doc-example mb-3">
{% highlight php %}
use YiiRocks\Recaptcha\RecaptchaClient;

/** @var RecaptchaClient $client */
$result = $client->verify($token);
$result = $client->verifyV3($token);
$result = $client->verifyWithSecret($token, $secret);

$result->success;     // bool
$result->score;       // ?float (v3 only)
$result->action;      // ?string (v3 only)
$result->errorCodes;  // array
$result->hostname;    // ?string
$result->challengeTs; // ?string

$config = $client->getConfig(); // RecaptchaConfig
{% endhighlight %}
</div>
