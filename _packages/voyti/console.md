---
layout: package-section
pkgId: voyti
section: console
title: "Voyti - Console Commands"
option_groups:
  create:
    - name: email
      default: "required"
      desc: "Email address for the user"
      type: string
    - name: username
      default: "required"
      desc: "Username for the user"
      type: string
    - name: "-p, --password"
      type: string
      default: "optional"
      desc: "Password (auto-generated if omitted)"
    - name: "-r, --role"
      type: string
      default: "optional"
      desc: "RBAC role to assign to the user"
  confirm:
    - name: "--email"
      type: string
      default: "optional"
      desc: "Confirm user by email address"
    - name: "--username"
      type: string
      default: "optional"
      desc: "Confirm user by username"
    - name: "--id"
      type: int
      default: "optional"
      desc: "Confirm user by ID"
  password_reset:
    - name: "--email"
      type: string
      default: "optional"
      desc: "Reset password for user by email address"
    - name: "--username"
      type: string
      default: "optional"
      desc: "Reset password for user by username"
    - name: "--id"
      type: int
      default: "optional"
      desc: "Reset password for user by ID"
  delete:
    - name: "--email"
      type: string
      default: "optional"
      desc: "Delete user by email address"
    - name: "--username"
      type: string
      default: "optional"
      desc: "Delete user by username"
    - name: "--id"
      type: int
      default: "optional"
      desc: "Delete user by ID"
---

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
            <td><code>voyti:create</code></td>
            <td>Create a new user</td>
        </tr>
        <tr>
            <td><code>voyti:confirm</code></td>
            <td>Confirm a user's email</td>
        </tr>
        <tr>
            <td><code>voyti:password</code></td>
            <td>Change a user's password</td>
        </tr>
        <tr>
            <td><code>voyti:delete</code></td>
            <td>Delete a user</td>
        </tr>
    </tbody>
</table>
</div>

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">voyti:create</h3>

<p class="mb-3" markdown="1">Create a new user account with optional password and role assignment.</p>

{% highlight bash %}
voyti:create [options] [--] <email> <username> 
{% endhighlight %}

{% include options_table.md options=page.option_groups.create %}

<div class="mb-3 small lh-base">
{% highlight bash %}
php yii voyti:create user@example.com johndoe
php yii voyti:create --password=secret123 --role=admin user@example.com johndoe
{% endhighlight %}
</div>

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">voyti:confirm</h3>

<p class="mb-3" markdown="1">Mark a user account as email-confirmed.</p>

{% highlight bash %}
voyti:confirm [options]
{% endhighlight %}

{% include options_table.md options=page.option_groups.confirm %}

<div class="mb-3 small lh-base">
{% highlight bash %}
php yii voyti:confirm --email=user@example.com
php yii voyti:confirm --username=johndoe
php yii voyti:confirm --id=42
{% endhighlight %}
</div>

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">voyti:password</h3>

<p class="mb-3" markdown="1">Reset a user's password to a newly generated one.</p>

{% highlight bash %}
voyti:password [options]
{% endhighlight %}

{% include options_table.md options=page.option_groups.password_reset %}

<div class="mb-3 small lh-base">
{% highlight bash %}
php yii voyti:password --email=user@example.com
php yii voyti:password --username=johndoe
php yii voyti:password --id=42
{% endhighlight %}
</div>

<h3 class="h5 text-uppercase fw-bold pb-2 mb-3 border-bottom border-2 text-primary-emphasis section-label">voyti:delete</h3>

<p class="mb-3" markdown="1">Delete a user account by ID, email, or username.</p>

{% highlight bash %}
voyti:delete [options]
{% endhighlight %}

{% include options_table.md options=page.option_groups.delete %}

<div class="mb-3 small lh-base">
{% highlight bash %}
php yii voyti:delete --email=user@example.com
php yii voyti:delete --username=johndoe
php yii voyti:delete --id=42
{% endhighlight %}
</div>
