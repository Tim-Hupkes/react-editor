import { useEffect, useRef, useState } from 'react'
import './App.css'
import TimPhoto from './assets/tim-editor-photo.webp'
import { EditorPanel } from './components/EditorPanel'
import { EditorStats } from './components/EditorStats'
import { ProfileFooter } from './components/ProfileFooter'
import { PreviewPanel } from './components/PreviewPanel'
import { Toolbar } from './components/Toolbar'
import { useLocalStorageState } from './hooks/useLocalStorageState'
import { copyTextToClipboard, downloadPdfFile, downloadTextFile } from './utils/downloads'
import { getTextStats } from './utils/textStats'

const MIN_FONT_SIZE = 12
const MAX_FONT_SIZE = 32
const FONT_SIZE_STEP = 2

function App() {
  const [text, setText] = useLocalStorageState('savedText', '')
  const previousText = useRef(text)
  const [darkMode, setDarkMode] = useState(false)
  const [showPreview, setShowPreview] = useState(true)
  const [fontSize, setFontSize] = useState(18)
  const [fileName, setFileName] = useState('')
  const [lastSaved, setLastSaved] = useState<Date | null>(null)
  const [statusMessage, setStatusMessage] = useState('Ready to write.')

  useEffect(() => {
    if (previousText.current === text) {
      return
    }

    previousText.current = text
    setLastSaved(new Date())
    setStatusMessage('Draft saved automatically.')
  }, [text])

  const textStats = getTextStats(text)

  const increaseFontSize = () => {
    setFontSize((currentFontSize) =>
      Math.min(currentFontSize + FONT_SIZE_STEP, MAX_FONT_SIZE),
    )
  }

  const decreaseFontSize = () => {
    setFontSize((currentFontSize) =>
      Math.max(currentFontSize - FONT_SIZE_STEP, MIN_FONT_SIZE),
    )
  }

  const clearText = () => {
    const shouldClear = window.confirm(
      'Are you sure you want to clear the text? This cannot be undone.',
    )

    if (!shouldClear) {
      return
    }

    setText('')
    setStatusMessage('Text cleared.')
  }

  const saveText = () => {
    localStorage.setItem('savedText', text)
    setLastSaved(new Date())
    setStatusMessage('Draft saved.')
  }

  const copyText = async () => {
    try {
      await copyTextToClipboard(text)
      setStatusMessage('Text copied to clipboard.')
    } catch {
      setStatusMessage('Unable to copy text. Please try again.')
    }
  }

  const exportText = () => {
    downloadTextFile(text, fileName)
    setStatusMessage('Text file downloaded.')
  }

  const exportPdf = async () => {
    await downloadPdfFile(text, fileName)
    setStatusMessage('PDF downloaded.')
  }

  return (
    <main className={darkMode ? 'app app--dark' : 'app'}>
      <section className="editor-shell" aria-labelledby="app-title">
        <header className="app-header">
          <h1 id="app-title">Tim&apos;s Editor</h1>
          <p>Write, preview, save, and export your text from one focused workspace.</p>
        </header>

        <Toolbar
          darkMode={darkMode}
          fileName={fileName}
          fontSize={fontSize}
          maxFontSize={MAX_FONT_SIZE}
          minFontSize={MIN_FONT_SIZE}
          showPreview={showPreview}
          onDecreaseFontSize={decreaseFontSize}
          onFileNameChange={setFileName}
          onIncreaseFontSize={increaseFontSize}
          onToggleDarkMode={() => setDarkMode((currentMode) => !currentMode)}
          onTogglePreview={() => setShowPreview((currentValue) => !currentValue)}
        />

        <div className={showPreview ? 'editor-layout' : 'editor-layout editor-layout--single'}>
          <EditorPanel fontSize={fontSize} text={text} onTextChange={setText} />
          {showPreview && <PreviewPanel darkMode={darkMode} fontSize={fontSize} text={text} />}
        </div>

        <div className="action-row" aria-label="Editor actions">
          <button type="button" className="button button--secondary" onClick={copyText}>
            Copy Text
          </button>
          <button type="button" className="button button--secondary" onClick={saveText}>
            Save Text
          </button>
          <button type="button" className="button button--danger" onClick={clearText}>
            Clear Text
          </button>
          <button type="button" className="button button--secondary" onClick={exportText}>
            Download Text
          </button>
          <button type="button" className="button button--secondary" onClick={exportPdf}>
            Download PDF
          </button>
        </div>

        <p className="status-message" role="status" aria-live="polite">
          {statusMessage}
        </p>

        <EditorStats lastSaved={lastSaved} stats={textStats} />
        <ProfileFooter imageSrc={TimPhoto} />
      </section>
    </main>
  )
}

export default App
