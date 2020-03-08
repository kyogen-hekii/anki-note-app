import React from 'react'

export default ({ note, onClick }: any) => {
  return (
    <div
      onClick={() => {
        onClick(note)
      }}
    >
      {note.title}
    </div>
  )
}
