export type MarkdownFormat =
  | 'bold'
  | 'italic'
  | 'link'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'bulletList'
  | 'codeBlock'

type FormatSelectionOptions = {
  end: number
  format: MarkdownFormat
  text: string
  start: number
}

type FormatSelectionResult = {
  nextCursorEnd: number
  nextCursorStart: number
  nextText: string
}

const PLACEHOLDER_TEXT: Record<MarkdownFormat, string> = {
  bold: 'bold text',
  italic: 'italic text',
  link: 'link text',
  h1: 'Heading 1',
  h2: 'Heading 2',
  h3: 'Heading 3',
  bulletList: 'List item',
  codeBlock: 'const value = 1',
}

function wrapSelection(
  text: string,
  start: number,
  end: number,
  prefix: string,
  suffix = prefix,
  fallback: string,
): FormatSelectionResult {
  const selectedText = text.slice(start, end) || fallback
  const replacement = `${prefix}${selectedText}${suffix}`
  const nextText = `${text.slice(0, start)}${replacement}${text.slice(end)}`
  const nextCursorStart = start + prefix.length

  return {
    nextCursorEnd: nextCursorStart + selectedText.length,
    nextCursorStart,
    nextText,
  }
}

function prefixLines(
  text: string,
  start: number,
  end: number,
  prefix: string,
  fallback: string,
): FormatSelectionResult {
  const selectedText = text.slice(start, end) || fallback
  const replacement = selectedText
    .split('\n')
    .map((line) => `${prefix}${line}`)
    .join('\n')
  const nextText = `${text.slice(0, start)}${replacement}${text.slice(end)}`

  return {
    nextCursorEnd: start + replacement.length,
    nextCursorStart: start,
    nextText,
  }
}

export function formatMarkdownSelection({
  end,
  format,
  start,
  text,
}: FormatSelectionOptions): FormatSelectionResult {
  const fallback = PLACEHOLDER_TEXT[format]

  switch (format) {
    case 'bold':
      return wrapSelection(text, start, end, '**', '**', fallback)
    case 'italic':
      return wrapSelection(text, start, end, '*', '*', fallback)
    case 'link':
      return wrapSelection(text, start, end, '[', '](https://example.com)', fallback)
    case 'h1':
      return prefixLines(text, start, end, '# ', fallback)
    case 'h2':
      return prefixLines(text, start, end, '## ', fallback)
    case 'h3':
      return prefixLines(text, start, end, '### ', fallback)
    case 'bulletList':
      return prefixLines(text, start, end, '- ', fallback)
    case 'codeBlock':
      return wrapSelection(text, start, end, '```\n', '\n```', fallback)
  }
}
