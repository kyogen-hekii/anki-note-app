import React from 'react'
import removeMarkdown from 'remove-markdown'
import { TransformScaleDivButton } from '../../../components/TransformScaleButton'

type Props = {
  note: any
  onClick: Function
  onDeleteClick: Function
  disableDelete?: boolean
}
export default ({ note, onClick, onDeleteClick, disableDelete }: Props) => {
  return (
    <div
      className="mb20"
      style={{
        backgroundColor: 'white',
        borderLeft: 'solid 6px #79BD9A',
        borderBottom: 'solid 2px #dadada',
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
          isInvalid={disableDelete}
          onClick={(e: any) => {
            e.preventDefault()
            e.stopPropagation()
            if (disableDelete) {
              return
            }
            onDeleteClick(note)
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
