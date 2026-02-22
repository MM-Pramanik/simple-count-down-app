# Counter App

A lightweight countdown timer built with React, Vite, and Tailwind CSS.
It supports custom minute templates, pause/resume, reset, and local persistence so timer state survives page reloads.

## Features

- Countdown timer display in `mm:ss` format
- Start, pause, resume, and reset controls
- Main minutes input (`> 0` only)
- Custom minute template creation
- Quick-select template cards
- Template deletion
- Persistent app state in `localStorage` (including running timer recovery after refresh)

## Tech Stack

- React 19
- Vite 7
- Tailwind CSS 4

## Prerequisites

- Node.js `^20.19.0` or `>=22.12.0`
- npm (comes with Node.js)

## Getting Started

1. Clone the repository:

```bash
git clone <your-repo-url>
cd counter-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open the local URL printed in the terminal (typically `http://localhost:5173`).

## Available Scripts

- `npm run dev`: Start Vite dev server
- `npm run build`: Create production build in `dist/`
- `npm run preview`: Serve the production build locally

## Project Structure

```text
counter-app/
  public/
  src/
    app/
      Counter.jsx
    components/
      CounterComps/
        ActionBtn.jsx
        CardTemplate.jsx
        CustomTemplate.jsx
        InputComponent.jsx
        TemplateContainer.jsx
    App.jsx
    index.css
    main.jsx
  index.html
  package.json
  vite.config.js
```

## How the Timer Works

- Timer state is managed in `src/app/Counter.jsx`.
- `totalSecs` stores the current countdown seconds.
- `isRunning` controls whether the interval is active.
- When running, the app saves an `endAt` timestamp to recalculate remaining seconds accurately after refresh.
- Clicking a template sets the active countdown minutes and pauses the timer until started.

## Persistence Details

State is saved in browser `localStorage` using:

- `countdown-state-v1`: Full timer UI state
- `countdown-custom-templates-v1`: Custom template minute values

If storage is unavailable or invalid, the app falls back safely to defaults.

## Development Notes

- Styling uses Tailwind CSS via `@tailwindcss/vite`.
- Global CSS entry is `src/index.css` with:

```css
@import "tailwindcss";
```

- There are currently no automated tests configured in this repository.

## License

No license file is currently included.
If you plan to publish this repository publicly, add a license (for example, MIT) to clarify usage rights.
