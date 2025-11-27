# Futuristic Mac Desktop

A slick, Mac-inspired desktop simulation built with React + Vite and wrapped in Electron for a desktop experience. It ships with animated widgets, draggable glassmorphism windows, a dock, menubar clock, notifications, and a Notes app demo.

## Features

- Animated desktop with floating orbs and glassmorphism windows
- Dock to launch built-in apps (Notes, Settings placeholder, etc.)
- Draggable/resizable windows with focus stacking and close controls
- Clock and Weather widgets (mock data) with edit/drag mode
- Notification system with toast-style messages
- Keyboard shortcuts (e.g., `⌘/Ctrl + T` for Terminal, `⌘/Ctrl + F` for Finder, `⌘/Ctrl + ,` for Settings placeholder)

## Prerequisites

- Node.js 18+ and npm

## Install

```bash
npm install
```

## Run (web)

Dev server with HMR:

```bash
npm run dev
```

Then open the printed localhost URL (Vite defaults to `http://localhost:5173`).

## Run (Electron desktop)

Development build + Electron shell:

```bash
npm run electron:dev
```

Production-style build + Electron:

```bash
npm run electron
```

## Build

- Web bundle only: `npm run build:web`
- Electron bundle (used by desktop runs): `npm run build`

## Package/Distribute

Electron Builder targets are configured for macOS, Windows, and Linux AppImage. These commands produce installers in `release/`:

- macOS: `npm run dist:mac`
- Windows: `npm run dist:win`
- Linux: `npm run dist:linux`
- All platforms from current OS: `npm run dist`

## Lint

```bash
npm run lint
```

## Project Structure

- `src/` – React app (desktop UI, widgets, dock, notifications, Notes demo)
- `electron.cjs` – Electron main process entry
- `dist/` – Built frontend assets
- `release/` – Electron Builder output
- `fix-paths.js` – Adjusts asset paths post-build for Electron

## Notes & Tips

- Weather widget uses mock data; swap in a real API as needed.
- Windows are draggable; a long-press on widgets toggles edit/drag mode.
- Keyboard shortcuts are handled globally; adjust in `src/App.jsx` if you change app IDs.
