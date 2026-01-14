# Rich2Jira

Convert rich text to Jira Wiki Markup and Markdown with a beautiful WYSIWYG editor.

## Features

- 📝 **WYSIWYG Editor** - Powered by Tiptap with full formatting support
- 🔄 **Dual Output** - Convert to both Jira Wiki Markup and Markdown
- 🎨 **Clean Design** - Minimal interface with blue accent colors
- 🌓 **Dark/Light Mode** - Theme toggle with localStorage persistence
- 📋 **Copy to Clipboard** - One-click copy for both formats
- 👀 **Live Preview** - Side-by-side editor and preview panels with tabs

## Supported Formatting

| Feature | Supported |
|---------|-----------|
| Bold, Italic, Underline, Strikethrough | ✅ |
| Headings (H1-H6) | ✅ |
| Bullet Lists & Numbered Lists | ✅ |
| Nested Lists | ✅ |
| Links | ✅ |
| Images (URL) | ✅ |
| Code Blocks | ✅ |
| Inline Code | ✅ |
| Tables | ✅ |
| Blockquotes | ✅ |

## Tech Stack

- **Vite** - Build tool
- **TypeScript** - Type safety
- **Alpine.js** - Reactive UI state management
- **Tiptap** - WYSIWYG editor framework
- **Turndown.js** - HTML to Markdown conversion
- **Custom parser** - HTML to Jira Wiki Markup

## Getting Started

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

## Deployment

The app is a static site and can be deployed to:

- **Vercel** - `vercel deploy`
- **Netlify** - Drag and drop `dist/` folder
- **GitHub Pages** - Push `dist/` to `gh-pages` branch

## Project Structure

```
src/
├── main.ts              # App initialization with Alpine.js
├── editor.ts            # Tiptap editor setup
├── toolbar.ts           # Toolbar component
├── converters/
│   ├── toJira.ts        # HTML → Jira Wiki converter
│   └── toMarkdown.ts    # HTML → Markdown converter
├── style.css            # Design system and styles
└── turndown-plugin-gfm.d.ts  # Type definitions
```

## License

MIT
