import type { TextStats } from '../utils/textStats'

type EditorStatsProps = {
  lastSaved: Date | null
  stats: TextStats
}

export function EditorStats({ lastSaved, stats }: EditorStatsProps) {
  return (
    <section className="stats" aria-label="Text statistics">
      <p>
        <strong>{stats.characters}</strong> characters
      </p>
      <p>
        <strong>{stats.words}</strong> words
      </p>
      <p>
        Last saved:{' '}
        <time dateTime={lastSaved?.toISOString()}>
          {lastSaved ? lastSaved.toLocaleTimeString() : 'Not yet'}
        </time>
      </p>
    </section>
  )
}
