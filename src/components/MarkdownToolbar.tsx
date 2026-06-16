import type { MarkdownFormat } from '../utils/markdownFormatting'

type MarkdownToolbarProps = {
  onFormat: (format: MarkdownFormat) => void
}

const FORMAT_ACTIONS: Array<{
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

export function MarkdownToolbar({ onFormat }: MarkdownToolbarProps) {
  return (
    <div className="markdown-toolbar" aria-label="Markdown formatting tools">
      {FORMAT_ACTIONS.map((action) => (
        <button
          key={action.format}
          type="button"
          className="markdown-toolbar__button"
          title={action.title}
          aria-label={action.title}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => onFormat(action.format)}
        >
          {action.label}
        </button>
      ))}
    </div>
  )
}
