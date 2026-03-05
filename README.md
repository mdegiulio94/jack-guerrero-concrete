# Jack Guerrero Concrete Website

Fast, mobile-first marketing website for **Jack Guerrero Concrete** built with plain HTML, CSS, and vanilla JavaScript.

## File Structure

```text
.
+-- index.html
+-- services.html
+-- gallery.html
+-- contact.html
+-- robots.txt
+-- sitemap.xml
+-- README.md
+-- assets
    +-- css
    ¦   +-- styles.css
    +-- js
    ¦   +-- main.js
    +-- images
        +-- og-image.svg
        +-- gallery
            +-- project-01.svg
            +-- project-02.svg
            +-- project-03.svg
            +-- project-04.svg
            +-- project-05.svg
            +-- project-06.svg
```

## Features Included

- Mobile-first layout and fast static pages
- Sticky header + hamburger nav on small screens
- Request a Quote buttons anchored to contact form (`#quote-form`)
- Home page sections: hero, services, process, why us, testimonials placeholder, CTA
- Services page with residential/commercial lists and FAQs
- Gallery page with placeholder grid and captions (easy swap later)
- Contact page with accessible quote form and client-side validation
- Reusable Welcome + Mission + Scheduling section (`#welcome-mission-scheduling`)
- Local SEO copy for Pocatello / Southeast Idaho
- SEO baseline: semantic headings, meta descriptions, OpenGraph tags, `sitemap.xml`, `robots.txt`

## Run Locally

You can use any static server. Two common options:

### Option 1: Python

```bash
python -m http.server 8000
```

Open: `http://localhost:8000`

### Option 2: Node (serve)

```bash
npx serve .
```

Open the URL shown in terminal.

## Deploy to GitHub Pages

1. Create a GitHub repository (example: `jack-guerrero-concrete`).
2. Push this folder to the repository root.
3. In GitHub: `Settings` -> `Pages`.
4. Under `Build and deployment`:
   - `Source`: `Deploy from a branch`
   - `Branch`: `main` (or your default branch), folder `/ (root)`
5. Save and wait for Pages to publish.
6. Update URLs in:
   - `index.html`, `services.html`, `gallery.html`, `contact.html` (`og:url`, `og:image`)
   - `robots.txt` sitemap URL
   - `sitemap.xml` `<loc>` entries

## Swapping Gallery Images Later

Replace files in `assets/images/gallery/` while keeping filenames:

- `project-01.svg` ... `project-06.svg`

You can also switch to `.jpg`/`.png`, then update `gallery.html` image `src` paths.
