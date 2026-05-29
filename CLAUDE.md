# drivenby.coffee — Claude Code Publish Workflow

This is a static photography portfolio site for GitHub Pages.
All gallery data lives in `_data/galleries.json`.
Photos live in `galleries/<gallery-id>/`.

---

## Publishing a new gallery

### Step 1: Drop photos into the inbox
Export your photos from Apple Photos into:
```
_inbox/
```
Name them however you like. Claude will rename them to slugs.

### Step 2: Start Claude Code and say:
> "Publish the photos in _inbox as a new gallery"

Claude will then:
1. Read all images in `_inbox/`
2. Display each one and ask:
   - What is the title of this gallery?
   - What year is it from?
   - Should any photos be excluded?
   - What caption (if any) goes with each photo?
   - Which photo should be the cover?
   - Any description for the gallery page?
3. Create the gallery folder at `galleries/<slug>/`
4. Copy and rename images into it
5. Add the gallery entry to `_data/galleries.json`
6. Clear `_inbox/`
7. Commit and push to GitHub

### Step 3: Done.
GitHub Pages rebuilds automatically. The site is live.

---

## File structure

```
_data/
  galleries.json          ← single source of truth for all galleries
_inbox/                   ← drop new photos here before running publish
galleries/
  <gallery-id>/
    cover.jpg             ← used on the homepage grid
    photo-1.jpg
    photo-2.jpg
    ...
css/
  style.css
js/
  main.js
index.html                ← homepage
work.html                 ← full gallery list
gallery.html              ← dynamic gallery page (reads ?id= from URL)
contact.html
```

---

## Adding to an existing gallery

> "Add the photos in _inbox to the [gallery name] gallery"

Claude will look up the gallery by name, ask about captions and cover preference, and append the new photos.

---

## Editing a gallery

> "Rename the caption on [photo] in [gallery] to [new caption]"
> "Remove [photo] from [gallery]"
> "Change the cover of [gallery] to [photo]"

These are direct edits to `_data/galleries.json`.

---

## galleries.json schema

```json
{
  "site": {
    "title": "Nabil Alanbar",
    "tagline": "Driven by Coffee",
    "contact_email": "your@email.com"
  },
  "galleries": [
    {
      "id": "gallery-slug",
      "title": "Gallery Title",
      "year": 2025,
      "cover": "galleries/gallery-slug/cover.jpg",
      "description": "Optional one-liner shown on the gallery page.",
      "photos": [
        { "file": "galleries/gallery-slug/photo-1.jpg", "caption": "Optional caption" }
      ]
    }
  ]
}
```

Galleries render on the homepage in the order they appear in the array.
To reorder, just move entries around.

---

## Notes

- The site requires no build step. It's plain HTML/CSS/JS.
- GitHub Pages serves it directly from the repo root (or /docs if configured that way).
- `fetch('_data/galleries.json')` works on GitHub Pages but NOT when opening HTML files locally via `file://`. Use `npx serve .` or `python3 -m http.server` for local preview.
