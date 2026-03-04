# Copilot Instructions for this Drupal Repository

## 1) Scope and priorities
- This repository is a Drupal project.
- Prioritize safe, minimal, and reversible changes.
- Fix root causes instead of patching symptoms.
- Keep compatibility with existing Drupal patterns and theme architecture.

## 2) Where to work (and where not to)
- Primary custom work area:
  - `web/themes/vats`
  - `config/sync` (only when config updates are intended)
- Do NOT edit generated or third-party sources unless explicitly requested:
  - `vendor/**`
  - `web/core/**`
  - contributed code under `web/modules/contrib/**` and `web/themes/contrib/**`

## 3) Theme architecture (`web/themes/vats`)
- Main theme files:
  - `vats.info.yml`
  - `vats.libraries.yml`
  - `vats.theme`
  - `templates/**`
  - `src/**` (source assets)
  - `dist/**` (built assets)
- Vite builds assets from `src/**` to `dist/**`.
- Prefer route-specific library attachment for special pages (login, reset password) instead of global attachment.

## 4) Drupal-native conventions
- Prefer Drupal/Form API and hooks over DOM manipulation JS when possible.
  - Example: use `hook_form_FORM_ID_alter()` to add classes to submit buttons.
- Keep route-specific logic in preprocess/attachment hooks:
  - `hook_preprocess_page()` for page vars and attaching page libraries.
  - `hook_page_attachments_alter()` for removing global libraries on specific routes.
- Template naming must follow Drupal suggestion conventions.
  - Example: `/user/password` -> `page--user--password.html.twig`.

## 5) Front-end conventions
- SCSS/CSS:
  - Reuse Bootstrap variables/tokens (`--bs-*`) and existing theme style patterns.
  - Avoid introducing hard-coded new design tokens unless required.
- JS:
  - Keep page JS minimal.
  - If no runtime logic is required, prefer SCSS-only entry and avoid empty JS chunks.

## 6) Build and cache workflow
- Theme build:
  - `ddev exec 'cd web/themes/vats && npm run build'`
- Drupal cache rebuild after theme/hook/template/library changes:
  - `ddev drush cr`
- For purely PHP/Twig/hook changes, always run cache rebuild.

## 7) File editing rules
- Do not reformat unrelated code.
- Preserve existing naming and indentation style.
- Keep public behavior unchanged unless explicitly requested.
- Keep changes focused to requested scope; avoid opportunistic refactors.

## 8) Validation checklist before handoff
- Build succeeds (`npm run build` in theme).
- Drupal cache rebuild succeeds (`drush cr`).
- No syntax errors in modified PHP/Twig/YAML files.
- Route-specific pages still render and load intended libraries.

## 9) Git and delivery
- Do not commit directly unless requested.
- Summarize changed files and rationale clearly.
- Mention any follow-up command user should run locally if needed.
