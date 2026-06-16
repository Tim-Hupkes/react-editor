import { describe, expect, it } from 'vitest'
import { formatMarkdownSelection } from './markdownFormatting'

describe('formatMarkdownSelection', () => {
  it('wraps selected text for bold formatting', () => {
    expect(
      formatMarkdownSelection({
        end: 11,
        format: 'bold',
        start: 6,
        text: 'Hello world',
      }).nextText,
    ).toBe('Hello **world**')
  })

  it('creates a Markdown link around selected text', () => {
    expect(
      formatMarkdownSelection({
        end: 7,
        format: 'link',
        start: 0,
        text: 'OpenAI',
      }).nextText,
    ).toBe('[OpenAI](https://example.com)')
  })

  it('prefixes every selected line for bullet lists', () => {
    expect(
      formatMarkdownSelection({
        end: 16,
        format: 'bulletList',
        start: 0,
        text: 'First item\nSecond',
      }).nextText,
    ).toBe('- First item\n- Second')
  })

  it('inserts a fenced code block', () => {
    expect(
      formatMarkdownSelection({
        end: 13,
        format: 'codeBlock',
        start: 0,
        text: 'const value=1',
      }).nextText,
    ).toBe('```\nconst value=1\n```')
  })
})
