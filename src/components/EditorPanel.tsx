type EditorPanelProps = {
  fontSize: number
  text: string
  onTextChange: (text: string) => void
}

export function EditorPanel({ fontSize, text, onTextChange }: EditorPanelProps) {
  return (
    <section className="panel" aria-label="Text editor">
      <div className="panel__header">
        <h2>
          <label id="editor-label" htmlFor="editor-text">
            Type here
          </label>
        </h2>
      </div>
      <textarea
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
