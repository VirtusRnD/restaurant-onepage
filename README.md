# restaurant-onepage — "Ember & Oak"

Single scrolling page: Hero → About → Menu → Gallery → Testimonials → Reservations → Footer.
Uses the shared component library with the restaurant theme.

## Run it

```bash
npm install
npm run dev
```

## Before launch

- Real name/address/phone/hours (currently "Ember & Oak")
- Contact email in `src/data/site.js` (the form falls back to it)
- `VITE_FORM_ENDPOINT` in `.env` (copy `.env.example`): any URL that accepts a JSON POST, e.g. Formspree, Netlify Forms or your own API. Without it the form opens the visitor's mail app.
- Menu items/prices in `App.jsx`
- Testimonial quotes
- Real photography

## Tests

```bash
npm test
```

Deep links of the routed version work on Netlify/Cloudflare (`public/_redirects`), Vercel (`vercel.json`) and GitHub Pages (`404.html` copied at build).
