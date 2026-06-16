import { useRef } from 'react'
import { formatMarkdownSelection, type MarkdownFormat } from '../utils/markdownFormatting'
import { MarkdownToolbar } from './MarkdownToolbar'

type EditorPanelProps = {
  fontSize: number
  text: string
  onTextChange: (text: string) => void
}

export function EditorPanel({ fontSize, text, onTextChange }: EditorPanelProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const applyMarkdownFormat = (format: MarkdownFormat) => {
    const textarea = textareaRef.current

    if (!textarea) {
      return
    }

    const { nextCursorEnd, nextCursorStart, nextText } = formatMarkdownSelection({
      end: textarea.selectionEnd,
      format,
      start: textarea.selectionStart,
      text,
    })

    onTextChange(nextText)

    requestAnimationFrame(() => {
      textarea.focus()
      textarea.setSelectionRange(nextCursorStart, nextCursorEnd)
    })
  }

  return (
    <section className="panel" aria-label="Text editor">
      <div className="panel__header">
        <h2>
          <label id="editor-label" htmlFor="editor-text">
            Type here
          </label>
        </h2>
      </div>
      <MarkdownToolbar onFormat={applyMarkdownFormat} />
      <textarea
        ref={textareaRef}
        id="editor-text"
        className="editor-textarea"
        value={text}
        aria-describedby="editor-help"
        onChange={(event) => onTextChange(event.target.value)}
        style={{ fontSize }}
      />
      <p id="editor-help" className="helper-text">
        Your draft is saved automatically in this browser.
      </p>
    </section>
  )
}
