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
  rateLimiter:
    - name: requestsPerWindow
      type: int
      default: "<code>60</code>"
      desc: "Requests allowed per window, per authenticated user."
    - name: windowSeconds
      type: int
      default: "<code>60</code>"
      desc: "Window length in seconds."
    - name: useApcu
      type: bool
      default: "<code>false</code>"
      desc: "Store counters in APCu instead of the host's PSR-16 cache, for real atomic compare-and-swap. Only safe on a single-server deployment - a load-balanced/multi-server host would enforce the limit independently per server instead of across the cluster."
resources:
  - key: user
    icon: "/assets/icons/voyti-api-user.svg"
    label: "User"
    text: "REST CRUD endpoints for users, built on this package's token authentication and admin-access middleware. Contributes its routes into the shared authenticated group below and its own OpenApiSpecContributorInterface implementation into the merged openapi.json spec - no route or OpenAPI wiring of its own."
    package: "yiirocks/voyti-api-user"
    repo: "voyti-api-user"
route_groups:
  user:
    - { name: "voyti/api-v1-users-index", method: "GET", path: "v1/users", purpose: "List users" }
    - { name: "voyti/api-v1-users-view", method: "GET", path: "v1/users/{id}", purpose: "View a user" }
    - { name: "voyti/api-v1-users-create", method: "POST", path: "v1/users", purpose: "Create a user" }
    - { name: "voyti/api-v1-users-update", method: "PATCH", path: "v1/users/{id}", purpose: "Update a user" }
    - { name: "voyti/api-v1-users-delete", method: "DELETE", path: "v1/users/{id}", purpose: "Delete a user" }
  base:
    - { name: "voyti/api-openapi", method: "GET", path: "openapi.json", purpose: "OpenAPI 3.1 spec (JSON), assembled from every installed resource package. Public, so tooling (Swagger UI, codegen) can fetch it without a Bearer token." }
---

The JSON REST API is optional and pluggable: the base API package carries no resource
endpoints of its own, only Bearer-token authentication, RBAC-admin gating, and the shared route group
resource packages plug into. Install a resource packages to expose actual endpoints.

Every resource package's routes are wrapped in the same authenticated group: `ApiTokenAuthenticationMiddleware`
resolves the Bearer token, then any installed extension middleware runs (e.g. rate limiting, below),
then `AccessRuleMiddleware` enforces `administratorPermissionName`. Each resource package also
contributes its own OpenAPI paths and schemas, merged into one `openapi.json` document.

{% assign status_page = site.pages | where: "url", "/status/" | first %}
<div class="row g-4 mb-3">
{% for r in page.resources %}
{% assign r_routes = page.route_groups[r.key] %}
{% assign r_tint = status_page.sub_packages[r.repo].tint %}
{% include method_card.md icon=r.icon label=r.label tint=r_tint text=r.text package=r.package repo=r.repo routes=r_routes %}
{% endfor %}
            <div class="col-12">
                <div class="card h-100">
                    <div class="card-header d-flex align-items-center"><div class="me-2 d-flex align-items-center justify-content-center flex-shrink-0 rounded-3" style="background:{{ status_page.sub_packages['voyti-api'].tint }}; width:32px; height:32px;"><img width="20" height="20" src="/assets/icons/voyti-api.svg" alt="API Base Package"></div>API Base Package</div>
                    <div class="card-body">
                        <p class="card-text">
                            Pulled in automatically as a dependency by resource packages, the base package supplies
                            token authentication, admin-access gating, OpenAPI spec assembly, and the shared route
                            group.
                        </p>
{% include route_table.md routes=page.route_groups.base class="mb-3" %}
                        <p class="mb-3" markdown="1">Two console commands are registered under `yiisoft/yii-console`:</p>
                        <div class="table-responsive">
                            <table class="table table-sm table-striped mb-0">
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
                        <p class="fw-semibold mb-2 mt-3">Configuration</p>
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
                    </div>
                    <div class="card-footer">
                        <div class="d-flex align-items-center gap-2 flex-wrap">
                            <a href="https://github.com/YiiRocks/voyti-api/issues" target="_blank" rel="noopener" class="btn btn-primary btn-arrow btn-sm small fw-semibold">Create an issue</a>
                            <div class="d-flex gap-2 flex-wrap ms-auto">
                                <a href="https://github.com/YiiRocks/voyti-api" target="_blank" rel="noopener" class="btn btn-info btn-arrow btn-sm small fw-semibold">GitHub</a>
                                <a href="https://packagist.org/packages/yiirocks/voyti-api" target="_blank" rel="noopener" class="btn btn-info btn-arrow btn-sm small fw-semibold">Packagist</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
</div>

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
                        Group::create('/api/')
                            ->routes(...$config->get('voyti-routes-api')),
                    )
            ),
        ],
    ],
];
{% endhighlight %}
</div>

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Authentication</h3>

<p markdown="1">Requests authenticate with an `Authorization: Bearer <token>` header.
`ApiTokenAuthenticationMiddleware` resolves the token to a user for that request only and returns
`401` when the header is missing or the token is invalid or expired. `AccessRuleMiddleware` then
enforces `administratorPermissionName` as usual, so API tokens only grant what that permission
grants.</p>

