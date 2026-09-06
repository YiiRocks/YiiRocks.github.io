---
layout: package-section
pkgId: voyti
section: api-scim
title: "Voyti - SCIM Provisioning"
routes:
  - { name: "voyti/api-scim-v2-service-provider-config", method: "GET", path: "v2/ServiceProviderConfig", purpose: "SCIM service provider capabilities" }
  - { name: "voyti/api-scim-v2-resource-types", method: "GET", path: "v2/ResourceTypes", purpose: "List supported resource types" }
  - { name: "voyti/api-scim-v2-schemas", method: "GET", path: "v2/Schemas", purpose: "List supported schemas" }
  - { name: "voyti/api-scim-v2-schema", method: "GET", path: "v2/Schemas/{schema}", purpose: "View a schema" }
  - { name: "voyti/api-scim-v2-bulk", method: "POST", path: "v2/Bulk", purpose: "Process sequential User and Group operations" }
  - { name: "voyti/api-scim-v2-users-index", method: "GET", path: "v2/Users", purpose: "List Voyti users" }
  - { name: "voyti/api-scim-v2-users-create", method: "POST", path: "v2/Users", purpose: "Create a Voyti user" }
  - { name: "voyti/api-scim-v2-users-search", method: "POST", path: "v2/Users/.search", purpose: "Search Voyti users" }
  - { name: "voyti/api-scim-v2-users-view", method: "GET", path: "v2/Users/{id}", purpose: "View a Voyti user" }
  - { name: "voyti/api-scim-v2-users-replace", method: "PUT", path: "v2/Users/{id}", purpose: "Replace a Voyti user" }
  - { name: "voyti/api-scim-v2-users-patch", method: "PATCH", path: "v2/Users/{id}", purpose: "Patch a Voyti user" }
  - { name: "voyti/api-scim-v2-users-delete", method: "DELETE", path: "v2/Users/{id}", purpose: "Delete a Voyti user" }
  - { name: "voyti/api-scim-v2-groups-index", method: "GET", path: "v2/Groups", purpose: "List RBAC roles" }
  - { name: "voyti/api-scim-v2-groups-create", method: "POST", path: "v2/Groups", purpose: "Create an RBAC role" }
  - { name: "voyti/api-scim-v2-groups-search", method: "POST", path: "v2/Groups/.search", purpose: "Search RBAC roles" }
  - { name: "voyti/api-scim-v2-groups-view", method: "GET", path: "v2/Groups/{id}", purpose: "View an RBAC role" }
  - { name: "voyti/api-scim-v2-groups-replace", method: "PUT", path: "v2/Groups/{id}", purpose: "Replace an RBAC role" }
  - { name: "voyti/api-scim-v2-groups-patch", method: "PATCH", path: "v2/Groups/{id}", purpose: "Patch an RBAC role" }
  - { name: "voyti/api-scim-v2-groups-delete", method: "DELETE", path: "v2/Groups/{id}", purpose: "Delete an RBAC role" }
---

SCIM 2.0 provisioning for identity providers. The `voyti-api-scim` package exposes Voyti users
through the SCIM Users resource and Voyti RBAC roles through the SCIM Groups resource.

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Installation</h3>
{% include install_block.md package="yiirocks/voyti-api-scim" repo="voyti-api-scim" %}

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Resources</h3>

The Users resource represents existing Voyti users. `userName`, `emails`, and `active` are returned
attributes; `password` is accepted as a write-only provisioning attribute. The Groups resource
represents Voyti RBAC roles: `displayName` is the role name and `members` are user assignments. All
routes use the base API's Bearer-token authentication and administrator-access policy.

{% include route_table.md routes=page.routes class="mb-3" %}

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Provisioning behavior</h3>

Collection endpoints support SCIM pagination, attribute selection, filtering, and sorting. User
and Group resources support replacement with `PUT`, partial updates with `PATCH`, and standard
SCIM error responses.

User and Group responses include opaque `ETag` values. `PUT`, `PATCH`, and `DELETE` honor
`If-Match`; a stale conditional write returns `412` with SCIM `invalidVers`. `If-None-Match` can
be used for conditional reads.

`POST /v2/Bulk` processes sequential User and Group operations and returns a per-operation status
and response. Bulk requests require the SCIM BulkRequest schema, support up to 100 operations, and
are limited to a 1 MiB payload. Discovery endpoints describe the provider, resource types, and
schemas. Search requests can use either GET query parameters or the resource-specific
`POST /v2/Users/.search` and `POST /v2/Groups/.search` endpoints.

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Supported profile</h3>

Voyti provides a focused SCIM 2.0 service-provider profile for identity lifecycle management and
RBAC role membership. It covers the operations needed to provision Voyti accounts and roles without
claiming to model every possible SCIM resource, extension, or attribute.

<div class="table-responsive" markdown="1">
| Area | Implementation status |
| --- | --- |
| Resources | Voyti users and RBAC roles, exposed as SCIM Users and Groups |
| Discovery | Service provider configuration, resource types, and supported schemas |
| Lifecycle operations | Create, read, replace, partial update, and delete |
| Query operations | Pagination, attribute selection, supported filters, and sorting |
| Bulk operations | Sequential User and Group operations, limited to 100 operations, with `bulkId` references and `failOnErrors` |
| Conditional requests | `ETag`, `If-Match`, and `If-None-Match` |
| Resource scope | `userName`, `emails`, `active`, and write-only `password` for users; `displayName` and `members` for groups |
| Search | GET query parameters and `POST /v2/Users/.search` or `POST /v2/Groups/.search` are supported |
| PATCH | `add`, `remove`, and `replace` are supported for the mapped attributes, with the required `PatchOp` schema URI enforced |
| Resource metadata | `Location` and `meta.location` are emitted for resource responses |
| Extensions and additional resources | Not included in this focused profile |
{: .table .table-sm .table-striped }
</div>

SCIM requests should be sent over HTTPS. The package supplies Bearer-token authentication and
administrator-access enforcement through `voyti-api`; the application remains responsible for
TLS configuration and deployment-level security.
