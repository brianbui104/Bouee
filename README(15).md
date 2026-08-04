# Bouée Calibre 1 Website

A static product website for **Bouée Calibre 1**, an independently developed hand-wound movement combining a flying tourbillon with a perpetual calendar.

The site is built with plain HTML, CSS, and JavaScript. It does not require Node.js, npm, a framework, or a build step.

---

## Project structure

Place the files in this structure:

```text
bouee-calibre-1-site/
├── index.html
├── styles.css
├── script.js
├── README.md
└── assets/
    ├── bouee-logo.png
    ├── hero.jpg
    ├── calibre-front.jpg
    ├── exploded-view.mp4
    ├── calendar-time-display-placeholder.jpg
    ├── tourbillon.jpg
    ├── calendar.jpg
    ├── back.jpg
    ├── glashutte-ribbing.png
    ├── perlage.png
    ├── blued-screw.jpg
    └── polished-bevel.png
```

The filenames are referenced directly by `index.html`. If an asset is renamed, its corresponding `src` path in `index.html` must also be updated.

---

## Quick start

### Option 1: VS Code Live Server

1. Open the project folder in Visual Studio Code.
2. Install the **Live Server** extension.
3. Right-click `index.html`.
4. Select **Open with Live Server**.

### Option 2: Python local server

Open a terminal inside the project folder and run:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

Use a local server rather than opening `index.html` directly from File Explorer. Browser-controlled video seeking is more reliable over HTTP.

---

## Main website sections

The page currently includes:

- Full-screen hero section
- Movement overview
- Scroll- and slider-controlled exploded-view sequence
- Calendar and time indication section
- Flying tourbillon section
- Perpetual calendar section
- Rear movement architecture section
- Surface finishing carousel
- Technical specifications
- Private enquiry form

Navigation links scroll to the corresponding section IDs in `index.html`.

---

## Logo

The Bouée logo is stored at:

```text
assets/bouee-logo.png
```

It is used in both the fixed header and footer.

The current header logo sizing and spacing are controlled by the `.brand-logo-image` and `.site-header` rules near the top of `index.html`. The remaining website styling is loaded from `styles.css`.

For best results, keep the logo as a transparent PNG and avoid adding a white or checkerboard background.

---

## Replacing images

To replace a render without editing the layout:

1. Export the replacement image using the same filename.
2. Place it in the `assets` folder.
3. Overwrite the existing file.
4. Refresh the page using `Ctrl + F5` to bypass the browser cache.

Recommended formats:

- `JPG` for full-screen photographic renders
- `PNG` for transparent assets and detailed finishing images
- `WebP` for smaller web files, provided the path in `index.html` is updated

Do not change the image aspect ratio unless the section has been checked at desktop, tablet, and mobile widths.

---

## Exploded-view video

The exploded sequence is loaded from:

```text
assets/exploded-view.mp4
```

It is controlled by both page scrolling and the range slider.

For smooth seeking, the MP4 should have:

- H.264 video encoding
- Frequent keyframes, ideally every 0.2–0.5 seconds
- No camera cuts
- A linear sequence from assembled to fully exploded
- `faststart` metadata enabled
- No audio track unless specifically required

A suitable FFmpeg export command is:

```bash
ffmpeg -i source.mp4 \
  -c:v libx264 \
  -pix_fmt yuv420p \
  -crf 20 \
  -preset slow \
  -g 12 \
  -keyint_min 12 \
  -sc_threshold 0 \
  -movflags +faststart \
  -an \
  assets/exploded-view.mp4
```

If the video does not respond to scrolling or the slider:

1. Confirm the filename is exactly `exploded-view.mp4`.
2. Confirm the file is inside `assets`.
3. Run the site through a local server.
4. Open the browser console and check for file-loading errors.
5. Re-export the video with more frequent keyframes.

---

## Surface finishing carousel

The finishing carousel currently uses four slides:

1. Glashütte ribbing
2. Perlage
3. Heat-blued screw
4. Polished bevel

Each slide consists of:

- One `<figure class="finishing-slide">`
- One image
- One slide number
- One heading
- One caption
- One matching navigation dot