<h3 id="rate-limiting" class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Rate limiting</h3>

{% assign rl_tint = status_page.sub_packages['voyti-api-rate-limiter'].tint %}
<div class="row g-4 mb-3">
    <div class="col-12">
        <div class="card h-100">
            <div class="card-header d-flex align-items-center"><div class="me-2 d-flex align-items-center justify-content-center flex-shrink-0 rounded-3" style="background:{{ rl_tint }}; width:32px; height:32px;"><img width="20" height="20" src="/assets/icons/voyti-api-rate-limiter.svg" alt="API Rate Limiter"></div>API Rate Limiter</div>
            <div class="card-body">
                <p class="card-text" markdown="1">
                    Per-user rate limiting for these routes ships as a separate package,
                    `voyti-api-rate-limiter`, built on
                    [yiisoft/rate-limiter](https://github.com/yiisoft/rate-limiter). It scopes
                    limits per authenticated user and applies to every resource package's endpoints
                    alike. Every response carries `X-Rate-Limit-Limit`, `X-Rate-Limit-Remaining`, and
                    `X-Rate-Limit-Reset` headers; requests over the limit get a `429 Too Many Requests`
                    response.
                </p>
                <p markdown="1">
                    No wiring is required: this package's own middleware chain runs every installed
                    extension package automatically, so installing `voyti-api-rate-limiter`
                    turns rate limiting on immediately, and removing it turns rate limiting back off.
                </p>
                <p class="mb-0" markdown="1">
                    By default, your application must have a PSR-16 `Psr\SimpleCache\CacheInterface`
                    implementation configured and bound in your DI container. Any PSR-16 compliant
                    cache works; see the [yiisoft/cache](https://github.com/yiisoft/cache)
                    documentation for one option and its available backends. Setting `useApcu` to
                    `true` drops this requirement entirely: counters are stored in APCu instead,
                    for real atomic compare-and-swap.
                </p>
            </div>
            <div class="card-footer">
                {% include install_block.md package="yiirocks/voyti-api-rate-limiter" repo="voyti-api-rate-limiter" class="mb-0" %}
            </div>
        </div>
    </div>
</div>

<div class="mb-3 small lh-base">
{% highlight php %}
// config/params.php
return [
    'yiirocks/voyti' => [
        'api' => [
            'rateLimiter' => [
                'useApcu' => true,
            ],
        ],
    ],
];
{% endhighlight %}
</div>
{% include options_table.md options=page.option_groups.rateLimiter %}

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Writing a resource plugin</h3>
<ol>
            <li>
                <h4 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Contribute routes</h4>

<p class="mb-3" markdown="1">Append routes to `yiirocks/voyti` &rarr; `api` &rarr; `routes` in `config/params.php`. They're
spliced into the base package's shared authenticated group, inheriting Bearer-token auth, extension
middleware (e.g. rate limiting), and the admin-access check:</p>

<div class="mb-3 small lh-base">
{% highlight php %}
// config/params.php
use MyNamespace\MyResourceController;
use Yiisoft\Router\Route;

return [
    'yiirocks/voyti' => [
        'api' => [
            'routes' => [
                Route::get('v1/my-resource')
                    ->name('voyti/api-v1-my-resource-index')
                    ->action([MyResourceController::class, 'index']),
            ],
        ],
    ],
];
{% endhighlight %}
</div>

<p markdown="1">Route lists merge and append, so multiple resource packages coexist without collision. The
group itself isn't version-scoped - carry your own version segment in each route's path/name
(`v1/...`, `v2/...`).</p>

            </li>
            <li>
                <h4 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Implement the OpenAPI contract</h4>

<p class="mb-3" markdown="1">`OpenApiSpecContributorInterface` (namespace `YiiRocks\Voyti\Api\OpenApi`, provided by the base
package) is the contract you implement and tag with `voyti-api.openapi-contributor` in
`config/di.php`:</p>

<div class="table-responsive">
            <table class="table table-sm table-striped">
                <thead class="fw-bold text-uppercase text-nowrap">
                    <tr>
                        <th>Method</th>
                        <th>Purpose</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td><code>getMethodSpec($routeName, $method)</code></td><td>The OpenAPI operation object for a route name + HTTP method your package owns, or <code>null</code> if it isn't yours.</td></tr>
                    <tr><td><code>schemas()</code></td><td>Component schemas to merge into <code>components.schemas</code>, keyed by schema name.</td></tr>
                </tbody>
            </table>
</div>

<div class="mb-3 small lh-base">
{% highlight php %}
// config/di.php
use MyNamespace\MyResourceOpenApiSpecContributor;

return [
    MyResourceOpenApiSpecContributor::class => [
        'class' => MyResourceOpenApiSpecContributor::class,
        'tags' => ['voyti-api.openapi-contributor'],
    ],
];
{% endhighlight %}
</div>

<p markdown="1">No wiring beyond the tag is needed: `openapi.json` merges every installed contributor's paths and
schemas automatically, alongside the base package's generic `info`/`servers`/`security` shell and
`ErrorResponse`/`MessageResponse` schemas.</p>

            </li>
</ol>
