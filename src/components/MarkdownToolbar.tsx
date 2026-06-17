import type { MarkdownFormat } from '../utils/markdownFormatting'
import { FORMAT_ACTIONS } from '../utils/markdownToolbarActions'

type MarkdownToolbarProps = {
  onFormat: (format: MarkdownFormat) => void
}

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
