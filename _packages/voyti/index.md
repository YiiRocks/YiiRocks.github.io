---
permalink: "/voyti/"
layout: "package"
pkgId: "voyti"
name: "Voyti"
tagline: "User management, authentication & authorization"
tint: "#f3e8ff"
logo: "/assets/icons/voyti.svg"
package: "yiirocks/voyti"
branch: "main"
repo: "voyti"
workflow: "build.yml"
docsUrl: "/voyti/"
featured: true
title: "Voyti"
description: "Provides highly customizable user management, authentication, and authorization for your Yii3 applications."
sections: 
  - slug: "quick-start"
    title: "Quick Start"
  - slug: "config"
    title: "Configuration"
  - slug: "console"
    title: "Console"
  - slug: "middleware"
    title: "Middleware"
  - slug: "routes"
    title: "Routes"
  - slug: "rbac"
    title: "RBAC"
  - slug: "events"
    title: "Events"
  - slug: "cookbook"
    title: "Cookbook"
  - slug: "lockout"
    title: "Lockout"
    group: "addon"
  - slug: "gdpr"
    title: "GDPR"
    group: "addon"
  - slug: "api"
    title: "REST API"
    group: "addon"
  - slug: "social"
    title: "Social Auth"
    group: "addon"
  - slug: "two-factor"
    title: "Two-Factor Auth"
    group: "addon"
features: 
  - label: "User management"
    detail: "Registration, email confirmation, login/logout with remember-me, password recovery, password expiration"
  - label: "Profile management"
    detail: "User profiles with gravatar, timezone, bio, and a personal website link"
  - label: "Social authentication"
    detail: "OAuth2 login via Google, GitHub, Facebook, and more"
  - label: "Two-factor authentication"
    detail: "Email codes, TOTP (authenticator app) with QR provisioning, or WebAuthn/passkeys - with enforced-per-permission support and one-time backup codes for account recovery"
  - label: "RBAC Management"
    detail: "Full admin UI for roles, permissions, and rules with parent-child hierarchy, assignment management, and filtering"
  - label: "Identity switching"
    detail: "Admins can temporarily switch into another user's identity for support or debugging, then restore their own session with one click"
  - label: "Session management"
    detail: "Session tracking and termination"
  - label: "GDPR data handling"
    detail: "Data export and account anonymization"
  - label: "Password policies"
    detail: "Minimum complexity requirements, max age enforcement via middleware"
  - label: "Email change confirmation"
    detail: "Three modes: immediate, confirm new address, confirm both old and new"
  - label: "REST API"
    detail: "JSON user CRUD (Bearer-token auth)"
  - label: "Bot Protection"
    detail: "Google reCAPTCHA v2/v3 for registration and login forms"
  - label: "Brute-force protection"
    detail: "Exponential backoff delays for failed login and registration attempts, tracked per IP address"
  - label: "i18n"
    detail: "Built-in translations for multiple languages"
  - label: "Pluggable views"
    detail: "View-agnostic core with Bootstrap 5 views available; alternative UI frameworks can implement the standard interface"
  - label: "Email customization"
    detail: "Mail templates are independently overridable for complete control over transactional email content and styling"
  - label: "Toast notifications"
    detail: "Native Bootstrap toast support with automatic fallback to flash messages"
---

<blockquote class="text-muted text-center mb-5">
            <div class="display-5 fw-normal">войти</div>
            <div class="fs-4 fst-italic text-body-secondary">/vɐjˈtʲi/</div>
            <div class="fst-italic small fw-semibold">verb</div>

            <p class="lead fst-italic mt-3 mb-0">
                "to enter" · "to log in"
            </p>
</blockquote>

<p class="lead" markdown="1">
            **Voyti** is a highly customizable and extensible user management,
            authentication, and authorization extension for
            [Yii&nbsp;3](https://www.yiiframework.com/).
</p>

<p markdown="1">Originally ported from [Usuario](https://github.com/2amigos/yii2-usuario), Voyti has since been
rebuilt around modern PSR standards and Yiisoft components. It has been extensively redesigned to
provide a flexible, modular foundation that adapts to a wide range of authentication and
authorization requirements.</p>
