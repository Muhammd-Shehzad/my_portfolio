#!/usr/bin/env python3
"""
Downloads every image of the portfolio into assets/images/.

Usage:
    python fetch_assets.py path/to/your-original-portfolio.html

It reads the image URLs from your ORIGINAL single-file HTML (matching them by
their alt text) and saves them under the file names used by index.html.
"""
import re, sys, pathlib, urllib.request

ALT_TO_FILE = {
    "Muhammad Shehzad - Flutter & Mobile App Developer": "profile.jpg",
    "Iqra 360 App Screens": "iqra360.png",
    "Zaheen LMS Screen Mockups": "zaheen.png",
    "Imagify AI Wallpaper Generator": "imagify.png",
    "Looks Lab Fitness and Grooming App": "lookslab.png",
    "SportFinding Application Screen Previews": "sportfinding.png",
    "Aldaalah Islamic App Screens": "aldaalah.png",
    "Petalo Pet Adoption App": "petalo.png",
    "AquaHome Aquarium Mobile Store": "aquahome.png",
    "Android": "icons/android.png",
    "Apple iOS": "icons/ios.png",
    "Figma": "icons/figma.png",
    "Firebase": "icons/firebase.png",
    "Cursor": "icons/cursor.png",
    "Fits Digital Logo": "logos/fitsdigital.png",
    "NexVolt Solution Logo": "logos/nexvolt.png",
    "Encoder Bytes Logo": "logos/encoderbytes.png",
    "Bano Qabil Logo": "certs/banoqabil.png",
    "NAVTTC Logo": "certs/navttc.png",
    "Saylani SMIT Logo": "certs/saylani.png",
    "PSEB Tech Destination Pakistan Logo": "certs/pseb.png",
}

src = pathlib.Path(sys.argv[1]).read_text(encoding="utf-8").replace("&amp;", "&")
out = pathlib.Path(__file__).parent / "assets" / "images"
imgs = re.findall(r"<img\b[^>]*>", src)
found = {}
for tag in imgs:
    alt = re.search(r'alt="([^"]*)"', tag)
    url = re.search(r'src="(https?://[^"]+)"', tag)
    if alt and url and alt.group(1) in ALT_TO_FILE:
        found.setdefault(alt.group(1), url.group(1))

for alt, name in ALT_TO_FILE.items():
    url = found.get(alt)
    if not url:
        print(f"MISSING in HTML: {alt}"); continue
    dest = out / name
    dest.parent.mkdir(parents=True, exist_ok=True)
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        dest.write_bytes(urllib.request.urlopen(req, timeout=30).read())
        print("saved", dest.relative_to(out.parent.parent))
    except Exception as e:
        print("FAILED", name, e)
