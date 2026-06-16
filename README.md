# Tim's Editor

A lightweight React Markdown editor with autosave, dark mode, live preview, text statistics, clipboard support, and export options for `.txt` and `.pdf`.

## Features

- Write Markdown and preview the rendered output side by side in a clean editor interface.
- Render headings, bold text, italic text, unordered lists, links, and fenced code blocks.
- Highlight fenced code blocks in the Markdown preview.
- Add Markdown syntax with a small editor toolbar for common formatting actions.
- Automatically save drafts to `localStorage`.
- Show character count, word count, and last saved time.
- Toggle dark mode and preview visibility.
- Increase or decrease the editor font size.
- Copy text to the clipboard.
- Download content as a text file or PDF.
- Use a custom file name for exports.

## Tech Stack

- React 19
- TypeScript
- Vite
- jsPDF
- react-markdown
- react-syntax-highlighter
- Vitest and Testing Library
- ESLint

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Run linting:

```bash
npm run lint
```

## Project Structure

```text
src/
  components/       Reusable UI components
  hooks/            Custom React hooks
  utils/            Shared editor and download helpers
  assets/           Project images
```

## Accessibility

The editor uses semantic headings, labeled form controls, keyboard-accessible buttons, live status messages, and ARIA attributes for stateful controls such as dark mode and preview visibility.

## Future Improvements

- Add unit tests for text statistics, file name formatting, and local storage behavior.
- Add import support for `.txt` files.
- Add markdown preview support.
- Persist user preferences such as dark mode and font size.
