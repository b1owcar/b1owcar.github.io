# b1owcar.github.io

Glassmorphism x dark neon personal site for GitHub Pages.

## Project Structure

```text
.
├── index.html
├── assets
│   ├── css
│   │   └── style.css
│   ├── js
│   │   ├── config.example.js
│   │   ├── footprints.js
│   │   ├── github.config.example.js
│   │   └── main.js
│   ├── icons
│   │   └── favicon.svg
│   ├── images
│   │   ├── avatar-placeholder.svg
│   │   └── logo.svg
│   └── data
│       └── supabase-schema.sql
└── README.md
```

## Features

- Dark blue-black gradient background
- Glassmorphism cards (alpha + blur 20px)
- Cyan/purple neon accents and glow effects
- Fixed top navigation with neon hover
- Responsive for mobile, tablet, desktop
- Fade-in page animation
- Message board with Supabase integration
- localStorage fallback when Supabase config is empty
- My Footprints map section with GitHub Issues API
- Admin mode to create footprint issues from browser

## Use Your Own Logo

Current project includes placeholder file: `assets/images/logo.svg`.

If you already uploaded your own logo, replace that file and keep the same filename,
or update the image path in `index.html`.

## Supabase Setup (Message Board)

### 1) Create table and policies

Open Supabase SQL Editor and run:

`assets/data/supabase-schema.sql`

### 2) Configure frontend keys

Edit `assets/js/config.example.js`:

```js
window.SUPABASE_CONFIG = {
  url: "https://YOUR-PROJECT.supabase.co",
  anonKey: "YOUR_ANON_PUBLIC_KEY",
  table: "messages"
};
```

If `url` and `anonKey` are empty, the message board uses browser localStorage automatically.

## GitHub Issues Setup (My Footprints)

Frontend reads footprint data from GitHub Issues with label `footprint`.

### 1) Configure repository info

Edit `assets/js/github.config.example.js`:

```js
window.FOOTPRINTS_CONFIG = {
  owner: "b1owcar",
  repo: "b1owcar.github.io",
  label: "footprint"
};
```

### 2) Issue data format

Each footprint is one issue:

- Issue title: place name
- Issue labels: `footprint`
- Issue body: JSON

```json
{
  "lat": 22.198745,
  "lng": 113.543873,
  "date": "2026-04-13",
  "description": "My note",
  "image": "https://... or data:image/..."
}
```

### 3) Admin mode and token

- Open **My Footprints** section.
- Expand **Admin Mode**.
- Fill a GitHub Personal Access Token with issue write permission.
- Click map to select coordinates, upload image, fill text, and submit.

Recommended token permission: repository issues write access.

## Deploy to GitHub Pages

For repository `username.github.io`, the simplest way is root deployment from `main`:

1. Push your code to `main`.
2. Open repository settings.
3. Go to **Pages**.
4. Under **Build and deployment**:
   - Source: **Deploy from a branch**
   - Branch: `main`
   - Folder: `/ (root)`
5. Save and wait for deployment.

Your site URL is:

`https://username.github.io`

For this project:

`https://b1owcar.github.io`

## Local Preview

You can directly open `index.html`, or run a simple local server:

```bash
python3 -m http.server 5500
```

Then open:

`http://localhost:5500`