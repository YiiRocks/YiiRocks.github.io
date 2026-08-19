---
layout: package-section
pkgId: voyti
section: console
title: "Voyti - Console Commands"
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
            <td><code>voyti:delete</code></td>
            <td>Delete a user</td>
        </tr>
        <tr>
            <td><code>voyti:confirm</code></td>
            <td>Confirm a user's email</td>
        </tr>
        <tr>
            <td><code>voyti:password</code></td>
            <td>Change a user's password</td>
        </tr>
    </tbody>
</table>

## voyti:create

Create a new user account with optional password and role assignment.

```
voyti:create [options] [--] <email> <username>
```

**Arguments:**
- `email` — Email address for the user
- `username` — Username for the user

**Options:**
- `-p, --password=<password>` — Password (auto-generated if omitted)
- `-r, --role=<role>` — RBAC role to assign to the user

**Example:**
```bash
php yii voyti:create user@example.com johndoe
php yii voyti:create --password=secret123 --role=admin user@example.com johndoe
```

## voyti:delete

Delete a user account by ID, email, or username.

```
voyti:delete [options]
```

**Options:**
- `--email=<email>` — Delete user by email address
- `--username=<username>` — Delete user by username
- `--id=<id>` — Delete user by ID

**Example:**
```bash
php yii voyti:delete --email=user@example.com
php yii voyti:delete --username=johndoe
php yii voyti:delete --id=42
```

## voyti:confirm

Mark a user account as email-confirmed.

```
voyti:confirm [options]
```

**Options:**
- `--email=<email>` — Confirm user by email address
- `--username=<username>` — Confirm user by username
- `--id=<id>` — Confirm user by ID

**Example:**
```bash
php yii voyti:confirm --email=user@example.com
php yii voyti:confirm --username=johndoe
php yii voyti:confirm --id=42
```

## voyti:password

Reset a user's password to a newly generated one.

```
voyti:password [options]
```

**Options:**
- `--email=<email>` — Reset password for user by email address
- `--username=<username>` — Reset password for user by username
- `--id=<id>` — Reset password for user by ID

**Example:**
```bash
php yii voyti:password --email=user@example.com
php yii voyti:password --username=johndoe
php yii voyti:password --id=42
```
