# Rich2Jira

Convert rich text to Jira Wiki Markup and Markdown with a beautiful React-based WYSIWYG editor.

## ✨ Features

- 📝 **WYSIWYG Editor** - Powered by Tiptap React with full formatting support
- 🔄 **Dual Output** - Convert to both Jira Wiki Markup and Markdown
- 🎨 **shadcn/ui Design** - Beautiful, accessible components with Tailwind CSS
- 🌓 **Dark/Light Mode** - Theme toggle with localStorage persistence
- 📋 **Copy to Clipboard** - One-click copy for both formats
- 👀 **Live Preview** - Side-by-side editor and tabbed preview panels

## 🎯 Supported Formatting

| Feature | Supported |
|---------|-----------|
| Bold, Italic, Underline, Strikethrough | ✅ |
| Headings (H1-H6) | ✅ |
| Bullet Lists & Numbered Lists | ✅ |
| Nested Lists | ✅ |
| Links | ✅ |
| Images (URL) | ✅ |
| Code Blocks & Inline Code | ✅ |
| Tables | ✅ |
| Blockquotes | ✅ |

## 🛠️ Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - Beautiful React components
- **Tiptap** - Headless WYSIWYG editor framework
- **Turndown.js** - HTML to Markdown conversion
- **Custom parser** - HTML to Jira Wiki Markup

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Visit `http://localhost:5173`

### Build

```bash
npm run build
```

Output will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 📦 Deployment

The app is a static site (100% client-side) and can be deployed to:

- **GitHub Pages** - Push `dist/` to `gh-pages` branch
- **Vercel** - `vercel deploy` (auto-detects Vite)
- **Netlify** - Drag and drop `dist/` folder
- **Cloudflare Pages** - Connect repo, set build command

## 📁 Project Structure

```
src/
├── main.tsx                      # React entry point
├── App.tsx                       # Main app component
├── index.css                     # Tailwind + custom styles
├── lib/
│   └── utils.ts                  # shadcn cn() utility
├── hooks/
│   ├── useTheme.tsx              # Dark/light mode hook
│   └── useCopyToClipboard.ts    # Clipboard hook
├── components/
│   ├── ui/                       # shadcn components
│   │   ├── button.tsx
│   │   ├── tabs.tsx
│   │   ├── toggle.tsx
│   │   └── separator.tsx
│   ├── Header.tsx                # App header with theme toggle
│   ├── Editor.tsx                # Tiptap editor wrapper
│   ├── Toolbar.tsx               # Formatting toolbar
│   └── PreviewPanel.tsx          # Tabbed preview (Jira/Markdown)
└── converters/
    ├── toJira.ts                 # HTML → Jira Wiki converter
    └── toMarkdown.ts             # HTML → Markdown converter
```

## 🎨 Features Detail

### Editor (Tiptap React)
- All formatting options via toolbar
- Table support with headers
- Image URLs (no uploads)
- Code blocks and inline code
- Keyboard shortcuts (Ctrl+B, Ctrl+I, etc.)

### Converters
- **Jira Wiki**: Custom HTML parser → Jira syntax
- **Markdown**: Turndown.js + GFM plugin
- **Live updates**: Instant conversion as you type

### Design (shadcn/ui)
- Blue accent color (#2563eb)
- Dark/light mode with smooth transitions
- Responsive (desktop-first, works on mobile)
- Accessible components (ARIA labels, keyboard navigation)

## 🔧 Conversion Reference

### Jira Wiki Syntax

| Element | Syntax |
|---------|--------|
| Bold | `*text*` |
| Italic | `_text_` |
| Underline | `+text+` |
| Strikethrough | `-text-` |
| Heading 1 | `h1. text` |
| Bullet list | `* item` |
| Numbered list | `# item` |
| Link | `[text\|url]` |
| Image | `!url!` |
| Code | `{{code}}` |
| Code block | `{code}...{code}` |
| Table header | `\|\|header\|\|` |
| Table cell | `\|cell\|` |

### Markdown (GFM)

Standard GitHub Flavored Markdown with tables, strikethrough, and all common formatting.

## 📝 License

MIT

---

**Built with ❤️ using React, Tiptap, and shadcn/ui**
