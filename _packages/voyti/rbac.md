---
layout: package-section
pkgId: voyti
section: rbac
title: "Voyti - RBAC Management"
---

- **Admin UI** for managing permissions, roles, and rules (create, update, delete, filter)
- **Assignment management** - assign/revoke roles and permissions per user from the admin panel
- **Parent-child hierarchy** - roles can have child permissions/roles
- **Rule management** - register and manage custom `RuleInterface` classes

<h4 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Role hierarchy</h4>

Roles and permissions form a hierarchy: a parent role inherits all permissions from its children,
avoiding duplication across multiple roles.

Example hierarchy:

- **admin** (role) → inherits from **moderator**
  - **moderator** (role) → inherits from **editor**
    - **post.edit** (permission)
    - **post.delete** (permission)
  - **admin.manage-users** (permission)

A user assigned the **admin** role automatically has **post.edit**, **post.delete**, and
**admin.manage-users** permissions without explicit assignment. You can build hierarchies with
both direct permissions and role-to-role inheritance.

<h3 class="text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">The RBAC Cookbook</h3>

{% capture content %}
The examples below show how to implement RBAC checks in your host application. Voyti provides the
admin UI and storage, plus helpers like `AuthHelper`, but permission checks ultimately use the
underlying `yiisoft/rbac` interfaces.

Use `AuthHelper` to check if a user has a specific role or is an administrator:

<div class="mb-3 small lh-base">
{% highlight php %}
use YiiRocks\Voyti\Helper\AuthHelper;

public function __construct(private AuthHelper $authHelper) {}

public function someAction(): ResponseInterface
{
    $userId = $this->currentUser->getIdentity()?->getId();

    // Check if user is an admin
    if ($this->authHelper->isAdmin($userId)) {
        // Admin-only logic
    }

    // Check if user has a specific role
    if ($this->authHelper->hasRole($userId, 'editor')) {
        // Editor-only logic
    }
}
{% endhighlight %}
</div>

For more complex permission checks, inject `ManagerInterface` directly:

<div class="mb-0 small lh-base">
{% highlight php %}
use Yiisoft\Rbac\ManagerInterface;

public function __construct(private ManagerInterface $rbacManager) {}

public function editPost(int $postId): ResponseInterface
{
    $userId = $this->currentUser->getIdentity()?->getId();

    // Check a specific permission
    if (!$this->rbacManager->userHasPermission($userId, 'post.edit')) {
        throw new ForbiddenHttpException('You cannot edit posts.');
    }
}
{% endhighlight %}
</div>
{% endcapture %}
{% include collapsible_card.md group="rbac-cookbook" heading="h4" id="checking-permissions-in-code" title="Checking permissions in code" content=content %}

{% capture content %}
Rules add conditional logic to permissions: a permission with a rule only grants access if the
rule's code passes. Register custom rules by implementing `RuleInterface` and tagging them in your
DI container.

<div class="mb-3 small lh-base">
{% highlight php %}
// src/Rbac/IsPostOwnerRule.php
use Yiisoft\Rbac\RuleInterface;

final readonly class IsPostOwnerRule implements RuleInterface
{
    public function __construct(private PostRepositoryInterface $posts) {}

    public function getName(): string
    {
        return 'isPostOwner';
    }

    public function execute(?int $userId, Item $item, array $params = []): bool
    {
        $postId = $params['postId'] ?? null;
        if (!$postId || !$userId) {
            return false;
        }

        $post = $this->posts->findById($postId);
        return $post && $post->getAuthorId() === $userId;
    }
}
{% endhighlight %}
</div>

Register the rule in `config/di.php`:

<div class="mb-3 small lh-base">
{% highlight php %}
return [
    IsPostOwnerRule::class => [
        'class' => IsPostOwnerRule::class,
        'tags' => ['yiisoft/rbac/rule'],
    ],
];
{% endhighlight %}
</div>

Create a permission **post.edit-own** via the admin UI or code, attach the **isPostOwner** rule to
it, then check it by passing params:

<div class="mb-0 small lh-base">
{% highlight php %}
if ($this->rbacManager->userHasPermission($userId, 'post.edit-own', ['postId' => 42])) {
    // User owns post 42 and can edit it
}
{% endhighlight %}
</div>
{% endcapture %}
{% include collapsible_card.md group="rbac-cookbook" heading="h4" id="rules" title="Rules" content=content %}

{% capture content %}
Assignments link users to roles and permissions. The admin UI (under **RBAC > Roles** and
**RBAC > Permissions**) shows an "Assigned users" section where you can add or remove user
assignments. Programmatically, use `AssignmentsStorageInterface`:

<div class="mb-0 small lh-base">
{% highlight php %}
use Yiisoft\Rbac\AssignmentsStorageInterface;

public function __construct(
    private AssignmentsStorageInterface $assignments,
    private ManagerInterface $rbacManager,
) {}

// Assign a role to a user
$role = $this->rbacManager->getRole('editor');
$this->assignments->assign($role, $userId);

// Revoke a role
$this->assignments->revoke($role, $userId);

// Get all roles/permissions assigned to a user
$userAssignments = $this->assignments->getByUserId($userId);
{% endhighlight %}
</div>
{% endcapture %}
{% include collapsible_card.md group="rbac-cookbook" heading="h4" id="assignments" title="Assignments" content=content %}

{% capture content %}
Say you want to let users edit and publish their own posts but not others'. Create the structure
via the admin UI:

1. Create permission **post.edit**
2. Create permission **post.publish**
3. Create permission **post.edit-own** and attach the **isPostOwner** rule
4. Create role **author** with **post.edit-own** and **post.publish**
5. Assign the **author** role to your users

In your controller:

<div class="mb-0 small lh-base">
{% highlight php %}
public function editPost(int $postId): ResponseInterface
{
    $userId = $this->currentUser->getIdentity()?->getId();

    // Check if user can edit this specific post
    if (!$this->rbacManager->userHasPermission($userId, 'post.edit-own', ['postId' => $postId])) {
        throw new ForbiddenHttpException('You can only edit your own posts.');
    }

    // ... proceed with edit logic
}
{% endhighlight %}
</div>
{% endcapture %}
{% include collapsible_card.md group="rbac-cookbook" heading="h4" id="practical-example" title="Practical example" content=content %}
