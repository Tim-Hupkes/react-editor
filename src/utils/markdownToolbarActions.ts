import type { MarkdownFormat } from './markdownFormatting'

export const FORMAT_ACTIONS: Array<{
  format: MarkdownFormat
  label: string
  title: string
}> = [
  { format: 'bold', label: 'B', title: 'Bold' },
  { format: 'italic', label: 'I', title: 'Italic' },
  { format: 'link', label: 'Link', title: 'Link' },
  { format: 'h1', label: 'H1', title: 'Heading 1' },
  { format: 'h2', label: 'H2', title: 'Heading 2' },
  { format: 'h3', label: 'H3', title: 'Heading 3' },
  { format: 'bulletList', label: 'List', title: 'Bullet list' },
  { format: 'codeBlock', label: 'Code', title: 'Code block' },
]
