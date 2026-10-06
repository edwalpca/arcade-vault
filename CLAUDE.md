# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

Arcade Vault is a retro arcade game portal where users play browser games and compete for high scores. The repo is currently a fresh `create-next-app` scaffold (Next.js 16 App Router, React 19, Tailwind CSS v4, TypeScript strict). The real app has not been built yet.

Work follows **Spec Driven Design** using the `/spec` and `/spec-impl` skills from [Klerith/fernando-skills](https://github.com/Klerith/fernando-skills) (`npx skills@latest add Klerith/fernando-skills`).



No test runner is configured yet. Imports use the `@/*` alias, which maps to the repo root (there is no `src/`).

## Next.js version caveat

Next.js 16.3 differs from older versions (e.g. the root layout uses the global `LayoutProps<"/">` type helper). Before writing Next.js code, check the bundled docs in `node_modules/next/dist/docs/` (`01-app/` covers the App Router) instead of relying on memory.

## Source of truth for the product

- `docs/prompt-arcade-vult.md`: the full product spec. It covers the five screens (Biblioteca, game detail, game player, auth, Salón de la Fama), the visual direction, interactions, and technical notes.
- `references/templates/`: a working static prototype (`Arcade Vault.html` loads React 18 UMD and Babel standalone, plus one `.jsx` file per screen and `styles.css`). Use it as the visual and behavioral reference when porting screens to Next.js. It is not code to import directly. Key points:
  - `data.jsx` holds the mock game catalog (`GAMES`: id, title, short/long description, category, cover class, color, best score, plays) and the leaderboards.
  - `app.jsx` routes with a JSON-encoded `location.hash` (`biblioteca`, `detalle`, `player`, `auth`, `salon`). In Next.js these should become real App Router routes.
  - Guest state lives in `localStorage` under the `av_user` and `av_scores` keys.
  - `reproductor.jsx` is a mock player: the score increments on a timer, and no real game is loaded. The HUD (score, lives, level, pause, end, save score) is the part to port. The iframe/canvas game loading still has to be built.
  - `styles.css` defines the design tokens (CSS variables such as `--line`, `--ink-faint`, `--mono`) and the `av-*` classes (`av-bg` grid, `av-noise` scanlines, etc.).

## Product constraints (from the spec)

- **All user-facing text must be in Spanish** (labels, buttons, messages, placeholders, game descriptions). Set `<html lang="es">`. The scaffold's `app/layout.tsx` still uses `lang="en"`.
- Visual theme: background `#0a0a0f`, neon cyan `#00f5ff`, magenta `#ff006e`, and yellow `#f5ff00`, with a scanline overlay, an animated perspective grid, and CRT glow. Fonts are "Press Start 2P" (display) and "Courier Prime" (body). Load them with `next/font/google`, replacing the scaffold's Geist fonts.
- Games run inside a sandboxed iframe or canvas container that can load external HTML game files.
- Guest scores go to `localStorage`. Mark clearly where a real backend (REST or Supabase) would plug in for authenticated users.
- The layout must be fully responsive, with a hamburger slide-in nav on mobile.
