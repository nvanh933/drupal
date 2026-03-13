# Drupal Project

## Project Overview
- CMS: Drupal 11 (`drupal/core-recommended ^11.3`)
- PHP: 8.4+
- Database: MySQL 8+ or MariaDB 10.11+

## Repository Structure
- `web/`: Drupal docroot (web server should point here)
- `config/sync/`: Exported Drupal configuration
- `web/themes/custom/vats/`: Custom theme (Twig, Sass, Vite build pipeline, hooks)
- `web/modules/custom/`: Custom modules
- `vendor/`: Composer dependencies

## Requirements
- PHP 8.4+ with common Drupal extensions (`pdo_mysql`, `gd`, `mbstring`, `xml`, `curl`, `zip`, `intl`, `opcache`)
- MySQL/MariaDB
- Composer 2
- Node.js and npm
- Drush (local binary or global install)

## Setup
1. Install PHP dependencies:
   - `composer install`
2. Install theme frontend dependencies:
   - `cd web/themes/custom/vats && npm install`
3. Configure database credentials in `web/sites/default/settings.php`.
4. Run Drupal install/import flow via browser or Drush.

## Theme: web/themes/custom/vats

### Root Files
| File | Purpose |
|---|---|
| `vats.info.yml` | Theme metadata, regions, attached libraries |
| `vats.libraries.yml` | Library definitions (`vendor`, `main`, `components`, route-specific) |
| `vats.theme` | Preprocess hooks, template suggestions, form alters |
| `vite.config.mjs` | Vite build entries/output settings |
| `package.json` | npm scripts and frontend dependencies |

### Source Structure
```
src/
├── common/
│   ├── _helpers.scss
│   ├── _typography.scss
│   ├── _variables.scss
│   └── main.scss
├── components/
│   ├── index.js
│   ├── layout/
│   │   ├── footer/
│   │   └── header/
│   ├── paragraphs/
│   │   ├── bluecheese-cta/
│   │   ├── content/
│   │   ├── cta/
│   │   ├── features/
│   │   ├── hero/
│   │   ├── listing-grid/
│   │   └── testimonials/
│   └── ui/
│       └── button.scss
├── pages/
│   ├── user-login/
│   │   └── user-login.scss
│   └── user-password/
│       └── user-password.scss
└── vendor/
	├── fonts.scss
	└── vendor.js
```

### Vite Build Entries
Configured in `vite.config.mjs`:

| Entry | Source | Output |
|---|---|---|
| `vendor` | `src/vendor/vendor.js` | `dist/js/vendor.js`, `dist/css/vendor.css` |
| `main` | `src/common/main.scss` | `dist/css/main.css` |
| `components` | `src/components/index.js` | `dist/js/components.js`, `dist/css/components.css` |
| `user-login` | `src/pages/user-login/user-login.scss` | `dist/css/user-login.css` |
| `user-password` | `src/pages/user-password/user-password.scss` | `dist/css/user-password.css` |

### Templates
```
templates/
├── block/
│   ├── block.html.twig
│   └── block--system-main-block--node--landing-page.html.twig
├── content/
│   ├── media--image.html.twig
│   ├── node.html.twig
│   ├── node--landing-page.html.twig
│   ├── page-title.html.twig
│   └── taxonomy-term.html.twig
├── field/
├── form/
├── layout/
│   ├── html.html.twig
│   ├── maintenance-page.html.twig
│   ├── page.html.twig
│   ├── region.html.twig
│   └── region--node--landing-page--content.html.twig
├── misc/
│   └── status-messages.html.twig
├── navigation/
├── page/
│   ├── page--node--landing-page.html.twig
│   ├── page--user--login.html.twig
│   └── page--user--password.html.twig
├── paragraph/
│   ├── paragraph--bluecheese-cta-section.html.twig
│   ├── paragraph--content-item.html.twig
│   ├── paragraph--content-section.html.twig
│   ├── paragraph--cta-section.html.twig
│   ├── paragraph--feature-item.html.twig
│   ├── paragraph--features-section.html.twig
│   ├── paragraph--hero-section.html.twig
│   ├── paragraph--listing-grid-item.html.twig
│   ├── paragraph--listing-grid-section.html.twig
│   ├── paragraph--testimonial-item.html.twig
│   └── paragraph--testimonials-section.html.twig
├── user/
│   └── user.html.twig
└── views/
	├── views-exposed-form.html.twig
	├── views-view-grid.html.twig
	├── views-view-list.html.twig
	├── views-view-table.html.twig
	├── views-view-unformatted.html.twig
	└── views-view.html.twig
```

### Theme Suggestion Hooks
Defined in `vats.theme`:

| Hook | Suggestion pattern | Example |
|---|---|---|
| `hook_theme_suggestions_page_alter()` | `page__node__{bundle}` | `page--node--landing-page.html.twig` |
| `hook_theme_suggestions_region_alter()` | `region__node__{bundle}__content` | `region--node--landing-page--content.html.twig` |
| `hook_theme_suggestions_block_alter()` | `block__system_main_block__node__{bundle}` | `block--system-main-block--node--landing-page.html.twig` |

## Useful Commands
- Install backend dependencies: `composer install`
- Validate composer config: `composer validate --no-check-publish`
- Audit locked dependencies: `composer audit --locked`
- Install theme dependencies: `cd web/themes/custom/vats && npm install`
- Build theme assets: `cd web/themes/custom/vats && npm run build`
- Run dev server for theme: `cd web/themes/custom/vats && npm run dev`
- Clear Drupal cache: `drush cr`

## Contributor Notes
- Keep changes minimal and scoped.
- Work primarily in `web/themes/custom/vats` and `web/modules/custom` unless config updates are intended.
- Do not edit `vendor/`, `web/core/`, or contrib code directly unless explicitly required.
- Do not commit build artifacts from `web/themes/custom/vats/dist/`.
