# Project Instructions (VATS Drupal)

This repository is a Drupal 11 codebase built from `drupal/recommended-project`, with a custom frontend theme and version-controlled configuration.

## 1) Tech Stack

- **CMS/Core:** Drupal `^11.3`
- **Backend Language:** PHP
- **Dependency Management:** Composer
- **CLI Tooling:** Drush `^13.7`
- **Frontend Build (custom theme):** Vite `^5`, Sass
- **Frontend Libraries:** Bootstrap, Bootstrap Icons, Swiper

## 2) Repository Layout

- `web/`: Drupal web root
- `config/sync/`: exported site configuration for team sync
- `web/modules/custom/`: custom modules (project-specific backend features)
- `web/themes/vats/`: custom VATS theme
  - `src/`: editable source files (JS/SCSS)
  - `dist/`: compiled assets used by Drupal
  - `vats.libraries.yml`: Drupal asset registration

## 3) Development Workflow

### Backend (Drupal)

1. Install dependencies:

   ```bash
   composer install
   ```

2. Use Drush for day-to-day operations:

   ```bash
   vendor/bin/drush status
   vendor/bin/drush cr
   vendor/bin/drush updb -y
   ```

3. Synchronize configuration when needed:

   ```bash
   vendor/bin/drush cim -y
   vendor/bin/drush cex -y
   ```

### Frontend (VATS Theme)

From the theme directory:

```bash
cd web/themes/vats
npm ci
```

Available scripts:

```bash
npm run dev
npm run build
npm run watch
```

After updating source files in `src/`, run `build` or `watch` so `dist/` stays in sync.

## 4) Custom Development Guidelines

- Add new backend features in `web/modules/custom/`.
- Keep business logic in custom modules, not in templates.
- Keep display-layer work in the custom theme (`web/themes/vats/`).
- Treat `config/sync/` as the source of truth for shareable Drupal configuration changes.
- Rebuild Drupal caches after structural/theme changes.

## 5) Theming Guidelines

- Entry point is `src/js/main.js` (configured in `vite.config.mjs`).
- Compiled outputs are generated into `dist/js/` and `dist/css/`.
- Drupal loads theme assets from `vats.libraries.yml`, so output file paths must remain valid.
- Organize SCSS/JS in `src/` for maintainability, then compile before testing in the browser.

## 6) Suggested Team Conventions

- Run `composer install` after pulling dependency changes.
- Run `npm ci` in `web/themes/vats` after frontend dependency changes.
- Include both code and configuration updates in the same feature branch when they are related.
- Validate key pages after each frontend build and cache rebuild.

## 7) Quick Command Reference

```bash
# PHP dependencies
composer install

# Drupal maintenance
vendor/bin/drush cr
vendor/bin/drush updb -y

# Config sync
vendor/bin/drush cim -y
vendor/bin/drush cex -y

# Theme build
cd web/themes/vats
npm ci
npm run build
```
