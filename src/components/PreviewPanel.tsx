import ReactMarkdown from 'react-markdown'

type PreviewPanelProps = {
  fontSize: number
  text: string
}

export function PreviewPanel({ fontSize, text }: PreviewPanelProps) {
  return (
    <section className="panel" aria-label="Text preview">
      <div className="panel__header">
        <h2 id="preview-label">Preview</h2>
      </div>
      <div id="text-preview" className="preview-box markdown-preview" style={{ fontSize }}>
        {text.trim() ? (
          <ReactMarkdown
            skipHtml
            components={{
              a({ children, ...props }) {
                return (
                  <a {...props} target="_blank" rel="noreferrer">
                    {children}
                  </a>
                )
              },
            }}
          >
            {text}
          </ReactMarkdown>
        ) : (
          <span className="preview-box__placeholder">Your Markdown preview will appear here.</span>
        )}
      </div>
    </section>
  )
}
