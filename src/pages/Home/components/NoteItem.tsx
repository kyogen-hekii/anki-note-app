import React from 'react'
import removeMarkdown from 'remove-markdown'
import { TransformScaleDivButton } from '../../../components/TransformScaleButton'

export default ({ note, onClick }: any) => {
  return (
    <div
      className="mb20"
      style={{
        position: 'relative',
        backgroundColor: 'white',
        borderLeft: 'solid 6px #79BD9A',
        borderBottom: 'solid 2px #dadada',
        marginRight: '4rem',
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
      <TransformScaleDivButton
        style={{ position: 'absolute', top: 10, right: 10 }}
        onClick={e => {
          e.preventDefault()
          e.stopPropagation()
        }}
      >
        <i className="fa fa-trash" />
      </TransformScaleDivButton>
    </div>
  )
}
