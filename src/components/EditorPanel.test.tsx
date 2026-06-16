import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { EditorPanel } from './EditorPanel'

describe('EditorPanel', () => {
  it('handles save shortcut only from the focused editor', () => {
    const onSave = vi.fn()

    render(
      <EditorPanel
        fontSize={18}
        text="Hello"
        onSave={onSave}
        onTextChange={vi.fn()}
      />,
    )

    const editor = screen.getByLabelText('Type here')
    fireEvent.keyDown(editor, { ctrlKey: true, key: 's' })

    expect(onSave).toHaveBeenCalledOnce()
  })

  it('keeps editor focus when a Markdown toolbar button is pressed', () => {
    render(
      <EditorPanel
        fontSize={18}
        text="Hello"
        onSave={vi.fn()}
        onTextChange={vi.fn()}
      />,
    )

    const editor = screen.getByLabelText('Type here')
    const boldButton = screen.getByRole('button', { name: 'Bold' })

    editor.focus()
    fireEvent.mouseDown(boldButton)

    expect(editor).toHaveFocus()
  })
})
