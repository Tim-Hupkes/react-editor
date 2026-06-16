import { describe, expect, it } from 'vitest'
import { getTextStats } from './textStats'

describe('getTextStats', () => {
  it('counts characters and words', () => {
    expect(getTextStats('Hello Markdown world')).toEqual({
      characters: 20,
      words: 3,
    })
  })

  it('returns zero words for whitespace-only text', () => {
    expect(getTextStats('   \n\t  ')).toEqual({
      characters: 7,
      words: 0,
    })
  })
})
