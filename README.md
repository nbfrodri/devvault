# DevVault

<p align="center">
  <img src="public/logo.svg" alt="DevVault Logo" width="80" />
</p>

<p align="center">
  <strong>Your private, local-first React component library.</strong><br/>
  Store, categorize, live-preview, and organize your React building blocks — entirely on your own machine with zero cloud dependency.
</p>

<p align="center">
  <img alt="Built with Tauri" src="https://img.shields.io/badge/Tauri-2.x-blue?logo=tauri&logoColor=white" />
  <img alt="Built with Next.js" src="https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript&logoColor=white" />
  <img alt="License MIT" src="https://img.shields.io/badge/license-MIT-green" />
</p>

---

## What is DevVault?

DevVault solves **"Snippet Scavenging"** — the time lost hunting through old repos, Notion docs, and GitHub gists just to find a component you wrote six months ago. It gives you a sleek, searchable, live-previewing desktop registry for all your React components, running 100% offline.

---

## Features

| Feature                          | Description                                                                                  |
| -------------------------------- | -------------------------------------------------------------------------------------------- |
| 🗂️ **Groups**                    | Organize components into named, color-coded groups with drag-and-drop reordering             |
| 🌐 **Workspaces** (Environments) | Isolate components per project with custom dependency sets                                   |
| 👁️ **Live Preview**              | Sandpack-powered in-app preview that renders your component exactly as it would in a browser |
| ⭐ **Favorites**                 | Star components you use most and filter to favorites instantly                               |
| 🔍 **Fuzzy Search**              | Fuse.js powered search across names, categories, and tags                                    |
| 📋 **One-click Dep Copy**        | Copy the exact `npm install` command for any component's dependencies                        |
| 🏷️ **Tags**                      | Attach custom tags for fine-grained filtering                                                |
| ↕️ **Sort**                      | Sort any group by name (A–Z / Z–A), newest, oldest, or custom drag order                     |
| 📦 **Templates**                 | Bootstrap new components from built-in starter templates                                     |
| ♻️ **Copy / Move**               | Copy or move components between workspaces with full independence                            |
| 🗑️ **Uncategorize**              | Remove any component from its group with a single click                                      |
| 🎨 **Glassmorphic Dark UI**      | Premium dark-mode aesthetic with animated backgrounds                                        |

---

## Tech Stack

| Layer               | Technology                                           |
| ------------------- | ---------------------------------------------------- |
| **Frontend**        | Next.js 16 (App Router), TypeScript, Tailwind CSS v4 |
| **UI Components**   | shadcn/ui, Radix UI, Lucide Icons                    |
| **Desktop Wrapper** | Tauri v2 (Rust)                                      |
| **Preview Engine**  | Sandpack by CodeSandbox                              |
| **Drag & Drop**     | @hello-pangea/dnd                                    |
| **Search**          | Fuse.js                                              |
| **Storage**         | Local JSON via `@tauri-apps/plugin-fs`               |

### How Storage Works

There is **no database**. When you save a component, the React frontend makes an IPC call to the Tauri Rust backend, which writes to JSON files in your OS's application data directory:

- **Windows:** `%APPDATA%\com.devvault.app\`
- **macOS:** `~/Library/Application Support/com.devvault.app/`
- **Linux:** `~/.local/share/com.devvault.app/`

Files stored: `components.json`, `folders.json`, `environments.json`.

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Rust toolchain](https://rustup.rs/) (`rustup`)
- Tauri system dependencies:
  - **Windows:** [Microsoft C++ Build Tools](https://visualstudio.microsoft.com/visual-cpp-build-tools/) + WebView2 (bundled with Windows 11)
  - **macOS:** Xcode Command Line Tools
  - **Linux:** `webkit2gtk`, `libssl-dev`, etc. (see [Tauri docs](https://v2.tauri.app/start/prerequisites/))

### Install & Run

```bash
# 1. Install dependencies
npm install

# 2. Start in development mode (Next.js + Tauri desktop window)
npm run tauri dev
```

### Production Build

Generates the native installer (`.msi` on Windows, `.dmg` on macOS, `.AppImage` / `.deb` on Linux):

```bash
npm run tauri build
```

The compiled installer will be at:

```
src-tauri/target/release/bundle/
```

---

## Project Structure

```
├── src/
│   ├── app/               # Next.js pages (main page, preview page)
│   ├── components/        # UI components (ComponentCard, modals, Header…)
│   └── lib/               # API (storage read/write), seed data, helpers
├── src-tauri/             # Rust / Tauri backend and config
├── public/                # Static assets
└── package.json
```

---

## License

MIT — free to use, fork, and modify.
