import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PreviewPanel } from './PreviewPanel'

describe('PreviewPanel', () => {
  it('renders standard Markdown', () => {
    render(
      <PreviewPanel
        darkMode={false}
        fontSize={18}
        text={`# Heading

This is **bold** and *italic*.

- First item
- Second item

[Example](https://example.com)

\`\`\`js
const message = 'hello'
\`\`\``}
      />,
    )

    expect(screen.getByRole('heading', { level: 1, name: 'Heading' })).toBeInTheDocument()
    expect(screen.getByText('bold').tagName).toBe('STRONG')
    expect(screen.getByText('italic').tagName).toBe('EM')
    expect(screen.getByText('First item')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Example' })).toHaveAttribute(
      'href',
      'https://example.com',
    )
    expect(document.querySelector('code')).toHaveTextContent("const message = 'hello'")
  })

  it('does not render raw HTML from Markdown input', () => {
    const { container } = render(
      <PreviewPanel
        darkMode={false}
        fontSize={18}
        text={`# Safe heading

<script>alert('xss')</script>

<img src=x onerror=alert(1)>`}
      />,
    )

    expect(screen.getByRole('heading', { level: 1, name: 'Safe heading' })).toBeInTheDocument()
    expect(container.querySelector('script')).not.toBeInTheDocument()
    expect(container.querySelector('img')).not.toBeInTheDocument()
    expect(container).not.toHaveTextContent("alert('xss')")
  })
})
