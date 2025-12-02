# mwaOS v2

Changes in v2:
- **Fix:** Window close/min/max buttons now work reliably and no longer trigger dragging.
- **New:** Desktop game icons with images — **Climb.exe** (vertical climber) and **Battle.exe** (simple turn-based battle).
- **Removed from Start:** Minesweeper entry (you can re-add later if you want).

## Quick start
```bash
npm install
npm run dev          # Vite dev server
# production
npm run build
npm run serve        # Express serves ./dist at http://localhost:3000
```

## Content
- Edit `public/content/about.json` (AboutMe.exe)
- Edit `public/content/items.json` (folder entries). For hardware items you can provide:
  - `components`: array of `{ id, label, type('IC'|'R'|'C'|'L'|'D'), pos:[x,y,z], color:number }`
  - `connections`: array of `[fromId, toId]`

Software entries can provide a `graph` with `nodes` + `edges` for the topology view.
