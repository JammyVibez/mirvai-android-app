# MIRVAI — Luxury Real Estate App

**Royal · Refined · Fine & Country inspired**

A premium mobile-first experience for MIRVAI Realty, Development & Investment.  
Designed with the elegance of Fine & Country: deep forest greens, soft gold accents, refined serif typography (Cormorant Garamond), generous spacing and image-led presentation.

## Features (Prototype)

- **Home** — Hero vision, property discovery, ecosystem overview, CTA
- **Properties** — Filterable collection (Houses · Land · Commercial)
- **Developments** — Pipeline / vision for future MIRVAI projects
- **Services** — Construction, Hospitality, Energy, Investment
- **My MIRVAI** — Saved / enquiry history placeholder
- **Enquire** — Demo contact form
- Bottom navigation, search, toast feedback
- PWA-ready (manifest + standalone)

> All listings and forms are **sample / prototype** content. Replace with verified inventory, CRM and backend before production.

## Design Language

| Token        | Value                          |
|--------------|--------------------------------|
| Primary      | Deep forest `#132c25`          |
| Accent       | Soft gold `#c9a86c`            |
| Background   | Warm cream `#f7f4ee`           |
| Display font | Cormorant Garamond             |
| Body font    | Outfit                         |
| Feel         | Quiet luxury, editorial pacing |

Inspired by the visual language of [Fine & Country](https://www.fineandcountry.com/).

## Run locally

```bash
# Simple static server
npx serve .
# or
python3 -m http.server 8080
```

Open `http://localhost:8080` on a phone or Chrome DevTools device mode.

## Turn into a native Android app

### Option A — Capacitor (recommended)

```bash
npm init -y
npm install @capacitor/core @capacitor/cli @capacitor/android
npx cap init MIRVAI com.mirvai.app --web-dir .
npx cap add android
npx cap sync
npx cap open android
```

Then build a signed APK/AAB in Android Studio.

### Option B — Trusted Web Activity (TWA)

Use [Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap) or Android Studio Asset Studio + Digital Asset Links to wrap this PWA as a TWA.

### Option C — WebView shell

A minimal Android project is sketched in `/android-wrapper`. Open in Android Studio, point the WebView at your hosted URL or load local assets.

## Project structure

```
mirvai_app/
├── index.html          # App shell & views
├── css/styles.css      # Luxury design system
├── js/app.js           # Navigation, filters, sample data
├── manifest.json       # PWA
├── assets/             # Icons (add icon-192.png & icon-512.png)
└── README.md
```

## Next steps for production

1. Replace sample properties with live API / CMS
2. Connect enquiry form to email / CRM / WhatsApp Business
3. Add authentication for “My MIRVAI”
4. High-quality photography of real inventory
5. Analytics & conversion tracking
6. Publish to Google Play

---

**MIRVAI** — Find. Own. Grow.  
Lagos · Nigeria · Diaspora
