# KERNL — site + pitch deck

Static, dependency-free site for **KERNL** (clean-label snack chips for Gen Z) plus a matching investor pitch deck. Ships as plain HTML/CSS/JS — no build step.

## Structure

```
kernl/
├── index.html          # Homepage
├── styles.css
├── app.js
├── slides/
│   ├── index.html      # Pitch deck (14 slides)
│   ├── slides.css
│   └── slides.js
└── README.md
```

## Run locally

Just open `index.html` in a browser, or serve the folder:

```bash
# Python 3
python -m http.server 8080

# Node (with npx)
npx serve .
```

Then visit `http://localhost:8080` for the site, `/slides/` for the deck.

## Deploy to GitHub Pages

### Option A — `username.github.io` repo (root site)

1. Create a repo named `<your-username>.github.io` on GitHub.
2. From this folder:
   ```bash
   git init -b main
   git add .
   git commit -m "Launch KERNL site"
   git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
   git push -u origin main
   ```
3. Site is live at `https://<your-username>.github.io` within a minute.

### Option B — Project repo (e.g. `kernl-site`)

1. Create a public repo on GitHub (any name).
2. Push as above with that repo URL.
3. In the repo on GitHub: **Settings → Pages → Source: Deploy from branch → Branch: `main` / `(root)`**.
4. Site lives at `https://<your-username>.github.io/<repo-name>/`.

## Deck navigation

- `→` / `Space` / click — next slide
- `←` — previous
- `Home` / `End` — first / last
- Swipe on touch devices
- `#s7` in the URL deep-links to slide 7
- `Cmd/Ctrl + P` exports a PDF (print stylesheet handles per-slide pages)

## Customizing the brand

Most copy lives in `index.html` and `slides/index.html`. The full color palette is in CSS custom properties at the top of both `styles.css` and `slides/slides.css`:

```css
--moss: #1F3A2A;   /* primary */
--lime: #C6E94D;   /* accent */
--coral: #E8845E;  /* warm accent */
--cream-light: #FFF6E5; /* background */
```

Search-replace `KERNL` if you change the brand name.

## Tech notes

- Google Fonts: Archivo Black, Inter, Caveat
- No frameworks, no build step, no JS dependencies
- Reduced-motion + print stylesheets included
- Mobile-first, semantic HTML, ARIA labels on nav/controls
