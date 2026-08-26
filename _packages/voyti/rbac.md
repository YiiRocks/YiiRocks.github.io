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

<h3 class="text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">The RBAC Cookbook</h3>

<h4 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Checking permissions in code</h4>

<p class="mb-3" markdown="1">The examples below show how to implement RBAC checks in your host application. Voyti provides the
admin UI and storage, plus helpers like `AuthHelper`, but permission checks ultimately use the
underlying `yiisoft/rbac` interfaces.</p>

<p class="mb-3" markdown="1">Use `AuthHelper` to check if a user has a specific role or is an administrator:</p>

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

<p class="mb-3" markdown="1">For more complex permission checks, inject `ManagerInterface` directly:</p>

<div class="mb-3 small lh-base">
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

<h4 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Role hierarchy</h4>

<p class="mb-3" markdown="1">Roles and permissions form a hierarchy: a parent role inherits all permissions from its children,
avoiding duplication across multiple roles.</p>

<p class="mb-3" markdown="1">Example hierarchy:</p>

- **admin** (role) → inherits from **moderator**
  - **moderator** (role) → inherits from **editor**
    - **post.edit** (permission)
    - **post.delete** (permission)
  - **admin.manage-users** (permission)

<p markdown="1">A user assigned the <strong>admin</strong> role automatically has <strong>post.edit</strong>,
<strong>post.delete</strong>, and <strong>admin.manage-users</strong> permissions without explicit
assignment. You can build hierarchies with both direct permissions and role-to-role inheritance.</p>

<h4 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Rules</h4>

<p class="mb-3" markdown="1">Rules add conditional logic to permissions: a permission with a rule only grants access if the
rule's code passes. Register custom rules by implementing `RuleInterface` and tagging them in your
DI container.</p>

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

<p class="mb-3" markdown="1">Register the rule in `config/di.php`:</p>

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

<p class="mb-3" markdown="1">Create a permission <strong>post.edit-own</strong> via the admin UI or code, attach the
<strong>isPostOwner</strong> rule to it, then check it by passing params:</p>

<div class="mb-3 small lh-base">
{% highlight php %}
if ($this->rbacManager->userHasPermission($userId, 'post.edit-own', ['postId' => 42])) {
    // User owns post 42 and can edit it
}
{% endhighlight %}
</div>

<h4 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Assignments</h4>

<p class="mb-3" markdown="1">Assignments link users to roles and permissions. The admin UI (under <strong>RBAC &gt;
Roles</strong> and <strong>RBAC &gt; Permissions</strong>) shows an "Assigned users" section where
you can add or remove user assignments. Programmatically, use `AssignmentsStorageInterface`:</p>

<div class="mb-3 small lh-base">
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

<h4 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">Practical example</h4>

<p class="mb-3" markdown="1">Say you want to let users edit and publish their own posts but not others'. Create the structure
via the admin UI:</p>

1. Create permission **post.edit**
2. Create permission **post.publish**
3. Create permission **post.edit-own** and attach the **isPostOwner** rule
4. Create role **author** with **post.edit-own** and **post.publish**
5. Assign the **author** role to your users

<p class="mb-3" markdown="1">In your controller:</p>

<div class="mb-3 small lh-base">
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
