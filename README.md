# QR Code Generator

A modern, feature-rich QR Code Generator web application built with vanilla JavaScript and Vite.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=flat&logo=vite&logoColor=white)

## Features

- **Single QR Code Generation** - Create QR codes with customizable settings
- **Batch Processing** - Generate up to 100 QR codes at once with ZIP download
- **Logo Overlay** - Add your logo to QR codes (auto-adjusts for best scanability)
- **Generation History** - Automatically saves last 50 generated QR codes to localStorage
- **Internationalization** - Supports English and Chinese
- **Responsive Design** - Works on desktop and mobile devices

## Tech Stack

- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [qrcode](https://github.com/soldair/node-qrcode) - QR code generation library
- [JSZip](https://stuk.github.io/jszip/) + [FileSaver.js](https://github.com/eligrey/FileSaver.js/) - Batch download support

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd qrcode-generator-revamp

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Usage

1. **Single Mode**: Enter text/URL, customize colors and size, then download
2. **Batch Mode**: Enter multiple lines of text (one per QR code), generate all at once
3. **Add Logo**: Upload an image to overlay on your QR code (uses high error correction automatically)
4. **History**: Previously generated QR codes are saved locally for quick access

## Deployment

This project is configured for **GitHub Pages** deployment via GitHub Actions:

1. Push to `main` or `master` branch
2. GitHub Actions will automatically build and deploy
3. Enable GitHub Pages in repository settings (Settings → Pages → Source: GitHub Actions)

## Project Structure

```
├── src/
│   ├── main.js              # Entry point
│   ├── qr-generator.js      # Single QR generation
│   ├── batch-generator.js   # Batch processing
│   ├── logo-overlay.js      # Logo overlay logic
│   ├── history-manager.js   # localStorage persistence
│   ├── i18n/                # Translations (en/zh)
│   ├── ui/                  # UI components & controller
│   └── utils/               # Helper functions
├── .github/workflows/       # GitHub Actions
├── index.html
├── package.json
└── README.md
```

## License

MIT
