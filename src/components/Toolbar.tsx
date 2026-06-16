type ToolbarProps = {
  darkMode: boolean
  fileName: string
  fontSize: number
  maxFontSize: number
  minFontSize: number
  showPreview: boolean
  onDecreaseFontSize: () => void
  onFileNameChange: (fileName: string) => void
  onIncreaseFontSize: () => void
  onToggleDarkMode: () => void
  onTogglePreview: () => void
}

export function Toolbar({
  darkMode,
  fileName,
  fontSize,
  maxFontSize,
  minFontSize,
  showPreview,
  onDecreaseFontSize,
  onFileNameChange,
  onIncreaseFontSize,
  onToggleDarkMode,
  onTogglePreview,
}: ToolbarProps) {
  return (
    <section className="toolbar" aria-label="Editor controls">
      <div className="toolbar__buttons">
        <button
          type="button"
          className="button"
          aria-pressed={darkMode}
          onClick={onToggleDarkMode}
        >
          {darkMode ? 'Light Mode' : 'Dark Mode'}
        </button>

        <button
          type="button"
          className="button"
          aria-pressed={showPreview}
          aria-controls="text-preview"
          onClick={onTogglePreview}
        >
          {showPreview ? 'Hide Preview' : 'Show Preview'}
        </button>

        <button
          type="button"
          className="button button--compact"
          aria-label="Increase editor font size"
          disabled={fontSize >= maxFontSize}
          onClick={onIncreaseFontSize}
        >
          A+
        </button>

        <button
          type="button"
          className="button button--compact"
          aria-label="Decrease editor font size"
          disabled={fontSize <= minFontSize}
          onClick={onDecreaseFontSize}
        >
          A-
        </button>
      </div>

      <div className="field">
        <label htmlFor="file-name">Export file name</label>
        <input
          id="file-name"
          type="text"
          value={fileName}
          onChange={(event) => onFileNameChange(event.target.value)}
          placeholder="Example: meeting-notes"
        />
      </div>
    </section>
  )
}
