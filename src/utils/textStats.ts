export type TextStats = {
  characters: number
  words: number
}

export function getTextStats(text: string): TextStats {
  const trimmedText = text.trim()

  return {
    characters: text.length,
    words: trimmedText === '' ? 0 : trimmedText.split(/\s+/).length,
  }
}
