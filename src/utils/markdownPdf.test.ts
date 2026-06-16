import { describe, expect, it, vi } from 'vitest'
import { renderMarkdownToPdf } from './markdownPdf'

function createPdfMock() {
  return {
    addPage: vi.fn(),
    getTextWidth: vi.fn((text: string) => text.length * 2),
    internal: {
      pageSize: {
        getHeight: () => 297,
        height: 297,
      },
    },
    rect: vi.fn(),
    setFillColor: vi.fn(),
    setFont: vi.fn(),
    setFontSize: vi.fn(),
    setTextColor: vi.fn(),
    splitTextToSize: vi.fn((text: string) => [text]),
    text: vi.fn(),
    textWithLink: vi.fn(),
  }
}

describe('renderMarkdownToPdf', () => {
  it('renders standard Markdown elements with PDF styling', () => {
    const doc = createPdfMock()

    renderMarkdownToPdf(
      doc as never,
      `# Heading

## Subheading

### Small heading

This is **bold** and *italic*.

- First item

[Example](https://example.com)

\`\`\`ts
const value = 1
\`\`\``,
    )

    expect(doc.text).toHaveBeenCalledWith('Heading', 14, expect.any(Number))
    expect(doc.text).toHaveBeenCalledWith('Subheading', 14, expect.any(Number))
    expect(doc.text).toHaveBeenCalledWith('Small heading', 14, expect.any(Number))
    expect(doc.setFont).toHaveBeenCalledWith('helvetica', 'bold')
    expect(doc.setFont).toHaveBeenCalledWith('helvetica', 'italic')
    expect(doc.text).toHaveBeenCalledWith('•', 14, expect.any(Number))
    expect(doc.textWithLink).toHaveBeenCalledWith('Example', expect.any(Number), expect.any(Number), {
      url: 'https://example.com',
    })
    expect(doc.rect).toHaveBeenCalledWith(14, expect.any(Number), 182, expect.any(Number), 'F')
    expect(doc.setFont).toHaveBeenCalledWith('courier', 'normal')
    expect(doc.text).toHaveBeenCalledWith('const value = 1', 18, expect.any(Number))
  })

  it('skips raw HTML lines for safe PDF output', () => {
    const doc = createPdfMock()

    renderMarkdownToPdf(doc as never, "# Safe\n\n<script>alert('xss')</script>\n\n<img src=x>")

    expect(doc.text).toHaveBeenCalledWith('Safe', 14, expect.any(Number))
    expect(doc.text).not.toHaveBeenCalledWith("alert('xss')", expect.any(Number), expect.any(Number))
    expect(doc.text).not.toHaveBeenCalledWith('<img src=x>', expect.any(Number), expect.any(Number))
  })
})
