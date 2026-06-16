import type { jsPDF } from 'jspdf'

type InlineSegment = {
  href?: string
  style: 'bold' | 'bolditalic' | 'italic' | 'normal'
  text: string
}

const PAGE_MARGIN = 14
const PAGE_WIDTH = 210
const PAGE_HEIGHT = 297
const MAX_TEXT_WIDTH = PAGE_WIDTH - PAGE_MARGIN * 2
const BOTTOM_MARGIN = PAGE_MARGIN

function getPageHeight(doc: jsPDF) {
  return doc.internal.pageSize.getHeight?.() ?? doc.internal.pageSize.height ?? PAGE_HEIGHT
}

function ensurePageSpace(doc: jsPDF, y: number, neededSpace: number) {
  if (y + neededSpace <= getPageHeight(doc) - BOTTOM_MARGIN) {
    return y
  }

  doc.addPage()
  return PAGE_MARGIN
}

function resetTextStyle(doc: jsPDF) {
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  doc.setTextColor(23, 32, 38)
}

function parseInlineMarkdown(text: string): InlineSegment[] {
  const segments: InlineSegment[] = []
  const pattern = /(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(\[([^\]]+)\]\((https?:\/\/[^)]+)\))/g
  let currentIndex = 0
  let match: RegExpExecArray | null

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > currentIndex) {
      segments.push({
        style: 'normal',
        text: text.slice(currentIndex, match.index),
      })
    }

    if (match[2]) {
      segments.push({ style: 'bold', text: match[2] })
    } else if (match[4]) {
      segments.push({ style: 'italic', text: match[4] })
    } else if (match[6] && match[7]) {
      segments.push({ href: match[7], style: 'normal', text: match[6] })
    }

    currentIndex = pattern.lastIndex
  }

  if (currentIndex < text.length) {
    segments.push({ style: 'normal', text: text.slice(currentIndex) })
  }

  return segments.length > 0 ? segments : [{ style: 'normal', text }]
}

function setInlineStyle(doc: jsPDF, segment: InlineSegment) {
  doc.setFont('helvetica', segment.style)
  doc.setTextColor(segment.href ? 1 : 23, segment.href ? 77 : 32, segment.href ? 102 : 38)
}

function renderInlineSegments(
  doc: jsPDF,
  segments: InlineSegment[],
  x: number,
  y: number,
  maxWidth = MAX_TEXT_WIDTH,
) {
  let cursorX = x
  let cursorY = y
  const lineHeight = 6

  for (const segment of segments) {
    const tokens = segment.text.split(/(\s+)/)

    for (const token of tokens) {
      if (token === '') {
        continue
      }

      setInlineStyle(doc, segment)
      const tokenWidth = doc.getTextWidth(token)

      if (cursorX > x && cursorX + tokenWidth > x + maxWidth) {
        cursorX = x
        cursorY += lineHeight
      }

      if (segment.href) {
        doc.textWithLink(token, cursorX, cursorY, { url: segment.href })
      } else {
        doc.text(token, cursorX, cursorY)
      }

      cursorX += tokenWidth
    }
  }

  resetTextStyle(doc)
  return cursorY + lineHeight
}

function renderHeading(doc: jsPDF, line: string, level: 1 | 2 | 3, y: number) {
  const marker = '#'.repeat(level)
  const text = line.replace(`${marker} `, '').trim()
  const sizes = { 1: 20, 2: 16, 3: 14 }

  y = ensurePageSpace(doc, y, 12)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(sizes[level])
  doc.setTextColor(1, 77, 102)
  doc.text(text, PAGE_MARGIN, y)
  resetTextStyle(doc)

  return y + 10
}

function renderParagraph(doc: jsPDF, line: string, y: number) {
  y = ensurePageSpace(doc, y, 8)
  return renderInlineSegments(doc, parseInlineMarkdown(line), PAGE_MARGIN, y)
}

function renderListItem(doc: jsPDF, line: string, y: number) {
  y = ensurePageSpace(doc, y, 8)
  doc.text('•', PAGE_MARGIN, y)

  return renderInlineSegments(doc, parseInlineMarkdown(line.replace(/^- /, '')), PAGE_MARGIN + 6, y, MAX_TEXT_WIDTH - 6)
}

function renderCodeBlock(doc: jsPDF, lines: string[], y: number) {
  const lineHeight = 5.5
  const wrappedLines = lines.flatMap((line) => doc.splitTextToSize(line || ' ', MAX_TEXT_WIDTH - 8))
  const blockHeight = Math.max(12, wrappedLines.length * lineHeight + 8)

  y = ensurePageSpace(doc, y, blockHeight)
  doc.setFillColor(238, 245, 247)
  doc.rect(PAGE_MARGIN, y - 5, MAX_TEXT_WIDTH, blockHeight, 'F')
  doc.setFont('courier', 'normal')
  doc.setFontSize(9.5)
  doc.setTextColor(23, 32, 38)

  wrappedLines.forEach((line, index) => {
    doc.text(line, PAGE_MARGIN + 4, y + index * lineHeight)
  })

  resetTextStyle(doc)
  return y + blockHeight + 4
}

function isRawHtmlLine(line: string) {
  return /^<\/?[a-z][\s\S]*>/i.test(line.trim())
}

export function renderMarkdownToPdf(doc: jsPDF, markdown: string) {
  resetTextStyle(doc)

  const lines = markdown.split('\n')
  let y = PAGE_MARGIN
  let isCodeBlock = false
  let codeBlockLines: string[] = []

  for (const line of lines) {
    if (line.trim().startsWith('```')) {
      if (isCodeBlock) {
        y = renderCodeBlock(doc, codeBlockLines, y)
        codeBlockLines = []
        isCodeBlock = false
      } else {
        isCodeBlock = true
      }

      continue
    }

    if (isCodeBlock) {
      codeBlockLines.push(line)
      continue
    }

    if (line.trim() === '') {
      y += 3
      continue
    }

    if (isRawHtmlLine(line)) {
      continue
    }

    if (line.startsWith('# ')) {
      y = renderHeading(doc, line, 1, y)
    } else if (line.startsWith('## ')) {
      y = renderHeading(doc, line, 2, y)
    } else if (line.startsWith('### ')) {
      y = renderHeading(doc, line, 3, y)
    } else if (line.startsWith('- ')) {
      y = renderListItem(doc, line, y)
    } else {
      y = renderParagraph(doc, line, y)
    }
  }

  if (codeBlockLines.length > 0) {
    renderCodeBlock(doc, codeBlockLines, y)
  }
}
