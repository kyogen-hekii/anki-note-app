import React from 'react'
import removeMarkdown from 'remove-markdown'

export default ({ note, onClick }: any) => {
  return (
    <div
      className="mb20"
      style={{
        backgroundColor: 'white',
        borderLeft: 'solid 6px green',
        borderBottom: 'solid 2px #dadada',
        paddingRight: 30,
      }}
      onClick={() => {
        onClick(note)
      }}
    >
      <div className="mh10 mb10" style={{ fontSize: '2.2rem' }}>
        {note.title}
      </div>
      <div className="mh10 pb16 mb8" style={{ fontSize: '1.2rem' }}>
        {removeMarkdown(note.content)}
      </div>
    </div>
  )
}
