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
---

The JSON REST API for user management ships as a separate package, `yiirocks/voyti-api`. It adds
the `voyti-routes-api` config group, Bearer-token authentication on top of core's
`IdentityAdapter`, and two console commands for issuing and revoking API tokens. It reuses core's
models, services, and `administratorPermissionName` permission check.

<h5 class="text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Installation</h5>
{% include install_block.md package="yiirocks/voyti-api" repo="voyti-api" %}

Routes are <strong>not</strong> auto-registered. Pull the `voyti-routes-api` config
group into your router and mount it at whatever prefix you like:

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

<h5 class="text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Configuration</h5>
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

<h5 class="text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Authentication</h5>

Requests authenticate with an `Authorization: Bearer &lt;token&gt;` header.
`ApiTokenAuthenticationMiddleware` resolves the token to a user for that request only and returns
`401` when the header is missing or the token is invalid or expired. `AccessRuleMiddleware` then
enforces `administratorPermissionName` as usual, so API tokens only grant what that permission
grants.

<h5 class="text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Managing tokens</h5>
The package registers two console commands under `yiisoft/yii-console`:

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

<h5 class="text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Endpoints</h5>
<div class="table-responsive">
            <table class="table table-sm table-striped">
                <thead class="fw-bold text-uppercase text-nowrap">
                    <tr>
                        <th>Route name</th>
                        <th>Method</th>
                        <th>Path</th>
                        <th>Purpose</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td><code>voyti/api-openapi</code></td><td><code>GET</code></td><td><code>openapi.json</code></td><td>OpenAPI 3.1 spec (JSON). Public, so tooling (Swagger UI, codegen) can fetch it without a Bearer token.</td></tr>
                    <tr><td><code>voyti/api-v1-users-index</code></td><td><code>GET</code></td><td><code>v1/users</code></td><td>List users</td></tr>
                    <tr><td><code>voyti/api-v1-users-view</code></td><td><code>GET</code></td><td><code>v1/users/{id}</code></td><td>View a user</td></tr>
                    <tr><td><code>voyti/api-v1-users-create</code></td><td><code>POST</code></td><td><code>v1/users</code></td><td>Create a user</td></tr>
                    <tr><td><code>voyti/api-v1-users-update</code></td><td><code>PATCH</code></td><td><code>v1/users/{id}</code></td><td>Update a user</td></tr>
                    <tr><td><code>voyti/api-v1-users-delete</code></td><td><code>DELETE</code></td><td><code>v1/users/{id}</code></td><td>Delete a user</td></tr>
                </tbody>
            </table>
</div>
