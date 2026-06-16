import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { downloadPdfFile, downloadTextFile } from './downloads'

const mocks = vi.hoisted(() => ({
  renderMarkdownToPdf: vi.fn(),
  save: vi.fn(),
}))

vi.mock('jspdf', () => ({
  jsPDF: vi.fn(function jsPDF() {
    return {
      save: mocks.save,
    }
  }),
}))

vi.mock('./markdownPdf', () => ({
  renderMarkdownToPdf: mocks.renderMarkdownToPdf,
}))

describe('downloads', () => {
  const createObjectURLMock = vi.fn(() => 'blob:mock-url')
  const revokeObjectURLMock = vi.fn()

  beforeEach(() => {
    vi.stubGlobal('URL', {
      createObjectURL: createObjectURLMock,
      revokeObjectURL: revokeObjectURLMock,
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
    vi.clearAllMocks()
  })

  it('downloads a TXT file with a safe generated name', () => {
    const clickMock = vi.fn()
    const appendChildMock = vi.spyOn(document.body, 'appendChild')
    const createElementSpy = vi.spyOn(document, 'createElement')

    createElementSpy.mockReturnValue({
      click: clickMock,
      download: '',
      href: '',
    } as unknown as HTMLAnchorElement)

    downloadTextFile('Hello world', 'My Notes!')

    expect(createObjectURLMock).toHaveBeenCalledWith(expect.any(Blob))
    expect(clickMock).toHaveBeenCalledOnce()
    expect(revokeObjectURLMock).toHaveBeenCalledWith('blob:mock-url')
    expect(appendChildMock).not.toHaveBeenCalled()
    expect(createElementSpy.mock.results[0].value.download).toMatch(
      /^my-notes-\d{4}-\d{2}-\d{2}\.txt$/,
    )
  })

  it('downloads a PDF using jsPDF', async () => {
    await downloadPdfFile('PDF text', 'Report')

    expect(mocks.renderMarkdownToPdf).toHaveBeenCalledWith(expect.any(Object), 'PDF text')
    expect(mocks.save.mock.calls[0][0]).toMatch(/^report-\d{4}-\d{2}-\d{2}\.pdf$/)
  })
})
