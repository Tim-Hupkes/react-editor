import ReactMarkdown from 'react-markdown'
import SyntaxHighlighter from 'react-syntax-highlighter/dist/esm/prism-light'
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css'
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript'
import markdown from 'react-syntax-highlighter/dist/esm/languages/prism/markdown'
import markup from 'react-syntax-highlighter/dist/esm/languages/prism/markup'
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript'
import { oneLight, vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { FORMAT_ACTIONS } from '../utils/markdownToolbarActions'

SyntaxHighlighter.registerLanguage('css', css)
SyntaxHighlighter.registerLanguage('html', markup)
SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('js', javascript)
SyntaxHighlighter.registerLanguage('markdown', markdown)
SyntaxHighlighter.registerLanguage('md', markdown)
SyntaxHighlighter.registerLanguage('typescript', typescript)
SyntaxHighlighter.registerLanguage('ts', typescript)

type PreviewPanelProps = {
  darkMode: boolean
  fontSize: number
  text: string
}

export function PreviewPanel({ darkMode, fontSize, text }: PreviewPanelProps) {
  return (
    <section className="panel" aria-label="Text preview">
      <div className="panel__header">
        <h2 id="preview-label">Preview</h2>
      </div>
      <div className="markdown-toolbar markdown-toolbar--spacer" aria-hidden="true">
        {FORMAT_ACTIONS.map((action) => (
          <button
            key={action.format}
            type="button"
            className="markdown-toolbar__button"
            disabled
            tabIndex={-1}
          >
            {action.label}
          </button>
        ))}
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
              code({ children, className, ...props }) {
                const languageMatch = /language-(\w+)/.exec(className ?? '')
                const code = String(children).replace(/\n$/, '')

                if (!languageMatch) {
                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                }

                return (
                  <SyntaxHighlighter
                    PreTag="div"
                    language={languageMatch[1]}
                    style={darkMode ? vscDarkPlus : oneLight}
                  >
                    {code}
                  </SyntaxHighlighter>
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
