---
layout: package-section
pkgId: voyti
section: api
title: "Voyti - REST API"
option_groups:
  config:
    - name: apiTokenLifespan
      type: int
      default: "<code>0</code>"
      desc: "API token lifetime in seconds. <code>0</code> disables expiry entirely (tokens never expire). Enforced when resolving a Bearer token."
routes:
  - { name: "voyti/api-openapi", method: "GET", path: "openapi.json", purpose: "OpenAPI 3.1 spec (JSON). Public, so tooling (Swagger UI, codegen) can fetch it without a Bearer token." }
  - { name: "voyti/api-v1-users-index", method: "GET", path: "v1/users", purpose: "List users" }
  - { name: "voyti/api-v1-users-view", method: "GET", path: "v1/users/{id}", purpose: "View a user" }
  - { name: "voyti/api-v1-users-create", method: "POST", path: "v1/users", purpose: "Create a user" }
  - { name: "voyti/api-v1-users-update", method: "PATCH", path: "v1/users/{id}", purpose: "Update a user" }
  - { name: "voyti/api-v1-users-delete", method: "DELETE", path: "v1/users/{id}", purpose: "Delete a user" }
---

<p markdown="1">The JSON REST API for user management ships as a separate package, `yiirocks/voyti-api`. It adds
the `voyti-routes-api` config group, Bearer-token authentication on top of core's
`IdentityAdapter`, and two console commands for issuing and revoking API tokens. It reuses core's
models, services, and `administratorPermissionName` permission check.</p>

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Installation</h3>
{% include install_block.md package="yiirocks/voyti-api" repo="voyti-api" %}

<p class="mb-3" markdown="1">Routes are <strong>not</strong> auto-registered. Pull the `voyti-routes-api` config
group into your router and mount it at whatever prefix you like:</p>

<div class="mb-3 small lh-base">
{% highlight php %}
use Yiisoft\Config\Config;
use Yiisoft\Definitions\DynamicReference;
use Yiisoft\Router\Group;
use Yiisoft\Router\RouteCollection;
use Yiisoft\Router\RouteCollectionInterface;
use Yiisoft\Router\RouteCollector;

/** @var Config $config */

return [
    RouteCollectionInterface::class => [
        'class' => RouteCollection::class,
        '__construct()' => [
            'collector' => DynamicReference::to(
                static fn() => (new RouteCollector())
                    ->addRoute(
                        Group::create('/user/api/')
                            ->routes(...$config->get('voyti-routes-api')),
                    )
            ),
        ],
    ],
];
{% endhighlight %}
</div>

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Configuration</h3>
<div class="mb-3 small lh-base">
{% highlight php %}
// config/params.php
return [
    'yiirocks/voyti' => [
        'api' => [
            'apiTokenLifespan' => 31536000,
        ],
    ],
];
{% endhighlight %}
</div>
{% include options_table.md options=page.option_groups.config %}

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Authentication</h3>

<p markdown="1">Requests authenticate with an `Authorization: Bearer <token>` header.
`ApiTokenAuthenticationMiddleware` resolves the token to a user for that request only and returns
`401` when the header is missing or the token is invalid or expired. `AccessRuleMiddleware` then
enforces `administratorPermissionName` as usual, so API tokens only grant what that permission
grants.</p>

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Managing tokens</h3>
<p class="mb-3" markdown="1">The package registers two console commands under `yiisoft/yii-console`:</p>

<div class="table-responsive">
<table class="table table-sm table-striped">
            <thead class="fw-bold text-uppercase text-nowrap">
                <tr>
                    <th>Command</th>
                    <th>Description</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><code>voyti:api-token:generate</code></td>
                    <td>Generate a REST API access token for a user (printed once)</td>
                </tr>
                <tr>
                    <td><code>voyti:api-token:revoke</code></td>
                    <td>Revoke all REST API access tokens for a user</td>
                </tr>
            </tbody>
</table>
</div>

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Endpoints</h3>
{% include route_table.md routes=page.routes %}
