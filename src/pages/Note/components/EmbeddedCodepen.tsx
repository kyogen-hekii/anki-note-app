import React from 'react'
//@ts-ignore
import Codepen from 'react-codepen-embed'

export default ({ hash }: { hash: string }) => {
  const h: string = hash || 'JyxeVP'
  return (
    // HACK: keyを付与することで、再描画できる
    <div key={h}>
      <Codepen hash={h} user="someone" />
    </div>
  )
}
