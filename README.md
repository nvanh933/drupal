# Drupal Project (VATS)

This repository is a Drupal 11 project using DDEV for local development and a custom front-end theme at `web/themes/vats`.

## Project Overview
- **CMS:** Drupal 11 (`drupal/core-recommended ^11.3`)
- **PHP:** 8.4 (via DDEV)
- **Database:** MariaDB 11.8 (via DDEV)
- **Main custom code area:** `web/themes/vats`
- **Composer project type:** `drupal/recommended-project`

## Repository Structure
- `web/` — Drupal docroot
- `config/sync/` — exported Drupal configuration
- `web/themes/vats/` — custom theme (Twig, SCSS, build pipeline, hook logic)
- `vendor/` — Composer dependencies
- `.ddev/` — local containerized dev environment config

## Local Development
### Prerequisites
- Docker Desktop
- DDEV

### Start environment
- `ddev start`

### Install PHP dependencies
- `ddev composer install`

### Build theme assets
- `ddev exec 'cd web/themes/vats && npm install'`
- `ddev exec 'cd web/themes/vats && npm run build'`

### Rebuild Drupal cache
- `ddev drush cr`

## Theme (web/themes/vats)
### Important files
- `vats.info.yml` — theme metadata + globally attached libraries
- `vats.libraries.yml` — library definitions (`vendor`, `common`, route-specific page CSS)
- `vats.theme` — preprocess/hooks and route/form-specific behavior
- `templates/page/page--user--login.html.twig`
- `templates/page/page--user--password.html.twig`
- `vite.config.cjs` — Vite build config
- `src/` — source SCSS/JS
- `dist/` — built output consumed by Drupal

### Build behavior
Vite compiles:
- `src/vendor/vendor.js` -> `dist/js/vendor.js` + `dist/css/vendor.css`
- `src/common/common.js` -> `dist/js/common.js` + `dist/css/common.css`
- `src/pages/login/login-page.scss` -> `dist/css/login-page.css`
- `src/pages/reset-password/reset-password-page.scss` -> `dist/css/reset-password-page.css`

## Routing and Page-specific Styling
Login and reset-password pages use route-specific libraries attached in `vats.theme`:
- Route `user.login` attaches `vats/login-page`
- Route `user.pass` (path `/user/password`) attaches `vats/reset-password-page`

For these two routes, global `vats/common` is removed via `hook_page_attachments_alter()`.

## Audit Summary (Current State)
Audit date: **2026-03-04**

### What is healthy
- Composer config is valid (`ddev composer validate --no-check-publish`).
- No known Composer security advisories in lock file (`ddev composer audit --locked`).
- Custom logic is concentrated in the theme, reducing risk of touching core/contrib.
- Route-specific theming for login/reset password is implemented in Drupal-native way (hooks + Twig suggestions).

### Risks / Observations
- `drupal/webform` is pinned to a **beta** release (`^6.3@beta`), which may increase upgrade/regression risk.
- `vats.theme` still contains empty preprocess stubs (`vats_preprocess_html`, `vats_preprocess_node`) that add maintenance noise.
- No custom module currently exists (`web/modules/custom` is empty); all behavior is theme-level.
- No visible CI workflow in `.github/workflows` to enforce automated checks on push/PR.

### Recommended next steps (priority order)
1. Consider moving from `webform` beta to a stable release when project constraints allow.
2. Add a lightweight CI pipeline (Composer validate, optional lint, theme build).
3. Remove unused empty hook stubs from `vats.theme`.
4. Keep route-specific library strategy for auth pages; avoid reintroducing JS-only style logic.

## Useful Commands
- `ddev describe` — show project URLs and service status
- `ddev drush status` — Drupal runtime info
- `ddev composer audit --locked` — dependency advisory check
- `ddev exec 'cd web/themes/vats && npm run build'` — rebuild theme assets
- `ddev drush cr` — clear Drupal caches

## Notes for Contributors
- Prefer minimal, reversible changes.
- Work primarily in `web/themes/vats` unless config changes are intended.
- Avoid editing `vendor/**`, `web/core/**`, and contrib code unless explicitly required.
