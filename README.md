# Resident Evil Memory

A browser memory game. Click every Resident Evil character once. Click the same card twice and the round ends.

Portraits come from [Giphy](https://developers.giphy.com/). If a GIF cannot be loaded, the card uses a local still from `src/images`.

## Play

- Click a character you have not picked yet to score a point.
- The board shuffles after every successful pick.
- Repeat a card and the round is over.
- Clear all 20 characters to win.
- Best score is kept until you refresh the page.

## Stack

- [React](https://react.dev/) 19
- [Vite](https://vite.dev/) 8
- [Tailwind CSS](https://tailwindcss.com/) 4

## Setup

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## Giphy key

Searches are `{character name} resident evil`. The phrase is not shown on the card.

To use your own key, create a `.env.local` file:

```bash
VITE_GIPHY_API_KEY=your_key_here
```

Get a key from the [Giphy developers site](https://developers.giphy.com/).

## Fallback stills

When Giphy is rate-limited or a GIF URL fails, the card looks in `src/images` for a matching file:

- first name (`leon kennedy` → `leon.jpg`)
- hyphenated full name (`william birkin` → `william-birkin.png`)
- aliases (`mr x` → `x.jpg`, `lady dimitrescu` → `lady.jpg`)

`.jpg`, `.jpeg`, and `.png` are all accepted.
