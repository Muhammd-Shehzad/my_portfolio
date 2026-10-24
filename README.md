# Muhammad Shehzad – Portfolio

```
portfolio/
├── index.html              ← markup only
├── css/
│   ├── colors.css          ← ALL brand colors + light/dark glass/shadow variables
│   └── style.css           ← glass, neumorphism, gradient text, cursor
├── js/
│   ├── tailwind-config.js  ← Tailwind theme (reads colors from colors.css)
│   └── main.js             ← theme toggle, typewriter, filters, modal, menu, form
├── assets/images/
│   ├── profile.jpg, iqra360.png, zaheen.png, ... (project screenshots)
│   ├── icons/   (android, ios, figma, firebase, cursor)
│   ├── logos/   (fitsdigital, nexvolt, encoderbytes)
│   └── certs/   (banoqabil, navttc, saylani, pseb)
└── fetch_assets.py         ← downloads the images (see below)
```

## Get the images
```
python fetch_assets.py path/to/your-original-portfolio.html
```
(or just drop your own files into `assets/images/` using the names above).

## Change colors
Edit `css/colors.css` only. Values are RGB channels (e.g. `11 61 145`) so Tailwind classes
like `bg-brand-blue/15` and custom CSS both use the same variables.

## Run
Open `index.html` in a browser (needs internet for Tailwind CDN, Font Awesome, Google Fonts).
