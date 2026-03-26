# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SFL Thunder (thundernation.org) - website for a 501(c)(3) youth select travel baseball & softball organization based in North Palm Beach, FL. Powered by the Miami Marlins.

## Architecture

Static HTML site with no build step. Each page is a self-contained `.html` file with inline `<style>` and `<script>` blocks - no shared CSS/JS files. When making sitewide changes (nav, footer, colors, etc.), every `.html` file must be updated independently.

### Pages
- `index.html` - Homepage (hero, about preview, teams preview, Marlins partnership, values, interest forms CTA)
- `about.html` - Mission, timeline, values, coaches, Marlins partnership
- `teams.html` - Full team roster by age group (7U-13U baseball + softball)
- `contact.html` - Contact form + FAQ accordion
- `newsletter.html` - Newsletter subscribe form + archive of past editions
- `schedule.html` - Season events, calendar, practice info (removed from nav but page still exists)

### Planned pages (not yet built)
- `/player-interest` - Player interest form
- `/team-interest` - Team interest form
- `/directory` - Organization directory
- `/uniforms` - Uniform packages
- `/blog` - Blog

## Local Development

```bash
npx serve /Users/desane/Desktop/thunder-nation -l 3456
```

Or use the `.claude/launch.json` config with preview tools (server name: `thunder-nation`, port 3456).

## Deployment

- **Hosting**: Vercel (auto-deploys on push to `main`)
- **Live URL**: https://thunder-nation.vercel.app
- **Target domain**: thundernation.org
- **GitHub**: https://github.com/jdesane/thunder-nation
- `vercel.json` enables clean URLs (no `.html` extensions) and no trailing slashes

## Design System

- **Brand color (gold)**: `#FFB612` (Pantone PMS 1235 C, RGB 255/182/18)
- **Gold highlight**: `#FFD24D`
- **CSS variables**: Defined in `:root` block at top of each page (`--gold`, `--gold-hi`, `--gold-dim`, `--gold-br`, `--bg`, `--surface`, `--border`, etc.)
- **Fonts**: Bebas Neue (headings), DM Sans (body), DM Mono (labels/nav)
- **Dark theme**: Near-black backgrounds (`#0a0a0a`, `#111111`)
- **Scroll reveal**: Elements with class `.reveal` animate in via IntersectionObserver

## Navigation Structure

```
Home
About ▾ → Our Story, Directory
Join Thunder ▾ → Team Interest Form, Player Interest Form
Uniform Packages
Newsletter
Blog
```

Nav uses CSS hover dropdowns (`.nav-dropdown` / `.dropdown-menu`). Mobile uses a hamburger menu with flat link list.

## Key Context

- SFL Thunder is a **select travel team** - players try out when there are openings. Never use "join" or "register" language implying open enrollment.
- The organization name is **SFL Thunder** (nav/footer) / **South Florida Thunder** (full name). The community is called **Thunder Nation**.
- Partnership with the **Miami Marlins** is a real, active relationship.
- Images in `/images/` - some files (`thunder-bolt.png`, `thunder-wordmark.png`) are corrupted HTML files, not actual images. Real images: `sfl-thunder-logo.png`, `thunder-black.png`, `mascot-*.png`, `*.jpg`.
