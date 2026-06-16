function getDateStamp() {
  return new Date().toISOString().split('T')[0]
}

function getSafeFileName(fileName: string) {
  const safeName = fileName
    .trim()
    .replace(/[^a-z0-9-_ ]/gi, '')
    .replace(/\s+/g, '-')
    .toLowerCase()

  return safeName || 'untitled'
}

function getDownloadName(fileName: string, extension: 'pdf' | 'txt') {
  return `${getSafeFileName(fileName)}-${getDateStamp()}.${extension}`
}

export async function copyTextToClipboard(text: string) {
  await navigator.clipboard.writeText(text)
}

export function downloadTextFile(text: string, fileName: string) {
  const url = URL.createObjectURL(new Blob([text], { type: 'text/plain' }))
  const link = document.createElement('a')

  link.href = url
  link.download = getDownloadName(fileName, 'txt')
  link.click()

  URL.revokeObjectURL(url)
}

export async function downloadPdfFile(text: string, fileName: string) {
  const { jsPDF } = await import('jspdf')
  const { renderMarkdownToPdf } = await import('./markdownPdf')
  const doc = new jsPDF()

  renderMarkdownToPdf(doc, text || ' ')
  doc.save(getDownloadName(fileName, 'pdf'))
}
