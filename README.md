# Drupal Project

## Project Overview
- **CMS:** Drupal 11 (`drupal/core-recommended ^11.3`)
- **PHP:** 8.4+
- **Database:** MySQL 8+ or MariaDB 10.11+

## Repository Structure
- `web/` — Drupal docroot (Apache must point here)
- `config/sync/` — exported Drupal configuration
- `web/themes/vats/` — custom theme (Twig, SCSS, Vite build pipeline, hook logic)
- `web/modules/custom/` — custom modules (if needed in future)
- `vendor/` — Composer dependencies

## LAMP Setup
### 1) Requirements
- Apache 2.4+
- PHP 8.4+ with common Drupal extensions (`pdo_mysql`, `gd`, `mbstring`, `xml`, `curl`, `zip`, `intl`, `opcache`)
- MySQL/MariaDB server
- Composer 2
- Node.js + npm

### 2) Install dependencies
- `composer install`
- `cd web/themes/vats && npm install`

### 3) Database
Create a database and user (example):
- `CREATE DATABASE drupal CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`
- `CREATE USER 'drupal'@'localhost' IDENTIFIED BY 'your_password';`
- `GRANT ALL PRIVILEGES ON drupal.* TO 'drupal'@'localhost';`
- `FLUSH PRIVILEGES;`

### 4) Apache VirtualHost
Set `DocumentRoot` to `.../drupal/web`.

Example:
```apache
<VirtualHost *:80>
	ServerName drupal.local
	DocumentRoot /path/to/drupal/web

	<Directory /path/to/drupal/web>
		AllowOverride All
		Require all granted
	</Directory>
</VirtualHost>
```

Enable `mod_rewrite` and restart Apache.

### 5) Drupal settings
- Ensure `web/sites/default/settings.php` exists.
- Put DB credentials into `$databases` in `settings.php`.
- Complete install/import flow in browser or with Drush.

### 6) Build assets and clear cache
- `cd web/themes/vats && npm run build`
- `drush cr`

## Theme (`web/themes/vats`)

### Root files
| File | Purpose |
|---|---|
| `vats.info.yml` | Theme metadata, regions, globally attached libraries |
| `vats.libraries.yml` | Library definitions (`vendor`, `common`, `components`, route-specific) |
| `vats.theme` | Preprocess hooks, template suggestions, form/attachment alters |
| `vite.config.mjs` | Vite build configuration |
| `package.json` | npm dependencies and build scripts |

### Source (`src/`)
```
src/
├── vendor/                     # Third-party CSS/JS bundle entry
│   └── vendor.js               #   → Bootstrap, Bootstrap Icons, Swiper
├── common/                     # Global site styles + JS
│   ├── common.js               #   → imports styles/ + components/
│   └── styles/
│       ├── header.scss
│       └── footer.scss
├── components/                 # Reusable component styles + JS
│   ├── index.js                #   → barrel import for all components
│   ├── hero/
│   │   └── hero.scss
│   └── features/
│       └── features.scss
└── pages/                      # Route-specific SCSS (standalone, no common)
    ├── user-login.scss
    └── user-password.scss
```

### Build output (`dist/`)
Built by Vite. Empty JS entry chunks are auto-removed.

| Entry | CSS output | JS output |
|---|---|---|
| `src/vendor/vendor.js` | `dist/css/vendor.css` | `dist/js/vendor.js` |
| `src/common/common.js` | `dist/css/common.css` | `dist/js/common.js` |
| `src/components/index.js` | `dist/css/components.css` | `dist/js/components.js` (if non-empty) |
| `src/pages/user-login.scss` | `dist/css/user-login.css` | — |
| `src/pages/user-password.scss` | `dist/css/user-password.css` | — |

### Templates (`templates/`)
```
templates/
├── layout/
│   ├── html.html.twig
│   ├── page.html.twig                              # Base page layout (defines {% block body %})
│   ├── region.html.twig
│   ├── region--node--landing-page--content.html.twig
│   └── maintenance-page.html.twig
├── page/
│   ├── page--user--login.html.twig                 # Standalone login layout
│   ├── page--user--password.html.twig              # Standalone reset-password layout
│   └── page--node--landing-page.html.twig          # Landing page (extends page, overrides body)
├── block/
│   ├── block.html.twig
│   └── block--system-main-block--node--landing-page.html.twig
├── paragraph/
│   └── paragraph--hero-section.html.twig
├── content/        # node.html.twig, page-title, taxonomy-term
├── form/           # form element overrides (input, select, textarea, etc.)
├── field/          # field.html.twig
├── navigation/     # menu, breadcrumb, pager, links
├── views/          # views-view, views-exposed-form, etc.
├── misc/           # status-messages
└── user/           # user.html.twig
```

### Template suggestion hooks (in `vats.theme`)
| Hook | Suggestion pattern | Example file |
|---|---|---|
| `page_alter` | `page__node__{bundle}` | `page--node--landing-page.html.twig` |
| `region_alter` | `region__node__{bundle}__content` | `region--node--landing-page--content.html.twig` |
| `block_alter` | `block__system_main_block__node__{bundle}` | `block--system-main-block--node--landing-page.html.twig` |

### Images
- `images/logo.svg` — site logo
- `images/login/` — login/reset-password page background

## Useful Commands
- `composer install`
- `composer validate --no-check-publish`
- `composer audit --locked`
- `cd web/themes/vats && npm run build`
- `drush cr`

## Contributor Notes
- Keep changes minimal and reversible
- Work primarily in `web/themes/vats` & `web/modules/custom` unless config updates are intended
- Do not edit `vendor/**`, `web/core/**`, or contrib code unless explicitly required
