# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A QR Code Generator web application built with vanilla JavaScript and Vite. Features single QR generation, batch processing, logo overlay, generation history, and internationalization (English/Chinese).

## Development Commands

```bash
# Start development server
npm run dev

# Build for production (outputs to dist/)
npm run build

# Preview production build locally
npm run preview
```

## Architecture

### Module Structure

The codebase follows a modular ES6 class-based architecture:

- **main.js** - Entry point, initializes UIController with i18n
- **ui/index.js** - UIController class: orchestrates the UI, handles user interactions, and coordinates between modules
- **qr-generator.js** - QRGenerator class: wraps the `qrcode` library for single QR generation
- **batch-generator.js** - BatchGenerator class: handles bulk QR generation with ZIP download support
- **logo-overlay.js** - LogoOverlay class: applies logo images to QR codes via canvas manipulation
- **history-manager.js** - HistoryManager class: persists generated QR codes to localStorage
- **i18n/index.js** - Translation strings and language switching logic (en/zh)
- **ui/components.js** - UI helper functions (icons, buttons)
- **utils/helpers.js** - General utility functions (debounce, truncate, download)

### Key Dependencies

- `qrcode` - QR code generation library
- `jszip` + `file-saver` - Batch download as ZIP
- `vite` - Build tool (no custom config, uses defaults)

### State Flow

1. User input → UIController event handlers
2. UIController delegates to QRGenerator/BatchGenerator/LogoOverlay
3. Results rendered to preview panel
4. HistoryManager persists to localStorage

### Constraints

- Batch generation limited to 100 items
- History capped at 50 items (stored in localStorage)
- Logo size capped at 30% of QR code (enforced in LogoOverlay)
- High error correction ('H') required when using logos
