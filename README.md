# Bouée Calibre 1 — Revised Website

## Opening the site

For reliable exploded-view video scrubbing, run the folder through a local web server rather than opening `index.html` directly.

From the website folder, run:

```bash
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Included media

- `assets/hero.jpg` — hero background
- `assets/calendar-time-display-placeholder.jpg` — filler image for Calendar and Time Display
- `assets/surface-treatment-placeholder.jpg` — filler image for Surface Treatment and Structure
- `assets/tourbillon.jpg` — flying-tourbillon section
- `assets/calendar.jpg` — perpetual-calendar section
- `assets/back.jpg` — rear construction and Specifications backgrounds
- `assets/exploded-view.mp4` — scroll- and slider-controlled exploded view

The two filler images can be replaced later while keeping the same filenames, so no HTML changes will be required.


## Revision 3 changes

- The exploded-view section now appears immediately after the Overview section.
- The exploded-view section is titled **The Calibre** and uses the `#calibre` anchor.
- Navigation and footer links now use **The Calibre**.
- Decorative top and bottom borders were removed from the Calendar and Time Display layout.
- Boxed grid borders were removed from the rear-side construction labels, and the finishing list outer rule was removed.

## Revision 4 — finishing carousel

The **Surface treatment and structure** section is now a five-image carousel. It includes:

- `assets/glashutte-ribbing.png`
- `assets/perlage.png`
- `assets/blued-screw.jpg`
- `assets/polished-bevel.png`
- `assets/surface-transition.png`

Each slide has its own synchronized caption. Visitors can use the previous/next controls, the position markers, keyboard arrow keys, or a horizontal swipe on touch devices.


## Revision 5

- The finishing carousel now contains four slides.
- The Calibre heading and description are overlaid directly on the exploded-view video.
- The exploded-view section includes a scroll hold before the animation begins and after it reaches the fully exploded frame.


## Revision 6

- Moved the Calibre heading and description outside the portrait video frame.
- Positioned the text independently to the left while allowing it to overlap the video.
- Added a soft left-side gradient behind the copy without creating a visible box.
- Preserved the existing scroll buffer, video scrubbing, and slider control.


## Revision 7

The Calibre heading and description now remain inside the standard page shell. On wide screens they occupy the left grid column and overlap the portrait video with a contained gradient. On narrower windows they return to normal document flow above the video so no text is clipped by the viewport.

## Revision 8

- Centered the Overview composition within a narrower 1180 px content area.
- Vertically aligned the two desktop columns.
- Preserved responsive stacking on narrower screens.
- Updated the Overview copy to the approved restrained wording.

## Revision 9

- Rebuilt the overview as a centered editorial composition with a stronger visual hierarchy.
- Added restrained anodized-blue accents to navigation underlines, headings, the progress indicator, carousel controls, range inputs, and form focus states.
- Removed enclosing borders from primary media frames and controls; blue is used only through lines, dots, underlines, and small details.
