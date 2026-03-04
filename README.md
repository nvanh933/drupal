# Drupal Project (VATS) — LAMP Stack Guide

This repository is a Drupal 11 project designed to run on a classic **LAMP stack**:
- **Linux/macOS + Apache**
- **MySQL/MariaDB**
- **PHP 8.4+**

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

## Theme (web/themes/vats)
### Important files
- `vats.info.yml` — theme metadata and globally attached libraries
- `vats.libraries.yml` — library definitions (`vendor`, `common`, route-specific page CSS)
- `vats.theme` — preprocess/hooks and route/form-specific behavior
- `vite.config.mjs` — Vite build config
- `src/` — source SCSS/JS
- `dist/` — built assets consumed by Drupal

### Build outputs
- `src/vendor/vendor.js` -> `dist/js/vendor.js` + `dist/css/vendor.css`
- `src/common/common.js` -> `dist/js/common.js` + `dist/css/common.css`

## Audit Snapshot (2026-03-04)
### Healthy
- `composer validate --no-check-publish` passes
- `composer audit --locked` reports no advisories
- Custom logic is concentrated in theme layer (`web/themes/vats`)

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
