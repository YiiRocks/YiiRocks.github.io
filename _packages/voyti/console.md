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
    - name: username
      default: "required"
      desc: "Username for the user"
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

<table class="table table-sm table-striped">
    <thead>
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

<h4 class="doc-h">voyti:create</h4>

<p>Create a new user account with optional password and role assignment.</p>

<div class="doc-example mb-3">
voyti:create [options] [--] &lt;email&gt; &lt;username&gt;
</div>

{% include options_table.md options=page.option_groups.create %}

<div class="doc-example mb-3">
{% highlight bash %}
php yii voyti:create user@example.com johndoe
php yii voyti:create --password=secret123 --role=admin user@example.com johndoe
{% endhighlight %}
</div>

<h4 class="doc-h">voyti:confirm</h4>

<p>Mark a user account as email-confirmed.</p>

<div class="doc-example mb-3">
voyti:confirm [options]
</div>

{% include options_table.md options=page.option_groups.confirm %}

<div class="doc-example mb-3">
{% highlight bash %}
php yii voyti:confirm --email=user@example.com
php yii voyti:confirm --username=johndoe
php yii voyti:confirm --id=42
{% endhighlight %}
</div>

<h4 class="doc-h">voyti:password</h4>

<p>Reset a user's password to a newly generated one.</p>

<div class="doc-example mb-3">
voyti:password [options]
</div>

{% include options_table.md options=page.option_groups.password_reset %}

<div class="doc-example mb-3">
{% highlight bash %}
php yii voyti:password --email=user@example.com
php yii voyti:password --username=johndoe
php yii voyti:password --id=42
{% endhighlight %}
</div>

<h4 class="doc-h">voyti:delete</h4>

<p>Delete a user account by ID, email, or username.</p>

<div class="doc-example mb-3">
voyti:delete [options]
</div>

{% include options_table.md options=page.option_groups.delete %}

<div class="doc-example mb-3">
{% highlight bash %}
php yii voyti:delete --email=user@example.com
php yii voyti:delete --username=johndoe
php yii voyti:delete --id=42
{% endhighlight %}
</div>
