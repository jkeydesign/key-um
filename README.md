# Key-Um static copy

This repository is a static GitHub Pages-ready copy of the visible `https://key-um.imweb.me/` site.

- 48 desktop HTML pages are available at the project root.
- 48 mobile HTML pages are available under `m/`.
- Downloaded images, fonts, CSS, and other static assets live under `assets/mirror/`.
- Responsive routing sends small screens to the matching `m/` page and desktop screens back to the root page.

## Local preview

```powershell
npm run preview
```

Then open `http://127.0.0.1:4173/`.

## Deployment

GitHub Pages is configured through `.github/workflows/pages.yml`. Push `main`, then GitHub Actions will publish the site.

## Notes

This is a static mirror. Visual pages, text, images, layout, and responsive page variants are preserved, but Imweb backend features such as login, forms, search, comments, chat, and admin-only behavior need a separate backend or service integration if you want them to work as live features.
