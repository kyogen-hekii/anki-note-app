import React from 'react'
import removeMarkdown from 'remove-markdown'
import { TransformScaleDivButton } from '../../../components/TransformScaleButton'

export default ({ note, onClick }: any) => {
  return (
    <div
      className="mb20"
      style={{
        backgroundColor: 'white',
        borderLeft: 'solid 6px #79BD9A',
        borderBottom: 'solid 2px #dadada',
        marginRight: '4rem',
      }}
      onClick={() => onClick(note)}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="mh10 mb10" style={{ fontSize: '2.2rem', display: 'flex', flexGrow: 1 }}>
          {note.title}
        </div>
        <div className="mr20" style={{ display: 'flex' }}>
          {note.authorUid ? `@${note.author}` : '@public'}
        </div>
        <TransformScaleDivButton
          className="mr10"
          style={{ display: 'flex' }}
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
          }}
        >
          <i className="fa fa-trash" />
        </TransformScaleDivButton>
      </div>
      <div className="mh10 pb16 mb8" style={{ fontSize: '1.2rem' }}>
        {removeMarkdown(note.content)}
      </div>
    </div>
  )
}
