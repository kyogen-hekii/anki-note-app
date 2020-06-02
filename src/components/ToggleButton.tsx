import React from 'react'
import MiniButton from './MiniButton'
import { primary, dark } from '../utils/colors'

type Props = { isPrivate: boolean; onClick: any }

export default ({ isPrivate, onClick }: Props) => {
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <MiniButton
          onClick={onClick}
          className="touchable"
          style={{
            backgroundColor: isPrivate ? primary : dark,
            color: isPrivate ? dark : 'white',
          }}
        >
          Private
        </MiniButton>
      </div>
    </div>
  )
}
