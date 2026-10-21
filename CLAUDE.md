# MiroGames site (bukesafiye.github.io)

Jekyll site served by GitHub Pages from `main`. Bilingual: every visible text exists in
Turkish and English (`<span class="tr">…</span><span class="en">…</span>`, or `{ tr, en }` in data).
Commit as `bukesafiye <bukesafiye@gmail.com>`.

## Adding a new game

When the user says "yeni oyun ekle" / "add a new game", do **all** of the steps below.
The home page card, the colored link in the header, the floating hero icon and the game's
color theme are generated from `_data/games.yml`, so step 2 does most of the work.

1. **Assets** (ask the user for anything missing; never invent store screenshots):
   - `assets/img/<slug>-icon.png`: app icon, 256×256, square
   - `assets/img/<slug>-logo.webp`: logo with a transparent background, trimmed, ~900 px wide,
     made from the PNG with `cwebp -q 88 -alpha_q 100 -m 6 in.png -o out.webp` (PNG logos are ~1 MB).
     If the logo differs per language, add `<slug>-logo-tr.webp` and `<slug>-logo-en.webp`.
   - `assets/img/shots/<slug>-tr-01.jpg` … and `<slug>-en-01.jpg` …: JPG phone screenshots,
     the same set in both languages. `01` is shown in the phone frame. The frame and the
     gallery are 9:16 and crop anything taller, so use 540×960 (9:16); 480×960 loses the top and bottom.
2. **`_data/games.yml`**: append an entry (copy the `cuppa` entry). Fields:
   `slug`, `name`, optional `nav_name` (short header label for long names), `tagline`, `summary`, `status`, `chips` (all `{ tr, en }`), `color` (the game's
   accent from its icon/logo: header dot, card glow, buttons), `glow` (same color at ~.3 alpha),
   optional `theme` (`glow`, `bg`, `surface`, `surface_2`, `text`, `muted`, `button_text` for a
   light accent), optional `card_bg`, `icon`, and `logo: { tr, en }`.
   The hero icons sit in list order, three per row with the last row centred on desktop
   (3 + 2 for five games) and in one row on small screens; check on desktop and on a
   375 px wide screen.
3. **`Store/<slug>/index.md`**: front matter only, `layout: game`, `game: <slug>`, `title`,
   `description`, then `lead`, `chips`, `features_title`, `features` (6 items: `title`, `text`),
   `shots`, `genre`, optional `age`, `internet`, `data_note`, `quote`, and `app_store` /
   `google_play` URLs once the game is live (they replace the "coming soon" button).
   Copy `Store/cuppa/index.md`.
4. **`Store/<slug>/privacy.md` and `support.md`**: copy CUPPA's, set `game: <slug>` and `back`,
   and rewrite the text for this game in both languages: what is stored on the device, whether
   there are ads, analytics, purchases, accounts or network use. The privacy page is the URL
   given to App Store / Google Play, so it must match what the game really does.
5. **Check before pushing**: `jekyll build -d /tmp/site-build`, serve it, and look at the
   home page (header link, card, hero icon), the game page, TR and EN, desktop and mobile.
   Locally, pages without `layout:` (privacy/support) render unstyled; GitHub Pages applies
   the default layout to them.
6. Commit and push to `main`, then open the live pages and confirm they load
   (`/Store/<slug>/`, `/Store/<slug>/privacy.html`, `/Store/<slug>/support.html`).

## Older pages

GhostShift, Lost & Found Office and Alchemist's Shop have hand-written `index.html` pages
and their own `.theme-ghost` / `.theme-lost` CSS. They still read their card, header link and
hero icon from `_data/games.yml`. New games use `layout: game`.

## Caching

GitHub Pages sends `max-age=600` and that can't be changed, so `sw.js` (a service worker,
registered in `_layouts/default.html`) keeps `/assets/img/` and `/assets/fonts/` in the browser:
a cached file is shown at once and refreshed in the background. A replaced image therefore
shows on the visit after it is published. Bump `CACHE` in `sw.js` to drop every cached file.
