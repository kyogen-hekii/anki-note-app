import React from 'react'
import MiniButton from './MiniButton'

type Props = { isPrivate: boolean; onClick: any }

export default ({ isPrivate, onClick }: Props) => {
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <MiniButton
          onClick={onClick}
          className="touchable"
          style={{
            backgroundColor: isPrivate ? '#FCAA00' : '#757575',
            color: isPrivate ? '#757575' : 'white',
          }}
        >
          Private
        </MiniButton>
      </div>
    </div>
  )
}
