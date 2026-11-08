# Birthday Surprise Website ❤️

A personalized, romantic, interactive birthday surprise site built with **React + Vite**, **Tailwind CSS**, **Framer Motion**, and **Lucide React**.

## Quick start (run locally)

```bash
npm install
npm run dev
```

Then open the local URL shown in your terminal (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
npm run preview   # optional: preview the production build
```

## Personalize everything in one place

Edit **`src/data/birthdayConfig.js`** — this controls all personal details and text:
- Her name, full name, date of birth, age, profile photo
- Intro/hero messages, profile caption, flower message
- Love story timeline (dates, text, images) — add/remove items freely
- Love letter (easy to edit; uses `\n\n` for paragraphs)
- Cake wish message, gallery photos/captions, final surprise text
- Optional music file path/label

**Placeholders only:** the config ships with placeholders. Replace them with your real details (never invented).

## Add your photos & music

Create the asset folders under `public/` and add your files:

```
public/
  assets/
    images/
      profile-placeholder.jpg
      memory-1.jpg ... memory-6.jpg
      gallery-1.jpg ... gallery-6.jpg
    music/
      our-song.mp3        (optional)
```

You can use any filenames — just update the matching paths in `src/data/birthdayConfig.js`. Missing images show a friendly placeholder hint instead of breaking.

## Notes
- **Mobile-first & responsive.** Test on your phone before sharing.
- **Music respects browser autoplay rules:** playback starts only after a tap (the floating Music button or “Play Our Special Moment”).
- **Smooth animations** via Framer Motion + lightweight CSS; tuned to stay smooth on mobile.

## Deploy (Vercel / Netlify)
- Push this folder to a Git repo, import it in Vercel or Netlify.
- Build command: `npm run build`
- Output directory: `dist`

Enjoy the surprise! 💖