When adding or removing a slide, update both the slide markup and the navigation dots. The slide numbering should also be updated manually.

---

## Technical specifications

Specifications are written directly in the `<dl class="specification-list">` block inside `index.html`.

Before publishing, verify all values, especially:

- Frequency
- Power reserve
- Case material
- Case diameter
- Case thickness
- Water resistance
- Production quantity
- Calendar correction interval

The current production statement is:

```text
8 pieces, individually numbered 1/8–8/8
```

---

## Enquiry form

The enquiry form is currently a front-end prototype. It validates fields in the browser but does not send messages unless a backend or form service is connected.

Possible integrations include:

- Formspree
- Netlify Forms
- Basin
- A custom serverless function
- A private CRM endpoint

Before launch:

1. Replace `atelier@example.com` in the footer.
2. Connect the form to a real endpoint.
3. Add a privacy notice.
4. Test validation and submission on mobile.
5. Add spam protection if the form is public.

Never place private API keys directly in `index.html` or `script.js`.

---

## Fonts

The page loads these Google Fonts:

- **DM Sans** for body and interface text
- **Libre Caslon Display** for editorial headings

An internet connection is required for the hosted fonts to load. For fully self-hosted deployment, replace the Google Fonts links with locally licensed webfont files.

---

## Deployment

### GitHub Pages

1. Create or open the GitHub repository.
2. Place `index.html`, `styles.css`, `script.js`, `README.md`, and the `assets` folder in the repository root.
3. Commit and push the files.
4. Open **Settings → Pages**.
5. Set the source to **Deploy from a branch**.
6. Select the main branch and root folder.
7. Save and wait for deployment.

### Custom domain

For a custom domain such as `bouee.ca`:

1. Add the domain in the GitHub Pages settings.
2. Keep the generated `CNAME` file in the repository root.
3. Configure the required DNS records with the domain provider.
4. Wait for DNS propagation.
5. Enable **Enforce HTTPS** once GitHub confirms the domain configuration.

Do not delete the `CNAME` file after deployment.

---

## Performance recommendations

Before production launch:

- Compress full-screen JPG images
- Keep most still images below 1–2 MB
- Use responsive image sizes where practical
- Keep the exploded video as small as possible without visible artefacts
- Test on a slower mobile connection
- Use `loading="lazy"` for images below the fold
- Avoid adding autoplay video outside the main product sequence

---

## Accessibility checklist

- Keep meaningful `alt` text on every product image
- Preserve the skip link and semantic headings
- Ensure all carousel buttons remain keyboard accessible
- Keep visible focus states
- Test the navigation menu with keyboard controls
- Check text contrast over background images
- Respect reduced-motion browser preferences
- Do not communicate technical information through colour alone

---

## Editing workflow

For future changes:

1. Treat `index.html` as the primary page structure and copy file.
2. Use `styles.css` for layout, typography, colour, and responsive changes.
3. Use `script.js` for navigation, carousel, form, and video interactions.
4. Keep all media inside `assets`.
5. Test every change at desktop, tablet, and phone widths.
6. Create a backup before replacing the live site.

Suggested release naming:

```text
v1.0.0  Initial public version
v1.0.1  Copy or styling correction
v1.1.0  New section or interaction
v2.0.0  Major visual or structural redesign
```

---

## Publication checklist

Before making the website public:

- [ ] Confirm every specification
- [ ] Replace all placeholder renders
- [ ] Test exploded-view scrubbing
- [ ] Test carousel controls and swipe behavior
- [ ] Connect the enquiry form
- [ ] Replace the placeholder email address
- [ ] Verify the logo on dark and light backgrounds
- [ ] Test Chrome, Firefox, Safari, and Edge
- [ ] Test desktop and mobile layouts
- [ ] Verify the custom domain and HTTPS
- [ ] Add privacy and legal pages if required
- [ ] Create a backup of the final release

---

## Project status

The website is a working front-end product presentation. Final launch readiness depends on verified technical specifications, completed production media, a functioning enquiry endpoint, and final cross-browser testing.
